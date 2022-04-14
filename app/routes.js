const router = require('express').Router();


router.get('/', (req, res)=>{
    res.send({
        status:'Successfully',
        message: 'Selamat datang di Express Js',
        view:'Jika ingin menampilkan gambar maka pada url harus ditambah  /public/pic.jpg',
        data: 'Jika ingin menampilkan data maka setelah url harus ditambah /data'
    })
})

router.get('/data', (req, res)=>{
    res.send({
        status:'Successfully',
        "_id": "625635b7570781d72f3719c2",
		"name": "Laptop Asus",
		"price": 14000000,
		"stock": 10,
		"status": true
    })
})

module.exports = router;