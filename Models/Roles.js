const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
           role_name : {
                 type: String,
                 required : true,
                 unique : true
           },
           users: [
                {
                     type: mongoose.Schema.Types.ObjectId,
                     res: "User"
                }  
           ]    
}, {
      timestamps: false
})

module.exports = mongoose.model("Role" , roleSchema)
