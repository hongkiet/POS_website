require('../models/ProductModel');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const package = require('../middlewares/package');
const uploadFile = require('../service/uploadFirebase');
module.exports = {
    index: async (req, res) =>{
        try{
            const pageSize = 10;
            const pageNumber = parseInt(req.query.page, 10) || 1;
            const skipAmount = (pageNumber - 1) * pageSize;

            const totalProducts = await Product.countDocuments({});
            const totalPages = Math.ceil(totalProducts / pageSize);

            const products = await Product.find({})
                .skip(skipAmount)
                .limit(pageSize)
                .lean();

            const data = {
                products: products,
                divider: totalPages,
            };
            
            res.json(package(0, "Success", data));
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    add: async (req, res) =>{
        try{
            const token = req.header('Authorization');
            const product = req.body;
    
            if (!product || Object.keys(product).length === 0) {
            return res.json(
                package(404, "Product not found", null)
            );
            }
    
            let { barcode, quantity, name, import_price, retail_price, category, creation_date, description } = product;
    
            // Check all fields
            if (!barcode || !quantity || !name || !import_price || !retail_price || !category || !creation_date || !description) {
            return res.json(
                package(404, "Missing fields", null)
            );
            }
    
            // Remove all white space characters
            barcode = barcode.replace(/\s+/g, '');
            quantity = quantity.trim();
            name = name.trim();
            import_price = import_price.trim();
            retail_price = retail_price.trim();
            category = category.trim();
            creation_date = creation_date.trim();
            description = description.trim();
    
            if (barcode.length < 1 || quantity.length < 1 || name.length < 1 || import_price.length < 1 || retail_price.length < 1 || category.length < 1 || creation_date.length < 1 || description.length < 1) {
            return res.json(
                package(404, "The value should not be empty", null)
            );
            }
    
            if(import_price < 0 || retail_price < 0){
                return res.json(
                    package(404, "Price should not be negative", null)
                );
            }
    
            if(quantity < 0){
                return res.json(
                    package(404, "Quantity should not be negative", null)
                );
            }
            if(isNaN(quantity) || isNaN(import_price) || isNaN(retail_price)){
                return res.json(
                    package(404, "Quantity, import price and retail price should be a number", null)
                );
            }
    
            if(import_price > retail_price){
                return res.json(
                    package(404, "Import price should not be greater than retail price", null)
                );
            }
    
            const image = req.file; // Get the image from multer
    
            if (!image) {
            return res.json(
                package(404, "Missing image", null)
            );
            }
    
            //Check barcode existed
            const productExisted = await Product.findOne({ barcode });
            if(productExisted){
                return res.json(
                    package(404, "Barcode existed", null)
                );
            }
            
            // Handle the image upload
            const imageUrl = await uploadFile(image);
            if(imageUrl.code !== 0) {
                return res.json(
                    package(404, "Error uploading image", null)
                );
            }
            const url = imageUrl.data;
    
            // Create a new product
            const newProduct = new Product({
                barcode,
                quantity,
                name,
                import_price,
                retail_price,
                category,
                creation_date,
                description,
                image: url,
                purchase: false
            });
    
            // Save the product to the database
            const result = await newProduct.save();

            if(!result) {
                return res.json(
                    package(404, "Error saving product", result)
                );
            }
            return res.json(
                package(0, "Add product successfully", result)
            );
            
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    get: async (req, res) =>{
        try{
            const barcode = req.params.barcode;
            const product = await Product.findOne({ barcode }).lean();
    
            if (!product) {
                return res.json(
                    package(404, "Product not found", null)
                );
            }
    
            return res.json(
                package(0, "Get product successfully", product)
            );
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    edit: async (req, res) =>{
        try{
            const barcode = req.params.barcode;

            if (!barcode) {
            return res.json(package(404, "Product not found", null));
            }

            const updatedProduct = req.body;

            const product = await Product.findOneAndUpdate(
                { barcode },
                updatedProduct,
                { new: true }
            );

            if (!product) {
                return res.json(package(404, "Product not found", null));
            }

            return res.json(package(0, "Success", product));
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    update: async (req, res) =>{
        try{
            const barcode = req.params.barcode;
            const amount = req.body.amount;

            if(amount === undefined || amount === null || amount <= 0) {
                return res.json(
                    package(404, "Amount should be greater than 0", null)
                );
            } 
        
            const product = await Product.findOneAndUpdate(
                { barcode },
                { $inc: { quantity: amount } }, 
                { new: true, lean: true } 
            );
        
            if (!product) {
                return res.json(
                    package(404, "Product not found", null)
                );
            }
        
            return res.json(
                package(0, "Update product successfully", product)
            );
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    delete: async (req, res) =>{
        try{
            const barcode = req.params.barcode;

            if (!barcode) {
              return res.json(package(404, "Product not found", null));
            }
            const product = await Product.findOne({ barcode });

            if (!product) {
            return res.json(package(404, "Product not found", null));
            }
            if (product.purchase == true) {
            return res.json(package(2, "Product was purchased", null));
            }

            const result = await Product.findOneAndRemove({ barcode });

            return res.json(package(0, "Product deleted successfully", result));
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    }
}