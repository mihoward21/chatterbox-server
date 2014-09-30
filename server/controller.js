

module.exports.get = function(req, res, headers){
  res.writeHead(200, headers);

}
module.exports.post = function(req, res, headers, results, textfile){
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


