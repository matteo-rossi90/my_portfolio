<script>
import Sidenav from '../../partials/Sidenav.vue';
import HeaderDashboard from '../../partials/HeaderDashboard.vue';

export default{
    name: 'ProjectList',
    components:{
        HeaderDashboard,
        Sidenav
    }
}
</script>

<template>
    <HeaderDashboard/>
    <div class="wrap-container">
        <Sidenav/>
        <div class="container-body">
            <div class="container py-3">
                <h2>Lista progetti</h2>
                <div class="box-stat">
                    <div class="row">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scope>
@use '../../../scss/general' as *;

</style>
