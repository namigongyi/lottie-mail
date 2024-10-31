<script setup lang="ts">
import { onMounted, ref, defineProps, defineEmits, watchEffect } from "vue";
import gsap from "gsap";
import { articles, dealArticles } from "../declare.ts";
import Page from "./Page.vue";
import PageSkeleton from "./PageSkeleton.vue";
import CuteDog from "../animation/cute-dog.json";
import Arrow from "../animation/arrow.json";
import PageT from "./PageT.vue";
import { Vue3Lottie } from "vue3-lottie";
interface Mailprops {
  isMusicOn: boolean;
  isYearOpened: boolean;
}
const { isMusicOn, isYearOpened } = defineProps<Mailprops>();
const emit = defineEmits(["musicHandle"]);
const result = dealArticles(articles);
const articlesData = ref<Array<any>>(result);
const currentPoint = ref(0);
const isOpened = ref(false);
const audio = new Audio("/music/open-letter.mp3");
const dogSound = new Audio("/music/box-drop.mp3");

const CuteDogRef = ref(null);
const isDog = ref(false);
const isLetterShow = ref(false);

console.log("articlesData", articlesData.value);
watchEffect(() => {
  if (isYearOpened) {
    const tl1 = gsap.timeline();
    tl1
      .to(".cover", {
        rotateX: 0,
        top: 1,
        boxShadow: "none",
        duration: 0.8,
        zIndex: 1,
        delay: 1,
      })
      .to(".pager", { y: -30, duration: 0.4 }); //0%
  }
  if (currentPoint.value >= articlesData.value.length) {
    dogSound.play();
  }
});

const openEnvelope = () => {
  if (isOpened.value) return;
  // 播放bgm
  audio.play();
  // 打开信封动画
  const cover = gsap.timeline();
  gsap.to(".background", { y: 160, duration: 0.5 });
  gsap.to(".envelope", { y: 160, duration: 0.5 });
  cover
    .to(".cover", { y: 35, duration: 0.5 })
    .to(".cover", { rotateX: 180, zIndex: 4, duration: 0.3 })
    .to(".envelope-box", { opacity: 1, scale: 1.1, duration: 0.25 }) //5%
    .to(".envelope-box", { scale: 0, opacity: 0, duration: 0.25 }); //100%
  // 取出信件动画
  const pager = gsap.timeline();
  pager
    .to(".pager", {
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
      y: -270,
      duration: 0.8,
    }) //0%
    .to(".pager", { y: 50, duration: 0.5 }) //0%
    .set(".letter-box", { perspective: 800, perspectiveOrigin: "bottom right" })
    .set(".pager2", {
      visibility: "visible",
      onComplete: () => {
        isLetterShow.value = true;
      },
    })
    .to(".pager2", {
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
      rotateX: 76,
      visibility: "visible",
      duration: 0.5,
    }) //0%
    .set(".pager2", { visibility: "hidden" })
    .to(".pager3", {
      rotateX: 0,
      boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5)",
      visibility: "visible",
      duration: 0.5,
      onComplete: () => {
        isOpened.value = true;
      },
    }) //0%
    .set(".pager3", { visibility: "hidden" })
    .set(".pager2", { visibility: "hidden" })
    .set(".pager", { visibility: "hidden" });
};
const flipHandle = ({ data }) => {
  if (data > 0 && currentPoint.value < articlesData.value.length) {
    currentPoint.value += data;
  }
  if (data < 0 && currentPoint.value > 0) {
    currentPoint.value += data;
  }
};

