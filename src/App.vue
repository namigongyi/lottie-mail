<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { Vue3Lottie } from "vue3-lottie";
import Page from "./components/Page.vue";
import PgaeSkeleton from "./components/PageSkeleton.vue";
import { ref, defineComponent } from "vue";
import DraggableBox from './components/Move.vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { articles } from "./declare.ts";
gsap.registerPlugin(ScrollTrigger);
const letterExpand = ref(false);
const fadeOut = ref(false);
const openEnvelope = ref(true);
const bounceInUp = ref(true);
const rollingUp = ref(true);
const page2Open = ref(false)
const page3Open = ref(false)
const perspective = ref(false)
const afteropen = ref(false)
const moveDown = ref(false)
const keepOpen = ref(false)
const articlesData = ref<Array<any>>(articles);
const currentPoint = ref(0)

// const articleSkeleton = ref(articlesData.value.length - 1);

const isShow = ref(false);
function next(params: type) {
  if (!isShow.value) {

    moveDown.value = !moveDown.value
    keepOpen.value = !keepOpen.value
    letterExpand.value = !letterExpand.value;
    setTimeout(() => {
      fadeOut.value = !fadeOut.value;
      setTimeout(() => {
        perspective.value = !perspective.value
        page2Open.value = !page2Open.value
        setTimeout(() => {
          page3Open.value = !page3Open.value
          setTimeout(() => {
            afteropen.value = !afteropen.value
          }, 1500)
        }, 1500)
      }, 1000)
    }, 500)

    // isShow.value = true;


  }
  // bounceInUp.value = !bounceInUp.value

  // rollingUp.value = !rollingUp.value
  openEnvelope.value = !openEnvelope.value
}

function flipHandle({ data }) {
  if (data > 0 && currentPoint.value < articlesData.value.length) {
    currentPoint.value += data
  }
  if (data < 0 && currentPoint.value > 0) {
    currentPoint.value += data

  }
}
</script>

<template>
  <main>
    <!-- <Page :article="articlesData[0].text" :isShow="true" v-if="articlesData.length !== 0" /> -->
    <div style="position: fixed;left: 0; top:0; width: 20px; height: 20px; background-color: brown;" @click="next">
    </div>
    <div class="container" ref="main">
      <div class="wrapper" :class="{ bounceInUp }">

        <div class="letter-box">
          <div class="letter-container" :class="{ rollingUp, perspective }">
            <div class="pager3" v-show="!afteropen && page3Open" :class="{ page3Open }">
            </div>
            <div class="pager" v-show="!afteropen" :class="{ letterExpand }">
            </div>
            <div class="pager2" v-show="page2Open && !page3Open" :class="{ page2Open }">
            </div>
            <!-- <Page v-show="afteropen" :article="articlesData[currentPoint].text" :isShow="isShow"
              v-if="currentPoint < articlesData.length" :index="currentPoint" @flip="flipHandle" />
            <Page v-show="afteropen" :article="articlesData[currentPoint + 1].text" :isShow="isShow"
              v-if="currentPoint + 1 < articlesData.length" :index="currentPoint + 1" @flip="flipHandle" /> -->
            <!-- <PgaeSkeleton :rotate="index * 2" :index="index" v-if="currentPoint < articlesData.length - 2 && isShow"
                v-for="index in articlesData.length - currentPoint - 2" :key="index" /> -->

          </div>
        </div>
        <div class="envelope-box" :class="{ fadeOut }">
          <!-- <div class="envelop-container"> -->
          <div class="background" :class="{ moveDown }"></div>
          <div class="cover" :class="{ keepOpen, openEnvelope }"></div>
          <div class="envelope" :class="{ moveDown }"></div>
          <!-- </div> -->

        </div>

      </div>
    </div>
  </main>
  <!-- <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/mail.svg" alt="Vue logo" />
    </a> -->
</template>

<style scoped>
.pager {

  position: absolute;
  width: 310px;
  height: 200px;
  background-color: rgb(19, 68, 110);
  border: 1px solid #000;
  border-top: none;
  z-index: 2;


}

.pager2 {
  position: absolute;
  width: 310px;
  height: 200px;
  background-color: beige;
  color: aquamarine;
  border: 1px solid #000;
  border-top: none;
  z-index: 3;
}

.pager3 {
  position: absolute;
  width: 310px;
  height: 200px;
  background-color: rgb(19, 68, 110);
  color: aquamarine;
  border: 1px solid #000;
  border-bottom: none;
  transform-origin: bottom;
  transform: translateY(-200px) rotateX(256deg);
  z-index: 1;

}

.page2Open {
  transform-origin: top;
  animation: 1s 0.5s forwards openPage2;
}

.page3Open {
  transform-origin: bottom;
  animation: 1s 0.5s forwards openPage3;
}

.perspective {
  perspective: 800px;
  perspective-origin: bottom right;
}

@keyframes openPage3 {
  from {}

  to {
    transform: translateY(-200px) rotateX(360deg)
  }
}

@keyframes openPage2 {
  from {
    /* transform: translateY(-200px) rotateX(90deg); */
  }

  100% {
    transform: rotateX(76deg);
  }
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container .wrapper {
  position: relative;
  width: 320px;
  height: 200px;
  margin-top: 108px;
}

.container .background {
  position: absolute;
  background-image: url(/mail-body@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
}

.container .cover {
  position: absolute;
  background-image: url(/mail-cover@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  top: -1px;
  transform-origin: 0 1px;
  z-index: 4;
}

.container .envelope-box {
  position: absolute;
  width: 320px;
  height: 200px;
}

.container .envelop-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container .envelope {
  position: absolute;
  background-image: url(/mail-envelope@2x.svg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.container .letter-box {
  position: absolute;
  left: 5px;
  width: 310px;
  height: 100%;

}

.container .letter-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* perspective: 800px;
  perspective-origin: bottom right; */
  /* overflow: hidden; */
  /* animation: .7s .7s forwards rollingUp; */
}

/* .rollingUp {
  animation: 0.7s 0.7s forwards rollingUp;
  animation-delay: 1.3s;
} */

.fadeOut {
  animation: 0.5s forwards fadeOut;
}

.openEnvelope {
  animation: 0.8s 1s forwards openEnvelope;
}

.bounceInUp {
  animation: 1.3s cubic-bezier(0.37, -0.09, 0, 1.6) bounceInUp;
}


.letterExpand {
  animation: 1.5s forwards letterExpand;
}

.moveDown {
  animation: 1s forwards moveDown;
}

.keepOpen {
  animation: 1s forwards keepOpen;

}

@keyframes keepOpen {
  0% {
    transform: rotateX(180deg);
    z-index: 1;
  }

  100% {
    transform: rotateX(180deg) translateY(-200px);
    z-index: 1;

  }
}

@keyframes moveDown {
  0% {}

  100% {
    transform: translateY(200px);
  }
}

@keyframes letterExpand {
  0% {}

  50% {
    transform: translateY(-300px);
  }

  100% {
    /* transform: translateY(0px); */
    transform: translateY(0);

  }
}

@keyframes fadeOut {
  0% {}

  50% {
    opacity: 1;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes bounceInUp {
  from {
    opacity: 0;
    transform: translateY(2000px) scale(0.1);
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
    transform: rotateX(180deg);
    z-index: 1;
  }
}

@keyframes rollingUp {
  0% {}

  100% {
    transform: translateY(-30px);
  }
}
</style>
