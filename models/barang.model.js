var schema = require("./schema");

exports.all = (query) => {
  let { limit, ...search } = query;

  return new Promise((resolve, reject) => {
    schema.BarangSchema.find(search, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }).limit(limit ? limit : 10);
  });
};

exports.save = (data) => {
  return new Promise((resolve, reject) => {
    new schema.BarangSchema(data).save((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
