const Product = require('./model');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');

const store = (req, res) =>{
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if (image){
        const target = path.join(__dirname,'../../uploads',image.originalname);
        fs.renameSync(image.path,target);
        
        Product.create({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
          .then(result => res.send(result))
          .catch(error => res.send(error))
    } else {
        Product.create({name, price, stock, status, image_url: ``})
          .then(result => res.send(result))
          .catch(error => res.send(error))
    }
}

const index = (req, res) =>{
    const {search} = req.query;
    let exec = {};

    if (search){
        exec={name: { $regex: `.*${search}.*`}}
    }
    
    Product.find(exec)
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const view = (req, res) =>{
    const {id} = req.params;
    
    Product.findById({_id: ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const update = (req, res) =>{
    const {name, price, stock, status} = req.body;
    const image = req.file;
    let dataQuery = {};
    const {id} = req.params;

    if (image){
        const target = path.join(__dirname,'../../uploads',image.originalname);
        fs.renameSync(image.path,target);
        dataQuery = {name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`}
    } else {
        dataQuery = {name, price, stock, status}
    }

    Product.updateOne({_id: ObjectId(id)},{$set: dataQuery})
          .then(result => res.send(result))
          .catch(error => res.send(error))
}

const destruct = (req, res) =>{
    const {id} = req.params;
 
    Product.deleteOne({_id: ObjectId(id)})
     .then(result => res.send(result))
     .catch(error => res.send(error))
}

module.exports = {
    store,
    index,
    view,
    update,
    destruct
}