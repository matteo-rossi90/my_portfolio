<script>
export default {
    name: 'Footer'
}
</script>

<template>
    
   <footer>
        <div class="content-container">
            <div class="row">

                <div class="col-12 col-md-4 col-lg-4">
                    <span>Matteo</span>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                    <ul class="list">
                        <li><router-link :to="{name: 'Home'}">Home</router-link></li>
                        <li><router-link :to="{name: 'Portfolio'}">Portfolio</router-link></li>
                        <li><router-link :to="{name: 'About'}">Bio</router-link></li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                    <ul class="list-social">
                        <li>
                            <a href="https://www.linkedin.com/in/matteo-rossi-5163b6128/">
                                <i class="bi bi-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/matteo-rossi90">
                                <i class="bi bi-github"></i>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
   </footer>
   
   
    
    
</template>

<style lang="scss" scoped>

@use '../style/variables' as*;

footer{
    color:$font-color;
    font-family: $title-text;
    font-size: $font-header;
    
    a{
        color:$font-color;
    }

    .list{
        display:flex;
        justify-content: center;
        gap: 2rem;
    }

    .list-social{
        justify-content: flex-end;
        display: flex;
        gap: 2rem;

    }

}
    
</style>