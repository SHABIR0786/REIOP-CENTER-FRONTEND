<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 2: New Upload Type</h3>
        </div>
        <div class="info-text">
            <p>Description of step for user: To be filled out later.</p>
        </div>
        <hr>
        <b-row class="text-center">
            <b-col class="d-flex justify-content-end flex-column align-items-center">
                <b-button
                        variant="primary"
                        class="data-type"
                        @click="$emit('uploadResponse', 'single')"
                >
                    Is this a single pull from a provider with Raw Data?
                </b-button>
                or
                <b-button
                        variant="primary"
                        class="data-type"
                        @click="$emit('uploadResponse', 'combined')"
                >
                    Is this a combined upload with data from multiple providers and lists?
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    export default {
        name: "UploadType",

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
</style>
