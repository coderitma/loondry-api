const express = require("express");
const router = express.Router();
const laporanModel = require("../models/laporan.model");

router.get("/faktur", (req, res) => {
  laporanModel
    .laporanTransaksi()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
