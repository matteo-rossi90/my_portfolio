<script>
import axios from 'axios';
import Loader from '../partials/Loader.vue';

export default{
    name: 'Login',
    components:{
        Loader
    },
    data() {
        return {
            fields:{
                email: '',
                password: '',
            },
            errors:{
                email: '',
                password: '',
            },
            isLoading:true
        }
    },
    methods: {
        submit(){
            this.isLoading = true;
            axios
            .post("/api/login", this.fields)
            .then((response) => {
                console.log('login riuscito', response.data)
                this.$router.push({name: 'Dashboard'})
            })
            .catch((error) => {
                this.errors = error.response.data.errors

                console.log(this.errors)

                //controllo degli errori


                if(!this.fields.email){ //se il campo email è vuoto
                    this.errors.email = 'L\'email è un campo obbligatorio'
                }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.fields.email)){
                    this.errors.email = 'Inserisci una mail valida '
                }

                if(!this.fields.password){ //se il campo password è vuoto
                    this.errors.password = 'La password è un campo obbligatorio'
                } else if (this.fields.password.length < 6) {
                    this.errors.password = 'La password deve contenere almeno 6 caratteri';
                } else if(this.fields.password.length > 20){
                    this.errors.password = 'La password non può contenere più di 20 caratteri'
                } else if(!/^[\_\*\-\+\!\?\,\:\;\.\xE0\xE8\xE9\xF9\xF2\xEC\x27]+$/.test(this.fields.password)){
                    this.errors.password = 'La password deve contenere almeno un simbolo tra: _ * – + ! ? , : ; . e lettere accentate'
                }


            })
            .finally(() => {
                this.isLoading = false;  // Nasconde il loader dopo la risposta
            });
        },

    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2500)

    },
}
</script>

<template>
    <body class="background-form">
        <div class="container">

            <div class="container-form" id="login" v-if="!isLoading">

                <form @submit.prevent="submit" class="form">

                    <h4 id="form-title-login">Accedi</h4>

                    <div class="input-box">
                        <label for="email">Email</label>
                        <input type="text" id="email" placeholder="Inserisci email" v-model="fields.email">
                        <small class="errors" v-if="errors.email">{{ errors.email }}</small>
                    </div>
                    <div class="input-box">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Inserisci password" v-model="fields.password">
                        <small class="errors" v-if="errors.password">{{ errors.password }}</small>
                    </div>

                    <div class="box-btn">
                        <button type="input" id="btn-login">Accedi</button>
                    </div>
                </form>
            </div>

            <div class="container-form" v-else>
                <Loader/>
            </div>

        </div>

    </body>
</template>

<style lang="scss" scoped>
@use '../../scss/general' as*;

#login{
    padding-top: 4rem;
}

#form-title-login{
    margin-bottom: 3rem;
}

</style>
