// API Configuration
// SECURITY WARNING: Never hardcode API keys in JavaScript files!
// JavaScript files are visible to anyone who views your website source.
//
// For production, use one of these secure methods:
// 1. Server-side API endpoint that handles form submissions
// 2. Environment variables loaded at build time (for static sites)
// 3. Serverless functions (Vercel, Netlify Functions, etc.)

// Temporary configuration for development only
// Replace with your actual Supabase URL and ANON key
// The ANON key is safe to expose as it's meant for public client-side use
// Never expose service role keys or secret keys in client-side code!
const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Check if we're using the provided Stripe-style keys (these need server-side handling)
const REQUIRES_SERVER_ENDPOINT = window.API_ENDPOINT || null;

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 3, // Maximum attempts per time window
  timeWindow: 300000, // 5 minutes in milliseconds
  blockDuration: 900000, // 15 minutes block after exceeding limit
  storageKey: 'caestus_form_attempts'
};

// Security utilities
const SecurityUtils = {
  // Sanitize input to prevent XSS
  sanitizeInput(input) {
    if (!input) return input;
    return String(input)
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
      .substring(0, 1000); // Limit length
  },

  // Validate email format more strictly
  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254; // RFC 5321
  },

  // Check for SQL injection patterns (additional client-side check)
  containsSQLInjection(input) {
    if (!input) return false;
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE)\b)/gi,
      /(--|\||;|\/\*|\*\/|xp_|sp_|0x)/gi,
      /(\bOR\b\s*\d+\s*=\s*\d+)/gi,
      /(\bAND\b\s*\d+\s*=\s*\d+)/gi
    ];
    return sqlPatterns.some(pattern => pattern.test(input));
  },

  // Generate fingerprint for device tracking
  getDeviceFingerprint() {
    const fp = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      cores: navigator.hardwareConcurrency || 0
    };
    return btoa(JSON.stringify(fp)).substring(0, 32);
  }
};

// Rate limiting implementation
class RateLimiter {
  constructor() {
    this.attempts = this.loadAttempts();
  }

  loadAttempts() {
    try {
      const stored = localStorage.getItem(RATE_LIMIT.storageKey);
      return stored ? JSON.parse(stored) : { count: 0, timestamps: [], blocked: null };
    } catch {
      return { count: 0, timestamps: [], blocked: null };
    }
  }

