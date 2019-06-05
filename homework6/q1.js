const express =  require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const path='/grades';
const grades = [{id: 1, name: "Asaad Saad", course: "CS572", grade: 95}];

app.get(path,(req,res,next)=>{
  res.json(grades);
});

app.post(paht, (req,res,next)=>{
  grades.push(req.body);
  res.status(201).end();
});

app.delete(`${paht}/:id` , (req,res,next)=>{
    const  gradeIndex = grades.map(g=> g.id ==req.params.id).indexOf(true);
    if(gradeIndex >= 0){
      grades.solice(gradeIndex,1);
      res.status(200).end();
    }
    else res.send(404 ,'grade not found');
});


module.exports = router;
