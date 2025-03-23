<script>
import { store } from '../store';

import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
    name: 'ShowProject',
    setup() {
        const route = useRoute();
        const project = computed(() => store.projects.find(p => p.id == route.params.id));

        return { project };
    }
}
</script>

<template>
    <section>
        <div class="content-container">

            
                <h1>{{ project.title }}</h1>
               
               <div class="text-box m-auto">
                    <h4>Descrizione</h4>
                    <p class="text-standard">{{ project.descr }}</p>
               </div>
               
            
        </div>
        
    </section>

</template>

<style lang="scss">

h1{
    text-align: center;
}

.text-box{
    width: 65%;

    h4{
        margin: 1rem 0;
    }
}

    
</style>