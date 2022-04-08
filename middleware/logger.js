const log = (res, req, next) =>{
    console.log( new Date().toLocaleDateString());
    next();
}

module.exports = log;