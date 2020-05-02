const express = require('express')
const app = express()
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser')
let dbName = "portfolio"
let db
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    db = client.db(dbName)
})
app.use(cors())
app.use(bodyParser.json())
app.post('/postQuery', (req, res) => {
    const { title, description, userName } = req.body
    db.collection('stories').insertOne({ title, description, userName }, (err, result)=>{
        if (err) res.send(err)
        if (result) {
            if (err) res.send(err)
            res.send("Successfully posted")
        }
    })
})
app.get('/getStories',(req,res)=>{
    db.collection('stories').find({}).toArray(function(err,result){
        if(err) res.send(err)
        if(result){
            res.send(result)
        }
    })
})
const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log("port listening on", PORT) })