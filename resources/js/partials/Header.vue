<script>

export default{
    name:'Header'
}
</script>

<template>
    <ul>
        <li><router-link :to="{ name: 'Home'}">Home</router-link></li>
        <!-- <li><router-link :to="{ name: 'Login'}">Login</router-link></li> -->
    </ul>
</template>

<style>
</style>
