import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://chiranjeetsingh055_db_user:CTwySG0pa1ah43SE@cluster0.fmnnqu7.mongodb.net/RealState")
    .then(() =>{
        console.log("DB CONNECTED")
    })
}