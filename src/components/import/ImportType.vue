<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 1: Type of Import</h3>
        </div>
        <div class="info-text">
            <p>Description of step for user: To be filled out later.</p>
        </div>
        <hr>
        <b-row class="text-center">
            <b-col class="d-flex justify-content-end flex-column align-items-center">
                <b-button
                        class="data-type-btn"
                        @click="import_type='new'"
                        :class="{'active-data-type': import_type === 'new'}"
                >
                    Are you uploading new data?
                </b-button>
                or
                <b-button
                        class="data-type-btn"
                        @click="import_type = 'existing'"
                        :class="{'active-data-type': import_type === 'existing'}"
                >
                    Are you updating existing records?
                </b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12" class="next-btn">
                <b-button
                        class="data-type"
                        variant="primary"
                        @click="setImportType()"
                        :disabled="!import_type.length"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    export default {
        name: "ImportType",

        data () {
            return {
                import_type: ''
            }
        },
        methods: {
            setImportType() {
                this.$emit('importResponse', this.import_type);
            },
        }
    }
</script>

<style scoped>
    .data-type-btn {
        background-color: #808080;
        color: white;
    }
    .active-data-type {
        background-color: #45818E !important;
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
</style>
