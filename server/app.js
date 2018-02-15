/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const querystring = require('querystring');
const cors = require('cors');
const asyncHandler = require("express-async-handler");
const PortfolioController = require('./controllers/portfolio')
const HoldingsController = require('./controllers/holdings')
const ProfilesController = require('./controllers/profiles')
dotenv.load({ path: '.env' });
/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true })
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

/**
 * Express configuration.
 */

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'secretstuff',
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true,
    clear_interval: 3600
  })
}));
app.use(cors())
app.use(flash());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/portfolio', PortfolioController.getPortfolio)
app.post('/portfolio', PortfolioController.createPortfolio)
app.get('/portfolio/:id', PortfolioController.getPortfolioById)
app.put('/portfolio/:id', PortfolioController.updatePortfolio)
app.delete('/portfolio/:id', PortfolioController.deletePortfolio)


app.get('/portfolio/:id/holdings', HoldingsController.getHoldings)
app.get('/portfolio/:id/holdings/:symbol', HoldingsController.getHoldingById)
app.post('/portfolio/:id/holdings', HoldingsController.postHolding)
app.put('/portfolio/:id/holdings', HoldingsController.updateHolding)
app.delete('/portfolio/:id/holdings', HoldingsController.deleteHolding)

app.get('/service/profiles', ProfilesController.getProfiles)
app.post('/service/profiles', ProfilesController.postProfiles)
/**
 * Error Handler.
 */

app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
