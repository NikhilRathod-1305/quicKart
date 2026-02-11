import Product from "../models/Product.js";

export const createProduct = async (req , res , next) => {
    try{
        const product = await Product.create({
            ...req.body,
            createdBy: req.user._id    
        });

        res.status(201).json({
            success:true,
            data:product
        });
    }
    catch(error){
        next(error);
    }
}