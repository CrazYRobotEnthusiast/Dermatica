const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
// const LogInCollection = require("./mongo")
const port = process.env.PORT || 1567
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// const tempelatePath = path.join(__dirname,'../views')
// const publicPath = path.join(__dirname, '../src')
// console.log(publicPath);
app.use(express.static(__dirname));
app.set('view engine', 'hbs')
// app.set('views', tempelatePath)
// app.use(express.static(publicPath))
const { Int32 } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://epistemophilic:JbVJM3HRGCti8PAw@cluster0.vzvabfw.mongodb.net/?retryWrites=true&w=majority", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  }).then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

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



// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
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
        res.send("Welcome")
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
            res.status(201).render("../home");
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})