<script>
export default {
    name: 'Background'
}
</script>

<template>
     <div id="background-gradient"></div>
</template>

<style lang="scss" scoped>

@use '../style/general' as*;

#background-gradient{
    background: #ECE7DC;
    background-image: $gradient;
    background-size: 200%;
    animation: bg-animation 10s infinite alternate;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    opacity: 0.5;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
}

//animazione sfondo
@keyframes bg-animation {
    0%{background-position: left}
    100%{background-position: right}
}
    
</style>