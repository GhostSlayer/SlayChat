require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const logger = require('./utils/logger');
const morgan = require('morgan');
const chalk = require('chalk');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

app.use(morgan(`${chalk.cyan('[HTTP]')} ${chalk.green(':method :url - IP :remote-addr - Code :status - Size :res[content-length] B - Handled in :response-time ms')}`))

app.get('/', (req, res) =>{
  res.render(__dirname + '/views/index');
});

app.get('/chat', (req, res) =>{
  res.render(__dirname + '/views/chat');
});

server = app.listen(PORT, () => logger.log('Listening on the port ' + PORT, { color: 'green', tags: ['Server'] }));
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  // Send a message if user has joined the chat.
  socket.broadcast.emit('chat message', "Administration: A user has joined the chat");
  logger.log('A user has joined the chat', { color: 'green', tags: ['Socket'] })

  socket.on('disconnect', () => {
    socket.broadcast.emit('chat message', 'Administration: A user has left the chat');
    logger.log('A user has disconnected from the chat', { color: 'red', tags: ['Socket'] })
  });

  socket.on('chat message', (msg) => {
    // block the message if there is nothing
    if (!msg) return;

    logger.log('Received a message! ' + msg , { color: 'green', tags: ['Socket'] })
    io.emit('chat message', msg);
  });
})