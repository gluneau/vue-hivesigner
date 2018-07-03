# VueSteemConnect

For now this plugin is very simple and really just a wrapper to install SteemConnect and make it accessible in one step.

```
npm i --save vue-steemconnect
```

```
import Vue from 'vue'
import VueSteemConnect from 'vue-steemconnect'

Vue.use(VueSteemConnect, {
  app: 'appname',
  redirectUrl: 'http://localhost:3000'
  scope: ['vote', 'comment']
})
```

```
// in component
this.$steemconnect.getLoginURL()
this.$steemconnect.vote(...)
this.$steemconnect.comment(...)
...
```