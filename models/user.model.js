var schema = require("./schema");
var crypto = require("crypto");

exports.save = (data) => {
  // salt
  data.salt = crypto.randomBytes(16).toString("hex");
  // Hashing user's salt and password with 1000 iterations,
  data.password = crypto
    .pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return new Promise((resolve, reject) => {
    new schema.UserSchema(data).save((err, response) => {
      if (err) {
        reject(err);
      } else {
        let { password, salt, ...result } = data;
        resolve(result);
      }
    });
  });
};
