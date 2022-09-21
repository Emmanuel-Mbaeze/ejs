import mongoose from "mongoose";

const localURI:string = "mongodb://localhost/UsersDB"

mongoose.connect(localURI).then(()=>{
    console.log("Connected")
}).catch((err)=>{
    console.log("Database Disconnected")
})