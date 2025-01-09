<script>
export default {
    name: 'Sidenav'
}
</script>

<template>
    <div class="container-sidenav">
        <div class="container py-3">
            <ul>
                <li>
                    <router-link :to="{name: 'ProjectList'}">
                        Lista progetti
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<style lang="scss" scoped>

.container-sidenav{
    height: 100%;
    width: 200px;
}

</style>
