import https from "https";
import express from 'express';

const app = express();
app.get("/",function(req,res){
    //here is the const that will contain the api detail
    const options = {
        hostname:"bored-api.appbrewery.com",
        path: "/random",
        method:"GET"
    };

    //here to make request 
    const  request = https.request(options,function(response){
        let data = "";
        response.on("end",()=>{
            try{
                const result = JSON.parse(data);
                console.log(result)

            }
            catch(erro){
                console.error("Failed to parse response: ", erro.message);
            }
        })
    })

    request.on("error", function(error){
        console.error("Failed to make request: ", error.message);
    });

    request.end
})
