const TransaksiModel = require("../models/transaksi.model");

exports.ListCucian = async (req, res, next) => {
  if (req.method === "GET") {
    let result = await TransaksiModel.all(req.query);
    result.forEach((element, index) => {
      result[index].detail = "/faktur/" + element._id;
    });
    res.json(result);
  } else if (req.method === "POST") {
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
  let nomorTerima = req.params.nomorterima;
  if (req.method === "GET") {
    res.json(await TransaksiModel.get(nomorTerima));
  } else if (req.method === "PUT") {
    if (
      req.body.statusCucian === "belum" &&
      req.body.statusPengambilan === "sudah"
    ) {
      res.status(400).json({ message: "Invalid update!" });
    } else {
      res.json(await TransaksiModel.statusCucian(req.body, nomorTerima));
    }
  }
};
