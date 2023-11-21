

class CustomAPIError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}; 

const createCustomerError = (msg, statuscode)=>{
    return new CustomAPIError(msg, statusCode)
};

module.exports = {createCustomerError, CustomAPIError }