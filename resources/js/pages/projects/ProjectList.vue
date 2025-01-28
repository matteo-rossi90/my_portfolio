<script>
import axios from 'axios';
import Sidenav from '../../partials/Sidenav.vue';
import HeaderDashboard from '../../partials/HeaderDashboard.vue';

export default{
    name: 'ProjectList',
    components:{
        HeaderDashboard,
        Sidenav
    },
    data() {
        return {
            projects:[]
        }
    },
    mounted() {
        axios
            .get('/api/user')
            .then(() => {

                this.loadProjects();
            })
            .catch((error) => {
                if (error.response.status === 401) {

                    localStorage.removeItem('authenticated');
                    this.$router.push({ name: 'Login' });
                }
            });

    },
    methods: {
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
            <div class="container-fluid p-4">
                <h2>Lista progetti</h2>
                <div class="box-stat">
                    <div class="row">
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
                                            <td>{{ project.type.name }}</td>
                                            <td>
                                                <button class="btn btn-actions">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scope>
@use '../../../scss/general' as *;
@use '../../../scss/variables' as *;

table{
    font-size:0.9rem
}

.btn-actions{
    &:hover{
        background-color: $background-dashboard;
    }
}

.bi{
    cursor:pointer;
}

</style>
