<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default{
  components:{
    Header,
    Footer
  }
}


</script>

<template>
  <Header/>
  <main>
    <h1>Ciao</h1>
  </main>
  <Footer/>
</template>

<style lang="scss">
@use './style/general' as*;

</style>
