const MongoClient = require('mongodb').MongoClient
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

export default class AdapterMongo{

    constructor(db){
        this._db=db;
    }

    static async connect(url,options){
        if (typeof(options) === 'undefined') {
            options = { };
        }
        try{
            return await MongoClient.connect(url,options);
        }catch(err){
            throw err;
        }

    }

    async save(collection,id,values){
        
    }

    async delete(collection,id){
        
        
    }

    






    async count(collection, query){
        query=castQueryIds(query);
        try{
            const col=this._db.collection(collection);
            return await col.count(query);
        }catch(err){
            throw err;
        }
    }

}

var castId = function(val) {
    return new ObjectId(val);
};

var castIdArray = function(vals) {
    return vals.map(function(v) {
        return castId(v);
    });
};

var deepTraverse = function(obj, func) {
    for (var i in obj) {
        func.apply(this, [i, obj[i], obj]);
        if (obj[i] !== null && typeof(obj[i]) == 'object') {
            deepTraverse(obj[i], func);
        }
    }
};

/*
 * Traverses query and converts all IDs to MongoID
 *
 * TODO: Should we check for $not operator?
 */
var castQueryIds = function(query) {
    deepTraverse(query, function(key, val, parent) {
        if (key === '_id') {
            if (String(parent[key]).match(/^[a-fA-F0-9]{24}$/)) {
                parent[key] = castId(parent[key]);
            } else if (_.isObject(parent[key]) && _.has(parent[key], '$in')) {
                // { _id: { '$in': [ 'K1cbMk7T8A0OU83IAT4dFa91', 'Y1cbak7T8A1OU83IBT6aPq11' ] } }
                parent[key].$in = castIdArray(parent[key].$in);
            } else if (_.isObject(parent[key]) && _.has(parent[key], '$nin')) {
                // { _id: { '$nin': [ 'K1cbMk7T8A0OU83IAT4dFa91', 'Y1cbak7T8A1OU83IBT6aPq11' ] } }
                parent[key].$nin = castIdArray(parent[key].$nin);
            }
        }
    });

    return query;
};