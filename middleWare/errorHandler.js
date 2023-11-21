const {CustomAPIError} = require('../errors/customError')

const errorHandle = (err, req, res, next) => {
    console.log(err);
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(err.status).json({msg: 'Something went wrong please try again'}); 
}
module.exports = errorHandle 