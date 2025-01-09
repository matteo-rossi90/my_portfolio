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
        <form @submit.prevent="submit">
            <label for="name">Nome</label>
            <input type="text" id="name" placeholder="Inserisci il nome" v-model="fields.name">

            <label for="email">Email</label>
            <input type="text" id="email" placeholder="Inserisci email" v-model="fields.email">

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Inserisci password" v-model="fields.password">

            <label for="confirm">Conferma password</label>
            <input type="password" id="password_confirmation" placeholder="Conferma password" v-model="fields.password_confirmation">
            <button type="submit">Invia</button>
        </form>
    </div>
</template>

<style lang="scss">

input{
    display:block;
}

</style>
