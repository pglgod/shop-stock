

const mongoose = require("mongoose");
const{ Schema } = require('mongoose');
const formattedDateTime = require("../../middleware/formattedDateTime");

const BuyerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true
    },
    altPhone: {
        type: String,
    },
    gender: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    formatedDate:{
        type: String,
        default: formattedDateTime
    },
    date: {
        type: Date,
        default: Date.now().toString()
    }
});

const Buyer = mongoose.model("Buyer", BuyerSchema);
module.exports = Buyer;