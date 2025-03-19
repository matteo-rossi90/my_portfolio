<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';

export default{
  name: 'App',
  components:{
    Header,
    Footer,
    Background,
  }
}


</script>

<template>
  <Header/>
  <main>
    <Background/>
    <router-view></router-view>
  </main>
  <Footer/>
</template>

<style lang="scss">
@use './style/general' as*;

</style>
