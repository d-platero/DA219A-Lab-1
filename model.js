const mongoose = require('mongoose')

module.exports = { Album };

const albumSchema = new Schema({ id: Number, title: String, artist: String })
const Album = mongoose.model('Album', albumSchema)