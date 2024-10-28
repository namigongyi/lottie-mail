<script setup>
import { gsap } from "gsap"
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { onMounted, onUnmounted, ref } from "vue";
const fragElement = ref(null)
let zones = []
let fragRect = null

let draggable = null

onMounted(() => {
    gsap.registerPlugin(Flip, Draggable);

    zones = document.querySelectorAll('[data-dropzone]')
    fragRect = fragElement.value.getBoundingClientRect()

    draggable = new Draggable(fragElement.value, {
        onDrag: onDrag,
        onRelease: onRelease,
    })
})

function zoneHit(el, { hit, mis = () => { }, dud = () => { } }) {
    let noHit = true
    function onHit(zone) {
        noHit = false
        hit(zone, el)
    }

    zones.forEach((zone) => {
        el.hitTest(zone)
            ? onHit(zone)
            : mis(zone, el)
    })

    noHit && dud(el)
}

function landHit(zone, el) {
    zone.classList.remove("drag-hit");
    zone.classList.add("land-hit");
    Flip.fit(el.target, zone, {
        duration: 0.1,
    });
}

function landMis(zone, el) {
    zone.classList.remove("drag-hit");
    zone.classList.remove("land-hit");
}

function onDrag(e) {
    fragElement.value.classList.add("drag")
    zoneHit(this, {
        hit: (zone) => zone.classList.add("drag-hit"),
        mis: (zone) => zone.classList.remove("drag-hit")
    })
}

function onRelease(e) {
    fragElement.value.classList.remove("drag")
    zoneHit(this, {
        hit: landHit,
        mis: landMis,
        dud: () => gsap.to(this.target, { duration: 0.5, x: 0, y: 0 })
    })
}

</script>


<template>
    <div ref="fragElement" class="frag u-panel">
        <slot></slot>
    </div>
</template>

<style scoped>
.frag {
    background-color: #fff;
    padding: 10px;
    border: solid 3px red;

    transition: all none !important;
    transition: max-width 0.4s !important;

    max-width: 700px;
}
</style>