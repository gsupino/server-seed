import BaseController from './baseController';

import service from './service';

/*
definire qui i propri controller
la classe eredita dal padre i metodi CRUD standard
*/
class Controller extends BaseController{
	constructor(service){
		super(service);
	}


}

export let controller = new Controller(service);
