// Import sequelize library
const Sequelize = require('sequelize');

// Import database configuration
const config = require('../config/config');

// Create new sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Export sequelize instance
module.exports = sequelize;  