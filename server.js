const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const cwd = 'docs';

module.exports = http.createServer(function (request, response) {
    
    console.log('Received request for URL: ' + request.url);

    var filePath = request.url.split("?").shift()

    if (filePath == '/') {
        filePath = cwd + '/index.html';
    }
    else {
        filePath = cwd + filePath;
    }

//    var extname = path.extname(filePath);

    fs.readFile(filePath, null, function(error, data){
        
        if(error){
            response.writeHead(404);
            response.write('File not found.');
        }
        else{
//            switch (extname) {
//                case '.html':
//                    response.writeHead(200, {'Content-Type': 'text/html'});
//                    break;
//                case '.js':
//                    response.writeHead(200, {'Content-Type': 'text/javascript'});
//                    break;
//                case '.css':
//                    response.writeHead(200, {'Content-Type': 'text/css'});
//                    break;
//                default:
//                    response.writeHead(200);
//                    break;
//            }
            response.writeHead(200);
            response.write(data);
        }
        
        response.end();
    });
    
});