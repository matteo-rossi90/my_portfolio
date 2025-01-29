<script>
import { onMounted } from 'vue';
import store from '../store/store';

import Sidenav from '../partials/Sidenav.vue';
import HeaderDashboard from '../partials/HeaderDashboard.vue';

export default {
    name: 'Profile',
    components:{
        HeaderDashboard,
        Sidenav
    },
    setup() {
        onMounted(() => {
            if (!store.name) store.fetchUser();
        });
            return { store };
        },
    }
</script>

<template>
    <HeaderDashboard/>
        <div class="wrap-container">
        <Sidenav/>
         <div class="container-body">
            <div class="container-fluid p-4">

                <div class="row">
                    <div class="col-12">
                        <div class="card-dashboard justify-content-between">
                            <div class="title-list">
                                <h2>Profilo personale di {{ store.name }}</h2>
                                <p>Qui ci sono le tue informazioni generali</p>
                            </div>
                            <router-link :to="{ name:'ProjectList'}" class="d-flex gap-2 btn btn-back">
                                <i class="bi bi-arrow-left-circle"></i>
                                <span>Indietro</span>
                            </router-link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>


</template>

<style lang="scss" scoped>

</style>
