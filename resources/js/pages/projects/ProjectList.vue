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
            projects:[],
            activeDropdown: null
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
        dropdownMenu(id){
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
                                            <td>{{ project.type.name }}</td>
                                            <td>
                                                <button class="btn btn-actions" >
                                                    <i class="bi bi-three-dots-vertical" @click="dropdownMenu(project.id)"></i>
                                                </button>
                                                <div class="menu-dropdown-dh">
                                                    <div class="content-menu-dh py-2 shadow-sm" :id="'dropdown-' + project.id">
                                                        <ul>
                                                            <li>
                                                                <i class="bi bi-eye"></i>
                                                                <span>Visualizza</span>
                                                            </li>
                                                            <li>
                                                                <i class="bi bi-pencil"></i>
                                                                <span>Modifica</span>
                                                            </li>
                                                            <li>
                                                                <i class="bi bi-trash3"></i>
                                                                <span>Elimina</span>
                                                            </li>
                                                        </ul>
                                                    </div>
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
        </div>
    </div>
</template>

<style lang="scss" scope>
@use '../../../scss/general' as *;
@use '../../../scss/variables' as *;

table{
    font-size:0.9rem
}

td{
    vertical-align: middle;
}

.btn-actions{
    &:hover{
        background-color: $background-dashboard;
    }
}

.bi,
ul li{
    cursor:pointer;
}

.menu-dropdown-dh{
    position:relative;
}

.content-menu-dh{
    display:none;
    position:absolute;
    right: 60px;
    border: 1px solid $shadow;
    background-color: white;
    border-radius: 10px;
    width: 130px;

    ul li{
        display: flex;
        gap: 10px;
        padding: 0.4rem 1rem;

        &:hover{
            background-color: $background-dashboard;
        }
    }
}

</style>
