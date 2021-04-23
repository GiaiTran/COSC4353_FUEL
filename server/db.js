const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv=require("dotenv")
const db=require("./models")
const app=express();
dotenv.config({path:'./.env'})
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
express.json()
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
express.urlencoded()

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
  const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on Database with ${PORT}.`);
  });
  
  exports.app=app