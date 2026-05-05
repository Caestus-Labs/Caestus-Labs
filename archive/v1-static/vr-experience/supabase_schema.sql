-- Create contacts table for Caestus Labs early access requests with enhanced security
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Core fields with length constraints
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  company TEXT CHECK (char_length(company) <= 100),
  email TEXT UNIQUE NOT NULL CHECK (
    char_length(email) <= 254 AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),
  use_case TEXT NOT NULL CHECK (use_case IN ('training', 'medical', 'industrial', 'gaming', 'research', 'other')),
  message TEXT CHECK (char_length(message) <= 1000),

  -- Metadata and tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT CHECK (char_length(user_agent) <= 500),
  fingerprint TEXT CHECK (char_length(fingerprint) <= 64),

  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'demo_scheduled', 'converted', 'not_qualified')),
  notes TEXT CHECK (char_length(notes) <= 1000),
  source TEXT DEFAULT 'website' CHECK (char_length(source) <= 50),

  -- Security fields
  submission_count INTEGER DEFAULT 1,
  flagged BOOLEAN DEFAULT FALSE,
  flagged_reason TEXT,
  verified BOOLEAN DEFAULT FALSE
);

-- Create index for faster email lookups
CREATE INDEX idx_contacts_email ON contacts(email);

-- Create index for status filtering
CREATE INDEX idx_contacts_status ON contacts(status);

-- Create index for use case analysis
CREATE INDEX idx_contacts_use_case ON contacts(use_case);

-- Create index for temporal queries
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from the public (for form submissions)
CREATE POLICY "Enable insert for all users" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to restrict read access (only authenticated users can read)
CREATE POLICY "Enable read access for authenticated users only" ON contacts
  FOR SELECT TO authenticated
  USING (true);

-- Create policy to allow updates for authenticated users
CREATE POLICY "Enable update for authenticated users" ON contacts
  FOR UPDATE TO authenticated
  USING (true);

-- Create a function to prevent duplicate submissions within 5 minutes
CREATE OR REPLACE FUNCTION check_duplicate_submission()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM contacts
    WHERE email = NEW.email
    AND created_at > NOW() - INTERVAL '5 minutes'
  ) THEN
    RAISE EXCEPTION 'Please wait before submitting again';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for duplicate prevention
CREATE TRIGGER prevent_duplicate_submission
  BEFORE INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION check_duplicate_submission();

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS submission_rate_limit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- Can be IP, email, or fingerprint
  identifier_type TEXT NOT NULL CHECK (identifier_type IN ('ip', 'email', 'fingerprint')),
  attempt_count INTEGER DEFAULT 1,
  first_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  UNIQUE(identifier, identifier_type)
);

-- Create security audit log
CREATE TABLE IF NOT EXISTS security_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'sql_injection_attempt',
    'rate_limit_exceeded',
    'invalid_data',
    'suspicious_pattern',
    'successful_submission',
    'blocked_submission'
  )),
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  fingerprint TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced duplicate prevention with rate limiting
CREATE OR REPLACE FUNCTION check_submission_security()
RETURNS TRIGGER AS $$
DECLARE
  rate_limit_record RECORD;
  submission_count INTEGER;
BEGIN
  -- Check for SQL injection patterns in text fields
  IF NEW.name ~ '(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|SCRIPT|EXEC|CAST|CONVERT|;|--|\/\*|\*\/)'
    OR NEW.company ~ '(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|SCRIPT|EXEC|CAST|CONVERT|;|--|\/\*|\*\/)'
    OR NEW.message ~ '(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|SCRIPT|EXEC|CAST|CONVERT|;|--|\/\*|\*\/)' THEN

    -- Log security event
    INSERT INTO security_audit_log (event_type, event_data, ip_address, user_agent, fingerprint)
    VALUES (
      'sql_injection_attempt',
      jsonb_build_object(
        'email', NEW.email,
        'name', NEW.name,
        'attempted_at', NOW()
      ),
      NEW.ip_address,
      NEW.user_agent,
      NEW.fingerprint
    );

    RAISE EXCEPTION 'Invalid input detected. This incident has been logged.';
  END IF;

  -- Check rate limit by email
  SELECT * INTO rate_limit_record
  FROM submission_rate_limit
  WHERE identifier = NEW.email
    AND identifier_type = 'email';

  IF rate_limit_record IS NOT NULL THEN
    -- Check if blocked
    IF rate_limit_record.blocked_until IS NOT NULL AND rate_limit_record.blocked_until > NOW() THEN
      RAISE EXCEPTION 'Too many submission attempts. Please try again later.';
    END IF;

    -- Check attempts in last 5 minutes
    IF rate_limit_record.last_attempt > NOW() - INTERVAL '5 minutes' THEN
      IF rate_limit_record.attempt_count >= 3 THEN
        -- Block for 15 minutes
        UPDATE submission_rate_limit
        SET blocked_until = NOW() + INTERVAL '15 minutes',
            attempt_count = rate_limit_record.attempt_count + 1,
            last_attempt = NOW()
        WHERE identifier = NEW.email AND identifier_type = 'email';

        -- Log security event
        INSERT INTO security_audit_log (event_type, event_data, ip_address, user_agent, fingerprint)
        VALUES (
          'rate_limit_exceeded',
          jsonb_build_object('email', NEW.email, 'attempts', rate_limit_record.attempt_count + 1),
          NEW.ip_address,
          NEW.user_agent,
          NEW.fingerprint
        );

        RAISE EXCEPTION 'Rate limit exceeded. Please wait 15 minutes.';
      ELSE
        -- Increment attempt count
        UPDATE submission_rate_limit
        SET attempt_count = rate_limit_record.attempt_count + 1,
            last_attempt = NOW()
        WHERE identifier = NEW.email AND identifier_type = 'email';
      END IF;
    ELSE
      -- Reset counter if outside time window
      UPDATE submission_rate_limit
      SET attempt_count = 1,
          first_attempt = NOW(),
          last_attempt = NOW(),
          blocked_until = NULL
      WHERE identifier = NEW.email AND identifier_type = 'email';
    END IF;
  ELSE
    -- Create new rate limit record
    INSERT INTO submission_rate_limit (identifier, identifier_type)
    VALUES (NEW.email, 'email');
  END IF;

  -- Check for duplicate submission within 5 minutes
  SELECT COUNT(*) INTO submission_count
  FROM contacts
  WHERE email = NEW.email
    AND created_at > NOW() - INTERVAL '5 minutes';

  IF submission_count > 0 THEN
    RAISE EXCEPTION 'Please wait before submitting again';
  END IF;

  -- Log successful submission
  INSERT INTO security_audit_log (event_type, event_data, ip_address, user_agent, fingerprint)
  VALUES (
    'successful_submission',
    jsonb_build_object('email', NEW.email, 'use_case', NEW.use_case),
    NEW.ip_address,
    NEW.user_agent,
    NEW.fingerprint
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create comprehensive security trigger
CREATE TRIGGER check_submission_security_trigger
  BEFORE INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION check_submission_security();

-- Create view for analytics
CREATE VIEW contact_analytics AS
SELECT
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_submissions,
  COUNT(DISTINCT use_case) as unique_use_cases,
  COUNT(CASE WHEN company IS NOT NULL THEN 1 END) as with_company,
  ARRAY_AGG(DISTINCT use_case) as use_cases
FROM contacts
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Grant permissions on the analytics view
GRANT SELECT ON contact_analytics TO authenticated;