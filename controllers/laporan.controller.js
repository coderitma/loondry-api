const express = require("express");
const router = express.Router();
const laporanModel = require("../models/laporan.model");

router.get("/faktur", (req, res) => {
  laporanModel
    .laporanTransaksi(req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.get("/pelanggan", (req, res) => {
  laporanModel
    .laporanPelanggan(req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});
module.exports = router;
