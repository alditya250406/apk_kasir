const express = require("express");
const router = express.Router();
const kategoriController = require("../kategori/controller");


router.get("/kategori", kategoriController.getAllKategori);
router.get("/kategori/:id", kategoriController.getKategoriById);
router.post("/kategori", kategoriController.createKategori);
router.put("/kategori/:id", kategoriController.updateKategori);
router.delete("/kategori/:id", kategoriController.deleteKategori);

module.exports = router;
