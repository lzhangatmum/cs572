const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const config = require("./config");

const client = new MongoClient(config.dbUrl, { useNewUrlParser: true });

const app = express();
let db = null;

app
    .use(cors())
    .use(express.json())
    .use(async (req, res, next) => {
        if (!db) {
            await client.connect()
            db = client.db(config.db);
        }
        req.db = db;
        next();
    })

app.post('/locations/add', async (req, res, next)=>{
    const collection = req.db.collection(config.collection);
    // if(Array.isArray(req.body)){
    //     req.body.forEach(async (loc)=> await collection.save(loc));
    // }
    // else await collection.save(req.body);
    await collection.insert(req.body);
    res.status(200).end();
})

app.get('/locations/find/:category/:name?', async (req, res, next)=>{
    try{
        let criteria = {'location': {$near: [config.mumLocation.longitude, config.mumLocation.latitude]}, 'category': req.params.category};
        if(req.params.name) criteria['name'] = {$regex: `.*${req.params.name}.*`};
        const locations = await req.db.collection(config.collection)
        .find(criteria, {limit: 3})
        // .find({location: {$near: [-91.9665342, 41.017654]}})
        // .limit(3)
        // .project({name: 1, 'location': 1, _id: 0})
        // .sort({"name": -1, "_id": -1})
        .toArray();

        res.json(locations);
    }catch (err){
        next(err);
    }
});

app.get("*", (err, req, res, next) => {
    res.json(err);
});
