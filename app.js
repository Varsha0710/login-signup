let express=require('express');
let bodyparse=require('body-parser');
let bcrypt=require('bcrypt');
let con=require('./data');
let app=express();
app.use(bodyparse.json())

app.post('/signup',(req,res)=>{
    
    let {name,password}=req.body;
    bcrypt.hash(password,10,(err,hashpassword)=>{
        if (err) throw err
        con.query(`INSERT INTO userdata values ("${name}","${hashpassword}")`,(err)=>{
            if (err) throw err
            res.json({message:"user created"});
        });
    });
    
});

app.post('/login',(req,res)=>{
    let {name,password}=req.body;
    con.query(`SELECT * FROM userdata WHERE name="${name}"`,(err,data)=>{
        let details=data[0];
        if(!details){
            res.json({error:"Username not found"})
        }
        bcrypt.compare(password,details.password,(err,data)=>{
            
            if(!data){
                return res.json({error:"Incorrect Password"})
            }
            res.json({message:"login successful"})
        });
    });
});

app.listen(2000);