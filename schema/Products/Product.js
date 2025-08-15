
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const formattedDateTime = require('../../middleware/formattedDateTime');

const ProducrtSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    brand : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    category: {
        type: String,
        required: true
    },
    idealFor: {
        type: String
    },
    color :{
        type: Boolean,
        default: false
    },
    size : {
        type: Boolean,
        default: false
    },
    formatedDate:{
        type: String,
        default: formattedDateTime
    },
    date: {
        type: Date,
        default:  Date.now().toString()
    },
});

const Product = mongoose.model("Product", ProducrtSchema);
module.exports = Product;





