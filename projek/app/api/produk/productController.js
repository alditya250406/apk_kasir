const db = require("../utils/config");
const path = require("path");
const fs = require("fs");
const { Product, Kategori } = require("../models/relasi");




const MSG = {
  CREATED: "Produk berhasil dibuat",
  CREATE_FAIL: "Gagal membuat produk",
  FETCH_ALL: "Berhasil mengambil semua produk",
  FETCH_FAIL: "Gagal mengambil produk",
  FETCH_ONE: "Berhasil mengambil produk",
  NOT_FOUND: "Produk tidak ditemukan",
  UPDATE_SUCCESS: "Produk berhasil diperbarui",
  UPDATE_FAIL: "Gagal memperbarui produk",
  DELETE_SUCCESS: "Produk berhasil dihapus",
  DELETE_FAIL: "Gagal menghapus produk",
  INVALID_INPUT: "Nama, harga, stok, dan kategori harus diisi"
};

// Membuat produk
const createProduct = async (req, res) => {
  try {
    const { name, price, stock, kategoriId } = req.body;

    if (!name || !price || !stock || !kategoriId) {
      return res.status(400).json({ status: 400, message: MSG.INVALID_INPUT });
    }

    // Cek kategoriId valid
    const kategori = await Kategori.findByPk(kategoriId);
    if (!kategori) {
      return res.status(400).json({ status: 400, message: "Kategori tidak ditemukan" });
    }

    const photo = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      price,
      stock,
      kategoriId,
      photo,
    });

    return res.status(201).json({
      status: 201,
      message: MSG.CREATED,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: MSG.CREATE_FAIL,
      error: err.message,
    });
  }
};


// Mengambil semua produk
const getAllProducts = async (req, res) => {
  try {
    const { kategoriId } = req.query;

    const where = kategoriId ? { kategoriId } : {};

    const products = await Product.findAll({
      where,
      include: {
        model: Kategori,
        attributes: ['id', 'nama']
      }
    });

    return res.json({
      status: 200,
      message: MSG.FETCH_ALL,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: MSG.FETCH_FAIL,
      error: err.message,
    });
  }
};

// Mengambil produk berdasarkan ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Kategori,
        attributes: ['id', 'nama']
      }
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: MSG.NOT_FOUND,
      });
    }

    return res.json({
      status: 200,
      message: MSG.FETCH_ONE,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: MSG.FETCH_FAIL,
      error: err.message,
    });
  }
};

// Memperbarui produk
const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, kategoriId } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: MSG.NOT_FOUND,
      });
    }

    if (req.file) {
      if (product.photo) {
        const oldPath = path.join(__dirname, "../../uploads", product.photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.photo = req.file.filename;
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.kategoriId = kategoriId || product.kategoriId;

    await product.save();

    return res.json({
      status: 200,
      message: MSG.UPDATE_SUCCESS,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: MSG.UPDATE_FAIL,
      error: err.message,
    });
  }
};

// Menghapus produk
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: MSG.NOT_FOUND,
      });
    }

    if (product.photo) {
      const photoPath = path.join(__dirname, "../../uploads", product.photo);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    await product.destroy();

    return res.json({
      status: 200,
      message: MSG.DELETE_SUCCESS,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: MSG.DELETE_FAIL,
      error: err.message,
    });
  }
};

// Mendapatkan produk berdasarkan kategori dari params
const getProductsByCategory = async (req, res) => {
  try {
    const kategoriId = req.params.kategoriId;

    const products = await Product.findAll({
      where: { kategoriId },
      include: {
        model: Kategori,
        attributes: ['id', 'nama']
      }
    });

    return res.json({
      status: 200,
      message: `Berhasil mengambil produk dari kategori ID ${kategoriId}`,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: MSG.FETCH_FAIL,
      error: err.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
