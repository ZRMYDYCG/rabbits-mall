import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'
export const componentPlugin = {
    install(app) {
        // app.component('组件名', 组件配置对象)
        app.component('ImageView', ImageView)
        app.component('XtxSku', XtxSku)
    }
}