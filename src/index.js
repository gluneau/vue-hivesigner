import sc2 from 'sc2-sdk'

const VueSteemConnect = {
  install(Vue, _options) {
    const options = Object.assign({}, _options, {
      scope: _options.scope || ['vote', 'comment']
    })

    const api = sc2.Initialize({
      app: options.app,
      callbackURL: options.callbackURL,
      scope: options.scope || ['vote', 'comment']
    })

    Vue.prototype.$steemconnect = api
    // setting the api directly as the value does not work, methods are removed (why? serialization?)
    Vue.SteemConnect = () => {
      return api;
    }

    // store module
    Vue.SteemConnectStore = {
      state: {
        user: null // steemconnect user
      },
      getters: {
        user (state) {
          return state.user
        }
      },
      mutations: {
        login (state, user) {
          state.user = user
        },
        logout (state) {
          state.user = null
        }
      },
      actions: {
        login ({ commit, dispatch, state }) {
          return new Promise((resolve, reject) => {
            // user will be set, when coming from auth page
            // but not if accessed this page directly
            if (!state.user) {
              // in that case we look for an access token in localStorage
              const accessToken = localStorage.getItem('access_token')
              if (accessToken) {
                // set access token and try to fetch user object
                Vue.SteemConnect().setAccessToken(accessToken)
                Vue.SteemConnect().me((err, user) => {
                  if (err) reject(err)
                  else {
                    // save user object in store
                    commit('login', user)
                    resolve()
                  }
                })
              }
            }
          })
        },
        logout ({ commit }) {
          // remove access token and unset user in store
          localStorage.removeItem('access_token')
          commit('logout')
        }
      }
    }
  }
}

export default VueSteemConnect