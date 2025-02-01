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

                            <form action="#" class="row">

                                <div class="col-12 col-md-6 mb-3">
                                    <label for="#">Titolo</label>
                                    <input type="text" placeholder="Inserisci il titolo">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="#">Argomento</label>
                                    <input type="text" placeholder="Inserisci argomento">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="#">Ambito di sviluppo</label>
                                    <input type="text" placeholder="Inserisci ambito di sviluppo">
                                </div>
                                <div class="col-12 col-md-6 d-flex flex-column mb-3">
                                    <label for="#">Tipologia</label>
                                    <select name="#" id="#">
                                        <option value="#">Seleziona</option>
                                    </select>
                                </div>
                                <label for="#">Tecnologie</label>
                                <div class="col-12 d-flex gap-2 mb-3">
                                    <input type="radio">
                                    <span>HTML</span>
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="#">Data d'inizio</label>
                                    <input type="date">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="#">Data di fine</label>
                                    <input type="date">
                                </div>
                                <div class="col-12 col-md-6 d-flex flex-column mb-3">
                                    <label for="file-upload">Carica un'immagine</label>
                                    <div class="custom-file-upload">
                                        <input type="file" id="file-upload" class="file-input">
                                        <div class="upload-area">
                                            <i class="bi bi-cloud-upload"></i>
                                            <span>Trascina il file qui o clicca per caricare</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 d-flex flex-column mb-3">
                                    <label for="#">Descrizione</label>
                                    <textarea name="" id="" rows="8"></textarea>
                                </div>

                                <div class="col-12 col-2">
                                    <button class="btn btn-new" type="submit">Invia</button>
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
