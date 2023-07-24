//============================[Requirements]========================
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')
const multer = require('multer')
const {APP_PORT} = require('./config');

app.use(cors())

app.use(bodyParser.json());

// app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname +'/src/uploads/'))
// =============================[ Connect DataBase ]=========================
mongoose
  .connect(
    "mongodb+srv://ShivanandKasture:CnI6Naq8Yi6p0EWL@cluster0.a35v6.mongodb.net/E-commercewebiste?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);
// eMmJVWdTqr29S6Xq

app.listen(3000, function () {
  console.log("Express app is running on port " +  3000);
});
