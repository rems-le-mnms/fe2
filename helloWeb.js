var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs=require('fs');


var page1 = fs.readFile('./path/to/page.html', function (err, html) {
	if(err) {
		throw err;
	} else {
		return html;
	}
}); 

var server = http.createServer(function(req,res) {
	var page = url.parse(req.url).pathname;
	if(page == '/') {
		res.end('<h1>Welcome page</h1>');
	} else if(page == '/path/to/page.html') {
		fs.readFile('./path/to/page.html', function (err, html) {
			if(err) {
				throw err;
			} else {
				res.end(html);
			}
		});
	} else if(page == '/about.html') {
		fs.readFile('./about.html', function (err, html) {
			if(err) {
				throw err;
			} else {
				res.end(html);
			}
		});
	} else if(page == '/today' ) {
		var now = new Date();
		res.end('<h1>Aujourd\'hui nous sommes le :</h1>'+ now);
	} else if (page == '/infos.html') {
		var attr = {};
		var params = querystring.parse(url.parse(req.url).query);

		attr['nom'] = params['name'];
		attr['v8'] = process.versions.v8;
		attr['node'] = process.versions.node;
		attr['url'] = url.parse(req.url).host + '' + page;
		attr['time'] = new Date();
		//attr['node'] = process.nodes.version;
		console.log(attr);
		for (var key in attr) {

		}
		fs.readFile('./infos.html', function (err, html) {
			if(err) {
				throw err;
			} else {
				var content = ("" + html).replace(/{name}/g, attr['nom']);7
				content = content.replace(/{v8}/g, attr['v8']);
				content = content.replace(/{node}/g, attr['node']);
				content = content.replace(/{url}/g, attr['url']);
				content = content.replace(/{time}/g, attr['time']);
				res.end(content);
			}
		});
	}
}).listen(1337);

