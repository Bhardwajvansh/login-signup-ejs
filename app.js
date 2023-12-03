const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const path = require("path")
const bcrypt = require("bcrypt")
const bodyparser = require("body-parser")

mongoose.connect("mongodb://localhost:27017/loginDB");

const SignupSc = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    newpassword:{
        type:String,
    },
    confirmpassword:{
        type:String,
    }
})

const Signup = mongoose.model("Signup",SignupSc);
const app = express();
app.use(express.static("public"))
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/",(req,res)=>{
    // console.log(req.body.username);
    // console.log(req.body.password);
    Signup.find({name:req.body.username}).then((data)=>{
        if(req.body.password==data[0].newpassword){
            res.render("home")
        }
    })
})

app.post("/signup",(req,res)=>{
    let name=req.body.newusername;
    let email=req.body.email;
    let newPass=req.body.newpassword;
    let conPass=req.body.confirmpassword;
    const newsignup = Signup({
            name:name,
            email:email,
            newpassword:newPass,
            confirmpassword:conPass
    })
    newsignup.save().then(()=>{
        res.redirect("/")
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("listning on port 3000");
})