<script>

export default {
    name: 'Header',
    data() {
        return {
            isScrolled: false
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
                <li><router-link :to="{name: 'Home'}">Home</router-link></li>
                <li><router-link :to="{name: 'Portfolio'}">Portfolio</router-link></li>
                <li><router-link :to="{name: 'About'}">Bio</router-link></li>
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

}

.navbar-fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    color: $color-dark;
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
            background-color: $color-dark;
            position: absolute;
            bottom: -5px; 
            left: 0;
            transform: scaleX(0); 
            transform-origin: left;
            transition: transform 0.2s ease-in-out;
        }

        &:hover::after {
            transform: scaleX(1); 
        }
    }

    
}
    
</style>