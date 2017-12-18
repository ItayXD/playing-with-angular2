const express = require ('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

//requring axios (only because we are using dummy content  normall would conect to db)
const axios = require('axios');
const url = 'https://jsonplaceholder.typicode.com';


// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });


// module.exports = router;

module.exports = function(app, config) {
	
	/*
	 |--------------------------------------
	 | Authentication Middleware
	 |--------------------------------------
	 */
	const jwtCheck = jwt({
		secret: jwks.expressJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
		}),
		audience: config.AUTH0_API_AUDIENCE,
		issuer: `https://${config.AUTH0_DOMAIN}/`,
		algorithm: 'RS256'
	});

	/*
	 |--------------------------------------
	 | API Routes
	 |--------------------------------------
	 */
	app.get('/api', (req, res) => {
		res.send('API works');
	});

	/*
	 |--------------------------------------
	 | OLD
	 |--------------------------------------
	 */
	app.get('/api/posts', (req, res) => {
		axios.get(`${url}/posts`)
		.then( posts => {
			res.json(posts.data).status(200);
		})
		.catch( err =>{
			res.send(err).status(500);
		});
	});

};