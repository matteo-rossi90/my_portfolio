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
    data() {
        return {
            fields: {
            technologies: [],
            type_id: "",
        },
            types: [],  // Lista dei tipi
            //technologies: [],  // Lista delle tecnologie
            errors:{}
        }
    },
    methods: {
        submit(){
            let formData = new FormData();

            // Aggiungi i dati del progetto
            formData.append('title', this.fields.title);
            formData.append('theme', this.fields.theme);
            formData.append('company', this.fields.company);
            formData.append('description', this.fields.description);
            formData.append('start_date', this.fields.start_date);
            formData.append('end_date', this.fields.end_date);

            // Aggiungi l'immagine se esiste
            if (this.fields.image) {
                formData.append('image', this.fields.image);
            }

            axios.post('/api/dashboard/progetti', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log('Progetto creato:', response.data);
                this.$router.push({ name: 'ProjectList' });
                this.fields = {}
            })
            .catch(error => {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
            });
        },

        handleFileUpload(event) {
            this.fields.image = event.target.files[0];
        },

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

        axios
        .get('/api/dashboard/tipi')
        .then(response => {
            this.types = response.data; // Salva i tipi disponibili
        })
        .catch(error => console.log(error));

        axios
        .get('/api/dashboard/tecnologie')
        .then(response => {
            this.techs = response.data; // Salva le tecnologie disponibili
        })
        .catch(error => console.log(error));
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

                <div class="row py-3">
                    <div class="col-12">
                        <div class="card-dashboard-form">

                            <form @submit.prevent="submit" enctype="multipart/form-data" class="row">

                                <div class="col-12 col-md-6 mb-3">
                                    <label for="title">Titolo</label>
                                    <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Inserisci il titolo"
                                    v-model="fields.title">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="theme">Argomento</label>
                                    <input
                                    type="text"
                                    id="theme"
                                    name="theme"
                                    placeholder="Inserisci argomento"
                                    v-model="fields.theme">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="#">Ambito di sviluppo</label>
                                    <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Inserisci ambito di sviluppo"
                                    v-model="fields.company">
                                </div>
                                <div class="col-12 col-md-6 d-flex flex-column mb-3">
                                    <label for="type_id" name="type_id">Tipologia</label>
                                    <select name="type_id" id="type_id" v-model="fields.type_id">
                                        <option v-for="type in types" :key="type.id" :value="type.id">
                                            {{ type.name }}
                                        </option>
                                        <option value="#">Seleziona</option>
                                    </select>
                                </div>
                                <label for="#">Tecnologie</label>
                                <div class="col-12 d-flex gap-2 mb-3">
                                    <input type="radio">
                                    <span>HTML</span>
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="start_date">Data d'inizio</label>
                                    <input type="date"
                                    id="end_date"
                                    name="start_date"
                                    v-model="fields.start_date">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="end_date">Data di fine</label>
                                    <input
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                    v-model="fields.end_date">
                                </div>
                                <div class="col-12 col-md-6 d-flex flex-column mb-3">
                                    <label for="file-upload">Carica un'immagine</label>
                                    <div class="custom-file-upload">
                                        <input
                                        type="file"
                                        id="file-upload"
                                        class="file-input"
                                        @change="handleFileUpload">
                                        <div class="upload-area">
                                            <i class="bi bi-cloud-upload"></i>
                                            <span>Trascina il file qui o clicca per caricare</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 d-flex flex-column mb-3">
                                    <label for="description">Descrizione</label>
                                    <textarea
                                    name="description"
                                    id="description"
                                    rows="8"
                                    v-model="fields.description"></textarea>
                                </div>

                                <div class="col-12 col-2">
                                    <button class="btn btn-new" type="submit" @click="submit">Invia</button>
                                </div>

                            </form>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use '../../../scss/variables' as *;

input[type=text],
input[type=date],
select,
textarea{
    width: 100%;
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid $color-text;
}

label{
    margin-bottom: 0.4rem;
}

.custom-file-upload {
    position: relative;
    display: inline-block;
    width: 100%;
    text-align: center;
}

.file-input {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.upload-area {
    border: 2px dashed $color-text;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
}

.upload-area:hover {
    background: rgba(0, 0, 0, 0.05);
}

.upload-area i {
    font-size: 2rem;
    margin-bottom: 8px;
    color: $color-text;
}

.upload-area span {
    color: $color-text;
}

</style>
