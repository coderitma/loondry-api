var schema = require("./schema");

exports.all = (query) => {
  let { limit, ...search } = query;
  search.softDelete = false;
  return new Promise((resolve, reject) => {
    schema.FakturSchema.find(search, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
      .lean()
      .limit(limit ? limit : 10);
  });
};

exports.get = (nomorterima) => {
  return new Promise((resolve, reject) => {
    schema.FakturSchema.findById(
      nomorterima,
      { "daftarBarang._id": 0, __v: 0 },
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

exports.terimaCucian = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await new schema.FakturSchema(data).save());
    } catch (error) {
      reject(error);
    }
  });
};

exports.update = (data, nomorTerima) => {
  return new Promise((resolve, reject) => {
    schema.FakturSchema.findByIdAndUpdate(nomorTerima, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
