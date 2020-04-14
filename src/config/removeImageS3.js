const aws = require('aws-sdk');

const s3 = new aws.S3(
  {
    accessKeyId: 'AKIAVHKUOQJ4CZFWM32J',
    secretAccessKey: '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',
    region: 'sa-east-1',
  },
);

module.exports = function removeImageS3(key) {
  s3.deleteObject({
    Bucket: 'buddy-pet',
    Key: key,
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
