/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/**
 * 模块依赖
 * **/
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/api/index.js'

/**
 * 数据管理逻辑
 * **/
export const useCategoryStore = defineStore('category', () => {
    // TODO: 导航列表
    const categoryList = ref([])
    const getCategory = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }
    return{
        categoryList,
        getCategory
    }
})