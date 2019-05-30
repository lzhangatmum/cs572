const http = require('http');
const fs = require('fs');
const config = require('./server-config');
const {Subject} = require('rxjs');
const path = require('path')



const subject  = new Subject();
const filePath = path.join(_dirname, config.filePath);

subject.subscribe(ctx => {
    if(ctx.req.url != '/sync') return;
    const fileData = fs.readFileSync(filePath);
    ctx.res.end(fileData);
})


subject.subscribe(ctx =>{
  if(ctx.req.url != '/async') return;
  fs.readFile(filePath,(err,buffer)=> err? ctx.res.status(404).end(not found) :      ctx.res.end(buffer);)
})


subject.subscribe(ctx => {
  if(ctx.req.url != '/stream' && ctx.req.url !='/') return;
  const readStream = fs.createReadStream(filePath,{highWaterMark : 16 *1024});
  readStream.on('open',()=> {readStream.pipe(ctx.res)});
  readStream.on('error', err=> res.end(err));
})

app = http.createServer((req,res)=>{
  subject.next({req,res});
}).listen(config.port,()=>config.log(0000))
