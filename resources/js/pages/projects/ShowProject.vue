<script>
import axios from 'axios';

import HeaderDashboard from '../../partials/HeaderDashboard.vue';
import Sidenav from '../../partials/Sidenav.vue';
import Loader from '../../partials/Loader.vue';

export default {
    name: 'ShowProject',
    components:{
        HeaderDashboard,
        Sidenav,
        Loader
    },
    data() {
        return {
            project: {
                type:"",
                technologies:[]
            },
            isLoading: true
        }
    },
    methods: {
        singleProject(){
            //const projectSlug = this.$route.params.slug;
            const projectId = this.$route.params.id;
            axios
                .get(`/api/dashboard/progetti/${projectId}`)
                .then((response) => {
                    console.log(response.data)
                    this.project = response.data
                })
                .catch((error) =>{
                    console.log(error)
                })
        },


    },
    mounted() {
        axios
            .get('/api/user')
            .then(() => {
                this.singleProject();
                setTimeout(() => {
                    this.isLoading = false;
                }, 1500)
            })
            .catch((error) => {
                if (error.response.status === 401) {
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
            <div class="container-fluid p-4" v-if="!isLoading">

                <div class="row">
                    <div class="col-12">
                        <div class="card-dashboard justify-content-between">
                            <div class="title-list">
                                <h2>{{ project.title }}</h2>
                                <p>Qui puoi leggere le varie caratteristiche del progetto</p>
                            </div>
                            <router-link :to="{ name:'ProjectList'}" class="d-flex gap-2 btn btn-back">
                                <i class="bi bi-arrow-left-circle"></i>
                                <span>Indietro</span>
                            </router-link>
                        </div>

                    </div>
                </div>

                <div class="row py-3">
                    <div class="col-12">
                        <div class="card-dashboard-form">
                            <div class="row py-3">
                                <div class="col-12 col-md-6">
                                    <ul class="list">
                                        <li><strong>Argomento:</strong> <span>{{ project.theme }}</span></li>
                                        <li><strong>Ambito di sviluppo/azienda:</strong> <span>{{ project.company }}</span></li>
                                        <li><strong>Tipo:</strong><span>{{ project.type.name ? project.type.name : 'Non specificato' }}</span></li>
                                        <li>
                                            <strong>Tecnologie:</strong>
                                            <small class="d-flex gap-3">
                                                <span class="techs-badge" v-for="tech in project.technologies" :key="tech.id">
                                                     {{ tech.name }}
                                                </span>
                                            </small>
                                        </li>
                                        <li>
                                            <strong>Descrizione:</strong>
                                            <span>{{ project.description ? project.description : 'Non presente'}}</span>
                                        </li>
                                    </ul>
                                </div>

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

.list{
    li{
        display:flex;
        gap: 1.3rem;
        padding: 1rem 0;

        .techs-badge{
            border-radius:50px;
            padding: 0.4rem 0.7rem;
            background-color: rgb(211, 255, 211);
            //border: 1px solid green;
            color: green;
        }
    }
}

strong{
    width: 35%;
}



</style>
