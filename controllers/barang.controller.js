const BarangModel = require("../models/barang.model");

exports.ListBarang = async (req, res, next) => {
  if (req.method === "GET") {
    res.json(await BarangModel.all(req.query));
  } else if (req.method === "POST") {
    let payload = req.body;
    payload.user = {
      username: req.user.username,
      email: req.user.email,
    };
    res.json(await BarangModel.save(payload));
  }
};
