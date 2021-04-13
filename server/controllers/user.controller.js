//const User=require("../models/users.models.js")
const db = require('../models');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//const { user } = require("../models");
const tokenList={};
exports.register=async (req,res)=>{
    const password=req.body.password;
    const passwordConfirm=req.body.passwordConfirm;
    if(password!=passwordConfirm) return res.status(400).send("Passwords do not match")
    const user=await db.user.build(
        {
            username:req.body.username,
            password:bcrypt.hashSync(password,12),
            passwordConfirm:bcrypt.hashSync(passwordConfirm,12),
            
        }
    )
    const check=await db.user.findOne({
        where:{
            username:req.body.username
        }
    })
    if(check) res.status(400).send("username is exsited")
    else{
        user.save().then(users=>{
            //if(!users) res.status(400).send("Cannot get information")
            res.status(200).send("OK")
        })
        // .catch(err=>{
        //     //console.log(err)
        //     res.status(400).send("Cannot register")
        // })
    }

}

exports.signin=async (req,res)=>{
    await db.user.findOne({
        where:{
            username:req.body.username
        }
    }).then(user=>{
        if(!user) return res.status(400).send("User Not Found")
        var passwordValid=bcrypt.compareSync(req.body.password,user.password)
        if(!passwordValid)
        {
            return res.status(400).send("Invalid Password")
        }
        var token=jwt.sign({id:user.id},process.env.JWT,{expiresIn:300})
        var refreshToken=jwt.sign({id:user.id},process.env.JWT,{expiresIn:300}) 
        const response={
            'status':"OK",
            accessToken:token,
            refreshToken:refreshToken,
            id:user.id,
            username:user.username,
            role:user.role
        }
        
        tokenList[refreshToken]=response;
        res.status(200).json(response)
    })
    // .catch((err)=>{
    //     console.log(err)
    //     res.status(400).send(err.message)
    // })

}
exports.token=async (req,res)=>{
    await db.user.findOne({
        where:{
            username:req.body.username,
        }
    }).then((user)=>{
       
        
        if(!user)
        {
            return res.status(400).send("User Not Found")
        }
        else{
            var data=req.body
            
            if((data.refreshToken)&&(data.refreshToken in tokenList))
        {
            const user={
                "username":data.username
            }
            var token=jwt.sign(user,process.env.JWT,{expiresIn:300})
            
            // res.status(200).send({
            //     id:user.id,
            //     username:user.username,
            //     accessToken:token,
            //     refreshToken:refreshToken,
            //     role:user.Role_id
            // })
            const response = {
                accessToken: token,
            }
            tokenList[data.refreshToken].token=token
            res.status(200).json(response);
        }
        }
        
    })
    // .catch((err)=>{
    //     console.log(err)
    //     res.status(400).send(err.message)
    // })
};
