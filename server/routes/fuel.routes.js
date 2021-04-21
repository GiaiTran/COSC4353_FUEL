const express=require('express')
const Fuel=require("../controllers/fuel.controller")
const route=express.Router()

route.get("/getall",Fuel.getall)
route.get("/gethist/:slug",Fuel.getallProfile)
route.post("/create",Fuel.create)
module.exports=route