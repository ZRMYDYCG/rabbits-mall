<template>
    <el-dialog v-bind="$attrs" @click="consoleTest($attrs, $slots)">
        <!-- 动态插槽 -->
        <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]>
            <slot :name="key"></slot>
        </template>
    </el-dialog>
</template>

<script lang="js" setup>
import { useSlots,useAttrs } from 'vue'
const attrs = useAttrs()
const slots = useSlots()
console.log("attrs:", attrs)
console.log("slots:", slots)

const consoleTest = (a, b) => {
    console.log("$attrs:", a)
    console.log("$slots:", b)
}
</script>
