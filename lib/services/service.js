const pluralize = require('pluralize');
import BaseService from './baseService';
import AdapterMongo from '../data_adapters/adapterMongo';


/*
	index() // GET with no this.params.id
	show() // GET with a this.params.id
	create() // POST
	update() // PUT
	destroy() // DELETE
*/

class Service extends BaseService {
    constructor(adapter, name) {
        super(adapter);
        this._collection = pluralize(name);
    }

    async index() {
        try {
            return await this._adapter.loadMany(this._collection, {});
        } catch (err) {
            throw err;
        }

    }

    async show(id) {
        try {
            return await this._adapter.loadOne(this._collection, {
                _id: id
            });
        } catch (err) {
            throw err;
        }

    }

    async create(values) {

    }

    async update(id, values) {

    }

    async destroy(id) {

    }



}

export let service = new Service(AdapterMongo.init(), 'image');
