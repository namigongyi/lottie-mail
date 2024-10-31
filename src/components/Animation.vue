<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import Celebration from "../animation/celebration.json";
</script>

<template>
  <main>
    <div class="container">
      <Vue3Lottie
        :animationData="Celebration"
        width="200"
        height="200"
        :loop="false"
      ></Vue3Lottie>
    </div>
  </main>
</template>
<style>
.container {
  background-color: aquamarine;
}
</style>
