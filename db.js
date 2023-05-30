const mysql = require('mysql2')
const dotenv = require('dotenv')

const connection = mysql.createConnection({
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    rowsAsArray:true
})
var name = 'grant'
//connection.query(`select * from directory where firstname = ${name}`).sql
const con = connection.connect(function(err){
    if (err) throw err;
    connection.query(`select firstname from directory where id >1`)
        if (err) throw err;
})
// connection.connect(function(err) {
//     if (err) throw err;
//     connection.query(`SELECT * FROM directory where firstname = ${name}`, function (err, result, fields) {
//       if (err) throw err;
      
//     });
//   });

module.exports = connection