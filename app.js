const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
 const db = require('./api/sequelize');
const config = require('./config');


const app = express();

app.use(helmet());
app.use(compression());
// app.use(express.static('public'));
// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({
	extended: false
}));

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// app.use(bodyParser.json());
app.set('trust proxy', true);
app.use('/parent', require('./api/routes/parent.route'));
app.use('/student', require('./api/routes/student.route'));
// app.use('/sum', require('./api/routes/sum.routes'));
// app.use('/celcius', require('./api/routes/celcius.routes'));
// app.use('/minute', require('./api/routes/minute.routes'));
// app.use('/table', require('./api/routes/table.routes'));
// app.use('/json', require('./api/routes/json.routes'));
// app.use('/city', require('./api/routes/city.routes'));
// app.use('/findcity', require('./api/routes/findcity.routes'));
// app.use('/FamilyTree', require('./api/routes/familytree.routes'));
// app.use('/deletemember', require('./api/routes/delete.routes'));
// app.use('/crud', require('./api/routes/crud.route'));








if (config.environment != 'test') {
	const swaggerUi = require('swagger-ui-express');
	const specs = require('./swagger');
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));
}

app.get('/', (req, res) => {
	const help = `
  <pre>
      Welcome to the API!
      Use an x-access-token header to work with your own data:
      fetch(url, { headers: { 'x-access-token': 'whatever-you-want' }})
      The following endpoints are available:
    </pre>`;
	res.send(help);
});

//Test database connection...
try {
	// db.authenticate().then(success => {
	// 	console.info('Connection has been established successfully. ', success);
	// }).catch(err => {
	// 	console.error('Error: ' + err);
	// });
} catch (err) {
	console.error('Unable to connect to the database:');
}

app.listen(config.port).on('listening', () => {
	// console.log(`API is live on ${config.port}`);
	console.info(`API is live on ${config.port}`);
});

module.exports = app;