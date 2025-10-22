-- Vietnamese Women's Day Gift Card Database
-- Run this script to create the database and table

CREATE DATABASE IF NOT EXISTS womens_day_gifts;
USE womens_day_gifts;

CREATE TABLE IF NOT EXISTS gifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    sender VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    image_path VARCHAR(255),
    template VARCHAR(50) DEFAULT 'pink_hearts',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data for testing (optional)
INSERT INTO gifts (uuid, receiver, sender, message, template) VALUES
('sample-uuid-1', 'Mẹ yêu', 'Con trai', 'Mẹ là người phụ nữ tuyệt vời nhất trên đời. Con yêu mẹ rất nhiều!', 'pink_hearts'),
('sample-uuid-2', 'Em gái', 'Anh trai', 'Chúc em gái ngày 8/3 vui vẻ và hạnh phúc!', 'floral_garden');

