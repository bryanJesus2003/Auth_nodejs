const Joi = require("@hapi/joi")
/*
      Validations
*/ 
const SignUpValidation = Joi.object({
    name : Joi.string().min(4).max(50).required(),
    lastname : Joi.string().min(4).max(50).required(),
    image: Joi.string(),
    email: Joi.string().min(6).max(50).required().email(),
    phoneNumber: Joi.string().min(4).max(30).required(),
    address: Joi.string().min(6).max(100).required(),
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(8).max(250).required(),
    role_: Joi.string(),
    is_active: Joi.boolean().required()
})


module.exports = SignUpValidation