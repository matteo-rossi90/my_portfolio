<script>
export default {
    name: 'Header'
}
</script>

<template>
   <header>
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

header{
    height: 60px;
    padding: 0.6rem 0;
    font-size: $font-header;
    font-family: $title-text;
    display: flex;
    position: absolute;
    width: 100%;

}

ul.list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;
}
    
</style>