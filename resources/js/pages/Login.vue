<script>
export default{
    name: 'Login'
}
</script>

<template>
    <body class="background-form">
        <div class="container">

            <div class="container-form" id="login">


                <form class="form">

                    <h4 id="form-title-login">Accedi</h4>

                    <div class="input-box">
                        <label for="name">Nome utente</label>
                        <input type="text" id="name">
                    </div>

                    <div class="input-box">
                        <label for="password">Password</label>
                        <input type="password" id="password">
                    </div>

                    <div class="box-btn">
                        <button type="input" id="btn-login">Accedi</button>
                    </div>
                </form>
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
