<script>
import axios from 'axios';


export default{
    name: 'Register',
    data() {
        return {
            fields:{
                name:'',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors:{
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods: {
        submit(){
            axios
            .post("/api/register", this.fields)
            .then((response) => {
                console.log(response.data)
                this.$router.push({name: 'Dashboard'})
            })
            .catch((error) => {
                this.errors = error.response.data.errors

                console.log(this.errors)

                //controllo degli errori
                if(!this.fields.name){ //se il campo name è vuoto
                    this.errors.name = 'Il nome è un campo obbligatorio'

                }else if(!/^[A-Za-z\.\_\-]+$/.test(this.fields.name)){
                    this.errors.name = 'Il nome deve contenere lettere'
                }

                if(!this.fields.email){ //se il campo email è vuoto
                    this.errors.email = 'L\'email è un campo obbligatorio'
                }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.fields.email)){
                    this.errors.email = 'Inserisci una mail valida '
                }

                if(!this.fields.password){ //se il campo password è vuoto
                    this.errors.password = 'La password è un campo obbligatorio'
                } else if (this.fields.password.length < 6) {
                    this.errors.password = 'La password deve contenere almeno 6 caratteri';
                } else if(this.fields.password.length > 12){
                    this.errors.password = 'La password non può contenere più di 12 caratteri'
                } else if(!/^[\_\*\-\+\!\?\,\:\;\.\xE0\xE8\xE9\xF9\xF2\xEC\x27]+$/.test(this.fields.password)){
                    this.errors.password = 'La password deve contenere almeno un simbolo tra: _ * – + ! ? , : ; . e lettere accentate'
                }


                if (!this.fields.password_confirmation) { // Se il campo conferma password è vuoto
                    this.errors.password_confirmation = 'La conferma della password è obbligatoria';
                } else if (this.fields.password !== this.fields.password_confirmation || this.fields.password === !this.fields.password_confirmation ) {
                    this.errors.password_confirmation = 'Le due password non corrispondono';
                }

                // Controlla che gli errori siano stringhe
                this.errors.password = typeof this.errors.password === 'string' ? this.errors.password : '';
                this.errors.password_confirmation = typeof this.errors.password_confirmation === 'string' ? this.errors.password_confirmation : '';


            })
        }
    },
}
</script>

<template>
    <body class="background-form">
        <div class="container">
            <div class="container-form" id="register">

                <form @submit.prevent="submit" class="form">
                    <h4 id="form-title-register">Registrati</h4>

                    <div class="input-box">
                        <label for="name">Nome</label>
                        <input type="text" id="name" placeholder="Inserisci il nome" v-model="fields.name">
                        <small class="errors" v-if="errors.name">{{ errors.name }}</small>
                    </div>

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

                    <div class="input-box">
                        <label for="confirm">Conferma password</label>
                        <input type="password" id="password_confirmation" placeholder="Conferma password" v-model="fields.password_confirmation">
                        <small class="errors" v-if="errors.password_confirmation">{{ errors.password_confirmation}}</small>
                    </div>

                    <div class="box-btn">
                        <button type="submit" id="btn-register">Registrati</button>
                    </div>

                    <div class="box-link">
                        <p>Hai già un account?</p>
                        <span>
                            <router-link :to="{name: 'Login'}">
                                Clicca qui
                            </router-link>
                        </span>
                    </div>
                </form>
            </div>



        </div>

    </body>
</template>

<style lang="scss" scoped>
@use '../../scss/general' as*;


#register{
    padding-top: 2rem;
}

#form-title-register{
    margin-bottom: 1rem;
}

</style>
