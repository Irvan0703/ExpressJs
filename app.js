require('./config/mongoose')
const express = require('express');
const app = express();
const path = require('path');
//const productRouter = require('./app/products/routes');
//const productRouterV2 = require('./app/products_v2/routes');
const productRouterV3 = require('./app/products_v3/routes');
const productRouterV4 = require('./app/products_v4/routes');
const logger = require('morgan');
const router = require('./app/routes')

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(router)
//app.use('/api/v1', productRouter);
//app.use('/api/v2', productRouterV2);
app.use('/api/v3', productRouterV3);
app.use('/api/v4', productRouterV4);
app.use((req,res, next) => {
    res.status(404);
    res.send({
        status:'Failed',
        message: 'Resource '+ req.originalUrl +' Not Found'
    });
    next();
})
app.listen(process.env.PORT || 3000, () => console.log('Server: http://127.0.0.1:3000'))