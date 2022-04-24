const express = require("express");
const app=express();
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
const itemsSchema=new mongoose.Schema(
  {
    name:"string"
  }
);
const Todo=mongoose.model("Todo",itemsSchema);

const item1=new Todo(
  {
    name:"wake up",
  }
);

var items=[item1];
Todo.insertMany(items,function(err)
{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("default placed");
  }
});

app.get("/",function(req,res){

  var today= new Date();
  var date=today.getDate()+"/"+(Number(today.getMonth())+Number(1))+"/"+today.getFullYear();
  res.render("list",{todayDate:date,newitem:items});
});

app.post("/",function(req,res){

  var newdata=req.body.newitem;
  const val = {
    name:newdata,
  }
  items.push(val);
  res.redirect("/");

});

app.listen(5000,function(){
  console.log("server is running fine!!")
});
