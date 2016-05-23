let feathers = require('feathers');
let rest = require('feathers-rest');
let socketio = require('feathers-socketio');
let hooks = require('feathers-hooks');
let apiV1 = require('./api/v1');
let apiV2 = require('./api/v2');

// Initialize the application
let app = feathers()
  .configure(rest())
  .configure(socketio())
  .configure(hooks())
  // Initialize our API sub apps
  .use('/api/v1', apiV1)
  .use('/api/v2', apiV2)
  .use('/', feathers.static(__dirname + '/public'));


const v1MessageService = apiV1.service('messages');
v1MessageService.create({text: 'A v1 message'}, {}, function(){});

const v2MessageService = apiV2.service('messages');
v2MessageService.create({text: 'A v2 message'}, {}, function(){});

const server = app.listen(3030);

console.log('Feathers authentication app started on 127.0.0.1:3030');