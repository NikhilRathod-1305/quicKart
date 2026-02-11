import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
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
        images: [
            {
                type: String
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { timestamps: true }
)

export default mongoose.model('Product', productSchema);