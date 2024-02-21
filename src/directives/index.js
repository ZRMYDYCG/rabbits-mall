import { useIntersectionObserver } from '@vueuse/core'
// TODO:定义懒加载插件
export const lazyPlugin = {
    install(app) {
        // TODO:图片懒加载
        app.directive('img-lazy', {
            /**
             * params { @el @binding @isIntersecting }
             * @el 指令绑定的那个元素 -> img
             * @binding binding.value 指令等于后面号后面绑定的表达式的值 -> 图片 url
             * @isIntersecting 布尔值 -> 绑定元素时候进入视口区域
             * ***/
            mounted(el, binding) {
               const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if(isIntersecting) {
                            // IMPORTANT: 图片进入视口区域
                            el.src = binding.value
                            // IMPORTANT: 在监听的图片第一次完成加载之后就停止监听
                            stop()
                        }
                    }
                )
            }
        })
    }
}
