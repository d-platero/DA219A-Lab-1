const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({ id: {type: Number, unique: true, indexed: true}, title: String, artist: String })

const Album = mongoose.model('Album', albumSchema)

async function dbSeeder() {
    const data = await Album.find();
    if (data.length !== 0) {
        return;
    }
    const seedVals = {first: new Album({id: 1, title: 'Nevermind', artist: 'Nirvana'}),
    second: new Album({id: 2, title: 'And Justice For All...', artist: 'Metallica'}),
    third: new Album({id: 3, title: 'Achtung Baby', artist: 'U2'})};

    await seedVals.first.save()
    await seedVals.second.save()
    await seedVals.third.save()
}

module.exports = { Album, dbSeeder }