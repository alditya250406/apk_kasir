// models/kategori.js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/config");

const Kategori = sequelize.define("kategori", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
    tableName: 'kategori'
});
Kategori.sync()
module.exports = Kategori;
