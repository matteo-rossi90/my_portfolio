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
                views:[],
                type:"",
                technologies:[]
            },
            isLoading: true,
            listItems:[
                {
                    name: "Argomento",
                    icon: "bi bi-bookmark"
                },
                {
                    name: "Ambito",
                    icon: "bi bi-suitcase-lg"
                },
                {
                    name: "Data inizio",
                    icon: "bi bi-calendar"
                },
                {
                    name: "Data fine",
                    icon: "bi bi-calendar-check"
                },
                {
                    name: "Visite",
                    icon: "bi bi-eye"
                }
            ],
            listChar:[
                {
                    name: "Tipo",
                    icon: "bi bi-tags"
                },
                {
                    name: "Tecnologie",
                    icon: "bi bi-gear"
                }
            ]
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
                            <div class="title-project">
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

                                <div class="col-12 col-md-12 col-lg-6 mb-4">
                                    <div class="box-image">
                                        <img :src="'/storage/' + project.img" v-if="project.img" alt="Anteprima immagine">
                                        <img src="../../../../public/img/Logo dark.png" v-else>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-12 col-lg-6 d-flex mb-3">
                                    <div class="col">
                                        <ul class="ms-3">
                                            <li v-for="(item, index) in listItems" :key="index">
                                                <i :class="item.icon"></i>
                                                <strong>{{ item.name }}</strong>
                                            </li>
                                        </ul>

                                    </div>

                                    <div class="col-8">
                                        <ul>
                                            <li>
                                                <span>{{ project.theme }}</span>
                                            </li>
                                            <li>
                                                <span>{{ project.company }}</span>
                                            </li>
                                            <li>
                                                <span>{{ project.start_date }}</span>
                                            </li>
                                            <li>
                                                <span>{{ project.end_date ? project.end_date : '<Non specificato>' }}</span>
                                            </li>
                                            <li>
                                                <span>{{ project.views.length ? project.views.length : '<Nessuna>' }}</span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                                <hr>

                                <div class="col-12 d-flex mb-3">

                                    <div class="col">
                                        <ul>
                                            <li v-for="(char, index) in listChar" :key="index">
                                                <i :class="char.icon"></i>
                                                <strong>{{ char.name }}</strong>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="col-10">
                                        <ul>
                                            <li>
                                                <span>{{ project.type.name ? project.type.name : '<Non specificato>'  }}</span>
                                            </li>
                                            <li>
                                                <small class="d-flex gap-3 flex-wrap">
                                                    <small class="techs-badge" v-for="tech in project.technologies" :key="tech.id">
                                                        {{ tech.name }}
                                                    </small>
                                                </small>

                                            </li>
                                        </ul>

                                    </div>


                                </div>

                                <hr>

                                <div class="col-12 d-flex">
                                    <div class="col">
                                        <div class="description">
                                            <i class="bi bi-journal-richtext"></i>
                                            <strong>Descrizione</strong>
                                        </div>
                                    </div>
                                    <div class="col-10">
                                        <div>
                                            <p>{{ project.description ? project.description : '<Nessuna descrizione disponibile>' }}</p>
                                        </div>

                                    </div>

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

    ul li,
    .description{
        display: flex;
        gap: 0.6rem;
        align-items:center;
    }

    ul li{
        padding: 1rem 0;


        .techs-badge{
            border-radius:50px;
            padding: 0.4rem 0.7rem;
            background-color: rgb(211, 255, 211);
            //border: 1px solid green;
            color: green;
        }
    }

    // .title-list{
        // width: 100%;
    // }

     .title-description{
        width: 15%
     }

    // .show{
        // width: 70%;
    // }

    .show-description{
        width: 85%;
    }

    .box-image{
        display:flex;
        padding: 1rem 0;
        //background-color: yellow;
        width: 40rem;
        height: 30rem;
        aspect-ratio: 1/9;

        img{
            border-radius: 10px;
            object-fit: cover;
            width: 100%;
            max-height: 100%;
        }
    }



</style>
