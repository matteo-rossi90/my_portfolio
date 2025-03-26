<script>
import { store } from '../store';

export default {
    name: 'About',
    data() {
        return {
            store
        };
    }
}
</script>

<template>

    <section>
        <div class="content-container">

            <!-- titolo pagina -->
            <h1 class="text-center">Chi sono</h1>

            <!-- foto e descrizione -->
            <div class="row justify-content-between align-items-center">
                <div class="col-12 col-md-6 col-lg-2">
                    <figure>
                        <img src="../assets/foto.jpeg" alt="">
                    </figure>
                </div>
                
                <div class="col-12 col-md-6 col-lg-8">
                    <div class="text">
                        <h2>Perché proprio la programmazione</h2>
                        <p class="text-standard">
                            Ho un background di studi geografici che mi hanno permesso di specializzarmi nei GIS (Geograhic Information System).
                            La conoscenza dei GIS a sua volta mi ha consentito di lavorare a progetti accademici che hanno riguardato la costruzione di datanase cartografici e mappe online. Studiando le mappe online, sono venuto a contatto con i linguggi di programmazione necessari per crearle - soprattutto HTML, CSS e JavaScript - che ho iniziato a studiare da autodidatta.
                        </p>
                        <p class="text-standard">
                            La programmazione mi ha talmente affascinato che, appena ne ho avuto l'occasione, ho deciso di approfondire queste conoscenze con un corso più mirato e strutturato.
                        </p>
                    </div>

                </div>
                
            </div>
            
        </div>
    </section>

    <!-- timeline -->
    <section>
    
        <div class="d-flex justify-content-center">
            <div class="timeline">
                <div class="box-content">
                </div>
                <div class="line">
                    <div class="circle" id="degree-master"></div>
                    <div class="circle" id="degree-GIS"></div>
                    <div class="circle" id="degree-phd"></div>
                    <div class="circle" id="degree-fellowship"></div>
                    <div class="circle" id="degree-boolean"></div>
                </div>
                <div class="box-content">
                </div>
            </div>
        </div>

    </section>
    
    <!-- competenze -->
    <section id="background-skill">

        <div class="content-container">

            <!-- titolo -->
            <div class="text-center">
                <div class="box">
                    <h2>Le mie competenze</h2>
                </div>
            </div>
            
            <div class="py-4">
                
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
@use '../style/general' as*;

//titolo, foto e descrizione

#background-skill{
    position: relative;
}

figure{
    width: 300px;

    img{
        border-radius: 100%;
        max-width: 100%;
        object-fit: cover;
    }
}
    


//timeline

    .timeline{
        display:flex;
        justify-content: center;
        flex-direction: column;
        height: 700px;
        width: 1400px;

        .box-content{
            background-color: yellow;
            width: 100%;
            height: calc(50% - 1px);

        }

        .line{
            background-color: greenyellow;
            width: 100%;
            height: 2px;
            position: relative;

            .circle{
                height: 40px;
                width: 40px;
                border-radius: 100%;
                background-color: greenyellow;
                position: absolute;
                transform: translate(-50%, -50%);

            }

            
        }
    }

    #degree-master{
        top: 10%;
        left: 10%;
        
    }

    #degree-GIS{
        top: 30%;
        left: 30%;
        
    }

    #degree-phd{
        top: 50%;
        left: 50%;
        
    }

    #degree-fellowship{
        top: 70%;
        left: 70%;
    
    }

    #degree-boolean{
        top: 90%;
        left: 90%;
    }


//competenze

.card-box{
    background: rgba(255, 255, 255, 0.4); 
    backdrop-filter: blur(20px);
    border-radius: 30px;
    //box-shadow: 2px 16px 0 0 rgba(0, 0, 0, 0.2)
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