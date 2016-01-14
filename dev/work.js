const MongoClient = require('mongodb').MongoClient
import  AdapterMongo from './adapterMongo';



async function main(){
    let db=await AdapterMongo.connect('mongodb://localhost:27017/mariabakery-dev');
    let adapterMongo= new AdapterMongo(db);
    let res=await adapterMongo.count('ingredients');


    console.log(res)
    db.close();
}





main()