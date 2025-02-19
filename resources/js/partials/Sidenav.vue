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
    <aside class="container-sidenav">
        <div class="d-flex flex-column align-items-center h-100 justify-content-between">
            <div id="logo">
                <router-link :to="{name: 'Home'}">
                    <!-- <span><i class="bi bi-house"></i></span> -->
                    <img src="../../../public/img/Logo dark.png" alt="">
                </router-link>
            </div>
            <ul>
                <li>
                    <router-link :to="{name: 'Dashboard'}">
                        <span><i class="bi bi-columns"></i></span>
                        <span class="text-link">Info</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'ProjectList'}">
                        <span><i class="bi bi-code-slash"></i></span>
                        <span class="text-link">Progetti</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'TypeList'}">
                        <span><i class="bi bi-tags"></i></span>
                        <span class="text-link">Tipi</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'TechnologiesList'}">
                        <span><i class="bi bi-gear"></i></span>
                        <span class="text-link">Tecnologie</span>
                    </router-link>
                </li>

            </ul>

            <div id="log-out">
                <a href="#" @click="logOut">
                    <span><i class="bi bi-box-arrow-left"></i></span>
                    <span class="text-link">Esci</span>
                </a>
            </div>
        </div>

    </aside>
</template>

<style lang="scss" scoped>
@use '../../scss/variables' as*;

*{
    color: white;
}

#logo img{
    height: 60px;
    width: 60px;
}

aside{
    background-color: rgb(39, 39, 39);
}

ul{
    width: 100%;
}

#log-out,
li{
   padding: 0.2rem 0.6rem;
   display: flex;
   justify-content: center;
   width: 100%;

   a{
    display: flex;
    flex-direction: column;
    align-items:center;
    // gap: 15px;
    width:100%;
    padding: 0.6rem;
   }

   .bi{
    font-size: 1.2rem;
   }
}

li a:hover,
#log-out a:hover{
    transition: 0.3s;
    border-radius: 10px;
}



li a:hover{
    background-color: $sidenav-hover;
}


#log-out a:hover {

    background-color: $sidenav-hover;

}


.container-sidenav{
    padding: 0.8rem 0;
    height: 100%;
    width: 90px;
}

.text-link{
    font-size: 0.7rem;
}

</style>
