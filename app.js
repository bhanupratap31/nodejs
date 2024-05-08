const http = require('http'); 
const fs = require('fs'); 

const server = http.createServer((req,res)=>{
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
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message); 
        });

        res.statusCode = 302; 
        res.setHeader('Location', '/');
        return res.end();
    }   

    res.write('<html><head><title>Bhanu</title><body><h1>Hello!!</body></html>');
    res.end();
}); 

server.listen(3000);