const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
},
      lastname : {
              type: String,
              required: true
      } ,
          image: {
                type: mongoose.Mixed,
                required: false
          },
              email : {
                      type: String,
                      required: true,
                      unique: true
              },
                      phoneNumber : {
                              type: String,
                              required: true,
                              unique: true
                      },
                              address: {
                                      type: String,
                                      required: true
                              },
                      username : {
                              type: String,
                              required: true,
                              unique: true
                      },
              password : {
                      type: String,
                      required: true
              },
       role_ : {
           type: mongoose.Schema.Types.ObjectId,
           ref : "role",
           required : true
       },
    is_active: {
            type: Boolean,
            default: false
    }
    
}, {
      timestamps: true
})

module.exports = mongoose.model("User", userSchema)

