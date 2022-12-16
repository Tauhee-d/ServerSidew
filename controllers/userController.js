// // const express = require('express')
// const router = express.Router()
// // const user = require('../../models/home/hom_user')
// // const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const {missingBody,
//     duplicateRecord,
//     serverError,
//     noResourceFound,
// unauthorized} = require('../utils/error_handler')

// import userModel from '../models/user'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// // import router from 'express.Router()'



// router.post('/register',async(req,res)=>{
//     const {email,userName,password,confirmPassword} = req.body
//     if( !email || !userName ||!password ||!confirmPassword){
//         missingBody(res)
//         return
//     }
//     try{
//         const filter = {email:email}
//         const findUser = await user.findOne(filter)
//         if(findUser){
//             duplicateRecord(res)
//             return
//         }
//         const user_model = new user({
            
//             email,
//             userName,
//             password:bcrypt.hashSync(password,10),
//             confirmPassword
//         })
//         try{
//             await user_model.save()
//             const token = createToken(user_model._id)
//             res.status(201).send({
//                 token:token
//             })
//         }catch(err){
//             serverError(res,err.message)
//         }

//     }catch(err){
//         serverError(res,err.message)
//     }
// })

// module.exports = router