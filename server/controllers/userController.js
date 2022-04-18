const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password,pic}  = req.body

    if(!name || !email || !password ){
        res.status(400)
        throw new Error('please enter all the fields')
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400) 
        throw new Error('User already exists') 
    }
    const salt  = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,email,password:hashedPassword,pic
    })
    if(user){
    //     return res.status(201).json({
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         pic:user.pic,
    //         token:generateToken(user._id)
    //   })
    return res.status(201).json(user)
   }else{
       res.status(400);
       throw new Error('failed to Create the User') 
   }
}) 

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})
    const isPassword = bcrypt.compare(password,user.password)

    if(!isPassword){
        throw new Error('Invalid Email or Password')
    }else{
        res.status(200).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic,
                    token:generateToken(user._id)
                })
    }
})

module.exports = {registerUser,authUser};
