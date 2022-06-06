const jwt  = require('jsonwebtoken')
require('dotenv').config();   
const SecretValueAssign = async (obj) =>{
       const ADMIN_ID = String(process.env.ADMIN_ID),
                     MODERATOR_ID = String(process.env.MODERATOR_ID),
                        USER_ID = String(process.env.USER_ID)
        const ADMIN_SECRET = String(process.env.ADMIN_SECRET),
                    MODERATOR_SECRET = String(process.env.MODERATOR_SECRET),
                        USER_SECRET = String(process.env.USER_SECRET)
        const role_ = String(obj.role_)
        if(role_ === ADMIN_ID) return ADMIN_SECRET
        else if(role_ === MODERATOR_ID) return MODERATOR_SECRET 
        else return USER_SECRET
}

const Token_assign = async (obj) => {
    const SECRET = await SecretValueAssign(obj)
    return jwt.sign({id : obj._id}, SECRET, {
           expiresIn: process.env.DURATION_TOKEN || 86400
    }) 
}

TOKEN_ACTIONS = {
     SecretValueAssign,
     Token_assign
}

module.exports = TOKEN_ACTIONS