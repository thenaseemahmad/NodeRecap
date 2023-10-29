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



function pgselectQuery(selectQuery, fn){
    const db = new pg.Client({
        user:'postgres',
        host:'localhost',
        database:'my_pgdb',
        password:'Mbappe@143',
        port:5432,
    });
    db.connect();
    db.query(selectQuery,function(err, res){
        if(err){
            console.error("Error in query execution, ", err.stack);
            fn(err.message);
        }
        else{
            //console.log(res.rows);
            fn(res.rows);
        }
        db.end();         
    });      
}

function pginsertintoQuery(insertQuery, callback){
    const db = new pg.Client({
        user:'postgres',
        host:'localhost',
        database:'my_pgdb',
        password:'Mbappe@143',
        port:5432,
    });
    db.connect();
    db.query(insertQuery,function(err, res){
        if(err){
            console.error("Error in query execution, ", err.stack);
            callback(err.message);
        }
        else{
            //console.log(res.rows);
            callback(res.message);
        }
        db.end();         
    });
}

app.get('/',(req, res)=> {
    //res.sendFile(__dirname+"/public/index.html");
    // const rows = pgselectQuery('select * from public.my_first_postgres_table',function(returnVal){
    //     console.log(returnVal);
    // });

    const insertedRows = pginsertintoQuery("INSERT INTO my_first_postgres_table	VALUES (4, 'Ahmad Kabeer', '24/Feb/1997');",function(res){
        console.log(res);
    })
       
});

app.listen(port, ()=> {
    console.log('Server is running on 3000');
});
