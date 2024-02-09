const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "SEU_ACCESS_KEY_ID",
  secretAccessKey: "SEU_SECRET_ACCESS_KEY",
  region: "SUA_REGIÃO",
});

module.exports = s3;
