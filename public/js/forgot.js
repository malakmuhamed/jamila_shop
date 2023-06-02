const express=require('express');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const {google}=require('googleapis');

const app=express();

const CLIENT_ID='422604657182-3kk41n1kufuh2auavmifa367nutiiq4t.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//044b0hbA0ky_uCgYIARAAGAQSNwF-L9IrnsrrkgH6Kr1BB1b4t7Wd5NHgPIwu4XuyA9Hv1CK8F0dY6_cxcWlCLsiiNiYU1_P0SaY';

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

let user = {
    id: "vjkdfnvjnsfjhvs",
    email: "adham2105856@miuegypt.edu.eg",
    password: "password",
  };

  //needs to be placed in a .env file
  const JWTsecret = 'some secret';

  //Sending the verification code to the user.

  const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


async function sendVerificationEmail(email, verificationCode) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'adham2105856@miuegypt.edu.eg',
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
      }
    });

    const mailOptions = {
      from: 'adham2105856@miuegypt.edu.eg',
      to: email,
      subject: 'Verify Your Email Address',
      html: `<p>Please use the following verification code to verify your email address:</p><h3>${verificationCode}</h3>`
    }

    const result = await transport.sendMail(mailOptions);
    console.log('Verification email sent successfully', result);
  } catch (error) {
    console.log(error.message);
  }
}


app.get('/forget-password', (req, res, next) => {
  res.render('forget-password');
});

app.post('/forget-password', async (req, res, next) => {
  const { email } = req.body;

  if (email !== user.email) {
    res.send('Email does not exist');
    return;
  }

  const verificationCode = Math.random().toString(36).substring(2, 8);
  await sendVerificationEmail(email, verificationCode);
  const secret = JWTsecret + user.password;                       /*JWT is common but password isn't,
                                                                   so it will be unique for each user*/
  
  const payload = {                                               //Creating the payload which is inside the token.
    email: user.email,
    id: user.password,
    verificationCode: verificationCode
  };
  const token = jwt.sign(payload, secret, { expiresIn: '15m' });
  const link = `http://localhost:3300/reset-password/${user.id}/${token}`;
  res.send('Password verification code has been sent to your email');
  

  //res.send(link);
});


 
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
        try {
            const payload = jwt.verify(token, secret);
            const { email, verificationCode } = payload;
            res.render('reset-password', { email: email, verificationCode: verificationCode });
          } catch (error) {
            console.log(error.message);
            res.send(error.message);
          }
        });

    app.post('/reset-password/:id/:token',(req,res,next)=>
    {
        //Getting the id and token from the request parameters(routes) in this function. 
        const {id,token}=req.params;
        const {password1,password2,verificationCode}=req.body;
        //Verifying that the id exists in the database.
        if(user.id!==id)
        {
            res.send("Invalid ID");
        }
        //validating the verification code.
        if (verificationCode !== req.session.verificationCode) {
            res.send("Invalid verification code");
            return;
          }

        //Checking if the token is valid. 
        const secret=JWTsecret+user.password;
        //Validating the password and its confirmation.
        if(password1===password2){
            return true;
        }
        else{
            res.send("Passwords must match");
        }

        //Finding the user with the payload email and id and updating his password after resetting it.
        user.password=password1;
        res.send(user);
        try{
            const payload=jwt.verify(token,secret);
        }
        catch(error){
            res.send(error.message);
        }

    }
    );



// app.listen(3300,()=>
// console.log('server running on port 3000')
// )