'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sc2Sdk = require('sc2-sdk');

var _sc2Sdk2 = _interopRequireDefault(_sc2Sdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueSteemConnect = {
  install: function install(Vue, _options) {
    var options = Object.assign({}, _options, {
      scope: _options.scope || ['vote', 'comment']
    });

    Vue.prototype.$steemconnect = _sc2Sdk2.default.Initialize({
      app: options.app,
      callbackURL: options.redirectUrl,
      scope: options.scope
    });
  }
};

exports.default = VueSteemConnect;