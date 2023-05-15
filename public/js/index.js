const connection = require('mysql2')
const dotenv = require('dotenv')

const connection = mysql.createConnection({
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST
})

const conn = connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM directory", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
