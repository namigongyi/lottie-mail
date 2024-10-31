<script setup lang="ts">
import Mail from "./components/Mail.vue";
import Opening from "./components/Opening.vue";
import useVisibilityChange from "./utils/useVisibilityChange.ts";
import { watchEffect, ref } from "vue";
const { isTabVisible } = useVisibilityChange();
const audio = ref(null);
const isYearOpened = ref(false);
const isMusicOn = ref(false);
watchEffect(() => {
  const audioPlayer = audio.value;
  if (isTabVisible.value) {
    if (audioPlayer && isMusicOn.value) audioPlayer.play();
    if (audioPlayer && !isMusicOn.value) audioPlayer.pause();
  } else {
    if (audioPlayer && !isMusicOn.value) audioPlayer.pause();
  }
});
</script>
<template>
  <main>
    <div class="music">
      <audio ref="audio" src="/music/background_music.mp3" loop></audio>
    </div>
    <Mail
      :isYearOpened="isYearOpened"
      :isMusicOn="isMusicOn"
      @music-handle="
        () => {
          isMusicOn = !isMusicOn;
        }
      "
    />
    <Opening
      v-show="!isYearOpened"
      @play-bgm="
        () => {
          isMusicOn = true;
          isYearOpened = true;
        }
      "
    />
  </main>
</template>

<style scoped></style>
