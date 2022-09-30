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
  // laporanModel
  //   .laporanTransaksi(req.query)
  //   .then((result) => {
  //     helper.laporanTransaksiCucian(res, result);
  //     // res.json(result)
  //   })
  //   .catch((err) => res.status(400).json({message: "ups errr"}));\

  const faktur = await laporanModel.laporanTransaksi(req.query);
  // helper.generatePDF(res, faktur);
  helper.laporanTransaksiCucian(res, faktur);
});

router.get("/pelanggan", (req, res) => {
  laporanModel
    .laporanPelanggan(req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});
module.exports = router;
