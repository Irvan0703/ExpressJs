const router = require('express').Router();


router.get('/', (req, res)=>{
    res.send({
        status:'Successfully',
        message: 'Selamat datang di Express Js',
        view:'Jika ingin menampilkan gambar maka pada url harus ditambah  /public/pic.jpg',
        data: 'Jika ingin menampilkan data maka setelah url harus ditambah /api/v3/product'
    })
})

module.exports = router;