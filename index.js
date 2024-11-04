var http = require("http");
const databaseC = require('./Helpers/database.js');
// ADD THIS
var cors = require('cors');
const express = require("express");
const app = express();
app.use(express.json());
db_C = new databaseC();
//Newtwork
const PORT = process.env.PORT 



app.use(cors());
//get a distinctList of items from the Db based on a specific Key
app.get("/distinctList", async (request, response) => {
   

    var result = await db_C.getdistinctlistbyKey(request.query.keyString);
    if ( result)
    {
        response.send(result);
    }
    else
    {
        const status= { "Status" : "No Connection"};
        response.send(status);
    }
   
});


//get a search of items from the Db based on a specific Key
app.get("/search", async(request, response) => {

    var searchString = "hat";
    var maxString = 10;
    
    try{
       searchString = request.query.searchString;    
    } catch(e) {};

    try{
        maxString = request.query.maxLimit;        
     } catch(e) {};
 
    var result = await db_C.getProductListBySearch(searchString,maxString);
    if ( result)
    {
        response.send({Data: result});
    }
    else
    {
        const status= { "Status" : "No Connection"};
        response.send(status);
    }
   
});


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
    console.log("Database URL",process.env.DB_URI )
    console.log("Data Language (if not detectable by DeepL):", process.env.DATA_LANG)
    console.log("Make change to ENV file and restart server inorder to apply new values to running process")
  });