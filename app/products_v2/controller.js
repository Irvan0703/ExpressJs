const { Op } = require('sequelize');
const Product = require('./model');
const fs = require('fs');
const path = require('path');

const store = async(req, res) =>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    
    if (image){
        const target = path.join(__dirname,'../../uploads',image.originalname);
        fs.renameSync(image.path,target);
    }
    try {
        await Product.sync();
        await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`});
        res.json({
            "message": "Product Created"
        });
    } catch(e) {
        res.send(e);
    }
}

const view = async(req, res) =>{
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
              }
        });
        res.send(product[0]);
    } catch (err) {
        console.log(err);
    }
}

const index = async(req, res) =>{
    const {search} = req.query;
    let exec = {};
    if (search){
        exec = {
            where:{
                name:{
                    [Op.like]: `%${search}%`
                }
            }
        }
    }
 
    try {
        const product = await Product.findAll(exec);
        res.send(product);
    } catch (err) {
        console.log(err);
    }
}

const update = async(req, res) =>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let dataQuery = {};
    
    if (image){
        const target = path.join(__dirname,'../../uploads',image.originalname);
        fs.renameSync(image.path,target);
        dataQuery = {users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`}
    } else {
        dataQuery = {users_id, name, price, stock, status}
    }
    try {
        await Product.sync();
        await Product.update(dataQuery, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch(e) {
        res.send(e);
    }
}

const destruct = async(req, res) =>{
    try {
         await Product.destroy({
            where: {
                id: req.params.id
              }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    store,
    view,
    index,
    update,
    destruct
}