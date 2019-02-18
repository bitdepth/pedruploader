const dbInstance = require('./db.js').instance;

const getPhotos = () => {

    return dbInstance
        .then(db => db.collection('photos'))
        .then(col => {
            return col.find({})
                // .limit(10)
                .toArray()
                .then(photos => {
                    return photos;
                })
        })
        .catch(err => {
            Promise.reject(err);
        });
};

const addPhoto = (photo) => {

    return dbInstance
        .then(db => db.collection('photos'))
        .then(col => {
            return col.insertOne(photo)
                .then(result => {
                    return result.insertedCount;
                });
        })
        .catch(err => {
            Promise.reject(err);
        });
}


module.exports = {
    addPhoto: addPhoto,
    getPhotos: getPhotos
};