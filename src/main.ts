import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Test from "./components/Test.vue";
import vue3lottie from "vue3-lottie";
createApp(Test).use(vue3lottie, { name: "Vue3Lottie" }).mount("#app");
