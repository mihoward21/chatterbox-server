/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var exports = module.exports = {};
//file for router methods
var controller = require('./controller.js');
//used to parse the request url
var url = require('url');
//For writing data to file
var fs = require('fs');
//Object and array to store data
var results = [];
var test = {
    "results": results
};
//router to handle different request url's and methods
var routes = {
      classes: {
        'GET': controller.get,
        'POST': controller.post,
        'OPTIONS': controller.option
      }
};

exports.handleRequest = function(request, response) {
  var urlString = url.parse(request.url).path.split('/')[1];
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  //Call the appropriate router method or return a 404 for a bad url
  if(routes[urlString]!== undefined){
    routes[urlString][request.method](request, response, headers, results, fs);
  }else{
    response.writeHead(404, headers);
    return response.end('');
  }
  console.log("Serving request type " + request.method + " for url " + request.url);
  response.end(JSON.stringify(test));
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
