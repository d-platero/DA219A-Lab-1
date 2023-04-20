const mongoose = require('mongoose')

const albumSchema = new Schema({ id: Number, title: String, artist: String })

module.exports = mongoose.model('Album', albumSchema)