<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Import Downloads
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-col class="d-flex justify-content-end flex-column align-items-center">
                    <b-button
                            variant="primary"
                            class="add-seller"
                            @click="$emit('modalResponse', 'original')"
                    >
                        Download Original File
                    </b-button>
                    or
                    <b-button
                            variant="primary"
                            class="add-seller"
                            @click="$emit('modalResponse', 'error')"
                    >
                        Download Errors File
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right cancel-btn"
                        @click="$emit('cancel')"
                >
                    Cancel
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'ImportDownloadsModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        data() {
            return {
                // subject: {
                //     subject_address: '',
                //     subject_city: '',
                //     subject_state: '',
                //     subject_zip: '',
                //     subject_county: '',
                //     subject_age: '',
                //     subject_type: '',
                // },
            }
        },
        // watch: {
        //     showModal() {
        //         this.subject = {...this.propsData}
        //     }
        // }

    }
</script>

<style>
    .cancel-btn {
        background-color: #45818E !important;
    }
</style>
