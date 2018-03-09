const express = require('express');
const controller = require('./controller')
const server = express();

const PORT = 3030;

server.use(controller);

server.listen(PORT);
