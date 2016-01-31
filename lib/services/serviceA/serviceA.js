import BaseService from '../baseService';
import AdapterMongo from '../../data_adapters/adapterMongo';


/*
	index() // GET with no this.params.id
	show() // GET with a this.params.id
	create() // POST
	update() // PUT
	destroy() // DELETE
*/

class ServiceA extends BaseService {
    constructor(adapter, name,collection) {
		console.log('constructor ServiceA');
        super(adapter,name,collection);
    }


}

export let serviceA = new ServiceA(AdapterMongo.init(), 'image');
