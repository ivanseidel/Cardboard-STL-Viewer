var request = require('request');
var express = require('express');
var app = express();

var port = process.env.PORT || 8090;

app.set('port', port);

app.use(express.static('./'));

console.log('Lifted on port '+port);

// responde com "hello world" quando uma requisição com método GET é feita à home page
app.get('/proxy', function(req, res) {


	var url = req.originalUrl.replace('/proxy?', '');
	console.log(url);

	request(url, function (error, response, body) {
		if(error){
			return res.status(500).send(error);
		}
		res.status(response.statusCode).send(body);
		// if (!error && response.statusCode == 200) {

			// console.log(body) // Show the HTML for the Google homepage.
		// }else{
		  // res.status(500).send('Could not load URL: '+url);
		// }
	})
});

app.listen(app.get('port'));