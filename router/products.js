
let success;

const express = require('express');
const router = express.Router();
const Product = require('../schema/Products/Product');
const ProductImage = require('../schema/Products/ProductImg');
const s3Upload = require('../middleware/S3ImageUpload');


router.post('/product/addnewproduct', s3Upload.array("image", 12),  async (req, res)=>{
    try {
        
        const imageUrls = await req.files.map(file => file.key);   // for multer s3 only

        const data = await Product.create(
            {
                name: req.body.name,
                brand: req.body.brand,
                price: req.body.price,
                thumbnail: imageUrls[0],
                description: req.body.description,
                discount: req.body.discount,
                category: req.body.category,
                idealFor: req.body.idelFor,
                color: req.body.color,
                size: req.body.size
                
            }
        );

        const images = await imageUrls.map(imageUrl => ({
            productId : data._id,
            imgUrl : imageUrl,
            alt : data.name
        }));

        await ProductImage.insertMany(images);

        success =true;
        return res.status(200).json({success: success, message: "product added...", images: images })
        
    } catch (error) {
         success =false;
        return res.status(500).json({success: success, message: "Bad Request", });
    }
});


router.get('/product/getall', async (req, res)=>{
    try {
        
        const data = await Product.find();

        if (!data) {
            success = false;
            return res.status(404).json({success: success, message: "No products found..."})
        }

        success = true; 
        return res.status(200).json({ success : success, products  : data })

    } catch (error) {
         success =false;
        return res.status(500).json({success: success, message: "Bad Request", });
    }
});

router.post('/product/get/details', async (req, res)=>{
    try {
        
        const productId = req.headers.id;
        const productDetails = await Product.findOne({_id: productId});
        const productImages = await ProductImage.find({productId : productId});

        if (!productDetails) {
            success = false;
            return res.status(404).json({success: success, message: "Product details not found.." })
        }

        success = true;
        return res.status(200).json({ success: success, productDetails : productDetails, productImages: productImages});


    } catch (error) {
         success =false;
        return res.status(500).json({success: success, message: "Bad Request", });
    }

});








module.exports = router;



