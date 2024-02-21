<script setup>
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/
import { getBannerAPI } from '@/api/index.js'
import { onMounted, ref } from 'vue'

/***
 * 脚本主体逻辑
 * **/
// TODO: 获取 Banner 数据，进行动态渲染
const bannerList = ref([])
const getBanner = async () => {
  const { result } = await getBannerAPI()
  bannerList.value = result
}

/***
 * 声明周期钩子
 * **/
onMounted(() => {
  getBanner()
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>