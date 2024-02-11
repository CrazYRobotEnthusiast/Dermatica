const express = require('express');
const app= express ();
const path = require('path');
const http =require('http').Server(app);
const ejs = require('ejs');
app.set('view engine','ejs');
const hbs=require('hbs');
app.set('view engine', 'hbs');
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname));
// const path = require('path');
const { Int32 } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://epistemophilic:JbVJM3HRGCti8PAw@cluster0.vzvabfw.mongodb.net/?retryWrites=true&w=majority", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  });
const users = mongoose.model('users', {
    // Define your schema here
          item:String,
          price:Number,
          itemdes:String,
          
  });
const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)
const appointment=new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
      type:String,
      required:true
  },
  date:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  doctor:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }

})

const Appointment=new mongoose.model('Appointment',appointment)
app.get('/', async (req, res) => {
    try {
        // Fetch data from MongoDB
        // const data = await users.find(); // Assuming you want to retrieve all documents from the 'users' collection
        const data = await users.findOne({item: 'khgkk'});
        // const data2 = await users.findOne({item :"alkvfe"});
        // Render the EJS template and pass the data to it
        res.render('../index.ejs', {data}); // Assuming your EJS file is named 'pro1.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });
// app.get('/logorsign', async (req, res) => {
//     try {
//        res.render('login'); 
       
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
//   });
app.get('/logorsign', (req, res) => {
  res.render('login')
})
app.get('/logorsign/signup', (req, res) => {
    res.render('signup')
})
app.get('/healthfeed', (req, res) => {
  res.render('../MainBlogPage.ejs')
})
app.get('/aboutorvision', (req, res) => {
  res.render('../Vision.ejs')
})
app.get('/healthfeed2', (req, res) => {
  res.render('../RandomBlog.ejs')
})
app.get('/products', (req, res) => {
  res.render('../Products.ejs')
})
app.get('/model', (req, res) => {
  res.render('../new4.ejs')
})




// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
    })
    await data.save()

    // const data = {
    //     name: req.body.name,
    //     password: req.body.password
    // }

    const checking = await LogInCollection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
      res.status(201).render("../index.ejs");
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("../home", {
        naming: req.body.name
    })
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("../index.ejs");
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})
app.post('/appointment', async (req, res) => {
    
  const data1 = new Appointment({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date,
      department: req.body.department,
      doctor: req.body.doctor,
      message: req.body.message
  })
  await data1.save()

})
http.listen(2067,function(){
     console.log("Server is running")
 
});