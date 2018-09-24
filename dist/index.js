'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sc2Sdk = require('sc2-sdk');

var sc2 = require('sc2-sdk');


var VueSteemConnect = {
  install: function install(Vue, _options) {
    var options = Object.assign({}, _options, {
      scope: _options.scope || ['vote', 'comment']
    });

    var api = sc2.Initialize({
      baseURL: options.baseURL || 'https://steemconnect.com',
      app: options.app,
      callbackURL: options.callbackURL,
      scope: options.scope || ['vote', 'comment']
    });

    Vue.prototype.$steemconnect = api;
    // setting the api directly as the value does not work, methods are removed (why? serialization?)
    Vue.SteemConnect = function () {
      return api;
    };

    // store module
    Vue.SteemConnectStore = {
      namespaced: true,
      state: {
        user: null, // steemconnect user
        accessToken: null // steemconnect access token
      },
      getters: {
        user: function user(state) {
          return state.user;
        },
        accessToken: function accessToken(state) {
          return state.accessToken;
        }
      },
      mutations: {
        login: function login(state, user) {
          state.user = user;
        },
        logout: function logout(state) {
          state.user = null;
        },
        setAccessToken: function setAccessToken(state, accessToken) {
          state.accessToken = accessToken;
        }
      },
      actions: {
        login: function login(_ref) {
          var commit = _ref.commit,
              dispatch = _ref.dispatch,
              state = _ref.state;

          return new Promise(function (resolve, reject) {
            // don't do anything if user data is already set
            if (!state.user) {
              // in that case we look for an access token in localStorage
              var accessToken = localStorage.getItem('access_token');
              if (accessToken) {
                // set access token and try to fetch user object
                Vue.SteemConnect().setAccessToken(accessToken);
                Vue.SteemConnect().me(function (err, user) {
                  if (err) reject(err);else {
                    // save user object in store
                    commit('login', user);
                    commit('setAccessToken', accessToken);
                    resolve();
                  }
                });
              }
            }
          });
        },
        logout: function logout(_ref2) {
          var commit = _ref2.commit;

          // remove access token and unset user in store
          localStorage.removeItem('access_token');
          commit('logout');
          commit('setAccessToken', null);
        }
      }
    };
  }
};

exports.default = VueSteemConnect;