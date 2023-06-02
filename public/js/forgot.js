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

app.get('/forget-password',(req,res,next)=>
    {res.render('forget-password');}
    );
    app.post('/forget-password',(req,res,next)=>
    { const {email}=req.body;

 //Creating a one time link for a period of time.
 const secret= JWTsecret+user.password;              //JWT is common but password isn't so it will be unique for each user.
 const payload={                                     //The payload is inside the token.
     email:user.email,
     id:user.password,
 };   

 //Creating the token.
 const token=jwt.sign(payload,secret,{expiresIn: '15m'});//expiresIn is a function provided by jsonwebtoken.
 const link=`http://localhost:3000/reset-password/${user.id}/${token}`;
 console.log(link);
 res.send('password reset link has been sent to your email');
 }
 );

 app.get('/reset-password/:id/:token',(req,res,next)=>
    {
        const {id,token}=req.params;
        
        //Check if this id exists in the database.
        if(id!==user.id)
        {
            res.send('Invalid ID');
            return;
        }

        //The id is valid, and there is a valid user with this id
        const secret=JWTsecret+user.password;

        //verifying that the token is correct
        try{
            const payload=jwt.verify(token,secret);
            res.render('reset-password', {email:user.email});
        }   catch(error){
            console.log(error.message);
            res.send(error.message);
        }
    }
    );