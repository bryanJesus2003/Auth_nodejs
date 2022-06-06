var express = require('express');
var router = express.Router();

// Useer acttions
const Login = require('../controllers/Login');
const Logout = require('../controllers/Logout');
const RefreshToken = require('../controllers/RefreshToken');
const SignUp = require('../controllers/SignUp')

/* GET users listing. */
router.post('/signup', SignUp);
router.get('/login', Login);
router.get('/logout', Logout);
router.get('/refreshToken', RefreshToken);


module.exports = router;





