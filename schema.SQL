-- Create Database
CREATE DATABASE IF NOT EXISTS secure_auth_db;
USE secure_auth_db;

-- Operators Table
CREATE TABLE IF NOT EXISTS operators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operator_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    failed_attempts INT DEFAULT 0,
    locked_until DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP Tokens Table
CREATE TABLE IF NOT EXISTS otp_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operator_id VARCHAR(50) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (operator_id) REFERENCES operators(operator_id) ON DELETE CASCADE
);

-- Sample Operator (Password: 'securePassword123')
INSERT INTO operators (operator_id, email, password_hash, email_verified) 
VALUES ('OP-1001', 'admin@example.com', '$2a$10$wIK7mZ.pG3u.v.O5C.w.uO2.w.uO2.w.uO2.w.uO2.w.uO2.w.uO2', TRUE)
ON DUPLICATE KEY UPDATE id=id;
