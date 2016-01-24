const MongoClient = require('mongodb').MongoClient
import AdapterMongo from './adapterMongo';


async function main() {
    let db = await AdapterMongo.connect('mongodb://localhost:27017/mariabakery-dev');
    let adapterMongo = new AdapterMongo(db);

    /*
        TEST FIND
    */
    /*
    let startDate=new Date;
    let res=await adapterMongo.loadMany('ingredients',{foodGroup:'0800'},{limit:1000,fields:{foodGroup:1}});
    console.log(new Date-startDate);
    console.log(res)
    */



    /*
        TEST SAVE
    */

    /*
    let resSave=await adapterMongo.save('test',{a:1,titolo:'questo è un altro test'});
    //let resSave=await adapterMongo.save('test',{a:3},'569be52f8d0237f5173ca2b2');
    console.log(resSave.insertedId);
    */
    /*
        TEST DELETE
    */
    /*
    let resDelete=await adapterMongo.delete('test',resSave.insertedId);
    console.log('--')
    console.log(resDelete)
    */

   




    //console.log(res)
    db.close();
}





main()
