'use strict';
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const appRoot = require('app-root-path').path;
const multer = require('multer');
const config = require('./config');
const chalk = require('chalk');
const morgan = require('morgan');
import {logger} from './logger';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//get the config variables
//const config = require('./config/environment')

//Start the Adapter services
//require('./adapters/adapterMongo');

//Setup server
const app = express();
//Morgan Log
app.use(
    //Log requests
    morgan(':method :url :status :response-time ms - :res[content-length]', {
        stream: logger.stream
    })
    );
app.use(compression());
app.use(cors());
//set directory where the uploaded files are stored
app.use(multer({ dest: './uploads/' }).single('photo'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(expressValidator());
app.use(cookieParser());
app.use(passport.initialize());



import {serverRoutes} from './routes';
serverRoutes(app);

//Start server
app.listen(config.port, config.host, () => {
    // Logging initialization
    console.log('--');
    console.log(chalk.green(config.app.title));
    console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
    console.log(chalk.green('Port:\t\t\t\t' + config.port));
    console.log(chalk.green('Database:\t\t\t\t' + config.db.uri));
    if (process.env.NODE_ENV === 'secure') {
        console.log(chalk.green('HTTPs:\t\t\t\ton'));
    }
    console.log('--');
    logger.info('logger')

});

