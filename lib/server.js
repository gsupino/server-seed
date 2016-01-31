'use strict';

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const morgan = require('morgan');

import {
    logger
}
from './logger';
import AdapterMongo from './data_adapters/adapterMongo';
//import {serverRoutes} from './routes';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//init config file
const config = require('./config');

//connect to database
AdapterMongo.connect(config.db.uri,config.db.options).then(function(db) {
    AdapterMongo.init(db);
    //Setup server
    const app = express();

    //Morgan Log
    app.use(
        //Log requests
        morgan(':method :url :status :response-time ms - :res[content-length]', {
            stream: logger.stream
        })
    );

    //Middleware
    app.use(compression());
    app.use(cors());
    //set directory where the uploaded files are stored
    app.use(multer({
        dest: './uploads/'
    }).single('photo'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());

    //initialize the routes
    require('./routes').serverRoutes(app);

    //Start server
    app.listen(config.port, config.host, (err) => {
        if (err) {
            logger.error(err);
        } else {
            logger.info('server listening on %s: %s', config.host, config.port);
        }
    });



})
