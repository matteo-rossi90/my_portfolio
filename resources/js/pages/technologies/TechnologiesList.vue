<script>
import axios from 'axios';
import HeaderDashboard from '../../partials/HeaderDashboard.vue';
import Sidenav from '../../partials/Sidenav.vue';
import Loader from '../../partials/Loader.vue';

export default {
    name: 'TypeList',
    components:{
        HeaderDashboard,
        Sidenav,
        Loader
    },
    data() {
        return {
            technologies:[],
            newTech:{
                name:""
            },
            selectedTech:{},
            isLoading: true
        }
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

        loadTechnologies(){
            axios
                .get("/api/dashboard/tecnologie")
                .then((response) => {
                    console.log(response.data)
                    this.technologies = response.data
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        getTech(){
            this.isLoading = true;

            axios
                .post('/api/dashboard/tecnologie', this.newTech, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log('Nuovo tipo:', response.data);
                this.$router.push({ name: 'TechnologiesList' });
                this.technologies.unshift(response.data)
                this.newTech = { name: ""}

                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            })
            .catch(error => {
                if (error.response) {
                    this.errors = error.response.data.errors;
                    //this.validateForm()
                }
            });

        },

        selectDeletion(tech){
            console.log('Tecnologia selezionato', tech)
            this.selectedTech = tech;
        },
        deleteTech(){

            this.isLoading = true


            if (!this.selectedTech) return;

            axios
                .delete(`/api/dashboard/tecnologie/${this.selectedTech.id}`)
                .then((response) => {
                    console.log(response.data.message); // Messaggio di conferma
                    // Rimuove la tecnologia eliminata dall'array locale senza ricaricare la pagina
                    this.technologies = this.technologies.filter(item => item.id !== this.selectedTech.id);
                    // Reset della variabile selezionata
                    this.selectedTech = null;

                     setTimeout(() => {
                        this.isLoading = false
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Errore durante la cancellazione:', error);
                });

        }

    },
    mounted() {
        axios
            .get('/api/user')
            .then(() => {
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
                this.loadTechnologies();
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('authenticated');
                    this.$router.push({ name: 'Login' });
                }
            });
        document.addEventListener("click", this.closeDropdownOutside);
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
                                    <h2>Tecnologie usate</h2>
                                    <p>Riepilogo delle attività</p>
                                </div>
                                <button class="btn btn-new d-flex gap-2 align-items-center" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <i class="bi bi-plus-circle"></i>
                                    <span>Aggiungi</span>
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Aggiungi una nuova tecnologia</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                       <form @submit.prevent="getTech" enctype="multipart/form-data" class="row">
                                            <label for="name" id="name">Nome*</label>
                                            <input type="text" name="name" id="name" v-model="newTech.name">
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                        <button type="button" class="btn btn-new" data-bs-dismiss="modal" @click="getTech">Aggiungi</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

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
                                            <th scope="col">Nome</th>
                                            <th scope="col">Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tech in technologies" :key="tech.id">
                                            <!-- <td> -->
                                                <!-- <img :src="imageUrl(project.img)" alt=""> -->
                                            <!-- </td> -->
                                            <td>{{ tech.id }}</td>
                                            <td>{{ tech.name }}</td>
                                            <td class="menu-dropdown-dh">
                                                <button class="btn btn-actions" >
                                                    <i class="bi bi-three-dots-vertical" @click="dropdownMenu(tech.id, $event)"></i>
                                                </button>

                                                    <div class="content-menu-dh py-2 shadow-sm" :id="'dropdown-' + tech.id">
                                                        <ul>
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
                                                                    data-bs-target="#staticBackdrop2"
                                                                    @click="selectDeletion(tech)"
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

                                <!-- modale per cancellare la tecnologia -->
                                <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel2">Vuoi eliminare questa tipologia?</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            La tipologia <strong>{{ selectedTech?.name }}</strong> verrà eliminata. Vuoi davvero procedere?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                            <button type="button" class="btn-cancel" data-bs-dismiss="modal" @click="deleteTech">Elimina</button>
                                        </div>
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

@use '../../../scss/list' as*;
@use '../../../scss/general' as*;
@use '../../../scss/variables' as*;




</style>
