import { createApp, onMounted, onUnmounted } from "vue";
import useVisibilityChange from './utils/useVisibilityChange'
import "./style.css";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Mail from "./components/Mail.vue";
import Opening from "./components/Opening.vue";
import vue3lottie from "vue3-lottie";
const { cleanupVisibilityChange, setupVisibilityChange } = useVisibilityChange()
setupVisibilityChange()
createApp(App).use(vue3lottie, { name: "Vue3Lottie" }).mount("#app");
