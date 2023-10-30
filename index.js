import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('combined'));
const port = 3000;

mongoose.connect("mongodb+srv://japsinnaseem:FyEIWWloif0nDvUG@cluster0.c9xlloe.mongodb.net/userDB?retryWrites=true&w=majority",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({username:String,password:String});
const User = new mongoose.model('users',userSchema);

app.get('/',(req, res)=> {
    //res.sendFile(__dirname+"/public/index.html");
    //Simplest method to save username and password of a given user
    const newUser = new User({
        username:'naseem@gmail.com',
        password:'yeterayemera'
    })
    newUser.save().then(function(){
        console.log("user added successfully");
    })
});

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
