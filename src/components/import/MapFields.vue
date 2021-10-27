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
        <b-row class="text-center">
            <b-col class="d-flex justify-content-end flex-column align-items-center">
                <p class="map-text">Map fields UI without subject_market or list fields. These will be set by step 3 and populated for each upload.
                    Also no need to show email, golden address, or phone fields.</p>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12" class="next-btn">
                <b-button
                        variant="primary"
                        class="data-type"
                        @click="$emit('mapFieldsResponse')"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    export default {
        name: "MapFields",

        data () {
            return {

            }
        }
    }
</script>

<style>
    .data-type {
        background-color: #45818E !important;
        color: white;
    }
    .type-container {
        background-color: #45818E;
        color: white;
        padding: 15px 0;
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
