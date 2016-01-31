'use strict';
//import {serviceA} from './services/serviceA/service';
import * as controllerA from './services/serviceA/controllerA';

let baseUrlServiceA='images';

export function serverRoutes(app) {

    // Insert routes below
    app.get('/', function(req,res){res.send('ok ciao')});

    app.get(`/${baseUrlServiceA}`, controllerA.index);
    app.post(`/${baseUrlServiceA}`, controllerA.create);
    app.get(`/${baseUrlServiceA}/:id`,controllerA.show);
    app.delete(`/${baseUrlServiceA}/:id`,controllerA.destroy);


};
