<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps(["article"]);
</script>

<template>
  <div class="page">
    <ul class="line-box">
      <li class="line" v-for="(index, item) in 13" :key="index">
        {{ props.article[index - 1] ? props.article[index - 1] : "" }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  height: 400px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  background-color: rgb(255, 255, 248);
  word-break: break-all;
  padding: 5px 10px 0 10px;
  color: black;
}
.line-box .line {
  width: 100%;
  height: 30px;
  padding: 3px 0px;
  border-bottom: 1px solid #000;
  white-space: pre-wrap;
  line-height: 32px;
  text-shadow: -0.2px 0.2px 0px rgba(0, 0, 0, 0.5);
}
</style>
