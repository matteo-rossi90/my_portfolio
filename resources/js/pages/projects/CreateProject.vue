<script>
import axios from 'axios';

import HeaderDashboard from '../../partials/HeaderDashboard.vue';
import Sidenav from '../../partials/Sidenav.vue';
import Loader from '../../partials/Loader.vue';

export default {
    name:'CreateProject',
    components:{
        HeaderDashboard,
        Sidenav,
        Loader
    },
    data() {
        return {
            projects: {
                title: "",
                theme: "",
                company: "",
                description: "",
                start_date: "",
                end_date: "",
                technologies: [],
                type_id: "",
                img: ""
            },
            types: [],
            technologies: [],
            errors:{},
            isLoading: true
        }
    },
    methods: {
        submit(){
            this.isLoading = true;
            let formData = new FormData();

            // Aggiungi i dati del progetto
            // formData.append('projects', JSON.stringify(this.projects));

            formData.append('title', this.projects.title);
            formData.append('theme', this.projects.theme);
            formData.append('company', this.projects.company);
            formData.append('description', this.projects.description);
            formData.append('start_date', this.projects.start_date);
            formData.append('end_date', this.projects.end_date);
            formData.append('type_id', this.projects.type_id);

            // Aggiungi le tecnologie come array
            this.projects.technologies.forEach(tech => {
                formData.append('technologies[]', tech);
            });

            // Aggiungi l'immagine se esiste
            if (this.projects.img) {
                formData.append('img', this.projects.img);
            }

            axios.post('/api/dashboard/nuovo-progetto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log('Progetto creato:', response.data);
                this.$router.push({ name: 'ProjectList' });
                this.projects = {}
            })
            .catch(error => {
                if (error.response) {
                    this.errors = error.response.data.errors;
                    this.validateForm()
                }
            });
        },
        addTechs(idTechnologies) {
            if (this.projects.technologies.includes(idTechnologies)) {
                // lo tolgo
                let index = this.projects.technologies.indexOf(idTechnologies);
                this.projects.technologies.splice(index, 1);
            } else {
                // lo inserisco
                this.projects.technologies.push(idTechnologies);
            }
            console.log(this.projects.technologies);
            },

        handleFileUpload(event) {
            // this.projects.img = event.target.files[0];
            const file = event.target.files[0];
            if (file) {
                this.projects.img = file;

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.projects.imgPreview = reader.result;
                };
            }
        },

        validateForm(){
            setTimeout(() => {
                this.isLoading = false;
            }, 1000)
            this.errors = {};

            //validazione titolo
            if(!this.projects.title && this.projects.title.length === 0){
                this.errors.title = 'Il titolo è obbligatorio'
            }else if(this.projects.title.length > 100){
                this.errors.title = 'Il titolo non può avere più di 100 caratteri'
            }else if(this.projects.title.length < 5){
                this.errors.title = 'Il titolo non può avere meno di 5 caratteri'
            }

            //validazione argomento
            if(!this.projects.theme){
                this.errors.theme = "L'argomento è un campo obbligatorio"
            }

            if(this.projects.theme.length > 100){
                this.errors.theme = "L'argomento non può avere più di 100 caratteri"
            }

            //validazione ambito lavorativo
            if(!this.projects.company){
                this.errors.company = "L'ambito lavorativo è un campo obbligatorio"
            }

            //validazione tecnologie
            if(this.projects.technologies.length === 0){
                this.errors.technologies = "Scegliere almeno una delle tecnologie proposte"
            }

            //validazione data inizio
            if (!this.projects.start_date) {
                this.errors.start_date = "La data d'inizio è un campo obbligatorio";
            }


        }

    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000)

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
            this.technologies = response.data; // Salva le tecnologie disponibili
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
            <div class="container-fluid p-4" v-if="!isLoading">

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

                                <div class="col-12 col-md-6 mb-4">
                                    <label for="title">Titolo*</label>
                                    <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Inserisci il titolo"
                                    v-model="projects.title">

                                    <small v-if="errors.title" class="errors">
                                        {{ errors.title }}
                                    </small>
                                </div>
                                <div class="col-12 col-md-6 mb-4">
                                    <label for="theme">Argomento*</label>
                                    <input
                                    type="text"
                                    id="theme"
                                    name="theme"
                                    placeholder="Inserisci argomento"
                                    v-model="projects.theme">

                                    <small v-if="errors.theme" class="errors">
                                        {{ errors.theme }}
                                    </small>

                                </div>
                                <div class="col-12 col-md-6 mb-4">
                                    <label for="#">Ambito di sviluppo*</label>
                                    <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Inserisci ambito di sviluppo"
                                    v-model="projects.company">

                                    <small v-if="errors.company" class="errors">
                                        {{ errors.company }}
                                    </small>

                                </div>
                                <div class="col-12 col-md-6 d-flex flex-column mb-4">
                                    <label for="type_id" name="type_id">Tipologia</label>
                                    <select name="type_id" id="type_id" v-model="projects.type_id">
                                        <option value="#">Seleziona</option>
                                        <option v-for="type in types" :key="type.id" :value="type.id">
                                            {{ type.name }}
                                        </option>
                                    </select>

                                </div>
                                <label for="technologies">Tecnologie*</label>

                                <div class="col-12 gap-4 mb-4 d-flex flex-wrap">
                                    <label v-for="tech in technologies" :key="tech.id" class="d-flex gap-2">
                                        <input type="checkbox" :value="tech.id" @click="addTechs(tech.id)">
                                        <span>{{ tech.name }}</span>
                                    </label>

                                    <small v-if="errors.technologies" class="errors">
                                        {{ errors.technologies }}
                                    </small>

                                </div>
                                <div class="col-12 col-md-6 mb-4">
                                    <label for="start_date">Data d'inizio*</label>
                                    <input type="date"
                                    id="end_date"
                                    name="start_date"
                                    v-model="projects.start_date">

                                     <small v-if="errors.start_date" class="errors">
                                        {{ errors.start_date }}
                                    </small>
                                </div>
                                <div class="col-12 col-md-6 mb-4">
                                    <label for="end_date">Data di fine</label>
                                    <input
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                    v-model="projects.end_date">
                                </div>
                                <div class="col-12 d-flex flex-column mb-4">
                                    <label for="file-upload">Carica un'immagine</label>
                                    <div class="custom-file-upload">
                                        <input
                                        type="file"
                                        id="file-upload"
                                        class="file-input"
                                        @change="handleFileUpload">
                                        <div class="upload-area">
                                            <i class="bi bi-cloud-upload" v-if="!projects.imgPreview"></i>
                                            <span v-if="!projects.imgPreview">Trascina il file qui o clicca per caricare</span>
                                            <img v-if="projects.imgPreview" :src="projects.imgPreview" alt="Anteprima immagine" class="img-preview">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 d-flex flex-column mb-4">
                                    <label for="description">Descrizione</label>
                                    <textarea
                                    name="description"
                                    id="description"
                                    rows="8"
                                    v-model="projects.description"></textarea>
                                </div>

                                <div class="col-12 col-2">
                                    <button class="btn btn-new" type="submit">Invia</button>
                                </div>

                            </form>


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
    width: 200px;
    /* max-width: 100%; */
    height: 200px;
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
    // padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    height: 100%;

}

.upload-area .img-preview{
    object-fit: cover;
    width: 100%;
    height: 100%;
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
