const express  = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;

const client =  new mongoClient('mongodb://localhost:27017',{ useNewUrlParser: true });
const grades = require("/Users/zhangziyi/Desktop/NewTaskList/cs572/homework7/q1.js");

const logFileStream = fs.createWriteStream(
  path.join(__dirname,'access.log'),{encoding: 'utf8'});
const app  = express();
let db = null;
app
    .use(cors())
    .use(logger('common',{stream:logFileStream}))
    .use(helmet())
    .use(express.json())
    .use( async (req,res,next) => {
      if(!db){
        await client.connect()
        db = client.db('homework7');
      }
      req.db = db;
      next();
    });

app
    .post('*',(req,res,next)=>{
      try{
        JSON.parse(JSON.stringify(req.body));
        next();
      }catch(err){
        res.status(506).send('JOSN body has error');
      }
});

app.use(grades);
app.get('/',(req,res,next)=> res.redirect('/grades'));
app.listen(8080, () => console.log("Listening on 8080."));
