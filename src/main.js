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

/***
 * 挂载
 * **/
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
