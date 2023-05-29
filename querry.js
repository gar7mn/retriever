const connection = require('./db')
const app = require('./app')

// connection.connect(function(err){
//     if (err) throw err;
//     connection.query(`SELECT * from directory where firstname = ? `);
//     if (err) throw err;
// })


//place the querry and the result printout in a function so it can be printed to log.
const a = 'g'
const users = [];
function get_email(email){
    connection.query(`SELECT email from accounts where email = '${email}'`,function(err,result,fields){
        if (err) throw err;
        
        users.push(result)
        console.log(result)
    });
}


