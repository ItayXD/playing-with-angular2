//require dependencies
const express        = require ('express');
const path           = require( 'path' );
const http           = require('http');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');
const cors           = require('cors');
//config
const config = require('./server/config')

//get api routes
const api = require('./server/routes/api');


/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */
mongoose.connect(config.MONGO_URI, { useMongoClient: true });
const monDb = mongoose.connection;

monDb.on('error', (err) => {
	console.error("Can't connect to MongoDB:", err)
});
monDb.once('open', function callback () {
	console.info('Connected to MongoDB:', config.MONGO_URI);
})
/*
 |--------------------------------------
 | App
 |--------------------------------------
 */
const app = express();
//parses req data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

//set static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//set api route
api(app, config);

//defualt send index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//get port from env and set in express, default to 3000
const port = process.env.PORT || 3000;
app.set('port', port);

//create the http server
const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));