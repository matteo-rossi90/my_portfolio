<script>

import axios from 'axios';
import { onMounted } from 'vue';
import store from '../store/store';


export default{
    name: 'HeaderDashboard',
    data() {
        return {
        }
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
            <div class="d-flex align-items-center justify-content-between h-100">
                <div class="col-10">

                    <div class="d-flex gap-2">
                        <div class="circle-box">
                            <i class="bi bi-suitcase-lg"></i>
                        </div>
                        <ul>
                            <li>
                                {{ store.name }}
                            </li>
                            <li>
                                {{ store.email }}
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="col-2 d-flex align-items-center justify-content-end">
                    <ul class="d-flex gap-3">
                        <li>item</li>
                        <li>item</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

</template>

<style lang="scss" scoped>

#header-dashboard{
    height: 80px;
    box-shadow: 2px 1px 4px 2px rgba(173, 173, 173, 0.6);
    z-index: 1000;
    position: relative;

    li{
        display: flex;
    }
}

.padding{
    padding: 0 2.5rem;
}

.circle-box{
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

</style>
