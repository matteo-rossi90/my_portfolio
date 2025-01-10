<script>
export default {
    name: 'Sidenav'
}
</script>

<template>
    <div class="container-sidenav">
        <div class="d-flex flex-column align-items-center py-4">
            <ul>
                <li>
                    <router-link :to="{name: 'Dashboard'}">
                        <span><i class="bi bi-grid-1x2"></i></span>
                        <span>Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'ProjectList'}">
                        <span><i class="bi bi-list-ul"></i></span>
                        <span>Progetti</span>
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../../scss/variables' as*;

ul{
    width: 100%;
}

li{
   padding: 0.8rem 2rem;
   display: flex;
   justify-content: center;
   width: 100%;

   &:hover{
     background-color: $sidenav-hover;
   }

   a{
    display: flex;
    align-items:center;
    gap: 15px;
    width:100%;
   }

   .bi{
    font-size: 1.4rem;
    font-weight: 600;
   }
}


.container-sidenav{
    height: 100%;
    width: 200px;
}

</style>
