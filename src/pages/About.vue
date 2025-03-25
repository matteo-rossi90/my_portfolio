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
@use '../style/general' as*;

#background-skill{
    position: relative;
}

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