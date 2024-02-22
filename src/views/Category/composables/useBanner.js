/**
 * @desc Banner 轮播图相关业务代码
 * ***/

/**
 * 模块依赖
 * ***/
import { onMounted, ref } from 'vue'
import { getBannerAPI } from '@/api/index.js'

/**
 * 实现核心
 * ***/
// TODO: 获取 Banner 数据，进行动态渲染
export const useBanner = () => {
    const bannerList = ref([])
    const getBanner = async () => {
        const { result } = await getBannerAPI({
            distributionSite: '2'
        })
        bannerList.value = result
    }
    onMounted(() => {
        getBanner()
    })

    return {
        bannerList
    }
}