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
    commentGet,
    creatPostBonteheuwel,
    getPostBonteheuwel,
    creatPostManenberg,
    getPostManenberg,
    creatPostLanga,
    getPostLanga,
    creatPostHanover_park,
    getPostHanover_park,

} = require('./controllers')

router.route('/register').post(RegisterPost)
router.route('/login').post(loginPost)
router.route('/profile').get(profileGet)
router.route('/logout').post(logoutPost)
router.route('/postData').post(postDataPost).get(postDataGet)
router.route('/postDataAthlone').post(creatPostAthlone).get(getPostAthlone)
router.route('/postDataBonteheuwel').post(creatPostBonteheuwel).get(getPostBonteheuwel)
router.route('/postDataManenberg').post(creatPostManenberg).get(getPostManenberg)
router.route('/postDataLanga').post(creatPostLanga).get(getPostLanga)
router.route('/postDataHanover_park').post(creatPostHanover_park).get(getPostHanover_park)
router.route('/communityData').get(communityDataGet)
router.route('/comments').post(commentsPost).get(commentGet)

module.exports = router


