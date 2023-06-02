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

