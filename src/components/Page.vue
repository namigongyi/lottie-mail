<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import { gsap } from "gsap"
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { articles } from "../declare";
const emit = defineEmits(['flip'])
const props = defineProps(["article", 'index']);
let zones = []
const fragElement = ref(null)
let draggable: Draggable;
let fragRect = null
onMounted(() => {
    gsap.registerPlugin(Flip, Draggable);
    zones = document.querySelectorAll('[data-dropzone]')
    // fragRect = fragElement.value.getBoundingClientRect()
    draggable = new Draggable(fragElement.value, {
        type: "y",
        onDrag: onDrag,
        onRelease: onRelease,
    })
    console.log(props.article)
})
onUnmounted(() => {
    draggable.kill()
})
function zoneHit(el, { hit = () => { }, misHit = () => { }, dud = () => { } }) {
    let noHit = true
    const onHit = (zone, index) => {
        noHit = false
        hit(zone, el, index)
    }
    const onMisHit = (zone) => {
        misHit(zone, el)
    }
    zones.forEach((zone, index) => {

        el.hitTest(zone) ? onHit(zone, index) : onMisHit(zone)
    })

    !noHit && fragElement.value.classList.add("drag-hit")
    noHit && dud(el)
}
function onDrag(e) {
    fragElement.value.classList.add("drag")
    fragElement.value.classList.remove("drag-hit")
    zoneHit(this, {
        hit: (zone, el) =>
            zone.classList.add("drag-hit")
        ,

        misHit: (zone) =>
            zone.classList.remove("drag-hit")
    })
}
function landHit(zone, el, index) {
    zone.classList.remove("drag-hit");
    zone.classList.add("land-hit");
    // Flip.fit(el.target, zone, {
    //     duration: 0.1
    // })

    if (index === 0) {
        gsap.to(el.target, {
            x: 0, y: -500, opacity: 0, duration: 0.5, scale: 0, onComplete: () => {
                emit("flip", { data: 1 })
                // 先重设样式
                gsap.set(el.target, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                });

                // 手动清除行内样式
                el.target.style.position = ''; // 清除position样式
                el.target.style.transform = ''; // 清除transform样式
                el.target.style.opacity = ''; // 清除opacity样式

                // 移除类
                el.target.classList.remove("drag-hit");
            }
        })
    }
    if (index === 1) {
        gsap.to(el.target, {
            x: 0, y: 500, opacity: 1, duration: 0.5, scale: 0, onComplete: () => {
                emit("flip", { data: -1 })
                gsap.set(el.target, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                });

                // 手动清除行内样式
                el.target.style.position = ''; // 清除position样式
                el.target.style.transform = ''; // 清除transform样式
                el.target.style.opacity = ''; // 清除opacity样式

                // 移除类
                el.target.classList.remove("drag-hit")

            }
        })

    }
}
function landMis(zone, el) {
    zone.classList.remove("drag-hit");
    zone.classList.remove("land-hit");
}
function onRelease(e) {
    fragElement.value.classList.remove("drag")
    zoneHit(this, {
        hit: landHit,
        misHit: landMis,
        dud: () => gsap.to(this.target, { x: 0, y: 0, duration: 0.5 })
    })
}

</script>

<template>
    <div class="page_box">
        <div class="snap" style="transform: translateY(-60px)" data-dropzone></div>
        <div ref="fragElement" class="page ">
            {{ props.article }}
        </div>
        <div class="snap" style="transform: translateY(60px)" data-dropzone></div>
    </div>

</template>

<style scoped>
.page_box {
    position: absolute;
    transform: translateY(-280px);
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
    border: 1px solid #000;
    box-shadow: 1px 1px 1px #000;
    background-color: rgb(19, 68, 110);
    word-break: break-all;
    padding: 10px;
    color: white;
}

/* .page.drag {
    opacity: 0.4;
} */

.snap.drag-hit {
    /* outline: solid 3px red; */
}

.page.drag-hit {
    opacity: 0.4;
}

.snap.land-hit {
    /* outline: solid 6px yellow; */
}
</style>
