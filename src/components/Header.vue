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
    height: 90px;
    padding: 1rem 0;
    font-size: $font-standard;
    display: flex;
}

ul.list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;
}
    
</style>