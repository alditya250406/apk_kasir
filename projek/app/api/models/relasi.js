const Kategori = require('../kategori/kategori');
const Product = require('../produk/product');

// Definisi relasi
Kategori.hasMany(Product, { foreignKey: 'kategoriId' });
Product.belongsTo(Kategori, { foreignKey: 'kategoriId' });

module.exports = {
  Product,
  Kategori
};
