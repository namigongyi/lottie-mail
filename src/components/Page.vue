<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['rotate', 'article'])
// setTimeout(() => {
//     scaleNumber.value = 1.1
// }, 500)

console.log(props)
</script>

<template>
    <div class="page" :style="{ transform: ` rotate(${props.rotate}deg)`, zIndex: Math.ceil((1 / (props.rotate + 1)) * 100) }">
        <p>{{ props.article }}</p>

    </div>
</template>

<style scoped>
.page {
    position: absolute;
    background: white;
    width: 100%;
    padding: 10px;
    word-break: break-all;
    border: 1px solid #000;
    box-shadow: 1px 1px 1px #000;

}
</style>