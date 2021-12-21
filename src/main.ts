import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '4m0TaTWRk4hp4UjPGEOj79A4auwSGpgc'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
