import sc2 from 'sc2-sdk'

const VueSteemConnect = {
  install (Vue, _options) {
    const options = Object.assign({}, _options, {
      scope: _options.scope || ['vote', 'comment']
    });

    Vue.prototype.$steemconnect = sc2.Initialize({
      app: options.app,
      callbackURL: options.redirectUrl,
      scope: options.scope || ['vote', 'comment']
    })
  }
}

export default VueSteemConnect
