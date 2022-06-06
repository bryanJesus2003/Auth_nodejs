const TableUser = require('../Models/User')

const StartFindfing = async (obj) => {
    const response =  await TableUser.findOne(obj).exec();
            if(response)
                   //console.log("response")
                   return true
            return false

}

const GetFieldError = async (obj) => {
       let errorOBJ = {
              error : false,
              email : false, 
              phoneNumber : false, 
              username : false,
       } 
       errorOBJ.email = await StartFindfing({email : obj.email})
       errorOBJ.phoneNumber = await StartFindfing({phoneNumber : obj.phoneNumber})
       errorOBJ.username = await StartFindfing({username : obj.username})
       if(  errorOBJ.email || errorOBJ.phoneNumber || errorOBJ.username)
                    errorOBJ.error = true
        console.log("acabamos")
       return errorOBJ
}

module.exports = GetFieldError