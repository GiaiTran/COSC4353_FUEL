const db = require('../models');
exports.getall=async (req,res)=>{
    await db.profile.findAll({
        include:[{model:db.user, nested: true,as:"user_profile",attributes:["id","username"]}]
    }).then(profile=>{
        //if(!profile) return res.status(400).send("No Data found")
        return res.status(200).send({
            data:profile,
            message:"OK"
        })
    })
    // .catch(err=>{
    //     //console.log(err)
    //     res.status(404).send(err.message)
    // })
}
exports.create=async(req,res)=>{
    const profile=await db.profile.build({ 
        slug:req.body.slug,
        fullname:req.body.fullname,
        email:req.body.email,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        state:req.body.state,
        zipcode:req.body.zipcode,
        
        user:req.body.user

    })
    await db.profile.findOne({
        where:{
            
            user:req.body.user,
            
        }
    }).then(profiles=>{
             if(profiles)return res.status(400).send("user existed")
             
         })
    //if(!profile) return res.status(400).send("ERROR IN CREATING")
    profile.save().then(user=>{
        //if(!user) return res.status(400).send("cannot get information")
        res.status(200).send("OK")
    }).catch(err=>{
        //console.log(err)
        res.status(404).send("information must be unique")
    })
}
exports.findOne=async(req,res)=>{
    await db.profile.findOne({
        where:{
            slug:req.params.slug
        },
        include:[{model:db.user, nested: true,as:"user_profile",attributes:["id","username"]}]
    }).then(profile=>{
        //if(!profile) return res.status(400).send("No data Found")
        return res.status(200).send({
            message:"OK",
            profile
        }) 
    }).catch(err=>{
        res.status(400).send("Cannot get data")
        //console.log(err)
        
    })
}

exports.updateUser=async(req,res)=>{
    await db.profile.update({
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        state:req.body.state,
        zipcode:req.body.zipcode,
        
    },{where:({
        
            slug:req.params.slug
        
    })}).then(profile=>{
        //if(!profile) return res.status(400).send("NO data found")
        res.status(200).send({
            data:profile,
            message:"Updated"
        })
    }).catch(err=>{
        //console.log(err);
        return res.status(400).send("Unable to update")
    })
}


exports.delete=async(req,res)=>{
    await db.profile.destroy({
        where:{
            slug:req.params.slug
        },
    }).then(profile=>{
        //if(!profile) return res.status(400).send("No data Found")
        return res.status(200).send({
            message:"OK",
          
        }) 
    }).catch(err=>{
        res.status(400).send("Cannot delete data")
        //console.log(err)
        
    })
}
