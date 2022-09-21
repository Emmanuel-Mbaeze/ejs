import express, { Application, Request,Response  } from 'express'
const PORT:number = 2023
require("./config/db")
import path from 'path'
const app: Application = express()
import userRouter from './router/userRouter'

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static(__dirname + 'public/CSS'));

app.use(express.json())
// app.set( path.join(__dirname, "views"), "ejs")



app.get("/", (req:Request, res: Response): Response=>{
    return res.status(200).json({"message": "Server Up"})
})

app.use("/api/user", userRouter)

app.get("/start/:id", (req, res)=>{
    const id = req.params.id
    const name = "Peter"
    return res.render("home", {name, id})
})


app.listen(PORT, ():void=>{
    console.log(`Listening to PORT: ${PORT}`)
})
