<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

export default{
    name: 'HeaderDashboard',
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        axios
        .get("/api/user")
        .then((response) => {
            this.name = response.data.name
        })
        .catch((err) =>{console.log(err)})
    },
    methods: {
        logOut(){
            axios
            .post("/api/logout")
            .then(() => {
                this.$router.push({name: 'Home'})
            })
            .catch((err) =>{console.log(err)})
        }
    },
}

</script>

<template>
    <header id="header-dashboard">
        <div class="container">
            <a href="#" @click="logOut">Disconnetti</a>
        </div>
    </header>

</template>

<style lang="scss" scoped>

#header-dashboard{
    height: 50px;
    box-shadow: 2px 1px 4px 2px rgba(173, 173, 173, 0.6);
    z-index: 1000;
    position: relative;
}

</style>
