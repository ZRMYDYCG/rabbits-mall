/**
 * 责任人：Array
 * ['曾日闽', '叶兴斌']
 * **/

/***
 * 项目依赖
 * **/
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/common.scss' // IMPORTTANT: 引入初始化样式文件
import { lazyPlugin } from '@/directives/index.js' // IMPORTANT: 引入懒加载指令插件
import { componentPlugin } from '@/components/index.js' //引入全局组件插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/***
 * 挂载
 * **/
const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
