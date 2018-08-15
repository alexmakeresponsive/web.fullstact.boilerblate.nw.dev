var formFields  = require('./dist/backend/data/formfields');
var artistsData = require('./dist/backend/data/artists');


var idGenerator = require('./logic/idgenerator');
var dynamicField = require('./logic/dynamicfield');


var express = require('express');
var app = express();

//config
//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




app.use(express.static(__dirname +'/assets'));
app.use(express.static(__dirname + '/design'));
app.use(express.static(__dirname + '/logic'));




//CRUD
//ADD
app.post('/artist/add', function (req, res) {

    console.log('ADD NEW ARTIST');

    var fields = req.body;

    var artist = {
        id: idGenerator(),
            name: fields.name,
        members: [
            fields.members
        ],
        website: fields.website,
        genres: [
            fields.genres
        ],
        origin: {
            country: fields.country,
            city: fields.city
        }
    };

    artistsData.push(artist);

    // console.log(artistsData);


    res.send('form sended ! Action method: ' + req.method);
});

//UPDATE
app.put('/artist/update', function (req, res) {

    console.log('UPDATE ARTIST');


    var fields = req.body;

    var artist = {
        id: Number(fields.id),
        name: fields.name,
        members: [
            fields.members
        ],
        website: fields.website,
        genres: [
            fields.genres
        ],
        origin: {
            country: fields.country,
            city: fields.city
        }
    };

    var findedArtistIndex = artistsData.findIndex(function (artistData) {
        return artistData.id === artist.id
    });

    artistsData[findedArtistIndex] = artist;

    res.send('form sended ! Action method: ' + req.method);
});

//DELETE
app.delete('/artist/delete', function (req, res) {

    console.log('DELETE ARTIST');

    var artistId = req.body.id;

    // console.log(artistId);

    var findedArtistIndex = artistsData.findIndex(function (artistData) {
        return artistData.id === artistId
    });

     artistsData.splice(findedArtistIndex, 1);

     console.log(artistsData);

    res.status(200).send('Artist # ' + artistId + ' deleted! Action method: ' + req.method);
});








//Templates
app.set('views', './frontend/');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');






//Routes
app.get('/', function (req, res) {
    res.render('index', {
        page: 'index'
    });
});

app.get('/artists', function (req, res) {

    // dynamicField();
    var tableArtistsEmptyTextDisplay;

    if( artistsData.length !== 0 ) {
        tableArtistsEmptyTextDisplay = 'none'
    } else {
        tableArtistsEmptyTextDisplay = 'block'
    }

    console.log(artistsData.length);

    res.render('artists', {
        page: 'artists',
        artists: artistsData,
        tableArtistsEmptyText: {
            display: tableArtistsEmptyTextDisplay
        }
    });
});

app.get('/artist/:id', function (req, res) {

    var artistId = Number(req.params.id);

    var artist;
    var pageContent;

    // console.log(artistId);

    if (isNaN(artistId)) {
        artist = {
            id: 'new',
            name: '',
            members: [],
            website: '',
            genres: [],
            origin: {
                country: '',
                city: ''
            }
        };

        pageContent = {
            formTitle: 'Add new Artist',
            butonText: 'Add',
            buttonAction: 'add'
        }
    }

    if (!isNaN(artistId)) {
        artist= artistsData.find(function (artist) {
            return artist.id === artistId
        });

        pageContent = {
            formTitle: 'Edit Artist # ' + artistId,
            butonText: 'Update',
            buttonAction: 'update'
        }
    }



    console.log('returned artist = ', artist);

    res.render('artists-single', {
        page: 'artist',
        artist: artist,
        formFields: formFields,
        pageContent: pageContent

    });
});

// console.log(artistsData);





//Open port for ewb browsers
app.listen(3000, function () {
    console.log('app.js listen:');
    console.log('http://localhost:3000');
});
