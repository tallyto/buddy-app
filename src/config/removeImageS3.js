const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3(
  {
    accessKeyId: process.env.S3_ACCES_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
  },
);

module.exports = function removeImageS3(key) {
  s3.deleteObject({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
