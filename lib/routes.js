'use strict';

const baseUrl='images';

export function serverRoutes(app) {


    // Insert routes below
    app.use('/', function(req,res){res.send('ok ciao')});
    app.use('/api', function(req,res){res.send('ok ciao')});
};
