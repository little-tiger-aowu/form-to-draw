import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';
import VueLuckyCanvas from '@lucky-canvas/vue'
import './assets/font-icon/iconfont.css'
import './assets/font-size/font-style.css'


Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(VueLuckyCanvas)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
