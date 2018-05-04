const http = require('http');
const app = require('./app');

const port = 5000;

const server = http.createServer(app);





server.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


server.listen(process.env.PORT);


