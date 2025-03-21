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
        <div class="content-container">

            <div class="row text-center">
                <h1>I miei progetti</h1>
                <p class="text-standard">Qui puoi dare un'occhiata ai miei progetti.<br>Clicca sul progetto che vuoi visualizzare per maggiori informazioni</p>
            </div>

            <div class="row">
                <div class="col-12 col-lg-12">
                    <div class="box-wrap">
                        <div class="card-portfolio" :id="`card` + project.id" v-for="project in store.projects">
                            <router-link :to="{name: 'ShowProject', params: { id: project.id } }">
                                {{ project.title }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style lang="scss">
@use '../style/variables' as*;

section{
    position: relative;
    padding-top: 4rem;
}

.box-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-auto-rows: 200px; 
    gap: 1.5rem;
    padding-top: 3rem;

    .card-portfolio {
        height: 100%;
        width: 100%; 
        border-radius: 20px;
        background: white;
    }

    
    #card1 {
        grid-column: span 2; 
        grid-row: span 2; 
    }

    #card2 {
        grid-column: span 1;
        grid-row: span 2;
    }

    #card3 {
        grid-column: span 1;
        grid-row: span 2;
    }

    #card4 {
        grid-column: span 1;
        grid-row: span 2;
    }

    #card5 {
        grid-column: span 1;
        grid-row: span 1;
    }

    #card6 {
        grid-column: span 1;
        grid-row: span 1;
    }
}
    
</style>