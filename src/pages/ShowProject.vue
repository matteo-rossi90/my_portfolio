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
            <p>{{ project.text }}</p>
        </div>
        
    </section>

</template>

<style lang="scss">
    
</style>