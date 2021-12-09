const express = require('express');

const UserPost = require('../models/userPost.model');

const authenticate = require("../middlewares/authentication");

const router = express.Router();

router.post('/', authenticate , async (req,res) => {
    try{

        //const user = req.user;
        const userPost = await UserPost.create({
            title:req.body.title,
            body:req.body.body,
            user:req.body.user,
        });
        return res.status(201).json({userPost})

    }catch (e){
        return res.status(500).json({
            status: "Failed",
            message : e.message
        });
    };
});

router.get('/', async (req,res) => {
    const userPost = await UserPost.find().lean().exec();
    return res.send(userPost)
});

module.exports = router;