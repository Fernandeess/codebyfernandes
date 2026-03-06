-- Initialize users table with BCrypt hashed passwords
-- Password "admin123" is hashed as: $2a$10$dXJ3SW6G7P50eS3q.v41be
-- Password "demo123" is hashed as: $2a$10$pjqQ5d.WLlzCgL7WvCddCO

INSERT INTO users (username, email, password_hash, created_at, active) 
VALUES ('admin', 'admin@codebyfernandes.com', '$2a$10$dXJ3SW6G7P50eS3q.v41beJ0hVZX1xBSL8mh/pUGX7zLeB9KWXyGm', CURRENT_TIMESTAMP, true);

INSERT INTO users (username, email, password_hash, created_at, active) 
VALUES ('demo', 'demo@codebyfernandes.com', '$2a$10$pjqQ5d.WLlzCgL7WvCddCOyWpn4UGqjQjKmEw7Bsj7nJ1YJ0gWvI6', CURRENT_TIMESTAMP, true);
