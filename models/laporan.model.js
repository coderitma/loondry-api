var schema = require("./schema");

exports.laporanTransaksi = () => {
  return new Promise((resolve, reject) => {
    // db.collection.aggregate([
    //   {
    //     $group: {
    //       _id: { account: "$account" },
    //       vendors: { $addToSet: "$vendor" },
    //     },
    //   },
    //   {
    //     $unwind: "$vendors",
    //   },
    //   {
    //     $group: { _id: "$_id", vendorCount: { $sum: 1 } },
    //   },
    // ]);
    schema.FakturSchema.aggregate(
      [
        {
          $group: {
            _id: {
              // bulan: { $month: "$tanggalTerima" },
              tahun: { $year: "$tanggalTerima" },
              nomorHP: "$nomorHP",
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
