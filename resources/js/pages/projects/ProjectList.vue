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
            views:[],
            activeDropdown: null,
            isLoading: true,
            selectedProject: {}
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
        selectDeletion(item){
            console.log("Progetto selezionato per eliminazione:", item);
            this.selectedProject = item;


        },
        deleteProject(){

            if (!this.selectedProject) return;

            axios
            .delete(`/api/dashboard/progetti/${this.selectedProject.id}`)
            .then((response) => {
                console.log(response.data.message); // Messaggio di conferma

                // Rimuove il progetto eliminato dall'array locale senza ricaricare la pagina
                this.projects = this.projects.filter(project => project.id !== this.selectedProject.id);

                // Reset della variabile selezionata
                this.selectedProject = null;
            })
            .catch((error) => {
                console.error('Errore durante la cancellazione:', error);
            });
        },
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
        },
        loadViews(){
        }
    },
    computed:{
        isEmpty(){
            return this.projects.length;
        }
    }
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
                            <div class="card-dashboard" v-if="isEmpty">

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#ID</th>
                                            <th scope="col">Titolo</th>
                                            <th scope="col">Tipologie</th>
                                            <th scope="col">Visite</th>
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
                                            <td>{{ project.views.length ? project.views.length : '-' }}</td>
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
                                                                <button
                                                                    type="button"
                                                                    class="btn-delete"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#staticBackdrop"
                                                                    @click="selectDeletion(project)"
                                                                    >
                                                                    <i class="bi bi-trash3"></i>
                                                                    <span>Elimina</span>
                                                                </button>

                                                            </li>



                                                        </ul>

                                                    </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <!-- modale per eliminare il progetto -->
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Vuoi eliminare il progetto?</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Il progetto <strong>{{ selectedProject?.title }}</strong> verrà eliminato. Vuoi davvero procedere?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                            <button type="button" class="btn-cancel" data-bs-dismiss="modal" @click="deleteProject">Elimina</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>



                            </div>

                            <!-- se non ci sono progetti -->
                            <div class="card-dashboard" v-else>
                                <div class="d-flex justify-content-center flex-column align-items-center w-100">
                                    <div class="circle-box d-flex align-items-center justify-content-center mb-2" id="circle-project">
                                        <i class="bi bi-journal-text"></i>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <p>Non hai ancora caricato progetti.</p>
                                        <p>Clicca sul tasto "Aggiungi" in alto per compilare i campi necessari e aggiungere un progetto</p>
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

<style lang="scss" scope>
@use '../../../scss/list' as*;
@use '../../../scss/general' as*;
@use '../../../scss/variables' as*;

#circle-project{
    background-color: rgb(222, 255, 255);
}

.bi-journal-text{
    font-size: 6rem;
    color:rgb(0, 208, 208)
}


</style>
