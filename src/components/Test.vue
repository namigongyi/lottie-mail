<script setup lang="ts">
import gsap from 'gsap'
import { effect, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { articles } from "../declare.ts";
import Page from './Page.vue';
const articlesData = ref<Array<any>>(articles);
const currentPoint = ref(0)
const isOpened = ref(false)
onMounted(() => {
    const tl1 = gsap.timeline();
    tl1.to(".cover", { rotateX: 180, zIndex: 1, duration: 0.8, delay: 1 })
        .to(".pager", { y: -30, duration: 0.4, }) //0%
    // .to(".wrapper", { y: 20, duration: 0.15 }) // 75%
    // .to(".wrapper", { y: -20, duration: 0.1 }) // 90%
    // .to(".wrapper", { y: 0, scale: 1, duration: 0.2 });
    // tl1.play()

})

const openEnvelope = () => {

    if (isOpened.value) return
    const box = gsap.timeline();
    gsap.to(".background", { y: 160, duration: 0.5 })
    gsap.to(".cover", { y: 160, duration: 0.5 })
    gsap.to(".envelope", { y: 160, duration: 0.5 })
    box.to(".envelope-box", { opacity: 1, scale: 1.1, duration: 0.25 }, "+=0.5") //5%
        .to(".envelope-box", { scale: 0, opacity: 0, duration: 0.25 }) //100%
    const pager = gsap.timeline();
    pager.to(".pager", { y: -220, duration: 0.75 }) //0%
        .to(".pager", { y: 0, duration: 0.5 }) //0%
        .set(".letter-box", { perspective: 800, perspectiveOrigin: 'bottom right' })
        .to(".pager2", { rotateX: 76, visibility: "visible", duration: 0.5 }) //0%
        .set(".pager2", { visibility: "hidden" })
        .to(".pager3", {
            rotateX: 0, visibility: "visible", duration: 0.5,
            onComplete: () => {
                isOpened.value = true
            }
        }) //0%
        .set(".pager3", { visibility: "hidden" })
        .set(".pager2", { visibility: "hidden" })
        .set(".pager", { visibility: "hidden" })

}
const flipHandle = ({ data }) => {
    if (data > 0 && currentPoint.value < articlesData.value.length) {
        currentPoint.value += data
    }
    if (data < 0 && currentPoint.value > 0) {
        currentPoint.value += data

    }
}
// watchEffect(() => {
//     console.log("currentPoint", currentPoint.value)
//     console.log(articlesData.value[currentPoint.value].text)
// })
</script>
<template>
    <main>
        <div class="container" ref="main">
            <div class="wrapper bounceInUp">

                <div class="letter-box" @click="openEnvelope">
                    <!-- <div class="letter-container"> -->
                    <div class="pager3">
                    </div>
                    <div class="pager">
                    </div>
                    <div class="pager2">
                    </div>
                    <Page v-if="isOpened && currentPoint < articlesData.length"
                        :article="articlesData[currentPoint].text" :index="currentPoint" @flip="flipHandle" />
                    <Page v-if="isOpened && currentPoint + 1 < articlesData.length"
                        :article="articlesData[currentPoint + 1].text" :index="currentPoint + 1" @flip="flipHandle" />
                    <!-- </div> -->
                </div>
                <div class="envelope-box">
                    <!-- <div class="envelop-container"> -->
                    <div class="background"></div>
                    <div class="cover"></div>
                    <div class="envelope"></div>
                    <!-- </div> -->

                </div>

            </div>
        </div>
    </main>
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
    visibility: hidden;
    transform-origin: top;
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
    visibility: hidden;
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