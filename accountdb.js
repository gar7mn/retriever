const mysql = require("mysql2")
const dotenv = require('dotenv')
const connection = require("./db")
//create function for inserting accounts into database when registered
let accountRowInsert = (user_name,user_email,user_pass) => {

	let query = `INSERT INTO accounts
		( id,username, email, password) VALUES (?, ?, ?,?);`;

	// Value to be inserted
	let id = Date.now().toString()
	let username = user_name
    let email =  user_email
    let password = user_pass

	// Creating queries
	connection.query(query, [id,
	username,email,password], (err, rows) => {
		if (err) throw err;
		console.log("Row inserted with id = "
			+ id);
	});
};
//export
module.exports = accountRowInsert