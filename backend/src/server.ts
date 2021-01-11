// Patches
import { inject, errorHandler } from "express-custom-error"
inject(); // Patch express in order to use async / await syntax

// Require Dependencies
import env from "mandatoryenv"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
// Load .env Enviroment Variables to process.env

env.load([
    'PORT',
    'SECRET'
]);


const { PORT } = process.env;
// Instantiate an Express Application

const app = express();

import news from './news.ctrl';
app.use('/api/news', news.list);
app.use('/api/news/:id', news.detail);


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));


app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})

// Open Server on configurated Port

app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);