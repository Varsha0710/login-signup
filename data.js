var mysql=require('mysql2');

con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mydb"
});

con.connect(function(){
    console.log("db connected");
});

module.exports=con;