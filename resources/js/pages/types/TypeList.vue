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
            types:[],
            newType:{
                name:""
            },
            selectedType: {},
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

        loadTypes(){
            axios
                .get("/api/dashboard/tipi")
                .then((response) => {
                    console.log(response.data)
                    this.types = response.data
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
        validateType(){

            this.errors = {}

            if(!this.newType.name && this.newType.name.length === 0){
                this.errors.name = 'Il nome è un campo obbligatorio'
            }else if(this.newType.name.length > 100){
                this.errors.name = 'Il tipo non può avere più di 100 caratteri'
            }else if(this.newType.name.length < 5){
                this.errors.name = 'Il tipo non può avere meno di 5 caratteri'
            }

            return Object.keys(this.errors).length === 0;
        },
        validateUpdate(){

            this.errors = {}

            if(!this.selectedType.name && this.selectedType.name.length === 0){
                this.errors.name = 'Il nome è un campo obbligatorio'
            }else if(this.selectedType.name.length > 100){
                this.errors.name = 'Il tipo non può avere più di 100 caratteri'
            }else if(this.selectedType.name.length < 5){
                this.errors.name = 'Il tipo non può avere meno di 5 caratteri'
            }
            return Object.keys(this.errors).length === 0;
        },
        getType(){

            if (!this.validateType()) {
                return;
            }

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

                this.closeModal()
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    console.error('Errore durante la richiesta:', error);
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
                // this.selectedType = null;

                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            })
            .catch((error) => {
                console.error('Errore durante la cancellazione:', error);
            });
        },
        selectEdit(type){
            this.selectedType = { ...type }
            console.log(type)
        },
        editType() {

             if (!this.validateUpdate()) {
                return;
            }

            this.isLoading = true;

            axios
                .put(`/api/dashboard/tipi/${this.selectedType.id}`, this.selectedType, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                })
                .then(response => {

                    // Trova e aggiorna l'elemento nell'array
                    const index = this.types.findIndex(item => item.id === this.selectedType.id);
                    if (index !== -1) {
                        this.types[index] = {...response.data};
                    }

                    this.closeModal();
                    this.selectedType = {}; // Reset

                    console.log(this.selectedType)
                    console.log('Tipo aggiornato:', response.data);
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
                // this.loadTypes(page);
            // }
        // }
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
    computed:{
        isEmpty(){
            return this.types.length;
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
                                            <div class="padding">
                                                <input type="text" name="name" id="name" v-model="newType.name">
                                            </div>

                                            <small v-if="errors.name" class="errors">
                                                {{ errors.name }}
                                            </small>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                        <button type="button" class="btn btn-new" @click="getType">Aggiungi</button>
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
                                                               <button
                                                                    type="button"
                                                                    class="btn-delete"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#staticBackdrop3"
                                                                    @click="selectEdit(type)"
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

                                <!-- modale per aggiornare la tipologia -->
                                <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel3">Aggiorna la tipologia selezionata</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form @submit.prevent="editType" enctype="multipart/form-data" class="row">
                                                <label for="name" id="name">Nome*</label>
                                                <div class="padding">
                                                    <input type="text" name="name" id="name" v-model="selectedType.name">
                                                </div>

                                                <small v-if="errors.name" class="errors">
                                                    {{ errors.name }}
                                                </small>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-back" data-bs-dismiss="modal">Annulla</button>
                                            <button type="button" class="btn-cancel" @click="editType">Aggiorna</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>



                            </div>

                            <!-- se non ci sono tipi presenti -->
                            <div class="card-dashboard" v-else>
                                <div class="d-flex justify-content-center flex-column align-items-center w-100">
                                    <div class="circle-box d-flex align-items-center justify-content-center mb-2" id="circle-type">
                                        <i class="bi bi-tags"></i>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <p>Non hai ancora caricato tipologie.</p>
                                        <p>Clicca sul tasto "Aggiungi" in alto per aggiungere un tipo</p>
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

#circle-type{
    background-color: rgb(218, 237, 255);
}

.bi-tags{
    font-size: 6rem;
    color: rgb(114, 184, 255);
}


</style>
