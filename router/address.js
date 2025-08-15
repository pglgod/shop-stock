
let success;

const express = require('express');
const Address = require('../schema/buyers/Address');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const {body, validationResult} = require('express-validator');



router.post("/buyer/add/address", fetchUser, 
// router.post("/buyer/add/address", 
    [
    body('name', "enter a valid name").isLength({min: 3}),
    body('phone', "enter a valid name").isLength({min: 3}),
    // body('type', "enter a valid name").isLength({min: 3}),
    body('address', "enter a valid name").isLength({min: 3}),
    body('street', "enter a valid name").isLength({min: 3}),
    body('city', "enter a valid name").isLength({min: 3}),
    body('state', "enter a valid name").isLength({min: 3}),
    // body('country', "enter a valid name").isLength({min: 3}),
    body('zip', "enter a valid name").isLength({min: 3}),
],  async (req, res)=>{

    const errors = validationResult(req);
            if (!errors.isEmpty()) {
                success = false;
                return res.status(400).json({ errors: errors.array() });
            }

    try {

        const buyerId = req.user.id;

        const data = await Address.create(
            {
                buyerId : buyerId,
                name : req.body.name,
                type : req.body.type,
                // type : "current",
                phone : req.body.phone,
                address : req.body.address,
                landmark : req.body.landmark,
                street : req.body.street,
                city : req.body.city,
                state : req.body.state,
                // country : req.body.country,
                zip : req.body.zip,
            }
        );
        
        success = true;
        return res.status(200).json({success : success, message : "New address added succesfuly..."})


    } catch (error) {
        success =false;
        console.log(error)
        return res.status(500).json({success: success, error: error});        
    }

});

router.post("/buyer/get/address", fetchUser, async (req, res)=>{
    try {

        const buyerId = req.user.id;

        const data = await Address.find({"buyerId" : buyerId})
        if (!data) {
            success = true;
            return res.status(404).json({success : success, message : "No address found..."})
        }
        success = true;
        return  res.status(200).json({success: success, addresses : data})
        
    } catch (error) {
        success =false;
        console.log(error)
        return res.status(500).json({success: success, error: error});   
        
    }
})

router.delete("/buyer/delete/address", fetchUser, async (req, res)=>{
    try {
        
        const buyerId = req.user.id;
        const addressId = req.body.id;

        await Address.findOneAndDelete({"_id" : addressId});

        success = true;
        return res.status(500).json({success : success, message : " address removed "})

    } catch (error) {
        success =false;
        console.log(error)
        return res.status(500).json({success: success, error: error});
    }
})




module.exports = router;