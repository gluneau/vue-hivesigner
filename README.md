# VueHiveSigner

This plugin provides a very simple way to integrate HiveSigner in your Vue.js project. It also provides a Vuex module to handle the user object and login/logout.

```
yarn add vue-hivesigner
```

```
import Vue from 'vue'
import VueHiveSigner from 'vue-hivesigner'

Vue.use(VueHiveSigner, {
  app: 'appname',
  callbackURL: 'http://localhost:3000'
  scope: ['vote', 'comment']
})

Vue.HiveSigner.getLoginURL()
Vue.HiveSigner.vote(...)
Vue.HiveSigner.comment(...)
```

```
// in component
this.$hivesigner.getLoginURL()
this.$hivesigner.vote(...)
this.$hivesigner.comment(...)
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
    hivesigner: Vue.HiveSignerStore
  }
})
```

Now you can access the user object like this:

```
// in component
this.$store.state.hivesigner.user

// or if you want to use the mapGetters helper
computed: {
  ...mapGetters('hivesigner', ['user'])
} 
```

To login/logout use:
```
this.$store.dispatch('hivesigner/login')
this.$store.dispatch('hivesigner/logout')
```

#### Nuxt.js

*~/plugins/vue-hivesigner.js:*

```
import Vue from 'vue'
import VueHiveSigner from 'vue-hivesigner'

Vue.use(VueHiveSigner, {
  app: 'mkt.test',
  callbackURL: 'http://localhost:3000/auth',
  scope: ['vote', 'comment']
})
```

*~/nuxt.config.js*

```
plugins: [
  '~/plugins/vue-hivesigner'
],
```
