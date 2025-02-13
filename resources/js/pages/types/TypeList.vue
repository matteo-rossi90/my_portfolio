<script>
import axios from 'axios';
import HeaderDashboard from '../../partials/HeaderDashboard.vue';
import Sidenav from '../../partials/Sidenav.vue';

export default {
    name: 'TypeList',
    components:{
        HeaderDashboard,
        Sidenav
    },
    data() {
        return {
            types:[]
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
        }
    },
    mounted() {
        axios
            .get('/api/user')
            .then(() => {
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
            <div class="container-fluid p-4">

                    <div class="row py-2">
                        <div class="col-12">
                             <div class="card-dashboard justify-content-between">
                                <div class="title-list">
                                    <h2>Lista tipi</h2>
                                    <p>Riepilogo delle attività</p>
                                </div>
                                <!-- <router-link :to="{ name: 'CreateProject' }" class="btn btn-new d-flex gap-2 align-items-center"> -->
                                    <!-- <i class="bi bi-plus-circle"></i> -->
                                    <!-- <span>Aggiungi</span> -->
                                <!-- </router-link> -->
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
                                                                <a href="#">
                                                                    <i class="bi bi-trash3"></i>
                                                                    <span>Elimina</span>
                                                                </a>

                                                            </li>
                                                        </ul>
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

<style lang="scss" scoped>

@use '../../../scss/list' as*;
@use '../../../scss/general' as*;
@use '../../../scss/variables' as*;



</style>
