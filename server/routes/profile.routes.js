const express=require('express')
const Profile=require("../controllers/profile.controller")
const route=express.Router()

route.get('/getall',Profile.getall)
route.post('/create',Profile.create)
route.get('/find/:slug',Profile.findOne)
route.delete('/delete/:slug',Profile.delete)
route.put('/update/:slug',Profile.updateUser)
module.exports=route