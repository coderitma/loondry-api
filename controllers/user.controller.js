const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.UserSignin = async (req, res, next) => {
  if (req.method == "POST") {
    var token = jwt.sign(req.body, "78c878x7h8iy8h8ti96siyd8sh", {
      algorithm: "HS256",
    });
    res.json({ token });
  }
};

exports.UserSignup = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      res.status(201).json(await UserModel.save(req.body));
    } catch (err) {
      res.status(400).json({ message: "Something when wrong" });
    }
  } else {
    res.status(405).json({ message: "405 Method Not Allowed" });
  }
};
