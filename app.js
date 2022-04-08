const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const log = require('./middleware/logger');


app.use(log);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use((req,res, next) => {
    console.log(req.method, req.originalUrl);
    res.status(404);
    res.send({
        status:'Failed',
        message: 'Resource '+ req.originalUrl +' Not Found'
    });
    next();
})
app.listen(process.env.PORT || 3000, () => console.log('Server: http://127.0.0.1:3000'))