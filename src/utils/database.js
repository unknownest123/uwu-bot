const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database tables
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(255) PRIMARY KEY,
        balance BIGINT DEFAULT 1000,
        last_daily BIGINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

// Get user balance
async function getUserBalance(userId) {
  try {
    const result = await pool.query(
      'SELECT balance FROM users WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      // Create new user with default balance
      await pool.query(
        'INSERT INTO users (user_id, balance) VALUES ($1, $2)',
        [userId, 1000]
      );
      return 1000;
    }

    return result.rows[0].balance;
  } catch (error) {
    console.error('Error getting user balance:', error);
    throw error;
  }
}

// Update user balance
async function updateUserBalance(userId, amount) {
  try {
    const result = await pool.query(
      'UPDATE users SET balance = balance + $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING balance',
      [amount, userId]
    );

    if (result.rows.length === 0) {
      // User doesn't exist, create them
      await pool.query(
        'INSERT INTO users (user_id, balance) VALUES ($1, $2)',
        [userId, Math.max(0, 1000 + amount)]
      );
      return Math.max(0, 1000 + amount);
    }

    return result.rows[0].balance;
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
}

// Set user balance
async function setUserBalance(userId, balance) {
  try {
    const result = await pool.query(
      'UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING balance',
      [balance, userId]
    );

    if (result.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (user_id, balance) VALUES ($1, $2)',
        [userId, balance]
      );
      return balance;
    }

    return result.rows[0].balance;
  } catch (error) {
    console.error('Error setting user balance:', error);
    throw error;
  }
}

// Get last daily claim time
async function getLastDaily(userId) {
  try {
    const result = await pool.query(
      'SELECT last_daily FROM users WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return 0;
    }

    return result.rows[0].last_daily;
  } catch (error) {
    console.error('Error getting last daily:', error);
    throw error;
  }
}

// Update last daily claim time
async function updateLastDaily(userId) {
  try {
    const now = Date.now();
    await pool.query(
      'UPDATE users SET last_daily = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2',
      [now, userId]
    );

    // If user doesn't exist, create them
    const checkResult = await pool.query(
      'SELECT user_id FROM users WHERE user_id = $1',
      [userId]
    );

    if (checkResult.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (user_id, balance, last_daily) VALUES ($1, $2, $3)',
        [userId, 1000, now]
      );
    }
  } catch (error) {
    console.error('Error updating last daily:', error);
    throw error;
  }
}

// Close database connection
async function closeDatabase() {
  try {
    await pool.end();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('Error closing database:', error);
  }
}

module.exports = {
  initializeDatabase,
  getUserBalance,
  updateUserBalance,
  setUserBalance,
  getLastDaily,
  updateLastDaily,
  closeDatabase,
};

