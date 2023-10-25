import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from "http";
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

function callanNodeHttpbasadapi() {
    //here is the const that will contain the api detail
    const options =
    {
        hostname: "jsonplaceholder.typicode.com",
        path: "/posts",
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    //here to make request 
    const request = http.request(options, function (response) {
        response.setEncoding('utf8');
        let data = "";
        response.on("data", (chunk) => { data += chunk; })
        response.on("end", () => {
            try {
                const result = JSON.parse(data);
                //console.log(data);
                res.send(result);
                return result;

            }
            catch (erro) {
                console.error("Failed to parse response: ", erro.message);
            }
        })
    })

    request.on("error", function (error) {
        console.error("Failed to make request: ", error.message);
    });

    request.end();
}

async function callAnAxiosBasedApi(){
    try{
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const result = response.data;
        console.log(result);
    }
    catch(error){
        console.error("Failed to make error: ", error.message);
    }
}

//this is how to call an API via node http inbuild pack
app.get("/apitest", function (req, res) {
    //callanNodeHttpbasadapi();
    callAnAxiosBasedApi();
})

app.post('/createfile', (req, res) => {
    //console.log(req.body)
    fs.writeFile(req.body.FileName, req.body.FileText, (err) => {
        if (err) {
            console.log("internal error");
        }
        else {
            res.sendStatus(201);
        }
    });
});

app.listen(port, () => {
    console.log('Server is running on 3000');
});
