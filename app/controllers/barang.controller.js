const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const router = express.Router();
const BarangModel = require("../models/barang.model");

const handleID = (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "Resource tidak tersedia!" });
  } else {
    return id;
  }
};

router.get("/", [isAuthenticated], async (req, res) => {
  let result = await BarangModel.all(req.query);
  result.forEach((element, index) => {
    result[index].detail = "/barang/" + element._id;
  });

  res.json(result);
});

router.post("/", [isAuthenticated], async (req, res) => {
  let payload = req.body;
  payload.user = {
    username: req.user.username,
    email: req.user.email,
  };
  res.json(await BarangModel.save(payload));
});

router.get("/:id", async (req, res) => {
  let id = handleID(req, res);
  res.json(await BarangModel.get(id));
});

router.put("/:id", async (req, res) => {
  let id = handleID(req, res);
  res.json(await BarangModel.edit(id, req.body));
});

router.delete("/:id", async (req, res) => {
  let id = handleID(req, res);
  res.json(await BarangModel.delete(id));
});

module.exports = router;
