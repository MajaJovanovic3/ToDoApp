var express=require("express")
var bodyParser=require("body-parser")
const routes=require("./routes")
const cors=require("cors")
const cookieParser = require('cookie-parser')
var app=express()
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))
app.use("/", routes);
module.exports = app;