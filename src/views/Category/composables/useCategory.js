/**
 * @desc Banner 分类数据相关业务代码
 * ***/
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getSubCategoryAPI } from '@/api/index.js'

export const useCategory = () => {
    const route = useRoute()
    // TODO: 一级分类面包屑渲染
    const subCategory = ref({})
    const getSubCategory = async (id = route.params.id) => {
      const res = await getSubCategoryAPI(id)
      subCategory.value = res.result
    }

    // TODO: 路由参数变化的时候，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
      /**
       * @params { @to } @to 目标路由对象
       * ***/
      getSubCategory(to.params.id)
    })

    onMounted(() => { getSubCategory() })

    return {
        subCategory
    }
}