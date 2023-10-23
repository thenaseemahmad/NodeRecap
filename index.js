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

app.get('/',(req, res)=> {
    res.sendFile(__dirname+"/public/index.html");
});

app.post('/createfile',(req,res)=>{
    //console.log(req.body)
    fs.writeFile(req.body.FileName,req.body.FileText,(err)=>{
        if(err){
            console.log("internal error");
        }
        else{
            res.sendStatus(201);
        }
    });    
});

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
