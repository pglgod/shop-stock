
const multer = require("multer");
const multerS3 = require('multer-s3');
const s3Client = require('../aws/s3Client');


const s3Upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: "autosparemediauploades",
        metadata: function( req, file, cb ){
            cb(null, { fieldName: file.fieldname })
        },
        key: function(req, file, cb){
            cb(null, "upload/image/" + file.originalname )
        }
    })
});

module.exports = s3Upload;