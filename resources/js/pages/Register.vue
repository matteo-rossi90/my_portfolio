<script>
import axios from 'axios';


export default{
    name: 'Register',
    data() {
        return {
            fields:{}
        }
    },
    methods: {
        submit(){
            axios
            .post('api/register', this.fields)
            .then((response) => {
                console.log(response)
                this.$router.push({name: 'Dashboard'})
            })
            .catch((error) => {
                this.errors = error.response.data.errors
            })
        }
    },
}
</script>

<template>
    <div class="container">
        <div class="container-form">
            <form @submit.prevent="submit" class="form">
                <div class="input-box">
                    <label for="name">Nome</label>
                    <input type="text" id="name" placeholder="Inserisci il nome" v-model="fields.name">
                </div>

                <div class="input-box">
                    <label for="email">Email</label>
                    <input type="text" id="email" placeholder="Inserisci email" v-model="fields.email">
                </div>

                <div class="input-box">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Inserisci password" v-model="fields.password">
                </div>

                <div class="input-box">
                    <label for="confirm">Conferma password</label>
                    <input type="password" id="password_confirmation" placeholder="Conferma password" v-model="fields.password_confirmation">
                </div>

                <div class="box-btn">
                    <button type="submit" id="btn-register">Registrati</button>
                </div>
            </form>
        </div>



    </div>
</template>

<style lang="scss">

input{
    display:block;
}

</style>
