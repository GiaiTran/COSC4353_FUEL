const Sequelize = require("sequelize");
const profileModels = require("./profile.models");
module.exports=(sequelize,Sequelize)=>{
    const Fuel=sequelize.define("fuel",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        slug:{
            type:Sequelize.STRING(3),
            allowNull:false,
            
            
        },
        date:{
            type:Sequelize.DATE,
            allowNull:false,
            
        },
        profile:{
            type:Sequelize.STRING(3),
            references:{
                model:"profiles",
                key:"slug"
            }
        },
        gallon:{
            type:Sequelize.DOUBLE,
            allowNull:false
        }
    });
    Fuel.associate=function(models){
        Fuel.belongsTo(models.profile,{as:"histories",foreignKey:"profile",onDelete:'cascade'})
    }
    return Fuel
}