const dbConfig=require("../config/db.config")
const Sequelize=require("sequelize");
const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    //operatorsAliases:false,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})
const db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require("./users.models.js")(sequelize,Sequelize)
db.profile=require("./profile.models.js")(sequelize,Sequelize)
db.fuel=require("./fuel.models.js")(sequelize,Sequelize)
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {

    db[modelName].associate(db);
  }
});
module.exports=db