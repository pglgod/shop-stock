
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI ;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to MongoDB")
    }).catch((err)=>{
        console.log("failed to connect")
    })
};

module.exports = connectToMongo;