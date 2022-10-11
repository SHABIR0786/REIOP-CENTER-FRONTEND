<template>
    <div
        v-if="isLoading"
        class="loader"
    >
        
<!--        <p>{{loaderText}}</p>-->
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    name: "Loader",
    computed: {
        ...mapGetters ({
            isLoading: 'uxModule/isLoading',
            loaderText: 'uxModule/loaderText'
        })
    }
}
</script>
<style>
.loader{
    z-index: 2000 !important;
    position: absolute !important;
}
</style>
