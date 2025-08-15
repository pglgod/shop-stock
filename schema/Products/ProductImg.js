

const { request } = require('express');
const mongoose =  require('mongoose');
const {Schema} = require('mongoose');

const ImageSchema = new Schema({
    productId : {
        type: String,
        required : true
    },
    imgUrl: {
        type: String,
        required: true
    },
    alt: String
});

const ProductImage = mongoose.model('ProductImage', ImageSchema);
module.exports = ProductImage;