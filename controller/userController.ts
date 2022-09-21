import express, {Request, Response} from 'express'
import userModel from '../model/userModel'
import ejs from "ejs"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import path from 'path'

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth : {
        user : "uyiekpenelizabeth@gmail.com",
        pass: "ypzwyqwjeznkeeps"
    }
})

type ctrlUser = {
    name: string,
    email: string,
    password: string,
    verified: string,
    _id?: string
    
}

const getUsers =async (req:Request, res: Response):Promise<Response> => {
    try {
        const userGet = await userModel.find()

        return res.status(200).json({
            message:"Gotten",
            data: userGet
        })
    } catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error
        })
    }
}

const createUser =async (req:Request, res: Response):Promise<Response> => {
    try {
        const {name, email, password} = req.body

const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password,salt)

// console.log(hashed)

const data = await crypto.randomBytes(6).toString("hex")
const token =  jwt.sign({data},"Secret",{expiresIn:"1d"})

        const userCreate: ctrlUser | null = await userModel.create({
            name, email, password:hashed,verified:token
        })

const tokens =  jwt.sign({name:userCreate?.name,id:userCreate?._id},"Secret",{expiresIn:"1d"})

const file = path.join(__dirname, "../views/home.ejs")
       
       ejs.renderFile(file,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            const mailOption = {
                from:"uyiekpenelizabeth@gmail.com",
                to:email,
                subject:"Account verification",
                html:data
               }

               transport.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("mail sent",info.response)
                }
               })
        }
       })

        return res.status(200).json({
            message: " User Created",
            data: userCreate
        })

    } catch (error) {
        return res.status(404).json({
            message:error,
            // data: error
        })
        console.log(error)

    }
}


export {getUsers, createUser}