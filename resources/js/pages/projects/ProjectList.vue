<script>
import axios from 'axios';
import Sidenav from '../../partials/Sidenav.vue';
import HeaderDashboard from '../../partials/HeaderDashboard.vue';
import Loader from '../../partials/Loader.vue';

export default{
    name: 'ProjectList',
    components:{
        HeaderDashboard,
        Sidenav,
        Loader
    },
    data() {
        return {
            projects:[],
            activeDropdown: null,
            isLoading: true
        }
    },
    mounted() {
        axios
            .get('/api/user')
            .then(() => {

                this.loadProjects();
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000)
            })
            .catch((error) => {
                if (error.response.status === 401) {

                    localStorage.removeItem('authenticated');
                    this.$router.push({ name: 'Login' });
                }
            });
        document.addEventListener("click", this.closeDropdownOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.closeDropdownOutside);
    },
    methods: {
        dropdownMenu(id, event){
            event.stopPropagation();

            const dropdown = document.getElementById(`dropdown-${id}`);

            if (this.activeDropdown === id) {
                dropdown.style.display = 'none';
                this.activeDropdown = null;
            } else {

                if (this.activeDropdown !== null) {
                    const prevDropdown = document.getElementById(`dropdown-${this.activeDropdown}`);
                    if (prevDropdown) prevDropdown.style.display = 'none';
                }

                dropdown.style.display = 'block';
                this.activeDropdown = id;
            }

            //console.log(id)
        },

        closeDropdownOutside(event) {
            if (this.activeDropdown !== null) {
                const activeDropdownEl = document.getElementById(`dropdown-${this.activeDropdown}`);
                if (activeDropdownEl && !activeDropdownEl.contains(event.target)) {
                    activeDropdownEl.style.display = 'none';
                    this.activeDropdown = null;
                }
            }
        },

        imageUrl(path) {
            return `http://127.0.0.1:8000/${path}`; // URL completo dell'immagine
        },

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
        }
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
                             <div class="card-dashboard justify-content-between">
                                <div class="title-list">
                                    <h2>Lista progetti</h2>
                                    <p>Riepilogo delle attività</p>
                                </div>
                                <router-link :to="{ name: 'CreateProject' }" class="btn btn-new d-flex gap-2 align-items-center">
                                    <i class="bi bi-plus-circle"></i>
                                    <span>Aggiungi</span>
                                </router-link>
                            </div>
                        </div>

                    </div>



                <div class="box-stat">
                    <div class="row py-2">
                        <div class="col-12 col-md-12">
                            <div class="card-dashboard">

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#ID</th>
                                            <th scope="col">Titolo</th>
                                            <th scope="col">Tipologie</th>
                                            <th scope="col">Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="project in projects" :key="project.id">
                                            <!-- <td> -->
                                                <!-- <img :src="imageUrl(project.img)" alt=""> -->
                                            <!-- </td> -->
                                            <td>{{ project.id }}</td>
                                            <td>{{ project.title }}</td>
                                            <td v-if="project.type">{{ project.type.name }}</td>
                                            <td v-else>Non specificato</td>
                                            <td class="menu-dropdown-dh">
                                                <button class="btn btn-actions" >
                                                    <i class="bi bi-three-dots-vertical" @click="dropdownMenu(project.id, $event)"></i>
                                                </button>

                                                    <div class="content-menu-dh py-2 shadow-sm" :id="'dropdown-' + project.id">
                                                        <ul>
                                                            <li>
                                                                <router-link :to="{
                                                                    name: 'ShowProject',
                                                                    params:{
                                                                        id: project.id
                                                                        }
                                                                    }">
                                                                    <i class="bi bi-eye"></i>
                                                                    <span>Visualizza</span>
                                                                </router-link>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i class="bi bi-pencil"></i>
                                                                    <span>Modifica</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i class="bi bi-trash3"></i>
                                                                    <span>Elimina</span>
                                                                </a>

                                                            </li>
                                                        </ul>
                                                    </div>




                                            </td>
                                        </tr>
                                    </tbody>
                                </table>



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

<style lang="scss" scope>
@use '../../../scss/list' as*;
@use '../../../scss/general' as*;
@use '../../../scss/variables' as*;


</style>
