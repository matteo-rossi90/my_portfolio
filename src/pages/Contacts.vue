<script>
import { store } from '../store';


export default {
    name: 'Contacts',
    data() {
        return {
            store
        }
    },
}
</script>

<template>

    <!-- contatti -->
    <section>
        <div class="content-container">
            <h1 class="text-center">Contatti</h1>

            <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-lg-6">
                    <h2>Puoi trovarmi qui</h2>
                    <ul>
                        <li class="d-flex gap-5 align-items-center text-standard" v-for="(item, index) in store.social" :key="index">
                            <i :class="item.icon"></i>
                            <a :href="item.href">{{ item.link }}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-center">
                    <div class="box-image">
                        <img src="../assets/mail-sent-animate2.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- form di compilazione -->
    <section>
        <div class="content-container">
            <div class="row">
                <p class="text-center text-standard">...oppure prova a inviare un messaggio qui e ti risponderò</p>

                <div class="col-12 col-md-8 col-lg-8 m-auto py-5">
                    <div class="form-box text-standard">
                        <form action="" class="d-flex flex-column">
                            <div class="input-box d-flex gap-4">
                                <input type="text" placeholder="Nome">
                                <input type="text" placeholder="Cognome">
                            </div>
                            
                            <div class="input-box">
                                <input type="email" placeholder="Email">
                            </div>
                            
                            <div class="input-box">
                                <textarea name="" id="" placeholder="Messaggio" rows="5"></textarea>
                            </div>
                            
                            <div class="btn-form">
                                <button>Invia</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../style/general' as*;

li{
    padding: 1rem 0;

    i{
        font-size: 2rem;
    }
}

.box-image{
    height: 450px;
    width: 450px;
}

.form-box{
    display: flex;
    justify-content: center;
    // background: white;
    border-radius: 20px;

    form{
        width: 80%;
        padding: 1.5rem;

        input,
        textarea{
            width: 100%;
            margin-bottom: 1.5rem;
            padding: 0.5rem;
            border-right: none;
            border-left: none;
            border-top: none;
            border-bottom: 1px solid rgb(54, 54, 54);
            background: transparent

        }

        button{
            padding: 0.4rem 3rem;
            border-radius: 50px;
            background-color: $font-color;
            border: 1px solid $font-color;
            color: white;
        }

        .btn-form{
            display: flex;
            justify-content: center;
        }
    }

    
}
    
</style>