const TransaksiModel = require("../models/transaksi.model");

exports.TerimaCucian = async (req, res, next) => {
  if (req.method === "POST") {
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
    res.json(await TransaksiModel.terimaCucian(payload));
  }
};

exports.StatusCucian = async (req, res, next) => {
  if (req.method === "POST") {
  }
};

exports.AmbilCucian = async (req, res, next) => {
  if (req.method === "POST") {
  }
};
