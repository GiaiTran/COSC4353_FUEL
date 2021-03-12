const User=require('../controllers/user.controller')
const express=require('express')
const route=express.Router()

route.post('/register',User.register)
route.post('/signin',User.signin)
route.post('/token',User.token)
module.exports=route