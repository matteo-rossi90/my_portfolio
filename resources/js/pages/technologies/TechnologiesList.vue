<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
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
            isLoading: true,
            errors:{
                name:""
            },
            // pagination: {},
            // currentPage: 1
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

        loadTechnologies(page = 1){
            axios
                .get(`/api/dashboard/tecnologie?page=${page}`)
                .then((response) => {
                    console.log(response.data)
                    this.technologies = response.data
                    // this.pagination = {
                        // current_page: response.data.current_page,
                        // last_page: response.data.last_page,
                        // per_page: response.data.per_page,
                        // total: response.data.total
                    // };
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        validateTech(){

            this.errors = {}

            if(!this.newTech.name && this.newTech.name.length === 0){
                this.errors.name = 'Il nome è un campo obbligatorio'
            }else if(this.newTech.name.length > 100){
                this.errors.name = 'Una tecnologia non può avere più di 100 caratteri'
            }

            return Object.keys(this.errors).length === 0;
        },
        validateUpdate(){

            this.errors = {}

            if(!this.selectedTech.name && this.selectedTech.name.length === 0){
                this.errors.name = 'Il nome è un campo obbligatorio'
            }else if(this.selectedTech.name.length > 100){
                this.errors.name = 'Il tipo non può avere più di 100 caratteri'
            }

            return Object.keys(this.errors).length === 0;
        },
        getTech(){

            if (!this.validateTech()) {
                return;
            }

            this.isLoading = true;

            axios
                .post('/api/dashboard/tecnologie', this.newTech, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log('Nuovo tipo:', response.data.data);
                this.$router.push({ name: 'TechnologiesList' });
                this.technologies.unshift(response.data.data)
                this.newTech = { name: ""}

                setTimeout(() => {
                    this.isLoading = false
                }, 1000);

                this.closeModal()
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
                    //this.selectedTech = null;

                     setTimeout(() => {
                        this.isLoading = false
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Errore durante la cancellazione:', error);
                });

        },
        selectTech(tech){
            this.selectedTech = { ...tech }
            console.log(tech)
        },
        editTech() {

             if (!this.validateUpdate()) {
                return;
            }

            this.isLoading = true;

            axios
                .put(`/api/dashboard/tecnologie/${this.selectedTech.id}`, this.selectedTech, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                })
                .then(response => {

                    // Trova e aggiorna l'elemento nell'array
                    const index = this.technologies.findIndex(item => item.id === this.selectedTech.id);
                    if (index !== -1) {
                        this.technologies[index] = {...response.data};
                    }

                    this.closeModal();
                    //this.selectedTech = {}; // Reset

                    console.log(this.selectedTech)
                    console.log('Tecnologia aggiornata:', response.data.data);
                    console.log('Dopo la modifica:', this.technologies);
                })
                .catch(error => {
                    console.error('Errore durante l\'aggiornamento:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                });
        },

        closeModal() {
            //chiusura manuale del modale
            const modal = Modal.getInstance(document.getElementById('staticBackdrop'));
            if (modal) modal.hide();
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        },
        // changePage(page) {
            // if (page !== this.pagination.current_page && page > 0 && page <= this.pagination.last_page) {
                // this.loadTechnologies(page);
            // }
        // },

        // closeModal3() {
            // //chiusura manuale del modale
            // const modal = Modal.getInstance(document.getElementById('staticBackdrop3'));
            // if (modal) modal.hide();
            // document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        // },


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
    computed:{
        isEmpty(){
            return this.technologies.length;
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
                                            <div class="padding">
                                                <input type="text" name="name" id="name" v-model="newTech.name">
                                            </div>

                                            <small v-if="errors.name" class="errors">
                                                {{ errors.name }}
                                            </small>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                        <button type="button" class="btn btn-new" @click="getTech">Aggiungi</button>
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
                            <div class="card-table" v-if="isEmpty">

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
                                                                <button
                                                                    type="button"
                                                                    class="btn-delete"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#staticBackdrop3"
                                                                    @click="selectTech(tech)"
                                                                    >
                                                                    <i class="bi bi-pencil"></i>
                                                                    <span>Modifica</span>
                                                                </button>

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

                                <!-- paginazione -->
                                <!-- <nav>
                                    <ul class="pagination">
                                        <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                                            <button class="page-link" @click="changePage(pagination.current_page - 1)"><</button>
                                        </li>

                                        <li class="page-item" v-for="page in pagination.last_page" :key="page" :class="{ active: page === pagination.current_page }">
                                            <button class="page-link" @click="changePage(page)">{{ page }}</button>
                                        </li>

                                        <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                                            <button class="page-link" @click="changePage(pagination.current_page + 1)">></button>
                                        </li>
                                    </ul>
                                </nav> -->


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

                                <!-- modale per aggiornare la tecnologia -->
                                <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel3">Aggiorna la tecnologia selezionata</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form @submit.prevent="editTech" enctype="multipart/form-data" class="row">
                                                <label for="name" id="name">Nome*</label>
                                                <div class="padding">
                                                    <input type="text" name="name" id="name" v-model="selectedTech.name">
                                                </div>

                                                <small v-if="errors.name" class="errors">
                                                    {{ errors.name }}
                                                </small>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                            <button type="button" class="btn-cancel" @click="editTech">Aggiorna</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>




                            </div>

                            <!-- se non ci sono tecnologie presenti -->
                            <div class="card-dashboard" v-else>
                                <div class="d-flex justify-content-center flex-column align-items-center w-100">
                                    <div class="circle-box d-flex align-items-center justify-content-center mb-2" id="circle-techs">
                                        <i class="bi bi-gear"></i>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <p>Non hai ancora caricato tecnologie.</p>
                                        <p>Clicca sul tasto "Aggiungi" in alto per aggiungere una tecnologia</p>
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

input{
    width: 100%;
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid $color-text;
}

label{
    margin-bottom: 0.4rem;
}

.padding{
    padding: 0 0.8rem;
}

#circle-techs{
    background-color: rgb(253, 231, 255);
}

.bi-gear{
    font-size: 6rem;
    color: rgb(237, 137, 255);
}


</style>
