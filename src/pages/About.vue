<script>
import { store } from '../store';

import { onMounted } from 'vue';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
    name: 'About',
    data() {
        return {
            store
        }
    },
    setup() {
       
        onMounted(() => {
            gsap.from("h1", {
                y: 30,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
            });

            gsap.from("figure, #title-descr, .text p", {
                y: 30,
                opacity: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "power3.out",
                stagger: 0.3
            });

            gsap.from("#title-qualities, .card-qualities", {
                y: 40,
                opacity: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "power3.out",
                stagger: 0.3,
                scrollTrigger:{
                    trigger: "#qualities",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });

            gsap.from("#title-skill, .card-skill", {
                y: 40,
                opacity: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "power3.out",
                stagger: 0.3,
                scrollTrigger:{
                    trigger: "#background-skill",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });

            gsap.from("#text-descr, .btn-box", {
                y: 40,
                opacity: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "power3.out",
                stagger: 0.3,
                scrollTrigger:{
                    trigger: "#download-cv",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });
        })
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
                <div class="col-12 col-md-12 col-lg-4">
                    <figure>
                        <img src="../assets/foto.jpeg" alt="photo">
                    </figure>
                </div>
                
                <div class="col-12 col-md-12 col-lg-8">
                    <div class="text">
                        <h2 id="title-descr">Qualcosa in più su di me...</h2>
                        <p class="text-standard">
                            Mi sono avvicinato alla programmazione per puro caso: studiando le mappe online in occasioni di alcuni lavori accademici, sono venuto a contatto con i linguggi di programmazione necessari per crearle - soprattutto HTML, CSS e JavaScript - che ho iniziato a studiare da autodidatta. Questa esperienza mi ha talmente affascinato da spingermi ad approfondire queste conoscenze con una formazione più mirata e specifica.
                        </p>
                        <p class="text-standard">
                            Sono sempre disponibile a imparare nuovi linguaggi e approcci metodologici per crescere professionalmente.
                        </p>
                    </div>

                </div>
                
            </div>
            
        </div>
    </section>

    <!-- le mie caratteristiche -->
    <section id="qualities">
        <div class="content-container">
            <h2 class="text-center" id="title-qualities">Le mie caratteristiche</h2>
            <div class="row">
                <div class="col-12 col-md-12 col-lg-4 py-3 d-flex align-items-stretch" v-for="(char, index) in store.qualities" :key="index">
                    <div class="card-qualities">
                        <h5>{{ char.title }}</h5>
                        <p class="text-standard">{{ char.desc }}</p>
                    </div>
                </div>

            </div>

        </div>
        
    </section>

    
    <!-- competenze -->
    <section id="background-skill">

        <!-- titolo -->
        <div class="text-center">
            <div class="box">
                <h2 id="title-skill">Le mie competenze</h2>
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

        
    </section>

    <!-- scarica il cv -->
    <section id="download-cv">
        <div class="content-container">

            <p class="text-center text-standard" id="text-descr">Per altre informazioni scarica il CV</p>
            
            <div class="d-flex justify-content-center">
                
                <div class="btn-box mt-4">
                    <a href="/CV/MatteoRossiCV4.pdf" download class="btn-char btn-moon">
                        <span class="text-standard">
                            Scarica il CV
                        </span>
                    </a>
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
        border-radius: 50%;
        max-width: 100%;
        object-fit: cover;
    }
}
    
//qualità
.card-qualities{
    background: rgba(255, 255, 255, 0.6); 
    backdrop-filter: blur(20px);
    padding: 1rem;
    border-radius: 20px;
}

//competenze

.card-box{
    background: rgba(255, 255, 255, 0.4); 
    backdrop-filter: blur(20px);
    // border-radius: 30px;
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

//scarica il curriculum

.btn-box{
    display: flex;
    justify-content: center;
    flex-direction: column;

    .btn-char{
        padding: 1rem 3rem;
        width: 100%;
        border-radius: 50px;
        //box-shadow: 0 0 15px #b9b9b9;
    }

    .btn-moon {
        position: relative;
        overflow: hidden;
        border: 2px solid $font-text;
        transition: 0.5s;
        color: $font-text;
        gap: 10px; 

        &::before{
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background-color: $font-color;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease-out, height 0.6s ease-out;
            z-index: 0;
        }

        span {
            position: relative; 
            z-index: 1;   
            transition: transform 0.4s ease-in-out, color 0.4s ease-in-out;      
        }

        &:hover::before {
            width: 800px;
            height: 800px;
        } 

        &:hover {
            
            span{
                color: white;
                z-index: 1;
            }
        }
    }
}

    
</style>