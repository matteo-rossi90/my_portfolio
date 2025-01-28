<script>

export default{
    data() {
        return {
            loggedIn: false,
        }
    },
    methods: {
        // updateSidebar(){
            // this.loggedIn = !this.loggedIn;
        // }
    },
}
</script>

<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<style lang="scss">
main{
    height: 100vh;
}
</style>
