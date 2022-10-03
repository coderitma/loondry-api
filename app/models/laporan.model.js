var schema = require("./schema");

exports.laporanTransaksi = ({
  tanggalAwal,
  tanggalAkhir,
  statusPengambilan,
}) => {
  return new Promise((resolve, reject) => {
    schema.FakturSchema.aggregate(
      [
        {
          $match: {
            statusPengambilan: statusPengambilan,
            sisa: { $eq: 0 },
            tanggalTerima: {
              $gte: new Date(tanggalAwal),
              $lte: new Date(tanggalAkhir),
            },
          },
        },
        {
          $group: {
            _id: {
              tanggal: { $dayOfMonth: "$tanggalTerima" },
              bulan: { $month: "$tanggalTerima" },
              tahun: { $year: "$tanggalTerima" },
              nomorHP: "$nomorHP",
            },
            totalHarga: { $sum: "$totalHarga" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          console.log("error", err)
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.laporanPelanggan = ({
  tanggalAwal,
  tanggalAkhir,
  statusPengambilan,
}) => {
  return new Promise((resolve, reject) => {
    schema.FakturSchema.aggregate(
      [
        {
          $match: {
            statusPengambilan: statusPengambilan,
            sisa: { $eq: 0 },
            tanggalTerima: {
              $gte: new Date(tanggalAwal),
              $lte: new Date(tanggalAkhir),
            },
          },
        },
        {
          $group: {
            _id: {
              bulan: { $month: "$tanggalTerima" },
              tanggal: { $dayOfMonth: "$tanggalTerima" },
              tahun: { $year: "$tanggalTerima" },
              nomorHP: "$nomorHP",
              cutomer: "$namaCustomer"
            },
            total: { $addToSet: "$_id" },
          },
        },
        {
          $unwind: "$total",
        },
        {
          $group: { _id: "$_id", total: { $sum: 1 } },
        },
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
