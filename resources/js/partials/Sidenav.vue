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
        <div class="d-flex flex-column align-items-center h-100 justify-content-between py-4">
            <ul>
                <li>
                    <router-link :to="{name: 'Dashboard'}">
                        <span><i class="bi bi-grid-1x2"></i></span>
                        <span class="text-link">Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'ProjectList'}">
                        <span><i class="bi bi-list-ul"></i></span>
                        <span class="text-link">Progetti</span>
                    </router-link>
                </li>

            </ul>

            <div id="log-out">
                <a href="#" @click="logOut">
                    <span><i class="bi bi-box-arrow-left"></i></span>
                    <span class="text-link">Disconnetti</span>
                </a>
            </div>
        </div>

    </aside>
</template>

<style lang="scss" scoped>
@use '../../scss/variables' as*;

ul{
    width: 100%;
}

#log-out,
li{
   padding: 0.8rem 2.5rem;
   display: flex;
   justify-content: center;
   width: 100%;

   a{
    display: flex;
    align-items:center;
    gap: 15px;
    width:100%;
   }

   .bi{
    font-size: 1.4rem;
   }
}

li:hover,
#log-out:hover{
    transition: 0.3s;
}

li:hover{
  background-color: $sidenav-hover;

  a{
    color: blue;
  }
}

#log-out:hover {
    background-color: rgb(255, 214, 207);

    a{
        color: $register-tomato;
    }
}


.container-sidenav{
    height: 100%;
    width: 250px;
}

.text-link{
    font-size: 1.1rem;
}

</style>
