<script setup lang="ts">
import { dragMachine } from "../machines/dragMachine";
import { useMachine } from "@xstate/vue";
import { ref } from "vue";
const props = defineProps(["isShow", "article"]);
const { snapshot, send } = useMachine(dragMachine);
const { x, y, opacity } = snapshot.value.context;
// setTimeout(() => {
//     scaleNumber.value = 1.1
// }, 500)
const dragStartHandle = (x: number, y: number) => {
  props.isShow && send({ type: "DRAG_START", x, y });
};
const dragMoveHandle = (x: number, y: number) => {
  props.isShow && send({ type: "DRAG_MOVE", x, y });
};

const dragEndHandle = () => {
  console.log("结束了！！！");
  // props.isShow && send({ type: "DRAG_END" });
};
</script>

<template>
  <div
    class="page"
    :style="{ opacity: opacity, transform: `translate(${x}px, ${y}px)` }"
    @pointerdown="({ x, y }) => dragStartHandle(x, y)"
    @pointermove="({ x, y }) => dragMoveHandle(x, y)"
    @pointerleave="dragEndHandle"
  >
    <p>{{ props.article }}</p>
  </div>
</template>

<style scoped>
.page {
  position: absolute;
  background: white;
  width: 100%;
  height: 339px;
  padding: 10px;
  word-break: break-all;
  border: 1px solid #000;
  box-shadow: 1px 1px 1px #000;
  z-index: 999;
  user-select: none;
}
</style>
