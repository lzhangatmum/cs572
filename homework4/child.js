
const fs = require("fs");
const path = require("path");

process.on("message", (data)=>{

    const fullFilePath = path.join(__dirname, JSON.parse(data).filePath);

    const rs = fs.createReadStream(fullFilePath, { highWaterMark: 16 * 1024 });

    rs
    .on("data", chunck=>{
        //console.log(chunck);
        process.send({type: "chunk-ready", data: chunck.toString('utf8')});
    })
    .on("end", data=>{
        process.send({type: "file-end"});
    })
})
