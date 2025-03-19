<script>
import rocketStatic from '../assets/rocket1.png';
import rocketGif from '../assets/rocket2.gif';

import { store } from '../store';

export default {
    name: 'Home',
    data() {
        return {
            store
        };
    }
}
</script>

<template>

    <!-- sezione con descrizione generale -->
    <section id="background-intro">
        <div class="content-container">
            <div class="row justify-content-center">

                <!-- Descrizione -->
                
                <div class="col-12">
                    <aside>
                        <h1>Ciao, sono uno Junior Full Stack developer</h1>
                        <p class="text-standard">
                            Creo siti web e applicazioni di vario tipo cercando di trovare soluzioni adeguate, efficaci e intuitive per gli utenti e sempre nel rispetto delle esigenze del cliente. 
                            Mi piace molto esplorare nuove tecnologie e ampliare ulteriormente il mio stack tecnologico.
                        </p>

                        <!-- pulsanti contatto e progetti -->
                        <div class="btn-box text-standard">

                            
                            <router-link :to="{name: 'Portfolio'}" class="btn-char btn-sun">
                                <span>
                                     Vai ai progetti
                                </span>
                               
                                <i class="bi bi-chevron-right"></i>
                            </router-link>

                            <a href="mailTo:matteo.rossi90@hotmail.it" class="btn-char btn-moon">
                                <span>
                                    Contattami
                                </span>
                                <i class="bi bi-chevron-double-right"></i>
                            </a>
                        </div>
                    </aside>
                </div>

            </div>
        </div>

    </section>

    <!-- competenze -->
    <section id="background-skill">

        <div class="content-container">

            <!-- titolo -->
            <div class="row text-center">
                <div class="box">
                    <h2>Le mie competenze</h2>
                </div>
            </div>
            
            <div class="row py-4">
                
                <!-- stack tecnologico -->
                <div class="col-12 col-lg-12" id="hard-skill">
                    
                    
                    <div class="card-box">

                        <div class="icon-wrapper">

                            <div class="card-skill" v-for="(h, index) in store.hardSkill" :key="index">
                                <img :src="h.icon" :alt="h.name">
                                <h6>{{ h.name }}</h6>
                            </div>

                        </div>

                    </div>
                </div>
                
            </div>

        </div>
    </section>

</template>

<style lang="scss" scoped>

@use '../style/variables' as*;

//proprietà dell'introduzione
.img-wrap{
    height: 600px;
    width: 600px;
    aspect-ratio: 1/1;

    img{
        max-width: 100%;
        object-fit: cover;
    }
}

#background-intro{
    position: relative;
    padding-top: 2.5rem;
}

aside{
    text-align: center;
    margin: 0 auto;
    width: 80%;
}

.btn-box{
    padding: 2rem 0;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;

    .btn-char{
        padding: 0.8rem 1rem;
        width: 50%;
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

//proprietà delle competenze

.card-box{
    background: rgba(255, 255, 255, 0.4); 
    backdrop-filter: blur(20px);
    border-radius: 10px;
    //box-shadow: 2px 16px 0 0 rgba(0, 0, 0, 0.2);
    padding: 0.8rem;
}

.box{
    margin-bottom: 1.5rem;
}

.type-wrap{
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    height: 100%;

    p{
        width: 80%;
    }
}

.icon-wrapper{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    gap: 3rem;
    padding: 1rem 0;

    .card-skill{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.4rem 1rem;
        width: calc(50vw / 5 - 0.5rem);

        h6{
            text-align: center;
            margin-top: 0.6rem;
        }

        img{
            width: 100%;
            object-fit: fill;
            aspect-ratio: 1/1;
        }
    }
}


         
    
</style>