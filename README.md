# VueSteemConnect

This plugin provides a very simple way to integrate Steemconnect in your Vue.js project. It also provides a Vuex module to handle the user object and login/logout.

```
npm i --save vue-steemconnect
```

```
import Vue from 'vue'
import VueSteemConnect from 'vue-steemconnect'

Vue.use(VueSteemConnect, {
  app: 'appname',
  callbackURL: 'http://localhost:3000'
  scope: ['vote', 'comment']
})

Vue.SteemConnect.getLoginURL()
Vue.SteemConnect.vote(...)
Vue.SteemConnect.comment(...)
```

```
// in component
this.$steemconnect.getLoginURL()
this.$steemconnect.vote(...)
this.$steemconnect.comment(...)
...
```

## Store Module

If you're using Vuex, this plugin provides a module to handle login and logout.

```
import Vue from 'vue'

const store = new Vuex.Store({
  state: {
    ...
  },
  modules: {
    steemconnect: Vue.SteemConnectStore
  }
})
```

Now you can access the user object like this:

```
// in component
this.$store.state.steemconnect.user

// or if you want to use the mapGetters helper
computed: {
  ...mapGetters('steemconnect', ['user'])
} 
```

To login/logout use:
```
this.$store.dispatch('steemconnect/login')
this.$store.dispatch('steemconnect/logout')
```

#### Nuxt.js

*~/plugins/vue-steemconnect.js:*

```
import Vue from 'vue'
import VueSteemConnect from 'vue-steemconnect'

Vue.use(VueSteemConnect, {
  app: 'mkt.test',
  callbackURL: 'http://localhost:3000/auth',
  scope: ['vote', 'comment']
})
```

*~/nuxt.config.js*

```
plugins: [
  '~/plugins/vue-steemconnect'
],
```
