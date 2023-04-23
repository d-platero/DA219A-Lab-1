require('dotenv').config()
const express = require("express")
const app = express()
const db = require('./model')
const mongoose = require("mongoose");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set("strictQuery", false);

const mongoDB = process.env.CONNECTION_URL

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

db.dbSeeder()

app.get('/', (req, res) =>{
    res.json({this: 'is a test, this should be a homepage'})
    })

app.get('/api/albums', async (req,res) => {   // GET all album data
    try {
      res.status(200).json(await db.Album.find())
    }
    catch(error){
      res.status(404).json(error)
    }
})

app.get('/api/albums/:title', async (req,res) => {   // POST route to get specific book
  try
  {
    var data = await db.Album.find({title: req.params.title})
    if (data.length == 0){
      res.status(404).json({error: 'Album not found'})
  } // if null return error and code 404
    
  else
  {    res.status(200).json(data)  // Model.find() returns even documents with duplicate album title

  }  
}
  catch(error){
    res.json(error)
  }
})

app.listen(3000)
// TODO: Prepared statements for input