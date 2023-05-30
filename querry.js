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
function get_email(firstname){
    connection.query(`SELECT email from directory where firstname = '${firstname}'`,function(err,result,fields){
        if (err) throw err;
        
        
        console.log(result)
        return result;
        
    });
    
}

let searcher = (firstname)=>{
    let query = `SELECT * FROM directory WHERE firstname = ?;`;

    connection.query(query,[firstname],function cb(err,result,fields){
        v = result
        
    })
    
}
module.exports = get_email;