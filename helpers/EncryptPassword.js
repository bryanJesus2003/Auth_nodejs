const bcrypt = require('bcrypt')

const encryptPassword = async (obj) => {
    let data = null
    await bcrypt.hash(obj.password, 10)
        .then((res) => {
             data = {
                  error : false,
                  error_message : null,
                  password: obj.password,
                  password_encrypted: res
                        }              
        })
        .catch((err) => {
            data = {
                error : true,
                error_message : err,
                password: obj.password,
                password_encrypted: null
                      }       
                }      
        )
    return data
}

module.exports = encryptPassword