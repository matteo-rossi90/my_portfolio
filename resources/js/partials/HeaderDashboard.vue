<script>

import axios from 'axios';
import { onMounted } from 'vue';
import store from '../store/store';


export default{
    name: 'HeaderDashboard',
    data() {
        return {}
    },
    setup() {
        onMounted(() => {
            if (!store.name) store.fetchUser();
        });

        return { store };
    },
    mounted() {
        // axios
            // .get('api/user')
            // .then((response) =>{
                // this.name = response.data.name,
                // this.email = response.data.email
            // }).catch((error) => {
                // console.log(error)
            // })
    },
}

</script>

<template>

    <header id="header-dashboard">
        <div class="container-fluid padding h-100">
            <div class="d-flex align-items-center justify-content-end h-100">

                <router-link :to="{ name: 'Profile' }" class="d-flex gap-2">
                    <div class="circle-box">

                        <!-- <i class="bi bi-suitcase-lg"></i> -->
                        <span>M</span>
                    </div>
                    <ul>
                        <li>
                            {{ store.name }}
                        </li>
                        <li>
                            {{ store.email }}
                        </li>
                    </ul>

                </router-link>



                <!-- <div class="col-2 d-flex align-items-center justify-content-end"> -->
                    <!-- <ul class="d-flex gap-4"> -->
                        <!-- <li> -->
                            <!-- <a href="#"> -->
                                <!-- <i class="bi bi-chat"></i> -->
                            <!-- </a> -->
                        <!-- </li> -->
                        <!-- <li> -->
                            <!-- <i class="bi bi-sun"></i> -->
                        <!-- </li> -->
                    <!-- </ul> -->
                <!-- </div> -->
            </div>
        </div>
    </header>

</template>

<style lang="scss" scoped>

//@use '../../scss/variables' as*;

#header-dashboard{
    height: 80px;
    background-color: white;
    box-shadow: 2px 1px 4px 2px rgba(173, 173, 173, 0.6);
    z-index: 1000;
    position: fixed;
    width: calc(100% - 90px);
    right: 0;

    li{
        display: flex;
    }
}

.padding{
    padding: 0 1.2rem;
}

.circle-box {
    display:flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 100%;
    background-color: orange;
    width: 50px;
    height: 50px;
}

.bi{
    font-size: 1.5rem;
}

span{
    font-size:1.5rem;
}

</style>
