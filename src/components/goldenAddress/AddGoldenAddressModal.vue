<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Golden Address
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Golden Address" class="mb-2" id="golden_address_address" label-for="golden_address_address">
                            <b-form-input :state="validateState('golden_address_address')" aria-describedby="golden_address_address" type="text" v-model="$v.goldenAddress.golden_address_address.$model" required></b-form-input>
                            <b-form-invalid-feedback id="golden_address_address">Golden Address Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Golden City" class="mb-2" id="golden_address_city" label-for="golden_address_city">
                            <b-form-input :state="validateState('golden_address_city')" aria-describedby="golden_address_city" type="text" v-model="$v.goldenAddress.golden_address_city.$model" required></b-form-input>
                            <b-form-invalid-feedback id="golden_address_city">Golden City Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Golden State" class="mb-2" id="golden_address_state" label-for="golden_address_state">
                            <b-form-input :state="validateState('golden_address_state')" aria-describedby="golden_address_state" type="text" v-model="$v.goldenAddress.golden_address_state.$model" required></b-form-input>
                            <b-form-invalid-feedback id="golden_address_state">Golden State Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Golden Zip" class="mb-2" id="golden_address_zip" label-for="golden_address_zip">
                            <b-form-input :state="validateState('golden_address_zip')" aria-describedby="golden_address_zip" type="text" v-model="$v.goldenAddress.golden_address_zip.$model" required></b-form-input>
                            <b-form-invalid-feedback id="golden_address_zip">Golden Zip Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
    export default {
        mixins: [validationMixin],
        name: 'AddGoldenAddressModal',
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
                goldenAddress: {
                    golden_address_address: '',
                    golden_address_city: '',
                    golden_address_state: '',
                    golden_address_zip: ''
                },
            }
        },
        validations: {
                goldenAddress: {
                    golden_address_address: { required },
                    golden_address_city: { required },
                    golden_address_state: { required },
                    golden_address_zip: { required },

                },  
        },
        methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.goldenAddress[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.goldenAddress.$touch();
                if (this.$v.goldenAddress.$anyError) {
                    return;
                }
            this. $emit('save', this.goldenAddress);
            },
        },
        watch: {
            showModal() {
                this.goldenAddress = { ...this.propsData }
            }
        }
    }
</script>
