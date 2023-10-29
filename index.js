import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import pg from "pg";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('combined'));
const port = 3000;

//watch this video to install postgresql server and desktop gui 
//https://youtu.be/tducLYZzElo?si=cua3uidvbndtV16K

//following are the commands to access postgres shell
//1. sudo -i -u postgres
//2. psql
//3. psql -d my_pgdb <-- my_pgdb is a database here

//postgreSql pool connection


function pgselectQuery(selectQuery){
    const db = new pg.Client({
        user:'postgres',
        host:'localhost',
        database:'my_pgdb',
        password:'Mbappe@143',
        port:5432,
    });
    db.connect();
    db.query(selectQuery,(err, res)=>{
        if(err){
            console.error("Error in query execution, ", err.stack);
        }
        else{
            console.log(res.rows);
        }
        db.end();
    });    
}

app.get('/',(req, res)=> {
    //res.sendFile(__dirname+"/public/index.html");
    pgselectQuery('select * from public.my_first_postgres_table');   
});

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