// watchEffect(() => {
//     console.log("currentPoint", currentPoint.value)
//     console.log(articlesData.value[currentPoint.value].text)
// })
</script>
<template>
  <div class="container" ref="main">
    <div
      v-show="isMusicOn"
      class="sound"
      @click="
        () => {
          emit('musicHandle');
        }
      "
    ></div>
    <div
      v-show="isYearOpened && !isMusicOn"
      @click="
        () => {
          emit('musicHandle');
        }
      "
      class="sound-closed"
    ></div>
    <div
      v-show="isYearOpened"
      class="wrapper"
      :class="{ bounceInUp: isYearOpened }"
    >
      <!-- <div class="arrow">
        <Vue3Lottie :animation-data="Arrow" width="10" height="10" />
      </div> -->
      <div class="letter-box" @click="openEnvelope">
        <!-- 打开信封的动画 -->
        <div class="pager3">
          <PageT v-if="!isOpened" :article="articlesData[currentPoint]" />
        </div>
        <div class="pager">
          <PageT
            v-if="!isOpened && isLetterShow"
            style="
              transform: translateY(-200px);
              clip-path: xywh(0 200px 100% 50%);
            "
            :article="articlesData[currentPoint]"
          />
        </div>
        <div class="pager2"></div>
        <!-- 实际信封的内容 -->
        <Page
          v-if="isOpened && currentPoint < articlesData.length"
          :article="articlesData[currentPoint]"
          :index="currentPoint"
          @flip="flipHandle"
        />
        <Page
          v-if="isOpened && currentPoint + 1 < articlesData.length"
          :article="articlesData[currentPoint + 1]"
          :index="currentPoint + 1"
          @flip="flipHandle"
        />
        <PageSkeleton
          :rotate="index * 1"
          :index="index"
          v-if="currentPoint < articlesData.length - 1 && isOpened"
          v-for="index in articlesData.length - currentPoint - 1"
          :key="index"
        />
      </div>
      <div v-if="currentPoint >= articlesData.length" class="cute-dog">
        <Vue3Lottie
          ref="CuteDogRef"
          :animation-data="CuteDog"
          width="400"
          height="400"
          :loop="false"
          @on-complete="
            () => {
              // 播放循环
              if (isDog) {
                CuteDogRef.playSegments([130, 250], true);
              } else {
                CuteDogRef.playSegments([250, 130], true);
              }
              isDog = !isDog;
            }
          "
        />
      </div>
      <div class="envelope-box">
        <div class="background"></div>
        <div class="cover"></div>
        <div class="envelope"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pager {
  position: absolute;
  width: 310px;
  height: 200px;
  background-color: rgb(255, 255, 248);
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.5);
  border-top: none;
  z-index: 2;
}

.pager2 {
  position: absolute;
  width: 310px;
  height: 200px;
  background-color: rgb(255, 255, 248);
  transform: translateY(50px);
  color: aquamarine;
  /* border: 1px solid #000; */
  border-top: none;
  z-index: 3;
  visibility: hidden;
  transform-origin: top;
}

.pager3 {
  position: absolute;
  width: 310px;
  height: 200px;
  background-color: rgb(255, 255, 248);
  color: aquamarine;
  /* border: 1px solid #000; */
  border-bottom: none;
  transform-origin: bottom;
  transform: translateY(-150px) rotateX(256deg);
  z-index: 1;

  visibility: hidden;
}

.container {
  background-image: url(/picture/background.svg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* background-color: blueviolet; */
}
.container .sound {
  width: 50px;
  height: 50px;
  background-image: url(/picture/sound.svg);
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: 10px;
}
.container .sound-closed {
  width: 50px;
  height: 50px;
  background-image: url(/picture/sound-closed.svg);
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: 10px;
}
.container .arrow {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -50px;
  left: 135px;
  z-index: 10;
}
.container .wrapper {
  position: relative;
  width: 320px;
  height: 200px;
  margin-top: 108px;
}

.container .background {
  position: absolute;
  background-image: url(/picture/mail-bg@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
}

.container .cover {
  position: absolute;
  background-image: url(/picture/mail-cover@2x.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 125px;
  top: -1px;
  transform: translateY(-125px) rotateX(-180deg);
  transform-origin: bottom;
  z-index: 4;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
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
  background-image: url(/picture/mail-envelope@2x.svg);
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

.bounceInUp {
  animation: 1.3s cubic-bezier(0.37, -0.09, 0, 1.6) bounceInUp;
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
</style>
