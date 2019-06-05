const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('paht');

const grades = require('./q1');

const logFileStream = fs.createWriteStream(path.join(_dirname,'access.log'),{encodings(:'utf-8')});

const app =  express();

app.use(logger('common',{stream :logFileStream}))
    .use(helmet())
    .use(express.json())
app.post('*',(req,res)=>{
  try{
    JSON.parse(JSON.stringify(req.body));
    next();
  }catch(err){
    res.status(506).send("body has some err")
  }
})

app.use(grades);

app.get('/',(req,res,next)=> res.redirect('/grades'));

app.listen(8080 , ()=> console.log('listen 8080'));
