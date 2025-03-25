<script>
import { store } from '../store';

import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
    name: 'ShowProject',
    setup() {
        const route = useRoute();
        const project = computed(() => store.projects.find(p => p.id == route.params.id));

        const isOnline = computed(() => project.value?.link !== null && project.value?.link !== '');
        const isResponsive = computed(() => project.value.isResponsive !== false)

        return { project, isOnline, isResponsive };
    }
}
</script>

<template>

    <!-- intestazione e caratteristiche -->
    <section>
        <div class="content-container">

            
            <h1>{{ project.title }}</h1>

            <div class="wrapper">
                
                    <div class="col-12 col-md-12 col-lg-4 py-4 card-tips">
                        <h5 class="text-medium">Tipo di progetto</h5>
                        <span class="text-medium category-rs">
                            
                            {{ project.company }}
                            
                        </span>
                    </div>
                    <div class="col-12 col-md-12 col-lg-4 py-4 card-tips">
                         <h5 class="text-medium">Periodo</h5>
                        <span class="text-medium category-rs">
                        
                            {{ project.date }}
                        
                        </span>
                    </div>
                    <div class="col-12 col-md-12 col-lg-4 py-4 card-tips">
                        
                        <h5 class="text-medium">Categoria</h5>
                        <ul class="text-medium category-rs">
                        
                            <li v-for="cat in project.category">
                                {{ cat }}
                            </li>
                        
                        </ul>
                    </div>
                

            </div>
               
            
        </div>
        
    </section>

    <!-- video dimostrativo -->
     <section>
        <video controls>
            <source :src="project.demo" type="video/mp4">
        </video>
     </section>

    <!-- descrizione -->
    <section>
        <div class="content-container">

             <div class="text-box">
                <div class="descr d-flex align-items-center justify-content-between">
                    <h2>Descrizione</h2>

                    <div v-if="!isResponsive"></div>
                    <div v-else>
                        <i class="bi bi-info-circle-fill tooltip-mobile">
                            <span class="tooltiptext">Responsive</span>
                        </i>

                    </div>
                </div>
                <p class="text-standard">{{ project.descr }}</p>
             </div>

            <div class="text-box">
                
                    <div class="col-12 mt-4">
                        <ul class="d-flex gap-2">
                            <li class="label" v-for="item in project.techs">
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <div class="btn-box">
                        <div v-if="!isOnline"></div>
                        <a :href="project.link" target="_blank" v-else>
                            Visita ora
                        </a>
                    </div>
            

            </div>

        </div>
    </section>

</template>

<style lang="scss" scoped>
@use '../style/variables' as*;

i{
    font-size: 1.2rem;
    color: $font-text;
}

h1{
    text-align: center;
    padding-bottom: 2rem;
}

.text-box,
.wrapper{
    margin: 0 auto;
    width: 65%;

}

.text-box{

    .label{
        border-radius: 50px;
        padding: 0.4rem 1rem;
        background-color: white;
    }


    .btn-box{

        margin-top: 6rem;
        display: flex;
        justify-content: center;
            
            a{
                color: white;
                text-align: center;
                text-decoration: none;
                border-radius: 50px;
                background-color: $font-color;
                font-size: 2rem;
                font-family: $title-text;
                padding: 0.6rem 1rem;
                width: 40%;
            }
        }
}

.wrapper{

    display: flex;
    justify-content: center;
    gap: 1rem;

    .descr{
        margin-bottom: 3rem;
        color: $font-color;
        font-size: 3rem;

        

    }

    h5{
        margin-bottom: 0;
        margin: 0.6rem 0;
    }

    li,
    span{
        color: $font-color;
    }

    .card-tips{
        background: rgba(255, 255, 255, 0.65); 
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 1rem;
    }

}

.tooltip-mobile {
    position: relative;
    display: inline-block;
    cursor:pointer;
}

.tooltip-mobile .tooltiptext {
    display: none;

    background-color: $font-color;
    color: white;
    font-size: 1rem;
    text-align: center;
    padding: 0.6rem;
    border-radius: 6px;
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -100px;
    z-index: 1;
    transition: 0.3s ease-in-out;

}

.tooltip-mobile:hover .tooltiptext {
  display: block;
}

section{

    video{
        display: block;
        margin: 0 auto;
        border-radius: 40px;
        height: 100%;
        width: 90%;
        box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.3);
        cursor: pointer;

    }
}

//responsive//
@media (max-width:1200px) {

    .content-container{
        width: 90%;
    }

    section{
        h1{
            font-size: 4rem;
            padding-top: 4rem;
        }
    }

    .text-box,
    .wrapper{
        width: 80%;

        .descr{
            h2{
                font-size: 2rem;
            }
            
        }
    }
    
}

@media (max-width: 992px) {

    .wrapper{
        flex-wrap: wrap;
    }


    section{
        h1{
            font-size: 3rem;
        }

        video{
            border-radius: 20px;
        }

    }

    .text-box,
    .wrapper{
        width: 80%;
    }

}

@media (max-width: 768px){

     section{
        h1{
            font-size: 2.5rem;
        }

        .text-standard{
            font-size: 1rem;
        }
    }

    .text-box,
    .wrapper{
        width: 95%;
    }

    .text-box{

        .label{
            font-size: 0.7rem;
        }

        a{
            width: 80%;
        }
    }
}

@media (max-width: 540px){

     section{
        h1{
            font-size: 2rem;
        }

        video{
            width: 100%;
            border-radius: 0;
            box-shadow: none;
        }

    }

}


    
</style>