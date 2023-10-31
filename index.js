import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
//mongoose-encryption is a encryption pack
//import encrypt from 'mongoose-encryption';

//Lets use hashing instead of encrytion md5 hashing algo
import md5 from 'md5';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('combined'));
const port = 3000;

mongoose.connect("mongodb+srv://"+process.env.MONGODB_USER+":"+process.env.MONGODB_USER_PASS+"@cluster0.c9xlloe.mongodb.net/userDB?retryWrites=true&w=majority",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({username:String,password:String});

//userSchema.plugin(encrypt,{secret:secret, encryptedFields: ['password']});
const User = new mongoose.model('users',userSchema);

// async function findUser(username,password){
//     const foundUser = await User.findOne({username:username,password:password}).exec();
//     return foundUser;
// }

app.get('/',(req, res)=> {
    res.sendFile(__dirname+"/public/index.html");
});

app.post('/registeruser',(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        password:md5(req.body.password)
    });
    newUser.save().then(()=>console.log("User added successfully"));
    res.sendFile(__dirname+"/public/signin.html");
});

app.post('/usersignin', (req,res)=>{
    const givenusername = req.body.username;
    const givenpassword = md5(req.body.password);
    User.findOne({username:givenusername}).then((founduser)=>{
        if(founduser){
            console.log("User authenticated successfully!");
            res.send("User authenticated successfully!");
        }
        else{
            console.log("User does not found");
            res.send("User does not found");
        }
    });
    
});

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
