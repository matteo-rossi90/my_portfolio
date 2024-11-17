<script>
import Header from '../js/partials/Header.vue';

export default{
    components:{
        Header
    }
}
</script>

<template>
    <Header/>
    <main>
        <router-view></router-view>
    </main>
</template>

<style>
</style>
