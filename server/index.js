const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv=require("dotenv")
const db=require("./models")
const User=require("./routes/users.routes") 
const Profile=require("./routes/profile.routes")
const Fuel=require("./routes/fuel.routes")
const app=express();


dotenv.config({path:'./.env'})
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync().then(console.log("connected database")).catch(err=>{console.log(err)});
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

app.use("/api/users",User)
app.use("/api/profile",Profile)
app.use("/api/fuel",Fuel)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});