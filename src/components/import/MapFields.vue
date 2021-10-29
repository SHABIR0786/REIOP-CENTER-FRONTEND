<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 4: Map Fields</h3>
        </div>
        <div class="info-text">
            <p>Description of step for user: To be filled out later.</p>
        </div>
        <hr>
            <import :upload_type="upload_type" class="w-100"></import>
    </div>
</template>


<script>
    import Import from '../../pages/import'
    export default {
        name: "MapFields",
        props: ['upload_type'],
        components: {
            Import
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped>
    .data-type {
        background-color: #45818E !important;
        color: white;
    }
    .type-container {
        background-color: #45818E;
        color: white;
        padding: 15px 15px;
        border-top: 0.5px solid black;
        border-bottom: 0.5px solid black;
    }
    h3 {
        margin: 0 !important;
    }
    .info-text {
        padding: 20px 10px 0 10px;
    }
    p {
        margin-bottom: 0 !important;
        font-weight: bold;
    }
    .map-text {
        margin-top: 100px;
        padding: 20px 100px 0 100px;
    }
    .next-btn {
        margin-top: 60px;
    }
</style>
