<script>
import axios from 'axios';

import Sidenav from '../partials/Sidenav.vue';
import HeaderDashboard from '../partials/HeaderDashboard.vue';
import ProjectList from './partials/ProjectList.vue';

export default {
    name: 'Dashboard',
    components:{
        Sidenav,
        HeaderDashboard,
        ProjectList
    },
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        axios
        .get("/api/user")
        .then((response) => {
            this.name = response.data.name
        })
        .catch((err) =>{console.log(err)})
    },
}
</script>

<template>
    <HeaderDashboard/>

    <div class="wrap-container">
        <Sidenav/>
        <div class="container-body">
            <div class="container-fluid p-4">
                <h2>Ciao, {{ name }}</h2>
                <p>Riepilogo delle attività</p>
                <div class="box-stat">

                    <div class="row py-2">

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="projects">
                                    <i class="bi bi-archive"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Progetti</h5>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="views">
                                    <i class="bi bi-eye"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Visite</h5>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-12 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="messages">
                                    <i class="bi bi-envelope"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Messaggi</h5>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="row py-2">
                        <div class="col-12 col-md-8">
                            <div class="card-stats">
                                <h5>Visite mensili</h5>
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="card-stats">
                                <h5>Progetti per tipi</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../scss/general' as *;
@use '../../scss/variables' as *;

*{
    color: $color-text;
}

.card-dashboard{
    display: flex;
    align-items: center;
    gap: 3rem;
    background-color: $color-light;
    border-radius: 15px;
    padding: 2rem;

    .text-box{
        span{
            font-size: 2rem;
        }
    }
}

.circle{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 4.5rem;
    width: 4.5rem;

    .bi{
        font-size: 2.2rem;
    }

    .bi-archive{
        color: tomato;
    }

    .bi-eye{
        color: rgb(213, 67, 199);
    }

    .bi-envelope{
        color: rgb(71, 111, 255);
    }
}

#projects{
    background-color: rgb(255, 223, 223);
}

#views{
    background-color: rgb(254, 217, 250);
}

#messages{
    background-color: rgb(219, 227, 255);
}

.card-stats{
    padding: 2rem;
    background-color: $color-light;
    height: 600px;
    border-radius: 15px;
}


</style>
