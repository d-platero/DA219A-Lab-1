require('dotenv').config()
const express = require("express")
const app = express()
const db = require('./model.js')
const mongoose = require("mongoose");
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded())

app.use(cors({ 
  origin: "http://127.0.0.1:3000", 
})) 


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
      res.status(404).json(error.message)
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
    res.json(error.message)
  }
})

app.post('/api/albums/', async (req, res) => { // Create new album
  try {
    console.log('test')
    var data = new db.Album({id: req.body.id, title: req.body.title, artist: req.body.artist, year: req.body.year})
    console.log('here')
    console.log(data)
    if (await db.Album.find({id: req.body.id}) != 0){
      res.status(409).json({error: 'Album already in database'})
    }
    else {
      await data.save()
      console.log(data)
      res.status(201).json(data)
    }  
}
  catch(error){
    res.status(400).json(error.message)
  }
})

// TODO: Maybe implement this as a redirect? 
app.put('/api/albums/:id&:title&:artist&:year', async (req, res) => {  // Update album, create if not exists
  console.log('test')
  try{
    if (await db.Album.findOne({id: req.params.id}).exec() == 0){
      // render new form?
      var data = new db.Album({id: req.params.id, title: req.params.title, artist: req.params.artist, year: req.params.year})
      await data.save()
      res.status(201).json({message: 'Album not found, creating new one'})
      res.json(data)
    }
    else // If album exists
    { 
      var data = new db.Album({id: req.params.id, title: req.params.title, artist: req.params.artist, year: req.params.year})
      await data.save()
      res.status(200).json(data)
    }
  }
  catch(error){
    res.status(400).json(error.message)
  }
})

app.delete('/api/albums/:id', async (req, res) => { // Delete
  try{
    var data = await db.Album.findOneAndDelete({id:req.params.id})
    if(data.length == 0){
      res.status(404).json({message: 'No album matching that ID'})
    }
    else{
      res.status(200).json(data)
    }
  }
  catch(error){
    res.json(error.message)
  }
})

app.listen(3000)
// TODO: Prepared statements for input