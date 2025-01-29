<script>
import axios from 'axios';

import HeaderDashboard from '../../partials/HeaderDashboard.vue';
import Sidenav from '../../partials/Sidenav.vue';

export default {
    name:'CreateProject',
    components:{
        HeaderDashboard,
        Sidenav
    },
    mounted() {
        axios
        .get('/api/user')
        .then(() => {
            this.loadProjects();
        })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('authenticated');
                    this.$router.push({ name: 'Login' });
                }
            });
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
                                <h2>Crea un nuovo progetto</h2>
                                <p>Qui puoi creare un nuovo progetto aggiungendo le informazioni richieste</p>
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
