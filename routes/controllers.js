require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs')
const multer  = require('multer');
const uploadMiddleware = multer({ dest: '../uploads/' })
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
//import user schema
const User = require('../models/users');
const Post = require('../models/post');
const PostAthlone = require('../models/postAthlone');
const PostBonteheuwel = require('../models/postBonteheuwel');
const PostManenberg = require('../models/postManenberg');
const postLanga = require('../models/postLanga');
const postHanover_park = require('../models/postHanover_park');
const Community = require('../models/communities');

const Comments = require('../models/comments')
const { execPath } = require('process');
const asyncWrapper = require('../middleWare/asyncMiddleWare');
const { createCustomerError } = require('../errors/customError');
// const Comments = require('../models/comments');



const RegisterPost = asyncWrapper(async (req, res) => {
    const {username, password} = req.body;
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
        })
        res.status(200).json({'reasponse':'ok'})
   
});

// app.post('/login', async (req, res) => {
//     const {username, password} = req.body;
//     const userDoc = await User.findOne({username})
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if(passOk){
//         jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).json('Token generation failed'); // Token generation failed
//             } else {
//                 res.cookie('token', token).json({
//                     id:userDoc._id,
//                     username
//                 });
//             }
//         });
//     } else {
//         res.status(400).json('wrong cridentials')
//     }
    
// });

const loginPost = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(400).json('Wrong credentials');
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);

        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) {
                    console.error(err);
                    res.status(500).json('Token generation failed');
                } else {
                    res.cookie('token', token, { sameSite: "None", secure: true }) // Set the HttpOnly flag and ensure it's served over HTTPS
                    res.json({
                        id: userDoc._id,
                        username,
                    });
                }
            });
        } else {
            res.status(400).json('Wrong credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
});

const profileGet = ((req, res) => {
    const { token } = req.cookies;
    const JWT = req.cookies.token
    
    

    // Check if the token is not provided
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Handle token verification failure
            console.error(err);
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Token is valid, send user information
        res.json(info);
    });
});

const logoutPost = (req, res) => {
    res.clearCookie('token').json('ok');
};

const postDataPost = asyncWrapper( async (req,res) => {
    ///console.log(req);
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    //fs.renameSync(path, newPath );
     
    const {Title, Type, Content} = req.body
    const watchPost = await Post.create({
        Title, 
        Type, 
        Content,
        //cover:newPath,
    })
    res.status(200).json(watchPost)
    
    

    
});

const postDataGet = asyncWrapper( async (req,res) => {
    const posts = await Post.find();
    res.json(posts);
});


const creatPostAthlone = asyncWrapper( async (req,res) => {
    ///console.log(req);
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    //fs.renameSync(path, newPath );
     
    const {Title, Type, Content} = req.body
    const watchPost = await PostAthlone.create({
        Title, 
        Type, 
        Content,
        //cover:newPath,
    })
    res.status(200).json(watchPost)
    
    

    
});


const getPostAthlone = asyncWrapper( async (req,res) => {
    const posts = await PostAthlone.find();
    res.json(posts);
});


const creatPostBonteheuwel = asyncWrapper( async (req,res) => {
    ///console.log(req);
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    //fs.renameSync(path, newPath );
     
    const {Title, Type, Content} = req.body
    const watchPost = await PostBonteheuwel.create({
        Title, 
        Type, 
        Content,
        //cover:newPath,
    })
    res.status(200).json(watchPost)
    
    

    
});


const getPostBonteheuwel = asyncWrapper( async (req,res) => {
    const posts = await PostBonteheuwel.find();
    res.json(posts);
});


const creatPostManenberg = asyncWrapper( async (req,res) => {
    ///console.log(req);
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    //fs.renameSync(path, newPath );
     
    const {Title, Type, Content} = req.body
    const watchPost = await PostManenberg.create({
        Title, 
        Type, 
        Content,
        //cover:newPath,
    })
    res.status(200).json(watchPost)
    
    

    
});


const getPostManenberg = asyncWrapper( async (req,res) => {
    const posts = await PostManenberg.find();
    res.json(posts);
});


const creatPostLanga = asyncWrapper( async (req,res) => {
    ///console.log(req);
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    //fs.renameSync(path, newPath );
     
    const {Title, Type, Content} = req.body
    const watchPost = await postLanga.create({
        Title, 
        Type, 
        Content,
        //cover:newPath,
    })
    res.status(200).json(watchPost)
    
    

    
});


const getPostLanga = asyncWrapper( async (req,res) => {
    const posts = await postLanga.find();
    res.json(posts);
});


const creatPostHanover_park = asyncWrapper( async (req,res) => {
    ///console.log(req);
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    //fs.renameSync(path, newPath );
     
    const {Title, Type, Content} = req.body
    const watchPost = await postHanover_park.create({
        Title, 
        Type, 
        Content,
        //cover:newPath,
    })
    res.status(200).json(watchPost)
    
    

    
});


const getPostHanover_park = asyncWrapper( async (req,res) => {
    const posts = await postHanover_park.find();
    res.json(posts);
});


const communityDataGet = (async (req, res) => {

    
    const community = await Community.find()
    res.json(community)
    //not creating communities schema because i will manulaty input the data
});


const commentsPost = asyncWrapper( async (req,res) => {
    const {Comment, PostId} = req.body
    
    const comment = await Comments.create({
        Comment,
        PostId
    })
    res.status(200).json({'reasponse':'ok'})

    
});


const commentGet = asyncWrapper( async (req,res) => {

    const postId = req.query.postId;

    // Now you can use the postId to filter comments based on the associated post
    const comments = await Comments.find({ PostId: postId });

    res.json(comments);
})


module.exports = {
    getPostAthlone, 
    creatPostAthlone, 
    RegisterPost, 
    loginPost, 
    profileGet, 
    logoutPost, 
    postDataPost, 
    postDataGet, 
    communityDataGet, 
    commentsPost, 
    commentGet,
    creatPostBonteheuwel,
    getPostBonteheuwel,
    creatPostManenberg,
    getPostManenberg,
    creatPostLanga,
    getPostLanga,
    creatPostHanover_park,
    getPostHanover_park, }