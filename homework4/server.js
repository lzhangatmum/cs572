const { Subject } = require("rxjs");
const http = require("http");
const { fork } = require("child_process");
const url = require("url");

const subject = new Subject();

subject.subscribe((ctx) => {
    if (ctx.req.url.indexOf("filename") < 0) return;
    console.log(ctx.req.url);
    const filePath = url.parse(ctx.req.url, true).query.filename;

    const childProcess = fork("child.js");
    childProcess.send(JSON.stringify({ "filePath": filePath }));
    childProcess.on("message", (msg) => {
        if (msg) {
            switch (msg.type) {
                case "chunk-ready":
                  console.log(msg.data);
                    ctx.res.write(msg.data)
                    break;
                case "file-end":
                    ctx.res.end()
                    break;
            }
        }
    });
});

http.createServer((req, res) => {
    subject.next({ req, res });
    const pid = process.pid;
    console.log(`Handled by process ${pid}`);
}).listen(8888, () => console.log("Server Started Successfully."))
