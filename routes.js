const fs = require('fs');
const { request } = require('http');

const requestHandler = (req, res) => {

    const url = req.url; 
    const method = req.method;

    if(url==='/'){
        res.write('<html>'); 
        res.write('<head><title>Enter Message</title></head>'); 
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
    
        return res.end(); 
    }
    
    if(url==='/message' && method==='POST' ){
        const body = [];
        req.on('data', (chunk) =>{
            body.push(chunk); 
            console.log(chunk);
        }); 
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();   
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message, (err) => err && console.error(err)); 
        });
        res.statusCode = 302; 
        res.setHeader('Location', '/');
        return res.end();
    }   
    
    res.write('<html><head><title>Bhanu</title><body><h1>Hello!!</body></html>');
    res.end();
}

module.exports = requestHandler; 
