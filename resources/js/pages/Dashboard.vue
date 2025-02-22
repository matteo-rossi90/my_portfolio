<script>
import axios from 'axios';
import { Chart } from 'chart.js';

import Sidenav from '../partials/Sidenav.vue';
import HeaderDashboard from '../partials/HeaderDashboard.vue';
import ProjectList from './projects/ProjectList.vue';
import Loader from '../partials/Loader.vue';

export default {
    name: 'Dashboard',
    components:{
        Sidenav,
        HeaderDashboard,
        ProjectList,
        Loader
    },
    data() {
        return {
            name: '',
            projects:[],
            types:[],
            techs:[],
            views:[],
            totalViews:{},
            isLoading:true
        }
    },
    methods:{
        loadProjects(){
            axios
                .get("/api/dashboard/progetti")
                .then((response) => {
                    console.log(response.data)
                    this.projects = response.data
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadTypes(){
            axios
                .get('/api/dashboard/tipi')
                .then((response) => {
                    console.log(response.data)
                    this.types = response.data;

                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadTechs(){
            axios
                .get('/api/dashboard/tecnologie')
                .then((response) => {
                    console.log(response.data)
                    this.techs = response.data;

                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadViews(){
            axios
                .get('/api/dashboard/visite-totali')
                .then((res) => {
                    console.log(res.data)
                    this.totalViews = res.data;
                })
                .catch((error) =>{
                    console.log(error)
                })
        }



    },
    mounted() {
        axios
        .get("/api/user")
        .then((response) => {
            this.loadProjects();
            this.loadTypes();
            this.loadTechs();
            this.loadViews();
            this.name = response.data.name
            setTimeout(() => {
                this.isLoading = false;
            }, 1000)
        })
        .catch((error) =>{
            if(error.response.status === 401){
                localStorage.removeItem('authenticated');
                this.$router.push({ name: 'Login'})
            }

        })
    },
}
</script>

<template>
    <HeaderDashboard/>

    <div class="wrap-container">
        <Sidenav/>
        <div class="container-body">
            <div class="container-fluid p-4" v-if="!isLoading">
                <div class="row py-2">

                    <div class="col-12">
                        <div class="card-dashboard">
                            <div class="title-list">
                                <h2>Ciao, {{ name }}</h2>
                                <p>Riepilogo delle attività</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="box-stat">

                    <div class="row py-2">

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="projects">
                                    <i class="bi bi-archive"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Progetti</h5>
                                    <span>{{ projects.length }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="type">
                                    <i class="bi bi-tags"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Tipi</h5>
                                    <span>{{ types.length }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-12 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="gear">
                                    <i class="bi bi-gear"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Tecnologie</h5>
                                    <span>{{ techs.length }}</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="row py-2">
                        <div class="col-12 col-md-8">
                            <div class="card-stats d-flex gap-2 justify-content-between">
                                <h5>Visite mensili</h5>
                                <div class="views-total">
                                    <i class="bi bi-eye"></i>
                                    <span>{{ totalViews }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="card-stats">
                                <h5>Progetti per tipi</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="container-fluid" v-else>
                <Loader/>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../scss/general' as *;
@use '../../scss/variables' as *;

*{
    color: $color-text;
}

.circle{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 4.5rem;
    width: 4.5rem;

    .bi{
        font-size: 2.2rem;
    }

    .bi-archive{
        color: tomato;
    }

    .bi-tags{
        color: rgb(213, 67, 199);
    }

    .bi-gear{
        color: rgb(71, 111, 255);
    }
}

#projects{
    background-color: rgb(255, 223, 223);
}

#type{
    background-color: rgb(254, 217, 250);
}

#gear{
    background-color: rgb(219, 227, 255);
}

.card-stats{
    padding: 2rem;
    background-color: $color-light;
    height: 600px;
    border-radius: 15px;
}

.views-total{
    display: flex;
    gap: 0.6rem;
}


</style>
