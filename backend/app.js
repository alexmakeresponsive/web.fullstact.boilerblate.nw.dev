var data = {
    pages: {
      works: require('./data/works')
    }
};



var express = require('express');
var app = express();

//config
//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




app.use( express.static(__dirname +'/../public') );

// console.log( __dirname +'/../public' );


//CRUD




//Templates
app.set('views', __dirname + '/templates/');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');






//Routes
app.get('/', function (req, res) {
    res.render('home', {
        page: 'Home page'
    });
});

app.get('/works', function (req, res) {

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

app.get('/works/:id', function (req, res) {

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
