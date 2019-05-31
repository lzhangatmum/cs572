const http  = require('http');
const fs = require('fs');
const cluster = require('cluster');
const {fork}  = require('child_process');
const url = require('url');

const querystring = require('querystring');



http.createServer(function(req,res){
    let str = querystring.parse(url.parse(req.url).query);
    console.log(str);
    let data =fs.readFileSync('./test.txt','utf-8',function(err,data){
      if(err != null) return;
    });
    console.log(data);
}).listen(4000,()=>console.log("listen"));



function readFile(name,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write('<h1>NodeJs</h1>');
  let data =fs.readFileSync(name,'utf-8',function(err,data){
    if(err != null) return;

  });
  console.log(data);

}
