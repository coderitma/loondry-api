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

exports.DetailBarang = async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "Resource tidak tersedia!" });
  }

  if (req.method === "GET") {
    res.json(await BarangModel.get(id));
  } else if (req.method === "PUT") {
    res.json(await BarangModel.edit(id, req.body));
  } else if (req.method === "DELETE") {
    res.json(await BarangModel.delete(id));
  }
};
