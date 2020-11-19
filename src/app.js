const express = require('express');
const app = express();

const logger = require('./utils/logger');
const port = 3000 || 3001

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  logger.log('Listening on the port ' + port, { color: 'green', tags: ['Server'] })
});