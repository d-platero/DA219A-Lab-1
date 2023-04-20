require('dotenv').config()
const express = require("express")
const app = express()
const db = require('./model')
const mongoose = require("mongoose");

app.use(express.json())

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

app.get('/api/albums', async (req,res) => {   // GET ALL
    res.json(await db.find())
})