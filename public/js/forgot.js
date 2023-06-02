const express=require('express');
const jwt=require('jsonwebtoken');

const app=express();

//
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

let user={
    id:"vjkdfnvjnsfjhvs",
    email:"adham.soliman725@gmail.com",
    password:"########",
};
app.get('/',(req,res)=>
{
    res.send("Hello World");
});


 //Creating a one time link for a period of time.
 const secret= JWTsecret+user.password;              //JWT is common but password isn't so it will be unique for each user.
 const payload={                                     //The payload is inside the token.
     email:user.email,
     id:user.password,
 };   