<script setup>
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutNav from './components/LayoutNav/index.vue'
import LayoutFooter from './components/LayoutFooter/index.vue'
import LayoutFixed from './components/LayoutFixed/index.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category/index.js'

/***
 * 脚本主体逻辑
 * **/
// TODO: 触发获取导航列表的action
const categoryStore = useCategoryStore()

/***
 * 声明周期钩子
 * **/
onMounted(() => {
    categoryStore.getCategory()
})
</script>

<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- FIXME: 添加key 破坏复用机制 强制进行销毁重建 =>  <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
</template>

<style scoped>

</style>
