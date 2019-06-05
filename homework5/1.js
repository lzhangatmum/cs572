const express = require('express');
const { from }= require('rxjs');
const { shareReplay } = require('rxjs/operators');
const axios = require('axios');
const url = require('url');

const app = express();
let cnt  = 0 ;
const apiURL ="https://randomuser.me/api/?results=10&page=";

app.disable('x-powered-by');
app.enable('strict routing');
app.enable('case sensitive routing');

const getFullUrl = function(req,page){
  return url.format({
    protocol :req.protocol,
    host :req.get('host'),
    pathname: req.originalUrl,
    query:page
  });
}

app.get('/users/:page',(req,res)=>{
    const pageIndex = parseInt(req.query.page|| req.params.page || 0 );
    from(axios.get(apiURL+pageIndex)).pipe(shareReplay(1))
          .subscribe(randomuserlist =>{
            res.set('Cache-Control','private,max-age=86400')
            .links({
              next: getFullUrl(req,{page: pageIndex+1}),
              first:getFullUrl(req,{page: 0})
            })
            .json(randomuserlist.data);
          })
});

app.get('/test',(req,res)=>{
  console.log(`id param= ${req.query.ID}, count = ${cnt}`);
  cnt++;
  res.json({executionCount: cnt})
})

app.listen(8888, () => console.log("Server Started Successfully."))
