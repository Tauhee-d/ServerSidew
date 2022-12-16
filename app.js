// import dotenv from 'dotenv'
// dotenv.config()
require('dotenv').config()

// import express from 'express'
const express = require('express')

// import cors from 'cors'
const cors = require('cors')

// import conn from './config/connection.js'
const conn = require('./config/connection')

const api_path = '/api/v1'


// import userRouter from './routes/userRoute.js'
const userRouter = require('./routes/userRoute')


const app = express()
const port = process.env.PORT||5000

// Database Connection
const DATABASE = process.env.DATABASE
 
conn(DATABASE)
app.use(cors({origin:true,credentials:true}))
app.use(express.json())


// app.use(api_path,userRouter)
app.use( '/user',userRouter);
app.get('/',(req,res)=> {
    res.send('working..')
})


app.listen(port,()=>{
    console.log(`Server Started on ${port}`)
})
