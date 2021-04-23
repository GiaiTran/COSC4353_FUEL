const db = require('../models');

exports.getall=async(req,res)=>{
    await db.fuel.findAll({
        include:[{
        model:db.profile,
        raw: true,
        nested: true,
        required: false,
        as:"histories",
        attributes:["slug","fullname","address1","city","state","zipcode","email","address2"]
        
    
    }]
    }).then(fuel=>{
        //if(!fuel) return res.status(400).send("No Data found")
        return res.status(200).send(fuel)
    })
    // .catch(err=>{
    //     //console.log(err)
    //     res.status(404).send("Cannot get data")
    // })
}

exports.getallProfile=async(req,res)=>{
    await db.fuel.findAll({
        where:{
            slug:req.params.slug
        },
        include:[{
            model:db.profile,
            raw: true,
            nested: true,
            required: false,
            as:"histories",
            attributes:["slug","fullname","address1","city","state","zipcode","email","address2"]
            
        
        }]
    }).then(fuel=>{
        // if(!fuel) return res.status(400).send("No Data found")
        return res.status(200).send(fuel)
    }).catch(()=>{
        //console.log(err)
        // res.status(404).send("error in the data")
    })
}


exports.create=async(req,res)=>{
    const fuel=await db.fuel.build({
        slug:req.body.slug,
        date:req.body.date,
        gallon:req.body.gallon,
        profile:req.body.profile

    })
    if(req.body.gallon<99 || req.body.date===null || req.body.gallon===null )
    {
        res.status(400).send("At least 100 gals or date or gallon must be filled")
    }
   else
   {
    fuel.save().then(gas=>{
        //if(!gas) return res.status(400).send("cannot get information")
        
        res.status(200).send("OK")
    }).catch(err=>{
        // console.log(err)
        // res.status(400).send(err.message)
    })
   }
}