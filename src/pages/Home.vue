<script>
export default {
    name: 'Home'
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
    <section>
        <div class="content-container">
            sezione competenze stack/softskill
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

         
    
</style>