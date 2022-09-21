import mongoose from "mongoose";

type UserData = {
    name: string,
    email: string,
    password: string,
    verified: string
}

interface newUserData extends UserData, mongoose.Document{}

const userModel = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    verified: {
        type: String
    },

})

export default mongoose.model<newUserData>("users",userModel )