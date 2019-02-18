const express = require('express');
const multer = require('multer');
const app = express();

app.use(express.static(__dirname + '/build'));
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {

        console.log(file);
        // callback(null, file.fieldname + '-' + Date.now() + file.mimeType);
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single('userPhoto');

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.post('/api/photo', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end('Error uploading file.');
        }
        res.end('File is uploaded');
    });
});

app.listen(3000, function () {
    console.log('Working on port 3000');
});