const TableRole = require("../Models/Roles") 
const TableUser = require("../Models/User")


// Method for default data for collections
const InitData = async () => {
     const ADMIN = "admin",
                MODERATOR = "moderator",
                USER = "user"
      var aux = false
      const ObjectRole = [
            {
                  "role_name" : ADMIN,
                  "users" : []
            },
            {
                "role_name" : MODERATOR,
                "users" : []
            },
            {
                "role_name" : USER,
                "users" : []
            }
      ]
            TableRole.count({}, async (err, count) => {
                if (parseInt(count) === 0) {
                            ObjectRole.map( async (el) => {
                                  await TableRole(el)
                                         .save()
                                               .then(() => {})
                                               .catch(err => console.log(err))
                            })                    
                }else{
                    await TableRole.find()
                    await TableUser.find()
                }
            })
}
module.exports =InitData