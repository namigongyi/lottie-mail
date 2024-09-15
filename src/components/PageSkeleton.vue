<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
const props = defineProps(["rotate", "index"]);
</script>

<template>
  <div
    class="page-skeleton"
    :style="{
      //   transform: ` rotate(${props.rotate}deg)`,
      zIndex: Math.ceil((1 / (props.index + 1)) * 100),
    }"
  >
    <ul>
      <li v-for="i in 10"></li>
    </ul>
  </div>
</template>

<style scoped>
.page-skeleton {
  position: absolute;
  background: white;
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  box-shadow: 1px 1px 1px #000;
  height: 336px;
  animation: rotateUp 0.8s 0.5s forwards;
}
.page-skeleton ul {
  list-style: none;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}
.page-skeleton ul li {
  flex: 1;
  border-bottom: 1px solid #000;
}
.page-skeleton ul li:last-child {
  border: none;
}
@keyframes rotateUp {
  from {
    rotate: 0;
  }
  to {
    rotate: v-bind(props.rotate + "deg");
  }
}
</style>
