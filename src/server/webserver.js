/*
 * (C) Copyright IBM Corporation 2019
 * U.S. Government Users Restricted Rights:	 Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
'use strict';


const http         = require ('http');
const express      = require ('express');
const bodyParser   = require ('body-parser');


const DEFAULT_PORT = 3005;
class WebServer
{
	constructor (port)
	{
		this.app = express();

		this.app.use(bodyParser.text ());
		this.app.use(bodyParser.json ());

		this.app.all('*', (req, res, next) => 
		{
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Headers', '*');
			res.set('Access-Control-Allow-Methods', '*');

			next();
		});

		/* START SERVER */
		this.server = http.createServer();
		this.port	= port || DEFAULT_PORT;
	}

	getApp()
	{
		return this.app;
	}

	start ()
	{
		this.server.on('request', this.app);
		this.server.listen(this.port, '0.0.0.0', () =>
		{
			console.info ("server starting on ", this.port);
		});
	}
}
module.exports = WebServer;

