<script>

export default{
    name: 'HeaderDashboard',
}

</script>

<template>

    <header id="header-dashboard">
        <div class="container-fluid padding h-100">
            <div class="d-flex align-items-center justify-content-between h-100">
                <div class="col-10">
                    Profilo
                </div>
                <div class="col-2 d-flex align-items-center justify-content-end">
                    <ul class="d-flex gap-3">
                        <li>item</li>
                        <li>item</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

</template>

<style lang="scss" scoped>

#header-dashboard{
    height: 50px;
    box-shadow: 2px 1px 4px 2px rgba(173, 173, 173, 0.6);
    z-index: 1000;
    position: relative;

    li{
        display: flex;
    }
}

.padding{
    padding: 0 2.5rem;
}

</style>
