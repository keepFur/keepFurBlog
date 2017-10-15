<template>
    <div>
        <top-nav></top-nav>
         <!-- <Footer></Footer>  -->
    </div>
</template>
<script>
import TopNav from './common/TopNav.vue';
import Footer from './common/Footer.vue';
    export default {
        
        methods: {
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        },
        components:{
            TopNav,
            Footer
        }
    };
</script>