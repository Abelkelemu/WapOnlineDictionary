var mysql = require('mysql');

var con = mysql.createConnection({
        host: "localhost",
        user: "Abel Kelemu",
        password: "miusql",
        database: "entries"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database is connected!");
});

const  getDef =  (word) =>{
    return new Promise((resolve,reject) =>{
        con.query("select * from entries WHERE word =" + mysql.escape(word), function (err, result) {
            if (err) {
              reject(err)
            };
              resolve( result)
          });
    })
}

exports.getDefinition = getDef;