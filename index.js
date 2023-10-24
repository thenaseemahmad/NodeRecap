import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('combined'));
const port = 3000;

app.get('/',(req, res)=> {
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/apitest",function(req,res){
    //here is the const that will contain the api detail
    const options = 
    {
        hostname:"bored-api.appbrewery.com",
        path: "/random",
        method:"GET",
        headers:{"Content-Type":"application/json"}
    };

    //here to make request 
    const  request = http.request(options,function(response){
        let data = "";
        response.on("data",(chunk)=>{data +=chunk;})
        response.on("end",()=>{
            try{
                //const result = JSON.parse(data);
                console.log(data)

            }
            catch(erro){
                console.error("Failed to parse response: ", erro.message);
            }
        })
    })

    request.on("error", function(error){
        console.error("Failed to make request: ", error.message);
    });

    request.end();
})

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
