var schema = require("./schema");

exports.terimaCucian = (data) => {
  return new Promise((resolve, reject) => {
    new schema.FakturSchema(data).save((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
