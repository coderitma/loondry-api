const express = require("express");
var FormData = require("form-data");
const helper = require("../helper");
const axios = require("axios");
const router = express.Router();
const TransaksiModel = require("../models/transaksi.model");
const { isAuthenticated } = require("../middlewares/auth.middleware");

// TODO: custom cors!
const sendWhatsapp = (phone, text) => {
  console.log(process.env.FONNTE_KEY);

  var bodyFormData = new FormData();
  bodyFormData.append("phone", "08123456789");
  bodyFormData.append("type", "text");
  bodyFormData.append("text", "hallo ini pesan test ok");
  bodyFormData.append("delay", "0");
  bodyFormData.append("delay_req", "1");
  bodyFormData.append("schedule", "0");

  axios({
    method: "post",
    url: "https://md.fonnte.com/api/send_message.php",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      accept: "*/*",
      Authorization: process.env.FONNTE_KEY,
    },
    redirect: "follow",
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

router.get("/", [isAuthenticated], async (req, res) => {
  let result = await TransaksiModel.all(req.query);
  result.forEach((element, index) => {
    result[index].detail = "/faktur/" + element._id;
  });
  res.json(result);
});

router.post("/", [isAuthenticated], async (req, res) => {
  let payload = req.body;
  let harga = 10000;
  payload.totalHarga = payload.berat * harga;
  payload.sisa =
    payload.uangMuka < payload.totalHarga
      ? payload.totalHarga - payload.uangMuka
      : 0;
  payload.kembali =
    payload.uangMuka > payload.totalHarga
      ? payload.uangMuka - payload.totalHarga
      : 0;
  payload.pic = {
    username: req.user.username,
    email: req.user.email,
  };

  TransaksiModel.terimaCucian(payload)
    .then((result) => {
      console.log(payload.nomorHP);
      sendWhatsapp(payload.nomorHP, "coba dulu");
      result.data.cetakFaktur = "/faktur/download/" + result.result._id;
      res.json(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err._message });
    });
});

router.get("/:nomorterima", [isAuthenticated], async (req, res) => {
  let nomorTerima = req.params.nomorterima;
  res.json(await TransaksiModel.get(nomorTerima));
});

router.put("/:nomorterima", [isAuthenticated], async (req, res) => {
  let nomorTerima = req.params.nomorterima;
  if (
    req.body.statusCucian === "belum" &&
    req.body.statusPengambilan === "sudah"
  ) {
    res.status(400).json({ message: "Invalid update!" });
  } else {
    res.json(await TransaksiModel.statusCucian(req.body, nomorTerima));
  }
});

router.get("/download/:nomorterima", async (req, res) => {
  let nomorTerima = req.params.nomorterima;
  const faktur = await TransaksiModel.get(nomorTerima);
  helper.generatePDF(res, faktur);
});

module.exports = router;
