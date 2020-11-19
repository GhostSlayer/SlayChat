const express = require('express');
const app = express();

const logger = require('./utils/logger');
const morgan = require('morgan');
const chalk = require('chalk');
const uuid = require('uuid');

const port = 3000 || 3001;

app.use(morgan(`${chalk.cyan('[HTTP]')} ${chalk.green(':method :url - IP :remote-addr - Code :status - Size :res[content-length] B - Handled in :response-time ms')}`))

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/public/index.html');
});

server = app.listen(port, () => logger.log('Listening on the port ' + port, { color: 'green', tags: ['Server'] }));
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  io.emit('chat message', 'A user has joined the chat');
  logger.log('A user has joined the chat', { color: 'green', tags: ['Socket'] })

  socket.on('disconnect', () => {
    io.emit('chat message', 'A user has left the chat');
    logger.log('A user has disconnected from the chat', { color: 'red', tags: ['Socket'] })
  });

  socket.on('chat message', (msg) => {
    // block the message if there is nothing
    if (!msg) return;

    logger.log('Received a message! ' + msg , { color: 'green', tags: ['Socket'] })
    io.emit('chat message', msg);
  });
})