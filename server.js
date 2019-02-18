const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const store = require('./store');

app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/build'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now() + file.mimeType);
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('userPhoto');

app.get('/api/photos', function (req, res) {
    // res.send(JSON.stringify({ a: 1 }));
    store.getPhotos()
        .then(data => res.json(data))
        .catch(err => res.send(err));
    // res.sendFile('index.html');
});


app.post('/api/photo', function (req, res) {
    upload(req, res, function (err) {

        if (err) {
            return res.send('Error uploading file.');
        }

        store.addPhoto({
            fileName: req.file.filename,
            caption: req.body.caption
        }).then(() => {
            res.send('File is uploaded');
        }).catch(err => {
            res.send(err);
        });
    });
});

app.listen(3000, function () {
    console.log('Working on port 3000');
});