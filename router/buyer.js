
let success;
const jwt_secret = "pglgod";
const signupSessions  = {}; 


const  express = require("express");
const router = express.Router();
const Buyer = require('../schema/buyers/Buyer');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");




router.post("/buyer/signup",   // signup 
        [   // Fields Validations
        body('name', 'Enter a valid name').isLength({min:3}),
        body('email', 'Enter a valid email').isEmail(),
        body('phone', 'Enter a valid phone number').isLength({min:10, max: 10}),
        body('password', 'Password must be atleast 6 charecters').isLength({min:6})
    ], async (req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ errors: errors.array() });
        }

        try {


            const salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);


            const genrateOTP = Array.from({length:5}, ()=>Math.floor(Math.random() * 10)).join("");

            

            const signupToken = crypto.randomUUID(); 

            const data = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: secPass,
                otp: genrateOTP,
                date: Date.now()
            }

            signupSessions[signupToken] = {
                data
            };

            success = true;
            console.log(data, signupToken)
            return res.status(200).json({success: success, signupToken: signupToken, otp: genrateOTP })

            
        } catch (error) {
            success =false;
            return res.status(500).json({success: success, error: error});
        }

    }
)




router.post('/buyer/signup/verifyotp', async (req, res)=>{   //   OTP validation

        try {
            const { signupToken, otp } = req.body;

            const session = signupSessions[signupToken];

            if( !session ){
                success = false
                return res.status(400).json({success: success, message: 'Invalid or expired session' });
            }
            if(session.data.otp !== otp){
                success = false
                return res.status(400).json({success: success, message: "invalid OTP" });
            }
            else{
                const {name, email, phone, password} = session.data;

                let buyer = await Buyer.findOne({email: email})
                if (buyer) {
                    success = false;
                    return res.status(400).json({success: success, message: "Sorry this email is alrady exist!"});
                }

                buyer = await Buyer.findOne({phone: phone})
                if (buyer) {
                    success = false;
                    return res.status(400).json({success: success, message: "Sorry this phone number is alrady exist!"})
                }

                buyer = await Buyer.create({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                });
                const data = {
                    user  :{
                        id : buyer.id
                    }
                }

                const authToken = jwt.sign(data, jwt_secret);
                success = true;
                return res.status(200).json({success: success, authToken: authToken, message: "OTP Veified " })
                
                delete signupSessions[signupToken];
            }    
            // return res.status(200).json({success: success, session})
            

        } catch (error) {
            success =false;
            return res.status(500).json({success: success, error: "Bad Request", });
        }
    }
)


router.post('/buyer/signin', [
    body('email', "enter a valid email!").isEmail(),
    body('password', "please enter your password").exists()
], 
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            success = false;
            return res.status(404).json({success : success, message : errors})
        }

        const { email, password} = req.body;
        try {
            
            let buyer = await Buyer.findOne({email});
            if (!buyer) {
                success = false;
                return res.status(404).json({success : success, message : "Please login with correct credential!"})
            }
            const comPass = await bcrypt.compare(password, buyer.password);
            if (!comPass) {
                success = false;
                return res.status(404).json({success : success, message : "wrong password!"})
            }

            const data = {
                user : {
                    id: buyer.id
                }
            }

            const authToken = jwt.sign(data, jwt_secret)

            success = true;
            return res.status(200).json({success : success, authToken : authToken })

        } catch (error) {
            success =false;
            return res.status(500).json({success: success, error: "Bad Request", });
        }
        



    } 
)

router.post('/buyer/get/profile', fetchUser, async (req, res)=>{
    try {
        const buyerId = req.user.id;
        const data = await Buyer.findOne({"_id" : buyerId}).select("-password");
        if (!data) {
            success = false;
            return res.status(404).json({success: success, message : "user not found.."})
        } else {
            success = true;
            return res.status(200).json({success: success, user : data})
        }
    } catch (error) {
        success =false;
        return res.status(500).json({success: success, error: error, });
    }
});

router.put( '/buyer/edit/profile', fetchUser, async (req, res)=>{
    try {
        const buyerId = req.user.id;

        const { name, email, phone, gender, dob, altPhone } = req.body;
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (phone) updatedFields.phone = phone;
        if (gender) updatedFields.gender = gender;
        if (dob) updatedFields.dob = dob;
        if (altPhone) updatedFields.altPhone = altPhone;

        let user = await Buyer.findByIdAndUpdate(
            buyerId,
            { $set: updatedFields },
            { new: true }
        ).select("-password");

        if (!user) {
            success = false;
            return res.status(500).json({success: success, message : "some error ocurd", });
        } else {
            success = true;
            return res.status(200).json({success : success, message: "profile updated.."})
        }

    } catch (error) {
        success =false;
        return res.status(500).json({success: success, error: error, });
    }
} )










module.exports = router;