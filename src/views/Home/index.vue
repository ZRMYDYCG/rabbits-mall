<script setup>
import HomeCategory from './components/HomeCategory/index.vue'
import HomeBanner from './components/HomeBanner/index.vue'
import HomeRecommend from './components/HomeRecommend/index.vue'
import HomeProduct from './components/HomeProduct/index.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeRecommend />
  <HomeProduct />
</template>

<style scoped>

</style>
