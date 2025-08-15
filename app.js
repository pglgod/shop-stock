
require('dotenv').config();
const connectToMongo = require("./db/mongoDb");
const express = require('express');
const cors = require('cors');
const formattedDateTime = require("./middleware/formattedDateTime");



connectToMongo();



const port = process.env.PORT || 4000
const app = express();
app.use(cors());
app.use(express.json());



app.use('/api', require('./router/buyer'));
app.use('/api', require('./router/products'));
app.use('/api', require('./router/address'));

// app.use(express.static("public"))


app.use('/', (req, res)=>{
        const obj ={
            "app": "shopstock.com",
            "version": "1.0.0",
        }
        res.json({ message : "welcome to ShopStock", obj, formattedDateTime});
    }
)



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
