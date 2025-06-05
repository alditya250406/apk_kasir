const { DataTypes } = require('sequelize');
const sequelize = require('../utils/config');

const Product = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kategoriId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: true
});

Product.sync();
module.exports = Product;
