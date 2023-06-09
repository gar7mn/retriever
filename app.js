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
const get_email = require('./querry')
//init passport
initializepassport(passport,email=> users.find(user=>user.email ===email,
     id=>users.find(user=>user.id === id)))
const users = []
app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
//create array for users


const connection = require('./db')
const searcher = require('./querry')




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

app.get('/',(req,res)=> res.render('index.ejs'))
//create a querry for inserting data into the database
app.get('/register',(req,res)=>res.render('register.ejs'))
app.get('/signup',(req,res)=>res.render('signup.ejs'))
app.get('/login',(req,res)=>res.render('login.ejs'))
app.get('/search',(req,res)=>res.render('search.ejs'))
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
//at the very least i can log the result of the search to console
app.post('/search',async (req,res)=>{
    try{
        connection.query('SELECT * FROM directory WHERE firstname = ? AND lastname = ?;',[req.body.firstname,req.body.lastname],function(err,result,fields){
            
            //play with this some more to get the pages to render the arrays properly.
            if (result.length == 1) {
                id = result[0][0],
                fname = result[0][1]
                lname = result[0][2]
                email = result[0][3]
                num = result[0][4] 
            }
            else{
               res.send(result) 
            }
            datasrting = `firstname: ${fname}. lastname: ${lname}. email: ${email}. phone: ${num}`
            res.send(datasrting)
            
            //possibly implement a searching algorithim of some kind to get specific items in an array.
        })
    }
    catch (err){throw err}
})
app.post('/register', async (req,res)=>{
    try {
        //const hashedpassword =  await bcrypt.hash(req.body.password,10)
        singleRowInsert(req.body.firstname,req.body.lastname,req.body.email,req.body.number)
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
        console.log('shoot')
    }
    //console.log(users)
    
})
//here we setup the login post 
app.post('/login')
let singleRowInsert = (first_name,last_name,user_email, user_num) => {

	let query = `INSERT INTO directory
		( id,firstname, lastname, email, number) VALUES (?, ?, ?,?,?);`;

	// Value to be inserted
	let id = Date.now().toString()
	let firstname =  first_name
    let lastname = last_name
    let email =  user_email
    let number = user_num

	// Creating queries
	connection.query(query, [id,
	firstname,lastname,email,number], (err, rows) => {
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

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))

module.exports = app;
