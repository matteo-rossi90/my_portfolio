<script>
import { onMounted } from 'vue';
import gsap from 'gsap';

export default {
    name: 'Home',
    setup() {
        onMounted(() => {
                gsap.from("#main-title h1", {
                    y: 20,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.out",

                 });

                 gsap.from(".text-standard", {
                    y: 30,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.5,
                    ease: "power3.out",
                });

                gsap.from(".text-big", {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.5,
                    ease: "power3.out",
                });

                gsap.from("#star1 img, #star2 img", {
                    scale: 0,
                    opacity: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)",
                    stagger: 0.3, 
                });

       }) 
    }
    
    
}
</script>

<template>

    <!-- sezione con descrizione generale -->
    <section id="background-intro">
        <div class="content-container">
            <div class="d-flex justify-content-center">

                <!-- Descrizione -->
                
                <div class="col-12">
                    <div class="welcome">

                        <div class="py-3" id="main-title">
                            <div class="icon" id="star1">
                                <img src="../assets/star-1.svg" alt="">
                            </div>

                            <h1>Ciao, sono Matteo,<br>uno Sviluppatore Web</h1>
                    

                            <div class="icon" id="star2">
                                <img src="../assets/star-2.svg" alt="">
                            </div>

                        </div>

                        <p class="m-auto text-standard">
                            Creo siti web e applicazioni di vario tipo cercando di trovare soluzioni adeguate, efficaci e intuitive per gli utenti. 
                        </p>


                    </div>
                </div>

            </div>
        </div>

    </section>

    <!-- Perché la programmazione? / Cosa mi piace dello sviluppo -->
    <section>
        <div class="content-container">

            <!-- perché la programmazione -->
            <div class="row">
                <div class="col-12 col-md-12 col-lg-6 mb-5">
                    <div class="frame">
                        <h3>Perché proprio la programmazione?</h3>
                        <p class="text-standard">
                            Credo che la programmazione sia un linguaggio universale con cui realizzare ciò che vuoi e dare libero sfogo a creatività e fantasia.
                        </p>

                    </div>
                </div>

                <div class="col-12 col-md-12 col-lg-6 mt-5">
                    <div class="frame">
                        <h3>Cosa mi piace dello sviluppo</h3>
                        <p class="text-standard">
                            Lavorando a progetti individuali e di gruppo ho capito che dello sviluppo mi piace trovare soluzioni efficaci per fornire un'esperienza utente quanto più possibile efficace e intuitiva.
                        </p>

                    </div>
                </div>

            </div>

        </div>

    </section>

    <!-- pulsante progetti -->
    <section>
        <div class="content-container">

            <p class="text-standard text-center">Vuoi saperne di più ?</p>

            <div class="d-flex justify-content-center">

                    <div class="btn-box text-standard">

                        <router-link :to="{name: 'Portfolio'}" class="btn-char btn-moon">
                            <span>
                                Vai ai progetti
                            </span>
                            <i class="bi bi-chevron-double-right"></i>
                        </router-link>
                    </div>

            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>

@use '../style/variables' as*;

//proprietà dell'introduzione

#background-intro{
    position: relative;
    padding-top: 2.5rem;
}

.welcome{
    text-align: center;
    margin: 0 auto;
    width: 80%;

        .text-standard {
            max-width: 100%;
            width: 70%;
    }
}

#main-title{

    position: relative;

    .icon {
        position: absolute;
        width: 30px; 
    }

    #star1 {
        top: 10px;
        left: 95%; 
        transform: translateX(-340%); 
    }

    #star2 {
        bottom: 10px;
        right: 95%;
        transform: translateX(60%);
    }
}

//caratteristiche sulla programmazione

.block{
    display: flex;
    justify-content: space-between;
}

.frame{
    padding: 0 1rem;
}

//sezione vai a i progetti

.btn-box{
    padding: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-char{
        padding: 1rem 3rem;
        width: 100%;
        border-radius: 50px;
        //box-shadow: 0 0 15px #b9b9b9;
    }

    .btn-sun,
    .btn-moon{
        display: flex;
        gap: 0.7rem;
        justify-content: center;
    }

    .btn-sun{
        background: transparent;
        border: 2px solid $color-dark;
        transition: 0.3s ease;
        color: $color-dark;

        &:hover{
            background: $color-tertiary;
            border: 2px solid $color-tertiary;
            color: white;

            i {
                transition: transform 0.3s ease-in-out; 
            }

            &:hover i {
                transform: translateX(10px);
            }
        }
    }

    
    .btn-moon {
        position: relative;
        overflow: hidden;
        background: $color-dark;
        transition: 0.5s;
        color: white;

        &::before{
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background-color: $color-secondary;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease-out, height 0.6s ease-out;
            z-index: 0;
        }

        &:hover::before {
            width: 800px;
            height: 800px;
        }            

        &:hover {
            border-color: white;
            
             span{
                color: white;
                z-index: 1;
            }

            i {
                transition: transform 0.4s ease-in-out;
            }

            &:hover i {
                transform: translateX(10px);
                color: white;
                z-index: 1;
            }


        }

    }
         
}

//responsive//
@media (max-width: 768px) {

    #main-title .icon {
        position: static;
        display: inline-block;
    }

    .btn-box {
        flex-direction: column;
    }
}


         
    
</style>