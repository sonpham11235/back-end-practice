"use strict"

const controller = require('./src/Controller')
const restify = require('restify');
const errors =require('restify-errors');
const port = process.env.PORT||3000;
var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
    res.send('user api: /categories');
});

server.get('/categories', (req,res,next) => {
    res.send(controller.getAll());
    return next();
})

server.get('/categories/:id', (req,res,next) => {
    if(!req.params.id){
        return next(new errors.BadRequestError());
    }

    try {
        const product = controller.getById(+req.params.id);
        res.send(product);
        return next();
    } catch(error) {
        return next (new errors.NotFoundError(error));
    }
});

server.post('/categories', (req,res,next) => {
    if(!req.body || !req.body.name || !req.body.id){
        return next(new errors.BadRequestError());
    }

    controller.create(+req.body.id,req.body.name);
    res.send('ok');
    return next();
})

server.put('/categories/:id', (req,res,next) => {
    if (!req.params.id || !req.body || !req.body.name) {
        return next(new errors.BadRequestError());
    }

    try {
        const product = controller.update(+req.params.id,req.body.name);
        res.send(product);
        return next();
    } catch(error) {
        return next(new errors.NotFoundError(error));
    }
})

server.del('/categories/:id', (req,res,next) => {
    if(!req.params.id ){
        return next(new errors.BadRequestError());
    }

    try{
        controller.del(+req.params.id);
        res.send('delete');
        return next();
    } catch(error) {
        return next(new errors.NotFoundError(error));
    }
});

server.listen(port, function() {
    console.log('%s listening at %s', server.name, port);
});