import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected")
        
    } catch (error) {
        console.log(`Error in connecting DB: ${error}`)
        process.exit(1)  // while connection is lost it will end the process and 1 means True
         
    }
}

export default connectDb