  saveAttempts() {
    try {
      localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify(this.attempts));
    } catch (e) {
      console.error('Failed to save rate limit data:', e);
    }
  }

  isBlocked() {
    if (!this.attempts.blocked) return false;

    const now = Date.now();
    if (now > this.attempts.blocked) {
      this.attempts.blocked = null;
      this.attempts.count = 0;
      this.attempts.timestamps = [];
      this.saveAttempts();
      return false;
    }

    return true;
  }

  checkLimit() {
    const now = Date.now();

    // Check if currently blocked
    if (this.isBlocked()) {
      const remainingTime = Math.ceil((this.attempts.blocked - now) / 60000);
      return {
        allowed: false,
        message: `Too many attempts. Please wait ${remainingTime} minute(s) before trying again.`,
        remainingTime
      };
    }

    // Remove old timestamps outside the time window
    this.attempts.timestamps = this.attempts.timestamps.filter(
      ts => now - ts < RATE_LIMIT.timeWindow
    );

    // Check if limit exceeded
    if (this.attempts.timestamps.length >= RATE_LIMIT.maxAttempts) {
      this.attempts.blocked = now + RATE_LIMIT.blockDuration;
      this.saveAttempts();
      return {
        allowed: false,
        message: 'Rate limit exceeded. Please wait 15 minutes before submitting again.',
        remainingTime: 15
      };
    }

    // Add current timestamp
    this.attempts.timestamps.push(now);
    this.attempts.count++;
    this.saveAttempts();

    const remaining = RATE_LIMIT.maxAttempts - this.attempts.timestamps.length;
    return {
      allowed: true,
      remaining,
      message: remaining === 1 ? 'Last attempt available in this time window.' : null
    };
  }

  reset() {
    this.attempts = { count: 0, timestamps: [], blocked: null };
    this.saveAttempts();
  }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.submit-btn');
  const statusDiv = document.getElementById('formStatus');
  const rateLimiter = new RateLimiter();

  // Initialize Supabase client (if credentials are provided)
  let supabase = null;
  if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    // Dynamic import of Supabase client
    import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
      .then(({ createClient }) => {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      })
      .catch(err => {
        console.error('Failed to load Supabase client:', err);
      });
  }

  // Form submission handler
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Check rate limit first
    const limitCheck = rateLimiter.checkLimit();
    if (!limitCheck.allowed) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = limitCheck.message;
      return;
    }

    // Show rate limit warning if needed
    if (limitCheck.message) {
      statusDiv.className = 'form-status warning';
      statusDiv.textContent = limitCheck.message;
      setTimeout(() => {
        statusDiv.className = 'form-status';
        statusDiv.textContent = '';
      }, 3000);
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    statusDiv.className = 'form-status';
    statusDiv.textContent = '';

    // Get and sanitize form data
    const formData = new FormData(form);
    const rawData = {
      name: formData.get('name'),
      company: formData.get('company') || null,
      email: formData.get('email'),
      use_case: formData.get('use_case'),
      message: formData.get('message') || null
    };

    // Security validation
    const validationErrors = [];

    // Check for SQL injection attempts
    for (const [key, value] of Object.entries(rawData)) {
      if (value && SecurityUtils.containsSQLInjection(value)) {
        validationErrors.push(`Invalid characters detected in ${key} field`);
      }
    }

    // Validate email format
    if (!SecurityUtils.isValidEmail(rawData.email)) {
      validationErrors.push('Please enter a valid email address');
    }

    // If validation fails, show error and don't submit
    if (validationErrors.length > 0) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = validationErrors[0];
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Log suspicious activity
      console.warn('Form validation failed:', {
        errors: validationErrors,
        fingerprint: SecurityUtils.getDeviceFingerprint(),
        timestamp: new Date().toISOString()
      });

      return;
    }

    // Sanitize all inputs
    const data = {
      name: SecurityUtils.sanitizeInput(rawData.name),
      company: SecurityUtils.sanitizeInput(rawData.company),
      email: SecurityUtils.sanitizeInput(rawData.email),
      use_case: SecurityUtils.sanitizeInput(rawData.use_case),
      message: SecurityUtils.sanitizeInput(rawData.message),
      user_agent: navigator.userAgent,
      source: 'website',
      fingerprint: SecurityUtils.getDeviceFingerprint(),
      submission_timestamp: new Date().toISOString()
    };

    try {
      if (supabase) {
        // Submit to Supabase
        const { error } = await supabase
          .from('contacts')
          .insert([data]);

        if (error) {
          throw error;
        }

        // Success
        showSuccess();
      } else {
        // Fallback: Log to console if Supabase is not configured
        console.log('Form submission (Supabase not configured):', data);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showSuccess();

        // In production, you might want to send to a backup endpoint
        // await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
      }
    } catch (error) {
      // Error handling
      console.error('Submission error:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      if (error.message) {
        if (error.message.includes('wait before submitting')) {
          errorMessage = 'Please wait a few minutes before submitting again.';
        } else if (error.message.includes('duplicate')) {
          errorMessage = 'This email has already been registered.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }

      statusDiv.className = 'form-status error';
      statusDiv.textContent = errorMessage;
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  function showSuccess() {
    statusDiv.className = 'form-status success';
    statusDiv.textContent = 'Thank you! We\'ll be in touch soon about your early access request.';

    // Reset form
    form.reset();

    // Optional: Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': 'early_access_request'
      });
    }

    // Hide success message after 10 seconds
    setTimeout(() => {
      statusDiv.className = 'form-status';
      statusDiv.textContent = '';
    }, 10000);
  }

  // Add real-time validation
  const emailInput = document.getElementById('email');
  emailInput.addEventListener('blur', function() {
    const email = this.value;
    if (email && !isValidEmail(email)) {
      this.setCustomValidity('Please enter a valid email address');
      this.reportValidity();
    } else {
      this.setCustomValidity('');
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Add character counter for message field
  const messageField = document.getElementById('message');
  const maxLength = 500;

  messageField.addEventListener('input', function() {
    const remaining = maxLength - this.value.length;
    if (remaining < 50) {
      if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('char-count')) {
        const counter = document.createElement('div');
        counter.className = 'char-count';
        counter.style.cssText = 'font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;';
        this.parentNode.insertBefore(counter, this.nextSibling);
      }
      this.nextElementSibling.textContent = `${remaining} characters remaining`;
    } else if (this.nextElementSibling && this.nextElementSibling.classList.contains('char-count')) {
      this.nextElementSibling.remove();
    }
  });
});