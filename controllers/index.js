const {
  isAuthenticated,
  operatorAdmin,
} = require("../middlewares/auth.middleware");

var userController = require("./user.controller");
var barangController = require("./barang.controller");
var transaksiController = require("./transaksi.controller");

module.exports = (app) => {
  app.use("/user/signup", userController.UserSignup);
  app.use("/user/signin", userController.UserSignin);
  app.use("/barang/:id", [isAuthenticated], barangController.DetailBarang);
  app.use("/barang", [isAuthenticated], barangController.ListBarang);
  app.use(
    "/faktur/:nomorterima",
    [isAuthenticated],
    transaksiController.StatusCucian
  );
  app.use("/faktur", [isAuthenticated], transaksiController.ListCucian);
};
