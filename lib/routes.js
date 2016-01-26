'use strict';
import {imageService} from './services/image';

const baseUrl='images';

export function serverRoutes(app) {


    // Insert routes below
    app.get('/', function(req,res){res.send('ok ciao')});
    app.get('/api', async function(req,res){
    	let values=await imageService.find();
    	res.send(values)

    });
};
