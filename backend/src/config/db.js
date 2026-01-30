import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB connected successfully");
        
    }
    catch(err){
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

export default connectDB;