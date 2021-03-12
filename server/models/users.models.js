const Sequelize = require("sequelize");

//const { sequelize,Sequelize } = require(".");
module.exports=(sequelize,Sequelize)=>{
    const User=sequelize.define("user",{
        id:{
            type:Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement:true

        },
        username:{
            type:Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            // validate:{
            //     existedUsername(username){
            //         if(username===this.username) throw new Error("usrname is existed")
            //     }
            // }
        },
        password:{
            type:Sequelize.STRING(64),
            allowNull: false,
            
            
        },
        passwordConfirm:{
            type:Sequelize.STRING(64),
            allowNull: false,
            
        },
        
    })
    
    return User;
}