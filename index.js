import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('combined'));
const port = 3000;

const jokes = [{"jokeId":0,"joke":"A Mexican magician says he will disappear on the count of 3. He says /Uno, dos... poof. He disappeared without a tres."},
                {"jokeId":1,"joke":"It’s hard to explain puns to kleptomaniacs because they always take things literally."}]

app.get('/',(req, res)=> {
    res.sendFile(__dirname+"/public/index.html");
});

app.get('/random',function(req, res){
    const randomIndex = Math.floor(Math.random()*jokes.length);
    res.json(jokes[randomIndex]);
})

//summary of the lesson is that
//1. use req.body to access variables that are passed as body in api req
//2. use req.param to access the path variables as mentioned in line 31
//3. use req.query to access variables that are passed as query paramaters in api req

//When Id is passed as path variable
app.get('/jokes/:Id',function(req,res){
    //check if requested Id is out of jokes range
    const Id = (req.params.Id);
    if(Id<=jokes.length-1){
        res.json(jokes[Id]);
    }
    else{
        //return error here
        const error= {"error":"Requested Id should be 0<=Id<=1"};
        res.json(error);
    }
})

//when id is passed as query parameters 
app.get('/jokes',function(req,res){
    const jokeId = req.query.id;
    res.json(jokes[jokeId]);
})

//creating post route to push new joke
app.post('/jokes',function(req,res){
    const newJoke={
        "jokeId":jokes.length+1,
        "joke":req.body.newJoke
    }
    jokes.push(newJoke);
    res.json(newJoke);
})

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
