const express = require('express');
const router = express.Router();
const multer  = require('multer');
const uploadMiddleware = multer({ dest: '../uploads/' })
const {
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
    commentGet
} = require('./controllers')

router.route('/register').post(RegisterPost)
router.route('/login').post(loginPost)
router.route('/profile').get(profileGet)
router.route('/logout').post(logoutPost)
router.route('/postData').post(postDataPost).get(postDataGet)
router.route('/postDataAthlone').post(creatPostAthlone).get(getPostAthlone)
router.route('/communityData').get(communityDataGet)
router.route('/comments').post(commentsPost).get(commentGet)

module.exports = router


