const MONGO_URL = 'mongodb://localhost:27017/photoalbum';
const MongoClient = require('mongodb').MongoClient;

const connect = function () {
    return MongoClient.connect(MONGO_URL)
        .then(function (client) {
            console.log('Muy Bueno! - Mongo connection established.')
            return client.db('photoalbum');
        })
        .catch(err => {
            console.log(err);
        });
}

const instance = connect();

const close = function () {
    return instance.then(function (inst) {
        inst.close();
    }).then(function () {
        console.log('Hasta Luego Mongo');
    });
}

module.exports = {
    instance: instance,
    close: close
};
