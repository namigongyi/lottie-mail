<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { Vue3Lottie } from 'vue3-lottie';
import Page from './components/Page.vue';
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { articles } from './declare.ts'
gsap.registerPlugin(ScrollTrigger);
const letterExpand = ref(false)
const fadeOut = ref(false)
const openEnvelope = ref(true)
const bounceInUp = ref(true)
const rollingUp = ref(true)
const articlesData = ref(articles)
function next(params: type) {
  // bounceInUp.value = !bounceInUp.value
  fadeOut.value = !fadeOut.value
  letterExpand.value = !letterExpand.value
  // rollingUp.value = !rollingUp.value
  // openEnvelope.value = !openEnvelope.value
}

</script>

<template>
  <main>
    <div class="container" ref="main">
      <div class="wrapper" :class="{ 'bounceInUp': bounceInUp }">

        <div class="letter-box" :class="{ letterExpand }">
          <div class="letter" :class="{ rollingUp }" @click="next">

            <Page :rotate="index * 2" :article="art.text" v-for="(art, index) in articlesData" :key="index" />
          </div>
        </div>
        <div class="envelope-box" :class="{ fadeOut }">
          <div class="background">
          </div>
          <div class="cover" :class="{ openEnvelope }">
          </div>
          <div class="envelope"></div>
        </div>

      </div>

    </div>

  </main>
  <!-- <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/mail.svg" alt="Vue logo" />
    </a> -->

</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .wrapper {
  position: relative;
  width: 229px;
  height: 162px;
}

.container .background {
  position: absolute;
  background-image: url(/mail-body@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.container .cover {
  position: absolute;
  background-image: url(/mail-cover@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  top: -1px;
  z-index: 5;
  transform-origin: 0 1px;
}

.container .envelope-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.container .envelope {
  position: absolute;
  background-image: url(/mail-envelope@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  z-index: 4;
}

.container .letter-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 336px;
  overflow: hidden;
  z-index: 3;

}

.container .letter {

  transform: translateY(180px);
  /* overflow: hidden; */
  /* animation: .7s .7s forwards rollingUp; */
}


.rollingUp {
  animation: .7s .7s forwards rollingUp;
}


.fadeOut {
  animation: .5s .5s forwards fadeOut;
}

.openEnvelope {
  animation: 0.8s .3s forwards openEnvelope;

}

.bounceInUp {
  animation: 1.3s cubic-bezier(0.37, -0.09, 0, 1.6) bounceInUp;

}

.letterExpand {
  animation: .5s .5s forwards letterExpand;
}

@keyframes letterExpand {
  from {
    transform: translateY(0.5);
  }

  10% {
    transform: scale(1) translateY(-100px);
  }

  100% {
    transform: scale(2) translateY(0px);
  }
}

@keyframes fadeOut {
  from {
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: scale(1) translateY(400px);
  }

  100% {
    opacity: 0;
    transform: scale(0) translateY(600px);

  }
}

@keyframes bounceInUp {
  from {
    opacity: 0;
    transform: translateY(2000px) scale(.1);
  }

  50% {
    opacity: 1;
    transform: translateY(-100px);
  }

  75% {
    transform: translateY(20px);
  }

  90% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes openEnvelope {
  from {}

  100% {
    transform: rotateX(-180deg);
    z-index: 2;

  }
}


@keyframes rollingUp {
  from {
    transform: translateY(180px);
  }

  40% {
    transform: translateY(-20px);

  }

  75% {
    transform: translateY(10px);
  }

  90% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
