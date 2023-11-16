require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./db/connect');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs')
const multer  = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const port = process.env.PORT || 4000
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
//import user schema
const User = require('./models/users');
const Post = require('./models/post');
const Community = require('./models/communities');

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser())


//hel





app.post('/register', async (req, res) => {
    
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
        })
        res.status(200).json({'reasponse':'ok'})
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
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

app.post('/login', async (req, res) => {
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





app.get('/profile', (req, res) => {
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



app.post('/logout', (req, res) => {
    res.clearCookie('token').json('ok');
});

app.post('/postData', uploadMiddleware.single('file'), async (req,res) => {
    // const {originalname, path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    // fs.renameSync(path, newPath );

    const {title, summary, content} = req.body
    try {
    const watchPost = await Post.create({
        title, 
        summary, 
        content,
        cover:newPath,
    })
    res.json(watchPost)
    } catch (e){
        console.log(e);
        res.status(400).json(e)
    }

    
})

app.get('/postData', async (req,res) => {
    const posts = await Post.find();
    res.json(posts);
})

app.get('/communityData', async (req, res) => {

    
    const community = await Community.find()
    res.json(community)
    //not creating communities schema because i will manulaty input the data
})



const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.log(error);
    }
}

start()


//mongodb+srv://kiran:j0qrIt5sYIbSL6Ub@watchguard.toiznon.mongodb.net/?retryWrites=true&w=majority
//j0qrIt5sYIbSL6Ub