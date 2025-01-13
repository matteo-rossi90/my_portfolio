<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

export default {
    name: 'Sidenav',
    methods: {
        logOut(){
            axios
            .post("/api/logout")
            .then(() => {
                this.$router.push({name: 'Home'})
            })
            .catch((err) =>{console.log(err)})
        }
    },

}
</script>

<template>
    <div class="container-sidenav">
        <div class="d-flex flex-column align-items-center h-100 justify-content-between py-4">
            <ul>
                <li>
                    <router-link :to="{name: 'Dashboard'}">
                        <span><i class="bi bi-grid-1x2"></i></span>
                        <span>Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'ProjectList'}">
                        <span><i class="bi bi-list-ul"></i></span>
                        <span>Progetti</span>
                    </router-link>
                </li>

            </ul>

            <div id="log-out">
                <a href="#" @click="logOut">
                    <span><i class="bi bi-box-arrow-left"></i></span>
                    <span>Esci</span>
                </a>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../../scss/variables' as*;

ul{
    width: 100%;
}

#log-out,
li{
   padding: 0.8rem 2rem;
   display: flex;
   justify-content: center;
   width: 100%;

   &:hover{
     background-color: $sidenav-hover;
   }

   a{
    display: flex;
    align-items:center;
    gap: 15px;
    width:100%;
   }

   .bi{
    font-size: 1.4rem;
    font-weight: 600;
   }
}


.container-sidenav{
    height: 100%;
    width: 200px;
}

</style>
