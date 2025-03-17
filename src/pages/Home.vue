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
        },
        changeIcon(index, isHover){
            this.store.qualities[index].icon = isHover 
            ? this.store.qualities[index].iconGif 
            : this.store.qualities[index].iconDef;
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

        <section class="wave-section">
            <img src="../assets/wave.svg" alt="">
        </section>
    </section>

    <!-- competenze -->
    <section id="background-skill">

        <div class="content-container">

            <!-- titolo -->
            <div class="row text-center">
                <div class="box">
                    <div class="blob">
                        <img class="rotate" src="../../public/blob.svg" alt="">
                        <img class="rocket" :src="rocketImg" 
                        alt="rocket"
                        @mouseover="changeRocket(true)" 
                        @mouseleave="changeRocket(false)"
                        />
                    </div>
                    <h2>Le mie competenze</h2>
                </div>
            </div>
            
            <div class="row py-4">
                
                <!-- stack tecnologico -->
                <div class="col-12 col-lg-6" id="hard-skill">
                    
                    
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
                        <div class="circle-box">
                            <!-- <img class="rotate" src="../../public/blob.svg" alt=""> -->
                            <img id="gear" class="img-skill" src="https://img.icons8.com/dusk/100/gear.png" alt="">
                        </div>
                    
                        
                        <h2 class="text-center">Stack tecnologico</h2>
                        
                    </div>
                    
                </div>
                
            </div>

            <div class="row py-4">

                <!-- immagine soft-skill -->
                <div class="col-12 col-lg-6">

                    <div class="type-wrap">

                        <div class="circle-box">
                            <img id="heart" class="img-skill" src="https://img.icons8.com/dusk/100/like--v2.png" alt="">
                        </div>
                        
                        <h2 class="text-center">Competenze trasversali</h2>
                    </div>

                </div>
                
                <div class="col-12 col-lg-6">
                    
                    <div class="card-box">

                        <div class="icon-wrapper">

                            <div class="card-skill" v-for="(s, index) in store.softSkill" :key="index">
                                <img :src="s.icon" :alt="s.name">
                                <h6>{{ s.name }}</h6>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
    </section>

    <!-- perché scegliere me -->
    <section id="background-quality">
        <div class="content-container">
            
            <div class="row text-center justify-content-center">

                <!-- titolo -->
                <div class="row">
                    <div class="box">
                        <div class="blob">
                            <img class="rotate" src="../../public/blob.svg" alt="">
                            <!-- <img class="rocket" :src="rocketImg"  -->
                            <!-- alt="rocket" -->
                            <!-- @mouseover="changeRocket(true)"  -->
                            <!-- @mouseleave="changeRocket(false)" -->
                            <!-- /> -->
                        </div>
                        <h2>Perchè scegliere me?</h2>
                    </div>

                </div>
                
                <!-- cards -->
                <div class="container">
                    <div class="row">
                        
                            <div class="col-12 col-md-4 col-lg-4" v-for="(item, index) in store.qualities" :key="index">
                                <div class="card-quality">
                                    <img :src="item.icon" :alt="item.title"
                                    @mouseover="changeIcon(index, true)" 
                                    @mouseleave="changeIcon(index, false)">
                                    <h4>{{ item.title }}</h4>
                                    <p class="text-medium">{{ item.desc }}</p>
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
    background-image: url('../assets/background2.png');
    background-size:cover;
    background-position-y: 40% ;
}

.circle-box{
    background: $color-secondary;
    //background-color: #c5e2ff;
    //background-image: linear-gradient(62deg, #bfdfff 10%, #E0C3FC 90%);

}

aside{
    width: 90%;
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
        background: $color-background;
        border: 2px solid $color-background;
        transition: 0.3s ease;
        color: rgb(45, 45, 45);

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

//onda
.wave-section {
    height: 150px; 
    overflow: hidden; 
}

.wave-section img{
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
}

//proprietà delle competenze

#background-skill{
    background: $color-background;
}

.card-box{
    background: white;
    padding: 0.8rem;
}

.box{
    margin-bottom: 1.5rem;
}

.type-wrap,
.blob,
.circle-box{
    display:flex;
    align-items: center;
    justify-content: center;
}

.blob{
    position: relative;
    img.rotate{
        height: 300px;
        width: 300px;
    }

    .rocket{
        position: absolute;
        width: 80px;
    }
}

.type-wrap{
    flex-direction:column;
    height: 100%;

    p{
        width: 80%;
    }
}

.circle-box{
    padding: 1.5rem;
    border-radius: 100%;

    img{
        width: 80px;
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
        display: flex;
        flex-direction: column;
        align-items: center;
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

//sezione perchè scegliere me

#background-quality{
    background-image: url('../assets/background.png');
    background-size:cover;
    background-position-y: 100%;
}

.card-quality{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(94, 94, 94, 0.3);
    aspect-ratio: 3/2;

    img{
        width: 60px;
    }

    img,
    h4,
    p{
        margin: 0.5rem 0;
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