const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'womens_day_gifts',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create database and table if they don't exist
const initializeDatabase = async () => {
    try {
        // Create database if it doesn't exist
        const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'womens_day_gifts'}`;
        await pool.promise().execute(createDbQuery);

        // Create gifts table
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS gifts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) UNIQUE NOT NULL,
        receiver VARCHAR(255) NOT NULL,
        sender VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        image_path VARCHAR(255),
        template VARCHAR(50) DEFAULT 'pink_hearts',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await pool.promise().execute(createTableQuery);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = { pool, initializeDatabase };

