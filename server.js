const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const projectsRoutes = require("./routes/projects");
const usersRoutes = require("./routes/users");
const profilesRoutes = require("./routes/profiles");
const picturesRoutes = require("./routes/pictures");

// express app

const app = express();


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use("/api/projects", projectsRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/profiles", profilesRoutes)
app.use("/api/pictures", picturesRoutes)

// connect to db

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        // listen for requests

app.listen(process.env.PORT, () => {
    console.log("connected to db & listening on port", process.env.PORT, "🚀");
})
    })
    .catch(err=> console.log(err))

