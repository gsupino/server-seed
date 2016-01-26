import AdapterMongo from '../data_adapters/adapterMongo';

class Image{
	constructor(adapter){
		this._adapter=adapter;
	}

	async find(){
		try{
			return await this._adapter.loadMany('images',{});
		}catch(err){
			throw err;
		}

	}
}

export let imageService=new Image(AdapterMongo.init());
