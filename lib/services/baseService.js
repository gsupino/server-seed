


/*
	index() // GET with no this.params.id
	show() // GET with a this.params.id
	create() // POST
	update() // PUT
	destroy() // DELETE
*/

export default class BaseService{
	constructor(adapter){
		this._adapter=adapter;
	}

	async index (){
		try{
			return await this._adapter.loadMany('images',{});
		}catch(err){
			throw err;
		}

	}

	async show (id){

	}

	async create (values){

	}

	async update (id,values){

	}

	async destroy (id){

	}



}