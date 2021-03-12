const { UniqueConstraintError } = require("sequelize");
const Sequelize = require("sequelize");

const User=require("./users.models")

module.exports=(sequelize,Sequelize)=>{
    const Profile=sequelize.define("profile",{
        slug:{
            type:Sequelize.STRING(3),
            allowNull:false,
            unique: true,
            primaryKey: true,
            
        },
        email:{
            type:Sequelize.STRING,
            unique: true,
        },
        fullname:{
            type:Sequelize.STRING(50),
            allowNull:false,
        },
        address1:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        address2:{
            type:Sequelize.STRING,
            
        },
        city:{
            type:Sequelize.STRING,
            len:[10,100],
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Enter City"
                }
        }},

        state:{
            type:Sequelize.STRING,
            len:[2],
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Enter State"
                }
        }},
        zipcode:
        {
            type:Sequelize.INTEGER,
            len:[5,9],
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Enter Zip Code"
                }
        }},
        
        user:{
            type:Sequelize.INTEGER,
            references:{
                model:"users",
                key:"id"
            }
        }, 
        
       
    })
    Profile.associate=function(models){
        Profile.belongsTo(models.user,{
        as:"user_profile",
        foreignKey:"user",
        onDelete:'cascade',
        onUpdate:'cascade',
        foreignKeyConstraint: true,
        hooks: true})
    }
    return Profile
}