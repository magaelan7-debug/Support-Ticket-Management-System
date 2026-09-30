CREATE DATABASE IF NOT EXISTS support_desk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE support_desk;

CREATE TABLE IF NOT EXISTS customers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agents (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  department VARCHAR(100) NOT NULL,
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_agents_status (status)
);

CREATE TABLE IF NOT EXISTS tickets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED NOT NULL,
  agent_id INT UNSIGNED NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
  category ENUM('TECHNICAL','BILLING','ACCOUNT','GENERAL') NOT NULL,
  status ENUM('OPEN','IN_PROGRESS','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ticket_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  CONSTRAINT fk_ticket_agent FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL,
  INDEX idx_ticket_status (status),
  INDEX idx_ticket_priority (priority),
  INDEX idx_ticket_category (category),
  INDEX idx_ticket_agent (agent_id),
  INDEX idx_ticket_created (created_at)
);

INSERT INTO agents (name,email,department,status) VALUES
('Ananya Rao','ananya.rao@supportdesk.local','Technical Support','ACTIVE'),
('Rahul Menon','rahul.menon@supportdesk.local','Billing','ACTIVE'),
('Divya Kumar','divya.kumar@supportdesk.local','Account Support','ACTIVE'),
('Arjun Nair','arjun.nair@supportdesk.local','Technical Support','ACTIVE'),
('Meera Iyer','meera.iyer@supportdesk.local','Customer Success','ACTIVE')
ON DUPLICATE KEY UPDATE name=VALUES(name), department=VALUES(department), status=VALUES(status);

INSERT INTO customers (name,email) VALUES
('Priya Sharma','priya.sharma@example.com'),
('Karthik Raj','karthik.raj@example.com'),
('Nisha Patel','nisha.patel@example.com'),
('Vikram Singh','vikram.singh@example.com'),
('Asha Thomas','asha.thomas@example.com')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO tickets (customer_id,agent_id,subject,description,priority,category,status)
SELECT c.id,a.id,'Unable to reset account password','Customer cannot complete the password reset flow and needs assistance.', 'HIGH','ACCOUNT','OPEN'
FROM customers c JOIN agents a ON a.email='divya.kumar@supportdesk.local' WHERE c.email='priya.sharma@example.com'
AND NOT EXISTS (SELECT 1 FROM tickets WHERE subject='Unable to reset account password');
INSERT INTO tickets (customer_id,agent_id,subject,description,priority,category,status)
SELECT c.id,a.id,'Invoice amount looks incorrect','Customer reports that the latest invoice total does not match the expected subscription amount.', 'MEDIUM','BILLING','IN_PROGRESS'
FROM customers c JOIN agents a ON a.email='rahul.menon@supportdesk.local' WHERE c.email='karthik.raj@example.com'
AND NOT EXISTS (SELECT 1 FROM tickets WHERE subject='Invoice amount looks incorrect');
INSERT INTO tickets (customer_id,agent_id,subject,description,priority,category,status)
SELECT c.id,a.id,'Dashboard page is loading slowly','The dashboard takes more than a minute to load after the latest update.', 'CRITICAL','TECHNICAL','OPEN'
FROM customers c JOIN agents a ON a.email='ananya.rao@supportdesk.local' WHERE c.email='nisha.patel@example.com'
AND NOT EXISTS (SELECT 1 FROM tickets WHERE subject='Dashboard page is loading slowly');
INSERT INTO tickets (customer_id,subject,description,priority,category,status)
SELECT c.id,'Question about account settings','Customer needs help understanding the available account settings.', 'LOW','GENERAL','RESOLVED'
FROM customers c WHERE c.email='asha.thomas@example.com'
AND NOT EXISTS (SELECT 1 FROM tickets WHERE subject='Question about account settings');
