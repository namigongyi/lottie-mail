<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import PageT from "./PageT.vue";
const emit = defineEmits(["flip"]);
const props = defineProps(["article", "index"]);
let zones = [];
const fragElement = ref(null);
let draggable: Draggable;
let fragRect = null;
const previousMusic = new Audio("/music/previous-flapping.mp3");
const nextMusic = new Audio("/music/next-flapping.mp3");

onMounted(() => {
  gsap.registerPlugin(Flip, Draggable);
  zones = document.querySelectorAll("[data-dropzone]");
  // fragRect = fragElement.value.getBoundingClientRect()
  draggable = new Draggable(fragElement.value, {
    type: "y",
    onDrag: onDrag,
    onRelease: onRelease,
  });
});
onUnmounted(() => {
  draggable.kill();
});
function zoneHit(el, { hit = () => {}, misHit = () => {}, dud = () => {} }) {
  let noHit = true;
  const onHit = (zone, index) => {
    noHit = false;
    hit(zone, el, index);
  };
  const onMisHit = (zone) => {
    misHit(zone, el);
  };
  zones.forEach((zone, index) => {
    el.hitTest(zone) ? onHit(zone, index) : onMisHit(zone);
  });

  !noHit && fragElement.value.classList.add("drag-hit");
  noHit && dud(el);
}
function onDrag(e) {
  fragElement.value.classList.add("drag");
  fragElement.value.classList.remove("drag-hit");
  zoneHit(this, {
    hit: (zone, el) => zone.classList.add("drag-hit"),
    misHit: (zone) => zone.classList.remove("drag-hit"),
  });
}

function landHit(zone, el, index) {
  zone.classList.remove("drag-hit");
  zone.classList.add("land-hit");
  index === 0 ? nextMusic.play() : previousMusic.play();

  if (index === 0) {
    gsap.to(el.target, {
      x: 0,
      y: -500,
      opacity: 0,
      duration: 0.5,
      scale: 0,
      onComplete: () => {
        emit("flip", { data: 1 });
        // 先重设样式
        gsap.set(el.target, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
        });
        // 手动清除行内样式
        el.target.style.position = ""; // 清除position样式
        el.target.style.transform = ""; // 清除transform样式
        el.target.style.opacity = ""; // 清除opacity样式
        // 移除类
        el.target.classList.remove("drag-hit");
      },
    });
  }
  if (index === 1) {
    gsap.to(el.target, {
      x: 0,
      y: index === 1 ? 500 : -500,
      opacity: index === 1 ? 1 : 0,
      duration: 0.5,
      scale: 0,
      onComplete: () => {
        emit("flip", { data: -1 });
        gsap.set(el.target, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
        });
        // 手动清除行内样式
        el.target.style.position = ""; // 清除position样式
        el.target.style.transform = ""; // 清除transform样式
        el.target.style.opacity = ""; // 清除opacity样式
        // 移除类
        el.target.classList.remove("drag-hit");
      },
    });
  }
}
function landMis(zone, el) {
  zone.classList.remove("drag-hit");
  zone.classList.remove("land-hit");
}
function onRelease(e) {
  fragElement.value.classList.remove("drag");
  zoneHit(this, {
    hit: landHit,
    misHit: landMis,
    dud: () => gsap.to(this.target, { x: 0, y: 0, duration: 0.5 }),
  });
}
</script>

<template>
  <div class="page_box">
    <div class="snap" style="transform: translateY(-60px)" data-dropzone></div>
    <div ref="fragElement" class="page-box">
      <PageT :article="props?.article" />
    </div>
    <div class="snap" style="transform: translateY(60px)" data-dropzone></div>
  </div>
</template>

<style scoped>
.page_box {
  position: absolute;
  transform: translateY(-230px);
  height: 400px;
  width: 100%;
  /* background-color: green; */

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-around;
  z-index: v-bind(999 - props.index);
}
.page .line-box {
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
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 5em;
  height: 50rem;
}

.snap {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  border-radius: 10px;
}

.snap {
  /* background: purple; */
}

.page {
  width: 100%;
  height: 400px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  background-color: rgb(255, 255, 248);
  word-break: break-all;
  padding: 5px 10px 0 10px;
  color: black;
}

.papage-box.drag-hit {
  opacity: 0.4;
}
</style>
