const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({ id: {type: Number, unique: true, indexed: true}, title: String, artist: String, year: String })

const Album = mongoose.model('Album', albumSchema)

async function dbSeeder() {
    const data = await Album.find();
    if (data.length !== 0) {
        return;
    }
    const seedVals = {first: new Album({id: 1, title: 'Nevermind', artist: 'Nirvana', year: '1991'}),
    second: new Album({id: 2, title: 'And Justice For All', artist: 'Metallica', year: '1988'}),
    third: new Album({id: 3, title: 'Achtung Baby', artist: 'U2', year: '1991'})};

    await seedVals.first.save()
    await seedVals.second.save()
    await seedVals.third.save()
}

module.exports = { Album, dbSeeder }