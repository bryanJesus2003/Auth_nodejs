const TableUser = require('../Models/User')
const TableRole = require('../Models/Roles')
/*
  Role Assign
*/ 
const RoleAssign = async (role = null) => {
    const defaultRole =  role ? String(role).toLowerCase() : "user"
    let objectRole = null
    await TableRole.findOne({role_name : defaultRole}) 
                     .then(res => (
                                     objectRole = {
                                             error : false,
                                             error_message : null,
                                             data : res
                                     })) 
                     .catch(err => (objectRole = {
                                                     error : true,
                                                      error_message : err,
                                                      data : null
                                                     }))      
                     return objectRole
}

module.exports = RoleAssign