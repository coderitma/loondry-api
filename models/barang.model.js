var schema = require("./schema");

exports.all = (query) => {
  // TODO: tambahin fitur buat date (gte, lte)
  // TODO: reporting
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

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    schema.BarangSchema.findById(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.edit = (id, data) => {
  return new Promise((resolve, reject) => {
    schema.BarangSchema.findByIdAndUpdate(id, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    schema.BarangSchema.findByIdAndRemove(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
