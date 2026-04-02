-- Supabase Schema for KrushiBot
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)

-- Create operators table
CREATE TABLE IF NOT EXISTS operators (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  failed_attempts INT DEFAULT 0,
  locked_until TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create OTP tokens table
CREATE TABLE IF NOT EXISTS otp_tokens (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (operator_id) REFERENCES operators(operator_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_operators_operator_id ON operators(operator_id);
CREATE INDEX IF NOT EXISTS idx_operators_email ON operators(email);
CREATE INDEX IF NOT EXISTS idx_otp_tokens_operator_id ON otp_tokens(operator_id);
CREATE INDEX IF NOT EXISTS idx_otp_tokens_expires_at ON otp_tokens(expires_at);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your security requirements)
-- Allow service role to do everything
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'operators' 
    AND policyname = 'Service role can do everything on operators'
  ) THEN
    CREATE POLICY "Service role can do everything on operators" ON operators
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'otp_tokens' 
    AND policyname = 'Service role can do everything on otp_tokens'
  ) THEN
    CREATE POLICY "Service role can do everything on otp_tokens" ON otp_tokens
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Sample operator for testing (Password: 'securePassword123')
-- You can add this after testing that the table is created
-- INSERT INTO operators (operator_id, email, password_hash, email_verified) 
-- VALUES ('OP-1001', 'admin@example.com', '$2a$10$wIK7mZ.pG3u.v.O5C.w.uO2.w.uO2.w.uO2.w.uO2.w.uO2.w.uO2', TRUE)
-- ON CONFLICT (operator_id) DO NOTHING;
