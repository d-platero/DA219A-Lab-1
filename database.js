const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')
const bcrypt = require('bcrypt')


db.serialize(async () => {
  db.run(`CREATE TABLE IF NOT EXISTS albums (id TEXT PRIMARY KEY, title TEXT, artist TEXT)`)

  let input = [[`1`, `Nevermind`, `Nirvana`], 
  [`2`, `Achtung Baby`, `U2`], 
  [`3`, `Post`, `Björk`]]

})

module.exports = { db, verifyUser, userExists, registerUser };


async function verifyUser(userId, password){
    return new Promise((resolve, reject) => {
    let stmt = db.prepare(`SELECT users.password FROM users WHERE (?)=users.userID AND (?)=users.password`)
    stmt.get([userId, password], (err, row) => {
        resolve(row)
    })
    stmt.finalize()
})
}

async function userExists(userName){
    return new Promise((resolve, reject) => {
        let stmt = db.prepare(`SELECT users.name FROM users WHERE (?)=users.name`)
        stmt.get(userName, (err, row) => {
            resolve(row)
        })
        stmt.finalize()
    })
}

async function registerUser(userID, role, userName, password){
    return new Promise((resolve, reject) =>{
        let stmt = db.prepare(`INSERT INTO users(userID, role, name, password) VALUES ((?), (?), (?), (?))`)
        stmt.run([userID,role,userName,password], (err, row) => {
            resolve(row)
        })
        stmt.finalize()
    })
}

async function getUserRole(userName){
    return new Promise((resolve, reject) => {
        let stmt = db.prepare(`SELECT users.role FROM users WHERE (?)=users.name`)
        stmt.get(userName, (err, row) => {
            resolve(row)
        })
        stmt.finalize()
    })
}