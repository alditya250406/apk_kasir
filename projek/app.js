const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// ROUTES
const authRoutes = require('./app/api/login/router');
const productRoutes = require('./app/api/produk/productRouter');
const kategori = require("./app/api/kategori/router")

// Gunakan rute
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use("/api",kategori)

app.listen(4000, () => {
  console.log('Server berjalan di port');
});
