const express = require('express');
const router = express.Router();

const path ='/lectures';

router.get(path,async(req,res,next)=>{
    const page =((req.query.page || 1)-1) *10;
    const lectures = await req.db.collection('lectures')
    .find({},{'skip' : page ,"limit":5}).toArray();
    res.json(lectures);
})


router.get(`${path}/:id` ,  async (req,res,next)=>{
  console.log(req.params.id);
  const lecture = await req.db.collection('lectures')
  .findOne({'_id':req.params.id});
  if(lecture) res.json(lecture);
  else res.send(404,req.params.id+' note found');
});


router.get(`${path}/search/:q`, async (req,res,next)=>{
    const lecture =  await req.db.collection('lectures')
    .find({'lecture':{$regex :`.*${req.params.q}.*`}}).toArray();
});


router.post(path ,  async(req,res,next)=>{
    await req.db.collection('lectures').save(req.body);
    res.status(201).end();
});

router.delete(`${path}/:d`, async (req,res,next)=>{
    await req.db.collection('lectures').remove({'_id':req.params.id});
    res.status(200).end();
});


module.exports = router;
