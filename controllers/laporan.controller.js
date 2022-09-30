const express = require("express");
const router = express.Router();
const helper = require("../helper");
const laporanModel = require("../models/laporan.model");

router.get("/download/:nomorterima", async (req, res) => {
  let nomorTerima = req.params.nomorterima;
  const faktur = await TransaksiModel.get(nomorTerima);
  helper.generatePDF(res, faktur);
});

router.get("/faktur", async (req, res) => {
  const faktur = await laporanModel.laporanTransaksi(req.query);
  // helper.generatePDF(res, faktur);
  helper.laporanTransaksiCucian(res, faktur);
});

router.get("/pelanggan", async (req, res) => {
  const faktur = await laporanModel.laporanPelanggan(req.query);
  helper.laporanTransaksiPelanggan(res, faktur)
});

module.exports = router;
