<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 3: Single Pull List Settings</h3>
        </div>
        <div class="info-text">
            <p>Description of step for user: To be filled out later.</p>
        </div>
        <hr>
        <b-container fluid>
            <b-row class="d-flex justify-content-center">
                <b-col class="d-flex justify-content-end flex-column">
                    <b-row>
                        <b-col cols="6" class="mx-auto">
                            <b-input-group prepend="Market">
                                <b-form-input v-model="list.market"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="mx-auto">
                            <b-input-group prepend="Group">
                                <b-form-input v-model="list.group"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="mx-auto">
                            <b-input-group prepend="Type">
                                <b-form-input v-model="list.type"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="mx-auto">
                            <b-input-group prepend="Source">
                                <b-form-input v-model="list.source"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="mx-auto">
                            <b-input-group prepend="Pull Date">
                                <b-form-input v-model="list.pull_date"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>

        <b-row>
            <b-col cols="12" class="next-btn">
                <b-button
                        variant="primary"
                        class="data-type"
                        @click="$emit('pullSettingsResponse', list)"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    export default {
        name: "PullSettings",

        data () {
            return {
                list: {
                    market: '',
                    group: '',
                    type: '',
                    source: '',
                    pull_date: ''
                },
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
    .next-btn {
        text-align: end !important;
    }
</style>
