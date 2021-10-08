<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Phone Number
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Phone Number" class="mb-2">
                            <b-form-input v-model="phoneNumber.phone_number"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Phone Type" class="mb-2">
                            <b-form-input v-model="phoneNumber.phone_type"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Phone Validity" class="mb-2">
                            <b-form-input v-model="phoneNumber.phone_validity"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Skip Source" class="mb-2">
                            <b-form-input v-model="phoneNumber.phone_skip_source"></b-form-input>
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
                        @click="$emit('save', phoneNumber)"
                >
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'PhoneNumberModal',
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
                phoneNumber: {
                    phone_number: '',
                    phone_type: '',
                    phone_validity: '',
                    phone_skip_source: ''
                },
            }
        },
        watch: {
            showModal() {
                this.phoneNumber = {...this.propsData}
            }
        }

    }
</script>
