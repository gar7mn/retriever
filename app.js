if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const PORT = 3000
const app = express()
const mysql = require('mysql2')
const flash = require('express-flash')
const session = require('express-session')
//add the account insert 
const accounting = require('./accountdb')
//add bcrypt
const bcrypt = require('bcrypt')
//add passport initializer
const initializepassport = require('./passportconfig')
const passport = require("passport")
//init passport
initializepassport(passport,email=> users.find(user=>user.email ===email,
     id=>users.find(user=>user.id === id)))
const users = []
app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
//create array for users


const connection = require('./db')
const all = require('./querry')



connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM directory", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
    });
  });


app.use(express.static(__dirname+'/public'))
//setup flash
app.use(flash())
//setup passport to be used
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/js',express.static(__dirname+'/public/js'))
app.use('/css',express.static(__dirname+'/public/css'))
app.use('/database',express.static(__dirname+'/database'))
app.use('/',express.static(__dirname+'/views'))

app.get('/',checkAuthenticated,(req,res)=> res.render('index.ejs'))
//create a querry for inserting data into the database
app.get('/register',(req,res)=>res.render('register.ejs'))
app.get('/signup',(req,res)=>res.render('signup.ejs'))
app.get('/login',(req,res)=>res.render('login.ejs'))
//post login

app.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/login',
    failureFlash:true
}))
app.post('/signup',async (req,res)=>{
     console.log(req.body.password)
    //password will be changed with hashed password shortly
    try{
        const hashedpassword = await bcrypt.hash(req.body.password,10)
        accounting(req.body.username,req.body.email,hashedpassword)
        //this will later redirect to login page once it works
        res.redirect('/signup')
    }catch{
        res.redirect('/')
    }
    
})

app.post('/register', async (req,res)=>{
    try {
        //const hashedpassword =  await bcrypt.hash(req.body.password,10)
        singleRowInsert(req.body.firstname,req.body.lastname,req.body.email)
        // users.push({
        //     id: '1',
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedpassword
        // })
        //connection.query(`insert into new_db.loginuser ${users}`)
        //console.log(users.length)
        res.redirect('/register')
    } catch {
        console.log('cock')
    }
    //console.log(users)
    console.log('a')
})
//here we setup the login post 
app.post('/login')
let singleRowInsert = (first_name,last_name,user_email) => {

	let query = `INSERT INTO directory
		( id,firstname, lastname, email) VALUES (?, ?, ?,?);`;

	// Value to be inserted
	let id = Date.now().toString()
	let firstname =  first_name
    let lastname = last_name
    let email =  user_email

	// Creating queries
	connection.query(query, [id,
	firstname,lastname,email], (err, rows) => {
		if (err) throw err;
		console.log("Row inserted with id = "
			+ id);
	});
};

function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
all()

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))