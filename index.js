'use strict'

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const Vision = require('Vision')
const server = new Hapi.Server();


server.register([Inert, Vision]);
server.connection({ 
    host: 'localhost',
    port: process.env.PORT || 9000,
})

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './client'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
  method: 'GET',
  path: '/{filename*}',
  handler: {
    directory: {
      path:    __dirname + '/arquivos',
      listing: false,
      index:   false
    }
  }
});

server.start((err) => {
    if (err) {
        throw err;     
    }
    console.log('Port: ',server.info.port);
});