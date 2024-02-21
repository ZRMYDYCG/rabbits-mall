<script setup>
import HomeCategory from './components/HomeCategory/index.vue'
import HomeBanner from './components/HomeBanner/index.vue'
import HomeRecommend from './components/HomeRecommend/index.vue'
import homeProduct from './components/HomeProduct/index.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeRecommend />
  <homeProduct />
</template>

<style scoped>

</style>
