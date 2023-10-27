import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Exceljs from "exceljs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('combined'));
const port = 3000;

const jokes = ""


app.get('/',(req, res)=> {
    res.sendFile(__dirname+"/public/index.html");
    const xls = readexcel("/home/naseem/Documents/NodeRecap/assets/jokesdb.xlsx");
    console.log(JSON.stringify(xls));
});



function readexcel(excelpath){
    // // Reading our test file 
    // const file = reader.readFile("./assets/jokesdb.xlsx");
    // let data = [];
    // const sheets = file.
    const jokedb = [];
    const workbook = new Exceljs.Workbook();
    workbook.xlsx.readFile(excelpath)
    .then(function(){
        const worksheet = workbook.getWorksheet("Sheet1");
        worksheet.eachRow({includeEmpty:true},function(row,rowNumber){
            jokedb.push({"jokeId":row.values[1],"joke":row.values[2]});            
        });        
    });
    return jokedb;    
}

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
