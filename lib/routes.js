'use strict';
import {imageService} from './services/image';
import controller from './services/controller';
console.log(controller)
const baseUrl='images';

export function serverRoutes(app) {


    // Insert routes below
    app.get('/', function(req,res){res.send('ok ciao')});
    app.get('/api', controller.index);
};
