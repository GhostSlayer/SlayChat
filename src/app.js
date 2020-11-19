const express = require('express');
const app = express();

const logger = require('./utils/logger');
const morgan = require('morgan');
const chalk = require('chalk');

const port = 3000 || 3001;

app.use(morgan(`${chalk.cyan('[HTTP]')} ${chalk.green(':method :url - IP :remote-addr - Code :status - Size :res[content-length] B - Handled in :response-time ms')}`))

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  logger.log('Listening on the port ' + port, { color: 'green', tags: ['Server'] })
});