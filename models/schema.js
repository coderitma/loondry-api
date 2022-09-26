var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loondry");

exports.UserSchema = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  password: String,
  email: String,
  salt: String,
  role: {
    type: String,
    enum: ["operator", "admin"],
    require: true,
    default: "operator",
  },
});

exports.BarangSchema = mongoose.model("Barang", {
  nama: String,
  user: {
    username: String,
    email: String,
  },
});

exports.FakturSchema = mongoose.model("Faktur", {
  tanggalTerima: Date,
  nomorHP: {
    type: String,
    length: 12,
    required: true,
  },
  namaCustomer: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
  },
  berat: {
    type: Number,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  uangMuka: {
    type: Number,
    required: true,
  },
  sisa: {
    type: Number,
  },
  kembali: {
    type: Number,
  },
  statusCucian: {
    type: String,
    enum: ["belum", "sudah"],
    default: "belum",
  },
  statusPengambilan: {
    type: String,
    enum: ["belum", "sudah"],
    default: "belum",
  },
  daftarBarang: [{ nama: String, jumlah: Number }],
  pic: {
    username: String,
    email: String,
  },
  softDelete: {
    type: Boolean,
    enum: [false, true],
    default: false,
  },
});
