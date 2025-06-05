const { Kategori } = require("../models/relasi");

const MSG = {
  CREATED: "Kategori berhasil dibuat",
  CREATE_FAIL: "Gagal membuat kategori",
  FETCH_ALL: "Berhasil mengambil semua kategori",
  FETCH_FAIL: "Gagal mengambil data kategori",
  FETCH_ONE: "Berhasil mengambil kategori",
  NOT_FOUND: "Kategori tidak ditemukan",
  UPDATE_SUCCESS: "Kategori berhasil diperbarui",
  UPDATE_FAIL: "Gagal memperbarui kategori",
  DELETE_SUCCESS: "Kategori berhasil dihapus",
  DELETE_FAIL: "Gagal menghapus kategori",
  INVALID_INPUT: "Nama kategori harus diisi"
};

// Get all kategori
const getAllKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findAll();
    return res.status(200).json({
      status: 200,
      message: MSG.FETCH_ALL,
      data: kategori,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: MSG.FETCH_FAIL,
      error: error.message,
    });
  }
};

// Get kategori by ID
const getKategoriById = async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (!kategori) {
      return res.status(404).json({
        status: 404,
        message: MSG.NOT_FOUND,
      });
    }
    return res.status(200).json({
      status: 200,
      message: MSG.FETCH_ONE,
      data: kategori,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: MSG.FETCH_FAIL,
      error: error.message,
    });
  }
};

// Create kategori
const createKategori = async (req, res) => {
  try {
    const { nama } = req.body;
    if (!nama) {
      return res.status(400).json({
        status: 400,
        message: MSG.INVALID_INPUT,
      });
    }

    const newKategori = await Kategori.create({ nama });
    return res.status(201).json({
      status: 201,
      message: MSG.CREATED,
      data: newKategori,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: MSG.CREATE_FAIL,
      error: error.message,
    });
  }
};

// Update kategori
const updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;
    const kategori = await Kategori.findByPk(id);

    if (!kategori) {
      return res.status(404).json({
        status: 404,
        message: MSG.NOT_FOUND,
      });
    }

    kategori.nama = nama || kategori.nama;
    await kategori.save();

    return res.status(200).json({
      status: 200,
      message: MSG.UPDATE_SUCCESS,
      data: kategori,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: MSG.UPDATE_FAIL,
      error: error.message,
    });
  }
};

// Delete kategori
const deleteKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (!kategori) {
      return res.status(404).json({
        status: 404,
        message: MSG.NOT_FOUND,
      });
    }

    await kategori.destroy();

    return res.status(200).json({
      status: 200,
      message: MSG.DELETE_SUCCESS,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: MSG.DELETE_FAIL,
      error: error.message,
    });
  }
};

module.exports = {
  getAllKategori,
  getKategoriById,
  createKategori,
  updateKategori,
  deleteKategori,
};
