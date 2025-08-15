

const { S3Client } = require('@aws-sdk/client-s3');

const s3client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});

module.exports = s3client;