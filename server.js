import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';

import ReactDOMServer from 'react-dom/server';
import App from './src/App';

const handleRender = ( req, res ) => {
	const html = ReactDOMServer.renderToString( <App/> );

	fs.readFile( './public/index.html', 'utf8', ( err, data ) => {
		if (err) throw err;

		// Replace this div with the one containing the html.
		const document = data.replace( /div id="app"><\/div>/, `<div id="app">${html}</div>` );

		// Sends the response back to the client
		res.send( document );
	} )
};

const app = express();

// Serve built files with static files middleware
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000);
