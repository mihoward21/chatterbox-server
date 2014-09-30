module.exports.get = function(req, res, headers){
  headers['Content-Type'] = 'application/json';
  res.writeHead(200, headers);
}
module.exports.post = function(req, res, headers, results, textfile){
  headers['Content-Type'] = 'application/json';
  res.writeHead(201, headers);
  req.on('data', function(chunk) {
        results.push(JSON.parse(chunk.toString()));
        textfile.appendFile("./test.txt", chunk.toString());
  });
}
module.exports.option = function(req, res, headers){
  var statusCode = 200;
  res.writeHead(200, headers);
  return res.end('');
}
module.exports.getFile = function(req, res, headers, fileName, fileObject){
  if(fileName === 'styles.css'){
    headers['Content-Type'] = 'text/css';
    res.writeHead(200, headers);
    res.write(fileObject.styles);
  }
  if(fileName === 'app.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.app);
  }
  if(fileName === 'rooms.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.rooms);
  }
  if(fileName === 'config.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.config);
  }
  if(fileName === 'messages.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.messages);
  }
  if(fileName === 'underscore-min.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.underscore);
  }
  if(fileName === 'jquery.min.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.jquery);
  }
  if(fileName === 'backbone.js'){
    headers['Content-Type'] = 'application/javascript';
    res.writeHead(200, headers);
    res.write(fileObject.backbone);
  }
}


