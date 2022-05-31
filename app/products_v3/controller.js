const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const fs = require('fs');
const path = require('path');

const index = (req, res) =>{
    const {search} = req.query;
    let exec = {};

    if (search){
    exec={name: { $regex: `.*${search}.*`}}
    }

    db.collection('products').find(exec)
     .toArray()
     .then(result => res.send(result))
     .catch(error => res.send(error))
}

const view = (req, res) =>{
    const {id} = req.params;
    db.collection('products').findOne({_id: ObjectId(id)})
     .then(result => res.send(result))
     .catch(error => res.send(error))
}

const store = (req, res) =>{
    console.log(req.body)
    const {name, price, stock, status} = req.body;
    
    const image = req.file;
    console.log(image);
    if (image){
        const target = path.join(__dirname,'../../uploads',image.originalname);
        fs.renameSync(image.path,target);
        
        db.collection('products').insertOne({name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
          .then(result => { 
            res.send(result)
        })
          .catch(error => res.send(error))
    } else {
        db.collection('products').insertOne({name,price,stock,status,image_url:''})
            .then(result => {
                res.send(result); 
            })
            .catch(error => res.send(error))
    }
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

    db.collection('products').updateOne({_id: ObjectId(id)},{$set: dataQuery})
          .then(result => res.send(result))
          .catch(error => res.send(error))
}

const destruct = (req, res) =>{
    const {id} = req.params;
    db.collection('products').deleteOne({_id: ObjectId(id)})
     .then(result => res.send(result))
     .catch(error => res.send(error))
}

module.exports = {
    index,
    view,
    store,
    update,
    destruct
}