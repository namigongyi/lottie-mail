<script setup lang="ts">
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
      <li v-for=" in 13"></li>
    </ul>
  </div>
</template>

<style scoped>
.page-skeleton {
  position: absolute;
  background: rgba(255, 255, 248);
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
  height: 400px;
  top: 0px;
  left: 0px;
  transform: translateY(-152px);
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
