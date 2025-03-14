<script>
import rocketStatic from '../assets/rocket1.png';
import rocketGif from '../assets/rocket2.gif';

import { store } from '../store';

export default {
    name: 'Home',
    data() {
        return {
            rocketImg: rocketStatic,
            store
        };
    },
    methods: {
        changeRocket(isHover) {
            this.rocketImg = isHover ? rocketGif : rocketStatic;
        }
    }
}
</script>

<template>

    <!-- sezione con descrizione generale -->
    <section id="background-intro">
        <div class="content-container">
            <div class="row justify-content-center">

                <!-- Descrizione -->
                
                <div class="col-12 col-lg-7">
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

                <!-- immagine -->
                <div class="col-12 col-lg-5 d-flex justify-content-center">
                    <div class="img-wrap">
                        <img src="../assets/programming-animate.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- competenze -->
    <section id="background-knowledge">
        <div class="content-container">

            <!-- titolo -->
            <div class="row text-center">
                <div class="box">
                    <div class="circle-box" id="icon-skill">
                        <img :src="rocketImg" 
                        alt="rocket"
                        @mouseover="changeRocket(true)" 
                        @mouseleave="changeRocket(false)"
                        />
                    </div>
                </div>
                <h2>Le mie competenze</h2>
            </div>
            
            <div class="row">
                
                <!-- stack tecnologico -->
                <div class="col-12 col-lg-6 margin-bottom" id="hard-skill">
                    
                    
                    <div class="card-box">

                        <div class="icon-wrapper">

                            <div class="card-skill" v-for="(h, index) in store.hardSkill" :key="index">
                                <img :src="h.icon" :alt="h.name">
                                <h6>{{ h.name }}</h6>
                            </div>

                        </div>

                    </div>
                </div>

                <!-- immagine hard-skill -->
                <div class="col-12 col-lg-6">
                    
                    <div class="type-wrap">
                        <div class="blob">
                            <img class="rotate" src="../../public/blob.svg" alt="">
                            <img id="gear" class="img-skill" src="https://img.icons8.com/dusk/100/gear.png" alt="">
                        </div>
                    
                        
                        <h2 class="text-center">Hard skills</h2>
                        <p class="text-standard">Stack tecnologico maturato nel corso del tempo e sempre in aggiornamento</p>
                        
                    </div>
                    
                </div>
                
            </div>

            <div class="row">

                <!-- immagine soft-skill -->
                <div class="col-12 col-lg-6">

                    <div class="type-wrap">

                        <div class="blob">
                            <img class="rotate" src="../../public/blob.svg" alt="">
                            <img id="heart" class="img-skill" src="https://img.icons8.com/dusk/100/like--v2.png" alt="">
                        </div>
                        
                        <h2 class="text-center">Soft skills</h2>
                        <p class="text-standard">Competenze trasversali necessarie per il mondo del lavoro</p>
                    </div>

                </div>
                
                <div class="col-12 col-lg-6 margin-top">
                    
                    <div class="card-box">

                        <div class="icon-wrapper">

                            <div class="card-skill" v-for="(s, index) in store.softSkill" :key="index">
                                <img :src="s.icon" alt="Vue">
                                <h6>{{ s.name }}</h6>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
    </section>

    <!-- perché scegliere me -->
    <section>
        <div class="content-container">
            Perché scegliere me
        </div>
    </section>


</template>

<style lang="scss">

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
    background-color: #c5e2ff;
    background-image: linear-gradient(62deg, #bfdfff 10%, #E0C3FC 90%);

}

aside{
    width: 70%;
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
        box-shadow: 0 0 15px #b9b9b9;
    }

    .btn-sun,
    .btn-moon{
        display: flex;
        gap: 0.7rem;
        justify-content: center;
    }

    .btn-sun{
        background: rgb(245, 251, 255);
        transition: 0.3s ease;

        &:hover{
            background: dodgerblue;
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
        background-image: linear-gradient(to right, #FF512F 0%, #DD2476  51%, #FF512F  100%);
        transition: 0.5s;
        background-size: 200% auto;
        color: white;            

        &:hover {
            background-position: right center; 
            color: #fff;
            text-decoration: none;
            transition: 0.3s ease;

            i {
                transition: transform 0.3s ease-in-out; 
            }

            &:hover i {
                transform: translateX(10px);
            }
        }
    }
         
}

//proprietà delle competenze

#background-knowledge{
    background:rgb(244, 248, 250);
}

.card-box{
    background: white;
    border-radius: 10px;
    padding: 0.8rem;
    // height: 500px;
}

.box{
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.circle-box{
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 100%;

    img{
        width: 80px;
    }
}

#icon-skill{
    background: #C2DDFF;
}

.type-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    height: 100%;

    p{
        width: 80%;
    }
}

.blob{
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 300px;

    .img-skill{
        position:absolute;
        z-index: 1000;
        height: 100px;
        width: 100px;
    }

    img{
        width: 100%;
        object-fit: cover;
    }
}

#gear,
#heart{
    transform-origin: center;
}

#gear:hover{
    animation: gear 2s infinite;
}

#heart:hover{
    animation: heart 2s infinite;
}

.icon-wrapper{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    gap: 3rem;
    padding: 1rem 0;

    .card-skill{
        flex-direction: column;
        padding: 0.4rem 1rem;
        width: calc(90% / 4 - 0.5rem);

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

//animazioni

//animazione del blob
.rotate {  
    animation-name: ani-rotate;
    animation-duration: 30s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
  }
 
  @keyframes ani-rotate {
    0%{ transform: rotate(0); }
    100%{ transform: rotate(360deg); }  
  }

//animazione gear

@keyframes gear{
    0%{ transform: rotate(0);}
    50%{transform: rotate(180deg);}
    100%{transform: rotate(360deg);}
}

//animazione cuore

@keyframes heart{
    0%{ transform: scale(1);}
    30%{transform: scale(1.2);}
    60%{transform: scale(1);}
    90%{transform: scale(1.2);}
    100%{transform: scale(1);}
}

         
    
</style>