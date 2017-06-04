'use strict';

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _auth = require('./config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Connect to mongoose
_mongoose2.default.connect(_auth.databaseUrl);

// Server static files 
var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);

// Configure middleware
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _expressSession2.default)({ secret: 'wolololo', resave: false, saveUninitialized: true }));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// Configure routes
(0, _router2.default)(app);

// Server setup
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  return console.log('Listening on ' + app.get('port'));
});