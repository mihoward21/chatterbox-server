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
//Files the html page will need to load
var requiredFiles = {
  index : fs.readFileSync("../client/index.html"),
  styles : fs.readFileSync("../client/styles/styles.css"),
  app : fs.readFileSync("../client/scripts/app.js"),
  config : fs.readFileSync("../client/scripts/config.js"),
  messages : fs.readFileSync("../client/scripts/messages.js"),
  underscore : fs.readFileSync("../client/bower_components/underscore/underscore-min.js"),
  jquery : fs.readFileSync("../client/bower_components/jquery/jquery.min.js"),
  backbone : fs.readFileSync("../client/bower_components/backbone/backbone.js"),
  rooms : fs.readFileSync("../client/scripts/rooms.js")
}

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
      },
      client: {
        'GET': controller.getFile
      }

};

exports.handleRequest = function(request, response) {
  var urlString = url.parse(request.url).path.split('/')[1];
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/html";

  //Call the appropriate router method to handle message data
  if(urlString === 'classes'){
    routes[urlString][request.method](request, response, headers, results, fs);
    return response.end(JSON.stringify(test));
  //Call the router method for fetching the appropriate file
  }else if(urlString === 'client'){
    var file = url.parse(request.url).path.split('/');
    var lastFile = file[file.length-1];
    routes[urlString][request.method](request, response, headers, lastFile, requiredFiles);
    return response.end();
  } else if (urlString === /^\?username.\w+/){
    console.log('username');
  }
  console.log(urlString);
  console.log("Serving request type " + request.method + " for url " + request.url);
  //Send back the html, should only get to this line on page load
  response.end(requiredFiles.index);
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
