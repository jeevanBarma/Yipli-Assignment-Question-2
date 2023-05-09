var mysql = require('mysql2');
const readline=require('readline')

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "JeeVan@9951",
  database:"phonebook"
});

var number=""
var phonenolist=[]

const rl=readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter 2-digit number:",(no)=>{
    number=no
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM contacts LIMIT 50", function (err, result, fields) {
          if (err) throw err;
          phonenolist.push(result)
          const data=phonenolist.flat().map(item => item.phNo)
          const filtredData=data.filter(num=>num.includes(number))
          if (filtredData.length===0){
            console.log("Not Found")
          }
          if (filtredData.length===1){
            console.log(filtredData)
          }
          if(filtredData.length>1){
            console.log("Multiple Entries")
          }
          rl.close()
        });
    });
});

