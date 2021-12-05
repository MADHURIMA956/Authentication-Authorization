
require('dotenv').config();

const jwt = require('jsonwebtoken')
const User = require('../models/user.models');

const newToken = (User) => {
    return jwt.sign({User:User},process.env.JWT_ACCESS_KEY)
};

const register = async (req,res)=>{

    try{

        //check if the email address already exist

        let user = await User.findOne({ email: req.body.email}).lean().exec()

        //if it already exists then throw an error

        if(user)
            return res
                .status(400).json({ message: e.message, status: "Failed" });  

        //else we will  create the user we will has the password as plain tex tpassword is harmfully 
        user = await User.create(req.body);

        //we will create the token 

            //*----types of authentication :1)stateful => remember 2) stateless => forget
        const token = newToken(user)



        //return the user and the token hash


            res.status(201).json({user , token})

    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });  
    }
};

const login = async (req,res)=>{

    // check if email address provided already exist
    try{

        let user = await User.findOne({ email: req.body.email});


    //if it does not exsit then trow error
    if(!user)
    return res
        .status(400).json({ message: "Please provide correct email and password", status: "Failed" });  


    // else we match the password
    let match = await User.checkPassword(req.body.password);


    //if not match then throw error

    if(!match)
    return res
        .status(400).json({ message: "Please provide correct email and password", status: "Failed" });  

    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });  
    }

    res.status(201).send('Login')
}
module.exports = {register , login };