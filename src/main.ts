import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vue3lottie from "vue3-lottie";
createApp(App).use(vue3lottie, { name: "Vue3Lottie" }).mount("#app");
