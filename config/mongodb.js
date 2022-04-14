const {MongoClient} = require ('mongodb');

const url = 'mongodb://user_latihan:123456@localhost:27017?authSource=admin';
const client = new MongoClient(url);

(async() =>{
    try {
        await client.connect();
        console.log('Koneksi berhasil');
    } catch(e) {
        console.log(e);
    }
})();

const db = client.db('eduwork_native');

module.exports = db;