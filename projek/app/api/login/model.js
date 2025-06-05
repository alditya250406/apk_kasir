const { DataTypes } = require('sequelize');
const sequelize = require('../utils/config');

const User = sequelize.define('user', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  }
}, {
  freezeTableName: true,
  timestamps: true
});

User.sync({ force: true });
module.exports = User;
