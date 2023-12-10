const http = require('http'),
   url = require('url'),
    fs = require('fs');


http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    let filepath = ' ';

    if(parseUrl.pathname.includes(documentation)){
        filepath =  'documentation.html';
    }else{
        filePath = 'index.html';
    }
const logMessage = 'Requsted URL: ${req.url} - Timestamp: ${new Date().toISOString()}\n';
fs.appendFile('log.txt', logmessage, (err) => {
    if(err){
        console.log(err);
    }

    fs.readFile(filePath, (err, data) => {
        if(err){
            throw err;
        }
        res.writeHead(404);
        res.end("error 404: Resource not found")
        res.writeHead(dat200, {'Content-Type': 'text/html'});
        res.end(data);
    });

}).listen(8080,() => {
    console.log('Server running at port 8080');
})})