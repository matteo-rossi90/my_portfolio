<script>
export default {
    name: 'Header'
}
</script>

<template>
    <ul class="list">
        <li><router-link :to="{name: 'Home'}">Home</router-link></li>
    </ul>
</template>

<style lang="scss" scoped>

.list{
    display: flex;
    justify-content: space-between;
}
    
</style>