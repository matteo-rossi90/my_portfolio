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
            types:[],
            newType:{
                name:""
            },
            selectedType: {},
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

        loadTypes(){
            axios
                .get("/api/dashboard/tipi")
                .then((response) => {
                    console.log(response.data)
                    this.types = response.data
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        getType(){
            this.isLoading = true;

            axios
                .post('/api/dashboard/tipi', this.newType, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log('Nuovo tipo:', response.data);
                this.$router.push({ name: 'TypeList' });
                this.types.unshift(response.data)
                this.newType = { name: ""}
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
        selectDeletion(type){
            console.log('Tipo selezionato', type)
            this.selectedType = type;
        },
        deleteType(){
            this.isLoading = true;

            if (!this.selectedType) return;

            axios
            .delete(`/api/dashboard/tipi/${this.selectedType.id}`)
            .then((response) => {
                console.log(response.data.message); // Messaggio di conferma
                // Rimuove il tipo eliminato dall'array locale senza ricaricare la pagina
                this.types = this.types.filter(item => item.id !== this.selectedType.id);
                // Reset della variabile selezionata
                this.selectedType = null;

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
                    this.isLoading = false;
                }, 1000);

                this.loadTypes();
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
                                    <h2>Lista tipi</h2>
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
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Aggiungi un nuovo tipo</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="getType" enctype="multipart/form-data" class="row">
                                            <label for="name" id="name">Nome*</label>
                                            <input type="text" name="name" id="name" v-model="newType.name">
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                        <button type="button" class="btn btn-new" data-bs-dismiss="modal" @click="getType">Aggiungi</button>
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
                                        <tr v-for="type in types" :key="type.id">
                                            <!-- <td> -->
                                                <!-- <img :src="imageUrl(project.img)" alt=""> -->
                                            <!-- </td> -->
                                            <td>{{ type.id }}</td>
                                            <td>{{ type.name }}</td>
                                            <td class="menu-dropdown-dh">
                                                <button class="btn btn-actions" >
                                                    <i class="bi bi-three-dots-vertical" @click="dropdownMenu(type.id, $event)"></i>
                                                </button>

                                                    <div class="content-menu-dh py-2 shadow-sm" :id="'dropdown-' + type.id">
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
                                                                    @click="selectDeletion(type)"
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

                                <!-- modale per cancellare la tipologia -->
                                <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel2">Vuoi eliminare questa tipologia?</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            La tipologia <strong>{{ selectedType?.name }}</strong> verrà eliminata. Vuoi davvero procedere?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                            <button type="button" class="btn-cancel" data-bs-dismiss="modal" @click="deleteType">Elimina</button>
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
