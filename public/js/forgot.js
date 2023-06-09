const express=require('express');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const {google}=require('googleapis');
const session=require('express-session');
const mongoose=require('mongoose');
//const { token } = require('morgan');
const bcrypt=require('bcrypt');

const app=express();



main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://malak2102056:56850906@cluster0.da8eto8.mongodb.net/jamila");
  console.log("Connected With DB");
}


const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  typeofuser: {
    type: String,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(this.password, salt);
    this.password = hashedpassword;
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User=mongoose.model('User',userSchema);

// let user = {
//     
//     email: "adham2105856@miuegypt.edu.eg",
//     password: "password",
//   };

const CLIENT_ID='422604657182-3kk41n1kufuh2auavmifa367nutiiq4t.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//044b0hbA0ky_uCgYIARAAGAQSNwF-L9IrnsrrkgH6Kr1BB1b4t7Wd5NHgPIwu4XuyA9Hv1CK8F0dY6_cxcWlCLsiiNiYU1_P0SaY';

app.use(session({
  secret:'mysecret',
  resave:false,
  saveUninitialized:false,
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');




  //needs to be placed in a .env file
  //const JWTsecret = 'some secret';

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



app.get('/forget-password', (req, res) => {
  res.render('forget-password');
});

// app.post('/forget-password', async (req, res, next) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email: email });
//   if (!user) {
//     return res.status(404).send('User not found');
//   }

  
//   // Generate and store a verification code in the user's session
//   function generateVerificationCode() {
//     const length = 6; // You can adjust the length of the verification code as needed
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   }
//    const verificationCode = generateVerificationCode();
//   req.session.token = {
//     email: user.email,
//     id: user._id,
//     verificationCode: verificationCode
//   };

//   //Creating the token:
// // const token = jwt.sign(
// //   { email: user.email, verificationCode: verificationCode },
// //   JWTsecret + user.password,
// //   { expiresIn: '1h' }
// // );
//   // Send a verification email to the user
//   sendVerificationEmail(user.email, verificationCode);

//   // Redirect the user to the verification page
//   res.redirect('/verification');
// });

// app.get('/verification', (req, res) => {
//   // Render the verification page and pass in the user's email and verification code
//   res.render('verification', {
//     email: req.session.token,
//     verificationCode: req.session.token.verificationCode
//   });
// });

// app.post('/verification', async (req, res) => {
//   const { verificationCode } = req.body;
//   const { id } = req.session.token;
//   const {email}=req.body;
//   const user = await User.findOne({ email: email });
//   if (!user) {
//     return res.status(404).send('User not found');
//   }

//   // Check that the verification code entered by the user matches the one stored in the session
//   if (verificationCode !== req.session.token.verificationCode) {
//     return res.status(400).send('Invalid verification code');
//   }
//   const token = jwt.sign(
//     { email: req.session.token.email, verificationCode: verificationCode },
//     JWTsecret + user.password,
//     { expiresIn: '1h' }
//   );

//   // Redirect the user to the password reset page
//   res.redirect(`/reset-password/${id}/${token}`);
// });

// app.get('/reset-password/:id/:token',async (req,res)=>
//     {
//         const {id,token}=req.params;
        
//         //Check if this id exists in the database.
        

//         //The id is valid, and there is a valid user with this id
//         //const secret=JWTsecret+user.password;

//         //verifying that the token is correct
//         try {
//           const user = await User.findById(id);
//           if (!user) {
//             res.status(400).send('user not found');
//           }
      
//           //Checking if the token is valid. 
          
//           const secret = JWTsecret + user.password;
//           const payload = jwt.verify(token, secret);
//           const { email, verificationCode } = payload;
//             res.render('reset-password', { email: email, verificationCode: verificationCode });
//           } catch (error) {
//             console.log(error.message);
//             res.send(error.message);
//           }
//         });

//         app.post('/reset-password/:id/:token', async (req, res, next) => {
//           //Getting the id and token from the request parameters(routes) in this function. 
//           const { id} = req.params;
//           const { password1, password2} = req.body;
//           //Verifying that the id exists in the database.
//           try {
//             const user = await User.findById(id);
//             if (!user) {
//               res.status(400).send('user not found');
//             }
        
//             //Checking if the token is valid. 
//             // const secret = JWTsecret + user.password;
//             // const payload = jwt.verify(token, secret);
//             // const { email, verificationCode } = payload;
//             //Validating the password and its confirmation.
//             if (password1 !== password2) {
//               return res.status(400).send('Passwords must match');
//             }
        
//             //Finding the user with the payload email and id and updating his password after resetting it.
//             user.password = password1;
//             await user.save();
//             res.send("Password reset successful");
//           }
//           catch (error) {
//             next(error);
//           }
//         });
        
        