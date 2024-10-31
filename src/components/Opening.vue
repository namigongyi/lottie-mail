<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import Celebration from "../animation/celebration.json";
import gsap from "gsap";
import { onMounted, defineEmits, ref } from "vue";
const emit = defineEmits(["playBgm"]);
const openDoor = new Audio("/music/open-door.mp3");
onMounted(() => {
  const tl = gsap.timeline();
  tl.set(".year", { y: 2000, fontSize: 12 })
    .to(".year", {
      y: -250,
      fontSize: 60,
      duration: 0.6,
    })
    .to(".year", { y: 80, fontSize: 90, duration: 0.35 })
    .to(".year", { y: -40, fontSize: 120, duration: 0.2 })
    .to(".year", { y: 0, duration: 0.15 });
});
const OpeningDoor = () => {
  openDoor.play();
  gsap.to(".left-door", { rotateY: 120, duration: 0.5 });
  gsap.to(".right-door", { rotateY: -120, duration: 0.5 });
  const tl = gsap.timeline();
  tl.to(".year", { scale: 1.2, y: -200, duration: 0.5 })
    .to(".year", {
      scale: 0,
      y: 100,
      duration: 0.5,
    })
    .to(".fadeOut", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        emit("playBgm");
      },
    });
};
</script>

<template>
  <div class="celebration" @click="OpeningDoor">
    <div class="fadeOut"></div>
    <div class="left-door"></div>
    <div class="right-door"></div>
    <div class="firework fallDown">
      <Vue3Lottie
        :animation-data="Celebration"
        width="400"
        height="400"
        :loop="false"
      />
    </div>
    <div class="year">23</div>
  </div>
</template>
<style>
.fadeOut {
  width: 100%;
  height: 100%;
  background: #fff;
}
.left-door {
  position: absolute;
  width: 50%;
  height: 100%;
  background: linear-gradient(to left top, #dae3dc, #bed1c7);
  transform: translateX(-50%);
  transform-origin: left;
}
.right-door {
  position: absolute;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right top, #dae3dc, #bed1c7);
  transform: translateX(50%);
  transform-origin: right;
}
.celebration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 800px;
  /* perspective-origin: ; */
}
.year {
  position: absolute;
  font-size: 120px;
  color: white;
  letter-spacing: 12px;
  text-shadow: -1px 1px 0 #000, -2px 2px 0 #000, -3px 3px 0 #000,
    -4px 4px 0 #000, -5px 5px 0 #000, -6px 6px 0 #000, -7px 7px 0 #000,
    -8px 8px 0 #000, -9px 9px 0 #000, -10px 10px 0 #000;
}
.year::after {
  content: "23";
  position: absolute;
  top: 10px;
  left: -10px;
  color: white;
  z-index: -1;
  text-shadow: 0 0 10px rgb(0, 0, 0, 0.8);
}
.firework {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* transform: translateY(0); */
}
.fallDown {
  animation: 10s forwards FallDown;
}
@keyframes FallDown {
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(1000px);
  }
}
</style>
