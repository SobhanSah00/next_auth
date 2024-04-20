import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on("connected",() => {
            console.log('Connected to MongoDB');
        })

        connection.on('error', (err) => {
            console.log('Error in connecting to MongoDB,please make sure db is up and running');
            console.log(err);
            process.exit(1);
        })
        
    } catch (err) {
        console.log('Something went wrong in connecting to DB');
        console.log(err);    
    }
}