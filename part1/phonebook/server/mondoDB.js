import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.MONGO_URL;
export function connectDB() {
    mongoose.connect(url)
        .then(() => console.log('✅ MongoDB Connected!'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
}
