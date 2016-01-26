const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;
import IDatabaseAdapter from './IDatabaseAdapter';

/*
find
findOneAndDelete
findOneAndReplace
findOneAndUpdate

options:{
    sort: name field whit - sign for desc
    skip: number
    limit: number:
    fields: {name:1}

}

*/
let istance = null;

export default class AdapterMongo extends IDatabaseAdapter {

    constructor(db) {
        super();
        this._db = db;
    }

    static init(db) {
        if (!istance) {
            istance = new AdapterMongo(db);
            console.log('new istance')
        } else {
            console.log('old istance')

            return istance;
        }


    }

    static async connect(url, options) {
        if (typeof(options) === 'undefined') {
            options = {};
        }
        try {
            return await MongoClient.connect(url, options);
        } catch (err) {
            throw err;
        }

    }

    async save(collection, values, id) {
        try {
            const col = this._db.collection(collection);
            // TODO: I'd like to just use update with upsert:true, but I'm
            // note sure how the query will work if id == null. Seemed to
            // have some problems before with passing null ids.
            if (_.isUndefined(id)) {
                let result = await col.insertOne(values);
                if (!result.hasOwnProperty('insertedId') || result.insertedId === null) {
                    throw (new Error('Save failed to generate ID for object.'));
                }
                return result;
            } else {
                id = castId(id);
                return await col.updateOne({
                    _id: id
                }, {
                    $set: values
                });
            }
        } catch (err) {
            throw err;
        }

    }

    async delete(collection, id) {
        id = castId(id);
        try {
            const col = this._db.collection(collection);
            let cursor = await col.deleteOne({
                _id: id
            }, {
                w: 1
            });
            return cursor.deletedCount;
        } catch (err) {
            throw err;
        }
    }

    async deleteOne(collection, query) {
        query = castQueryIds(query);
        try {
            const col = this._db.collection(collection);
            let cursor = await col.deleteOne(query, {
                w: 1
            });
            return cursor.deletedCount;
        } catch (err) {
            throw err;
        }
    }

    async deleteMany(collection, query) {
        query = castQueryIds(query);
        try {
            const col = this._db.collection(collection);
            let cursor = await col.deleteMany(query, {
                w: 1
            });
            return cursor.deletedCount;
        } catch (err) {
            throw err;
        }
    }



    async loadOne(collection, query, projection) {
        query = castQueryIds(query);
        try {
            const col = this._db.collection(collection);
            let cursor = await col.find(query, projection).limit(1);
            return cursor.next();
        } catch (err) {
            throw err;
        }

    }



    async loadMany(collection, query, options = {}) {
        query = castQueryIds(query);
        console.log('entra')


        try {
            const col = this._db.collection(collection);
            let cursor = col.find(query);
            cursor = this._optionsToCursor(cursor, options);
            return await cursor.toArray();
        } catch (err) {
            throw err;
        }

    }


    async count(collection, query) {
        query = castQueryIds(query);
        try {
            const col = this._db.collection(collection);
            return await col.count(query);
        } catch (err) {
            throw err;
        }
    }

    //TODO : permit more fields i sort

    _optionsToCursor(cursor, options) {
        if (typeof options.sort === 'string') {
            let sortOrder = 1;
            if (options.sort[0] === '-') {
                sortOrder = -1;
                options.sort = options.sort.substring(1);
            }
            let sortOptions = {};
            sortOptions[options.sort] = sortOrder;
            cursor = cursor.sort(sortOptions);
        }
        if (typeof options.skip === 'number') {
            cursor = cursor.skip(options.skip);
        }
        if (typeof options.limit === 'number') {
            cursor = cursor.limit(options.limit);
        }
        if (_.isObject(options.fields)) {
            cursor = cursor.project(options.fields);
        }

        return cursor;
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
