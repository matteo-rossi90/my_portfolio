<script>
import { store } from '../store';

export default {
    name: 'Portfolio',
    data() {
        return {
            store
        }
    },
}
</script>

<template>
    <section>
            <div class="content-container" id="portfolio">

                <div class="text-center">
                    <h1>I miei progetti</h1>
                    <p class="text-standard">Qui puoi dare un'occhiata ai miei progetti.<br>Clicca sul progetto per visualizzare maggiori informazioni</p>
                </div>


                <div class="box-wrap">
                    <div class="card-portfolio" :id="`card` + project.id" v-for="project in store.projects">
                        
                        <router-link :to="{name: 'ShowProject', params: { id: project.id } }">
                            
                            <div class="content">
                                <h4>{{ project.title }}</h4>
                            </div>

                            <figure class="box-image">
                                <img :src="project.thumb" :alt="project.title">
                            </figure>
                            
                            <div class="info">
                                <p>{{ project.text }}</p>
                                <ul class="d-flex gap-2">
                                    <li class="label-tech" v-for="tech in project.techs">
                                        <small>
                                            {{ tech }}
                                        </small>
                                    </li>
                                </ul>
                            </div>
                        </router-link>
                    
                    </div>
                </div>
                


            </div>

        

    </section>
</template>

<style lang="scss" scoped>
@use '../style/variables' as*;

// body{
    // overflow-x: hidden;
    // width: 100%;
// }

.content-container[id=portfolio]{
    width: 90%
}

section{
    padding-top: 4rem;
}

.box-wrap {
    display: grid;
    grid-template-columns: repeat(6, 1fr); 
    grid-auto-rows: 200px; 
    gap: 1.5rem;
    padding-top: 3rem;

    .card-portfolio {
        height: 100%;
        width: 100%; 
        border-radius: 40px;
        transition: 0.3s ease-in-out;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        aspect-ratio: 1/1;

        .content{
             padding: 1rem;
             
        }

         img{
            border-radius: 20px;
        }

        .info{
            position: absolute;
            bottom: -200px;
            width: 100%;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.65); 
            backdrop-filter: blur(20px);
            border-bottom-right-radius: 30px;
            border-bottom-left-radius: 30px;
            transition: bottom 0.3s ease-in-out;

        }

        .label-tech{
            padding: 0.3rem 1rem;
            border-radius: 50px;
            background: rgb(255, 255, 255); 
            backdrop-filter: blur(20px);
            color: $font-color;
            font-weight: bold;
        }

        .box-image{
            transition: padding-top 0.3s ease-in-out;
            // overflow: hidden;

            
        }


          &:hover{
            transform: translateY(-5px);
            box-shadow: 0 2px 20px rgba(65, 65, 65, 0.3);

            .info{
                bottom: 0;
            }

            .box-image{
                padding-top: 0.8rem;
            }
        }

    }

    
    #card1 {
        grid-column: span 3; 
        grid-row: span 2; 
        background: #9ADFD5;

        .box-image{
            width: 50%;
            margin: 0 auto;
            
            img{
                max-width: 100%;
            }
        }

        &:hover{
            background: #a3efe5;
        }

    }

    #card2 {
        grid-column: span 3;
        grid-row: span 2;
        background: #D990F2;

        .box-image{
            width: 80%;
            margin: 0 auto;
            
            img{
                max-width: 180%;
            }
}

        &:hover{
            background: #e4a0fd;
        }
    }

    #card3 {
        grid-column: span 2;
        grid-row: span 2;
        background: #eaa279;

        .box-image{
            width: 80%;
            margin: 0 auto;
            
            img{
                max-width: 300%;
            }
        }

        &:hover{
            background: #fec09c;
        }
    }

    #card4 {
        grid-column: span 4;
        grid-row: span 2;
        background: #a7ceeb;

        .box-image{
            width: 80%;
            margin: 0 auto;
            
            img{
                max-width: 220%;
            }
        }

        &:hover{
            background: #b8e0ff;
        }
    }

    #card5 {
        grid-column: span 4;
        grid-row: span 2;
        background: #8bcf89;
        
        .box-image{
            width: 80%;
            margin: 0 auto;
            
            img{
                max-width: 200%;
            }
        }
        &:hover{
            background: #9eea9c;
        }
    }

    #card6 {
        grid-column: span 2;
        grid-row: span 2;
        background: #ea7979;

         h4{
            color: white;
        }

        .box-image{
            width: 80%;
            margin: 0 auto;
            
            img{
                max-width: 220%;
            }
        }

        &:hover{
            background: #ff9b9b;
        }
    }

    #card7 {
    
        grid-column: span 2;
        grid-row: span 2;
        background: #797dea;
        
        h4{
            color: white;
        }
        
        .box-image{
            width: 80%;
            margin: 0 auto;
        
        img{
            max-width: 260%;
        }
    }
    &:hover{
        background: #9397f7;
    }
}
}

//responsive//

@media (max-width: 1200px) {

    .content-container[id=portfolio]{
        width:90%;
    }

    .box-wrap{
        
        #card3,
        #card4,
        #card5,
        #card6,
        #card7{
            grid-column: span 3;
            grid-row: span 2;
        }
        
    }
}

@media (max-width: 990px) {
    
    .box-wrap{
        
        #card1,
        #card2,
        #card3,
        #card4,
        #card5,
        #card6,
        #card7{
            grid-column: span 6;
            grid-row: span 2;
        }

    }
}

@media (max-width: 768px) {

    section{
        h1{
            font-size: 3rem;
        }

        .text-standard{
            font-size: 1rem;
        }
    }

    .box-wrap{
        grid-auto-rows: 150px; 
        
        #card1,
        #card2,
        #card3,
        #card4,
        #card5,
        #card6,
        #card7{
            grid-column: span 6;
            grid-row: span 1.5;
        }

        .card-portfolio{

            .label-tech{
                font-size: 12px;
                padding: 0.3rem 0.6rem;
            }
        }
        
    }

    @media (max-width: 600px){

        .card-portfolio{

            .label-tech{
                display: none;
            }
        }      
        

    }

    @media (max-width: 450px) {
        
        section{

            h1{
                font-size: 2rem;
            }
        }

    }
    
}
    
</style>