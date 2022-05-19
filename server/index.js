const express = require('express'),
    server = express(),
    mongodb = require('mongodb').MongoClient,
    url ='mongodb://localhost:27017',
    port = 3001;
    
server.use(express.json());

server.get('/chat', function(req, resp){
    resp.send('Hola Mundo');
});

server.get('/usuarios', function(req, resp){
    mongodb.connect(url,function(err,client){
        if(err) resp.send(err);
        const db = client.db('prueba');
        db.collection('usuarios').find().toArray(function(err,data){
            if(err) resp.send(err);
            resp.send(data);
        });
    });
    
});

server.listen(port, function(event){
    console.log('Server running on port 3001');
});