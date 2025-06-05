const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('./productController');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Tambah route baru untuk filter kategori via params
router.get('/kategori/:kategori', productController.getProductsByCategory);

router.get('/produk', productController.getAllProducts);
router.get('/produk/:id', productController.getProductById);
router.post('/produk', upload.single('photo'), productController.createProduct);
router.put('/produk/:id', upload.single('photo'), productController.updateProduct);
router.delete('/produk/:id', productController.deleteProduct);



module.exports = router;
