const app = require('../app');
const debug = require('debug')('expressMailer:server');
const http = require('http');

//get port
let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//create http server

let server = http.createServer(app);

//listen on port

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//normalize a port into a number, string, or false.

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)){
    return val//named pipe
  }
  if (port >= 0){
    return port;
  }

  return false;
}

//event listener for http server "error" event.
function onError(error){
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe' + port
    : 'Port' + port;

  //handel specific listen errors with frendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is alredy in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//event listener for http server 'listening' event
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
