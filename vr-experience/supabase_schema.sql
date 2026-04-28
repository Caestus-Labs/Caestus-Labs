-- Create contacts table for Caestus Labs early access requests
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT UNIQUE NOT NULL,
  use_case TEXT NOT NULL CHECK (use_case IN ('training', 'medical', 'industrial', 'gaming', 'research', 'other')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'demo_scheduled', 'converted', 'not_qualified')),
  notes TEXT,
  source TEXT DEFAULT 'website'
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