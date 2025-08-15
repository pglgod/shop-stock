
const mongoose = require("mongoose");
const {Schema} = require('mongoose');


const AddressSchema = new Schema({
    buyerId : {
        type : String,
        required : true
    },
    name: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    },
    phone : {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    landmark : {
        type : String
    },
    street : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    zip: {
        type : String,
        required : true
    }

});

const Address = mongoose.model("Address" , AddressSchema);
module.exports = Address;
