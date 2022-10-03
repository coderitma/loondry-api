const express = require("express");
const helper = require("../helper");
const axios = require("axios");
const router = express.Router();
const TransaksiModel = require("../models/transaksi.model");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const sendWhatsvuck = (phone, message) => {
  const payload = {
    phone,
    message,
  };
  axios({
    method: "post",
    url: "http://localhost:5000/send",
    data: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

router.get("/", [isAuthenticated], async (req, res) => {
  let result = await TransaksiModel.all(req.query);
  res.json(result);
});


router.post("/", [isAuthenticated], async (req, res) => {
  req.body.totalHarga = helper.getTotalHarga(req);
  req.body.sisa = helper.getSisa(req);
  req.body.kembali = helper.getKembali(req);
  req.body.pic = helper.getUser(req)

  try {
    let result = await TransaksiModel.terimaCucian(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.get("/:nomorterima", [isAuthenticated], async (req, res) => {
  try {
    let nomorTerima = req.params.nomorterima;
    res.json(await TransaksiModel.get(nomorTerima));
  } catch (error) {
    res.json(error);
  }
});


router.put("/:nomorterima", [isAuthenticated], async (req, res) => {
  let nomorTerima = req.params.nomorterima;
  try {
    let result = await TransaksiModel.update(req.body, nomorTerima);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:nomorterima/cetak", [isAuthenticated], async (req, res) => {
  let nomorTerima = req.params.nomorterima;
  const faktur = await TransaksiModel.get(nomorTerima);
  helper.generatePDF(res, faktur);
});

module.exports = router;
