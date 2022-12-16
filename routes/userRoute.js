const express = require('express')
const router = express.Router()
// const user = require('../../models/home/hom_user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {missingBody,
    duplicateRecord,
    serverError,
    noResourceFound,
unauthorized} = require('../utils/error_handler')

const userModel = require('../models/user')
const { Router } = require('express')

router.get('/',(req,res)=>{
    res.send("welcome")
})

router.post('/register',async(req,res)=>{
    const {email,userName,password,confirmPassword} = req.body
    if( !email || !userName ||!password ||!confirmPassword){
        missingBody(res)
        return
    }
    try{
        const filter = {email:email}
        const findUser = await userModel.findOne(filter)
        if(findUser){
            duplicateRecord(res)
            return
        }
        const user_model = new userModel({
            
            email,
            userName,
            password:bcrypt.hashSync(password,10),
            confirmPassword
        })
    
        try{
            await user_model.save()
            const savedUser = await userModel.findOne({email:email})
            // const token = jwt.sign({userID:savedUser._id},
            //     process.env.SECRET,{expiresIn: '30d'})
            //     res.status(201).send({
            //         token:token
            //     })
            const token = createToken(savedUser._id)
            res.status(200).send({
                _id:savedUser._id,
                userName:savedUser.userName,
                token:token
            })
            // res.status(201).send({
            //     message: "Registrattion Done",
               
            // })
        }catch(err){
            serverError(res,err.message)
        }

    }catch(err){
        serverError(res,err.message)
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        missingBody(res)
        return
    }

    try{
        const filter = {email:email}
        const foundUser = await userModel.findOne(filter)
        if(!foundUser){
            noResourceFound(res,"No User Record with given email")
            return
        }
        const result = bcrypt.compareSync(password,foundUser.password)
        if(!result){
            unauthorized(res,"wrong password")
            return    
        }
        else{
            // res.send("user found")
               const token = createToken(foundUser._id)
        res.status(200).send({
            _id:foundUser._id,
            userName:foundUser.userName,
            addedOn:foundUser.addedOn,
            token:token
        })
        }
        // try{
        //     const query = {lastLogged:Date.now()}
        //     await user.findByIdAndUpdate(foundUser._id,query)

        // }catch(err){
        //     serverError(res,err.message)
        // }
     
    }catch(err){
        serverError(res,err.message)
    }
})




function createToken(userID){
    return jwt.sign({
        _id:userID},process.env.SECRET,{expiresIn:'30d'})
}


module.exports = router
