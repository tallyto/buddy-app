const aws = require('aws-sdk');

const s3 = new aws.S3(
  {
    accessKeyId: 'AKIAVCHI6YVLOWQ6PKP4',
    secretAccessKey: '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',
    region: 'us-east-2',
  },
);

module.exports = function removeImageS3(key) {
  s3.deleteObject({
    Bucket: 'buddypet',
    Key: key,
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
