const {
  isAuthenticated,
  operatorAdmin,
} = require("../middlewares/auth.middleware");

var userController = require("./user.controller");
var barangController = require("./barang.controller");
var transaksiController = require("./transaksi.controller");
var laporanController = require("./laporan.controller");

module.exports = (app) => {
  app.use("/faktur", transaksiController);
  app.use("/barang", barangController);
  app.use("/user", userController);
  app.use("/laporan", laporanController);
};
