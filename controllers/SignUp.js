// Library
const jwt  = require('jsonwebtoken')
const TableUser = require('../Models/User')
const TableRole = require('../Models/Roles')
// Methods
const  SignUpValidation = require('../helpers/SignUpValidator')
const RoleAssign = require('../helpers/RoleAssign')
const  SaveImage = require('../helpers/ImageSave')
const EncryptPassword = require('../helpers/EncryptPassword')
const  TOKEN_ACTIONS = require('../helpers/TokenGenerator')
const GetFieldError = require('../helpers/FieldError')
/*
   Register an new User
*/ 
const SignUp = async (req, res, next) => {
        const defaultObject = {
                     "name" : "",
                      "lastname" : "",
                      "image" : "",
                      "email" : "",
                      "phoneNumber" : "",
                      "address" : "",
                      "username" : "",
                      "password" : "",
                      "role_" : "user",
                      "is_active" : false
            }
        const data = {...defaultObject, ...req.body}   
        // Ejecure Validation
        const {error} = SignUpValidation.validate(data)
        const errorOBJ = await GetFieldError(data)
         if(error || errorOBJ.error){
                       let error_details = null
                       try {
                                 error_details =  error.details[0].message
                       } catch (error) {
                                 error_details = null
                       }
                        res.status(400).json(
                                {
                                        status : "NoOk",
                                        result : null,
                                        error : true,
                                        note: "Unexpected error with your data",
                                        error_message : {
                                                  sintax_error :  error_details,
                                                  unavailable_data: errorOBJ
                                                                        }       
                                }
                                                              )
                        }
        else{
                        // Role Assign
                        const MyRole = await RoleAssign(data.role_)
                        if(MyRole.error ) 
                                        res.status(400).json(
                                                        {
                                                                status : "NoOk",
                                                                result : null,
                                                                error : true,
                                                                note: "Unrecognized role",
                                                                error_message : MyRole.error_message
                                                        }
                                                )
                        let NewUser = {...data}
                        NewUser.role_ = MyRole.data._id
                        // Save and load User' image
                        NewUser.image =  await SaveImage(NewUser)
                        // Encrypt the password
                        await EncryptPassword(NewUser)
                        .then( (res) => {
                                                if(!res.error)
                                                        NewUser.password = res.password_encrypted
                                                else
                                                        res.status(400).json(
                                                                        {
                                                                        status : "NoOk",
                                                                        result : null,
                                                                        error : true,
                                                                        note: "Unexpected error ,try again later ",
                                                                        error_message : "The error was due the password"
                                                                }
                                                        )
                                        })
                        .catch(err => {
                                        res.status(400).json(
                                                {
                                                status : "NoOk",
                                                result : null,
                                                error : true,
                                                note: "Unexpected error ,try again later ",
                                                error_message : err
                                                }
                                                                        )
                        })
                        // Create the user
                        let USER_TOKEN = null
                        await TableUser(NewUser)
                                .save()
                                // JWT token assignment
                                .then(async (data) => {
                                        USER_TOKEN = await TOKEN_ACTIONS.Token_assign(data)
                                        res.status(201).json(
                                                {
                                                        status : "Ok",
                                                        result : {
                                                                        data : data,
                                                                        token : USER_TOKEN
                                                                },
                                                        error : false,
                                                        note: "User was created successfully ",
                                                        error_message : null
                                                }     
                                        )
                                        })
                                .catch(err => {
                                        res.status(400).json(                            
                                                        {
                                                                        status : "NoOk",
                                                                        result : null,
                                                                        error : true,
                                                                        note: "Unexpected error , user was not created successfully ,try again later ",
                                                                        error_message : err
                                                        }    
                                                )
                                })
        }
}

module.exports = SignUp