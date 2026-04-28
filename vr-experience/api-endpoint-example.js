/**
 * Server-side API endpoint example for secure form submission
 * This file should be deployed on your server, not exposed to the client
 *
 * For Next.js: Place in pages/api/contact.js or app/api/contact/route.js
 * For Express: Add as a route handler
 * For Vercel/Netlify: Deploy as a serverless function
 */

// Load environment variables (use dotenv in development)
require('dotenv').config();

// Your actual API keys - stored in environment variables
const API_CONFIG = {
  // These appear to be Stripe-style keys based on the format
  PUBLISHABLE_KEY: process.env.API_PUBLISHABLE_KEY || 'sb_publishable_w0zMNYmXjuYyA6eGYaNV2Q_dd7vXxDo',
  SECRET_KEY: process.env.API_SECRET_KEY || 'sb_secret_inz0rriw-RWf_AndFM1NvA_eHI3bho8',

  // Or if using Supabase:
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY, // Service key for server-side use
};

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map();

// Security utilities
const SecurityUtils = {
  // Validate and sanitize input
  sanitizeInput(input) {
    if (!input) return input;
    return String(input)
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim()
      .substring(0, 1000);
  },

  // Check for SQL injection patterns
  containsSQLInjection(input) {
    if (!input) return false;
    const patterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE)\b)/gi,
      /(--|\||;|\/\*|\*\/|xp_|sp_|0x)/gi,
    ];
    return patterns.some(pattern => pattern.test(input));
  },

  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  }
};

// Rate limiting middleware
function checkRateLimit(identifier) {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxAttempts = 3;

  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, { attempts: [], blocked: null });
  }

  const record = rateLimitStore.get(identifier);

  // Check if blocked
  if (record.blocked && record.blocked > now) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.blocked - now) / 1000)
    };
  }

  // Clean old attempts
  record.attempts = record.attempts.filter(timestamp => now - timestamp < windowMs);

  // Check if limit exceeded
  if (record.attempts.length >= maxAttempts) {
    record.blocked = now + (15 * 60 * 1000); // Block for 15 minutes
    return {
      allowed: false,
      retryAfter: 900 // 15 minutes in seconds
    };
  }

  // Add current attempt
  record.attempts.push(now);
  return { allowed: true };
}

// Main handler (Express example)
async function handleContactSubmission(req, res) {
  // CORS headers (adjust origin for production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Rate limiting
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: rateLimitCheck.retryAfter
      });
    }

    // Parse and validate input
    const { name, email, company, use_case, message } = req.body;

    // Security validation
    const validationErrors = [];

    if (!name || !email || !use_case) {
      validationErrors.push('Required fields missing');
    }

    if (!SecurityUtils.isValidEmail(email)) {
      validationErrors.push('Invalid email address');
    }

    // Check all fields for SQL injection
    const fields = { name, email, company, message };
    for (const [key, value] of Object.entries(fields)) {
      if (value && SecurityUtils.containsSQLInjection(value)) {
        // Log security incident
        console.error('SQL injection attempt detected:', {
          field: key,
          ip: clientIP,
          timestamp: new Date().toISOString()
        });

        return res.status(400).json({
          error: 'Invalid input detected. This incident has been logged.'
        });
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: validationErrors[0]
      });
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: SecurityUtils.sanitizeInput(name),
      email: SecurityUtils.sanitizeInput(email),
      company: SecurityUtils.sanitizeInput(company),
      use_case: SecurityUtils.sanitizeInput(use_case),
      message: SecurityUtils.sanitizeInput(message),
      ip_address: clientIP,
      user_agent: userAgent,
      created_at: new Date().toISOString()
    };

    // Store in database
    // Option 1: If using Supabase
    if (API_CONFIG.SUPABASE_URL && API_CONFIG.SUPABASE_SERVICE_KEY) {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        API_CONFIG.SUPABASE_URL,
        API_CONFIG.SUPABASE_SERVICE_KEY
      );

      const { data, error } = await supabase
        .from('contacts')
        .insert([sanitizedData]);

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Failed to save submission' });
      }
    }

    // Option 2: If using custom API with the provided keys
    else if (API_CONFIG.SECRET_KEY) {
      // Implement your custom API logic here
      // The sb_ prefix suggests these might be Stripe-style keys
      console.log('Custom API submission:', sanitizedData);

      // Example: Send to your custom backend
      // await fetch('your-backend-url', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${API_CONFIG.SECRET_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(sanitizedData)
      // });
    }

    // Log successful submission
    console.log('Contact form submission:', {
      email: sanitizedData.email,
      use_case: sanitizedData.use_case,
      timestamp: sanitizedData.created_at
    });

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest. We will be in touch soon.'
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'An error occurred. Please try again later.'
    });
  }
}

// Export for different environments
module.exports = handleContactSubmission;

// For Next.js API route
module.exports.default = handleContactSubmission;

// For Vercel serverless function
module.exports.handler = handleContactSubmission;

// For Express app
// app.post('/api/contact', handleContactSubmission);