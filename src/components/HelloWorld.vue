<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="container">
    <div class="page ">
      <div class="page1  "></div>
    </div>
    <div class="letter ">
      <div class="letter1 lier"></div>
      <div class="letter2 lier"></div>
      <div class="letter3 lier"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  background-color: gray;
}

.page {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 300px;
  height: 300px;

}

.page1 {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 90px;
  height: 90px;
  background-color: red;
  z-index: 2;

}

.letter {
  position: absolute;

  width: 300px;
  height: 300px;
  background-color: black;
  top: 50px;
  left: 50px;
}

.letter .letter1 {
  position: absolute;
  top: 120px;
  left: 20px;
  width: 100px;
  height: 100px;
  z-index: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(/mail-cover@2x.svg);

}

.letter .letter2 {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 120px;
  height: 120px;
  background-color: yellow;
  z-index: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(/mail-body@2x.svg);
}

.letter .letter3 {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 100px;
  z-index: 4;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(/mail-envelope@2x.svg);
}

.lier {
  animation: 12s forwards lierAnimation;
}

@keyframes lierAnimation {
  0% {}

  100% {
    transform: translateY(300px);
  }

}
</style>
