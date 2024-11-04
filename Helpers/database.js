
const { MongoClient } = require('mongodb');
const translate = require('@iamtraction/google-translate');

const clientDB = new MongoClient(process.env.DB_URI || "mongodb://localhost:27017/local");
const dbcollectioName = process.env.COLLECTION_NAME 
const conslelog = process.env.CONSOLE_LOG;
const dblog = process.env.DB_LOG;
const datatrans = process.env.DATA_TRANSLATE;
const datalang = process.env.DATA_LANG;

class databaseC
{
    constructor()
    {

    }

    async sanitizeSearch(searchString)
    {
        if (datatrans == 1)
        {
             translate(searchString, { from: 'en', to: datalang }).then(res => {
              console.log(res.text);
              return(res.text);
              }).catch(err => {
                console.error(err);
              });
        }
        return searchString;
    }

    //log handler
    clog(functionname,  logString, logtype="info")
    {
        if(conslelog)
            console.log(functionname + ":" + logtype + ":" + logString);
        if(dblog)
        {
            //log to db here
        }
    }


    //Check if the DB Connection exists
    checkConnected = async function() {
        this.clog("checkConnected", "start");
        if (!clientDB) {
            return false;
        }
    
        let res;
    
        try {
            res = await clientDB.db("admin").command({ ping: 1 });
        } catch (err) {
            this.clog("checkConnected", err, "error");
            return false;
        }
        this.clog("checkConnected",Object.prototype.hasOwnProperty.call(res, 'ok') && res.ok === 1);
        return Object.prototype.hasOwnProperty.call(res, 'ok') && res.ok === 1;
    }

    //Function to connect to datbase. Return true if successful, false if not
    connectToDb = async function () {
        this.clog("checkConnected","Lets Connect to:" + process.env.DB_URI);

        await clientDB.connect();
        try {
            if (await this.checkConnected()) {
                this.clog("checkConnected","Connected to DB");
                return true;
            }
        }
        catch (e) {
            this.clog("checkConnected","Connection to DB failed:" + e, "error");
            return false;
        }

    } //connectToDb

    //Get the distinct list of items by thier key
    getdistinctlistbyKey = async function (keyString)
    {
        this.clog("getdistinctlistbyKey", keyString);
        if (await this.connectToDb())
        {
            this.clog("getdistinctlistbyKey","Calling DB");
            try{
                var result = await clientDB.db().command({distinct: dbcollectioName, key:await this.sanitizeSearch(keyString)});
            }
            catch (e)
            {
                result = null;
            }
            this.clog(result);
            return result; 
        }
        else
        {
            this.clog("getdistinctlistbyKey","Error Connecting to the Database", "error");
            exit(1);
        }
    } //getGarmentList

    //get product list search results
    getProductListBySearch = async function (searchString, maxLimit)
    {
        this.clog("getProductListBySearch", searchString);
        if (await this.connectToDb())
        {
            this.clog("getProductListBySearch","Calling DB");
                try {    
                        var result = await clientDB.db().command(
                            {
                                find: dbcollectioName,
                                filter: {$text: { $search: await this.sanitizeSearch(searchString)}},
                                projection: { _id: 1, gender:1, name: 1, product_id: 1,product_title: 1,product_description: 1, price:1, images:1, currency_code:1},
                                limit : parseInt(maxLimit)
                            
                            }
                        );
                        this.clog("getProductListBySearch",result.cursor);
                        return result.cursor.firstBatch; 
                }
                catch(e)
                {
                    this.clog("getProductListBySearch",e, "error");
                    return null;
                }
        }
        else
        {
            this.clog("getProductListBySearch","Error Connecting to the Database", "error");
            return null;
        }
    } //getGarmentList
} //class

module.exports = databaseC;