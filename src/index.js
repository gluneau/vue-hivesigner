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
  }
}

export default VueSteemConnect
