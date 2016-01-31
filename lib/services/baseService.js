const pluralize = require('pluralize');



/*
	index() // GET with no this.params.id
	show() // GET with a this.params.id
	create() // POST
	update() // PUT
	destroy() // DELETE
*/

export default class BaseService{
	constructor(adapter,name,collection){
		console.log('constructor BaseService');
		this._adapter=adapter;
		this._name=name;
		if(!collection){
			this._collection=pluralize(name);
		}else{
			this._collection=collection;
		}
	}

	async loadMany (){
		try{
			return await this._adapter.loadMany(this._collection,{});
		}catch(err){
			throw err;
		}

	}

	async loadOne (id){
		try{
			return await this._adapter.loadOne(this._collection,{_id:id});
		}catch(err){
			throw err;
		}
	}

	async save (values){
		try{
			return await this._adapter.save(this._collection,values);
		}catch(err){
			throw err;
		}
	}

	async update (id,values){
		try{
			return await this._adapter.save(this._collection,values,id);
		}catch(err){
			throw err;
		}
	}

	async delete (id){
		try{
			return await this._adapter.delete(this._collection,id);
		}catch(err){
			throw err;
		}
	}

}