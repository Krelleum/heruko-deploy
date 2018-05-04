const http = require('http');
const app = require('./app');

const port = 5000;

const server = http.createServer(app);








server.listen(process.env.PORT || 5000);
