require('dotenv').config()
const express = require("express")
const app = express()
const db = require('./database')
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = process.env.CONNECTION_URL

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}