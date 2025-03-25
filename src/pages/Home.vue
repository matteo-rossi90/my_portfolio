<script>

export default {
    name: 'Home'
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

                            <h1>Ciao, sono Matteo e sono uno <br>Sviluppatore Web</h1>

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

    <section>

    </section>

    <section>
        <div class="content-container">
            <div class="d-flex justify-content-center">
                <!-- pulsanti contatto e progetti -->
                    <div class="btn-box text-standard">

                        
                        <!-- <router-link :to="{name: 'Portfolio'}" class="btn-char btn-sun"> -->
                            <!-- <span> -->
                                    <!-- Vai ai progetti -->
                            <!-- </span> -->
<!--                              -->
                            <!-- <i class="bi bi-chevron-right"></i> -->
                        <!-- </router-link> -->

                        <a href="mailTo:matteo.rossi90@hotmail.it" class="btn-char btn-moon">
                            <span>
                                Contattami
                            </span>
                            <i class="bi bi-chevron-double-right"></i>
                        </a>
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
        transform: translateX(-50%); 
    }

    #star2 {
        bottom: 10px;
        right: 95%;
        transform: translateX(50%);
    }
}

.btn-box{
    padding: 2rem 0;
    display: flex;
    gap: 1.5rem;
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