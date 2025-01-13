<script>
import axios from 'axios';

import Sidenav from '../partials/Sidenav.vue';
import HeaderDashboard from '../partials/HeaderDashboard.vue';
import ProjectList from './partials/ProjectList.vue';

export default {
    name: 'Dashboard',
    components:{
        Sidenav,
        HeaderDashboard,
        ProjectList
    },
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
}
</script>

<template>
    <HeaderDashboard/>
    <div class="wrap-container">
        <Sidenav/>
        <div class="container-body">
            <div class="container py-4">
                <h2>Ciao, {{ name }}</h2>
                <p>Hai caricato tot progetti</p>
                <div class="box-stat">
                    <div class="row">
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../scss/general' as *;


</style>
