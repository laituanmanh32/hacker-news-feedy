"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Patches
var express_custom_error_1 = require("express-custom-error");
express_custom_error_1.inject(); // Patch express in order to use async / await syntax
// Require Dependencies
var mandatoryenv_1 = __importDefault(require("mandatoryenv"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
// Load .env Enviroment Variables to process.env
mandatoryenv_1.default.load([
    'PORT',
]);
var PORT = process.env.PORT;
// Instantiate an Express Application
var app = express_1.default();
var news_ctrl_1 = __importDefault(require("./news.ctrl"));
app.use('/api/news/:id', news_ctrl_1.default.detail);
app.use('/api/news', news_ctrl_1.default.list);
// Configure Express App Instance
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan_1.default('dev'));
app.use(cookie_parser_1.default());
app.use(cors_1.default());
app.use(helmet_1.default());
// This middleware adds the json header to every response
app.use('*', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});
// Handle errors
app.use(express_custom_error_1.errorHandler());
// Handle not valid route
app.use('*', function (req, res) {
    res
        .status(404)
        .json({ status: false, message: 'Endpoint Not Found' });
});
// Open Server on configurated Port
app.listen(PORT, function () { return console.info('Server listening on port ', PORT); });
