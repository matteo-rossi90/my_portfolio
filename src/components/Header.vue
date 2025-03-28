<script>

export default {
    name: 'Header',
    data() {
        return {
            isScrolled: false,
        }
    },
    computed: {
        activeRoute() {
            return this.$route.name; 
        }
    },
    methods:{
        handleScroll(){
            this.isScrolled = window.scrollY > 50
        }
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmounted(){
        window.removeEventListener('scroll', this.handleScroll)
    }
}

</script>

<template>
   <header :class="['navbar', { 'navbar-fixed' : isScrolled }]">
    <div class="header-container">
        <div id="logo">
            <span>Matteo</span>
        </div>
        <nav id="menu">
            <ul class="list">
                <li :class="{'active': activeRoute === 'Home'}"><router-link :to="{name: 'Home'}">Home</router-link></li>
                <li :class="{'active': activeRoute === 'Portfolio'}"><router-link :to="{name: 'Portfolio'}">Progetti</router-link></li>
                <li :class="{'active': activeRoute === 'About'}"><router-link :to="{name: 'About'}">Bio</router-link></li>
                <li :class="{'active': activeRoute === 'Contacts'}"><router-link :to="{name: 'Contacts'}">Contatti</router-link></li>
            </ul>
        </nav>

    </div>
   </header>
</template>

<style lang="scss" scoped>
@use '../style/general' as*;

.navbar{
    height: 80px;
    padding: 0.6rem 0;
    font-size: $font-header;
    font-family: $title-text;
    display: flex;
    position: absolute;
    transition: 0.3s ease-in-out;
    width: 100%;
    z-index: 1;
    color: $font-text;

}

.navbar-fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.5); /* Sfondo semi-trasparente */
    backdrop-filter: blur(20px); /* Effetto sfocatura */
    //box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    color: $font-text;
    z-index: 1100;
}

ul.list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;

    li {
        position: relative; 

        &::after {
            content: '';
            display: block; 
            width: 100%;
            height: 2px;
            background-color: $font-color;
            position: absolute;
            bottom: -5px; 
            left: 0;
            transform: scaleX(0); 
            transform-origin: left;
            transition: transform 0.2s ease-in-out;
        }

        &:hover::after,
        &.active::after {
            transform: scaleX(1); 
        }

        a{
            color: $font-color;
        }
    }

    
}

.active{
    font-weight: bold;
    color: $font-color !important;
    
}
    
</style>