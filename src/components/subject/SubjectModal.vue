<template>
    <b-modal
        v-model="showModal"
        no-close-on-backdrop
    >
        <template #modal-header>
            <div class="w-100">
                Subject
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject Address"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_address"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject City"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_city"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject State"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_state"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject Zip"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_zip"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject County"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_county"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>    
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Market"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.market"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Submarket"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.submarket"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject Age"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_age"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Subject Type"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.subject_type"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="Total Seller"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.total_seller"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="List Stack"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="subject.list_stack"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="$emit('cancel')"
                >
                    Cancel
                </b-button>
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right mr-2"
                    @click="$emit('save', subject)"
                >
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
export default {
    name: 'SubjectModal',
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
            subject: {
                subject_address: '',
                subject_city: '',
                subject_state: '',
                subject_zip: '',
                subject_county: '',
                market: '',
                submarket: '',
                subject_age: '',
                subject_type: '',
                total_seller: '',
                list_stack: ''
            },
        }
    },
    watch: {
        showModal() {
            this.subject = {...this.propsData}
        }
    }

}
</script>