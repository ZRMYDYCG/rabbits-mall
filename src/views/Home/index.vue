<script setup>
import HomeCategory from './components/HomeCategory/index.vue'
import HomeBanner from './components/HomeBanner/index.vue'
import HomeNew from './components/HomeNew/index.vue'
import HomeHot from './components/HomeHot/index.vue'
import homeProduct from './components/HomeProduct/index.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
</template>

<style scoped>

</style>
