import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import * as filters from './filters'

Vue.config.devtools = true//TODO：开发阶段使用

//Vue.use(VueResource)
//Vue.use(VueRouter)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

window.router = router

const app = new Vue({
    router,
    store,
    ...App // Object spread copying everything from App.vue : render: h => h(App)
}).$mount('#app')

/* eslint-disable no-new */
//new Vue({
//    el: '#app',
//    template: '<App/>',
//    components: {App}
//})
