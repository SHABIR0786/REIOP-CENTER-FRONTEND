<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Phone Number
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Phone Number" class="mb-2" id="phone_number" label-for="phone_number">
                            <b-form-input :state="validateState('phone_number')" aria-describedby="phone_number" type="text" v-model="$v.phoneNumber.phone_number.$model" required></b-form-input>
                            <b-form-invalid-feedback id="phone_number">Phone Number Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Phone Type" class="mb-2" id="phone_type" label-for="phone_type">
                            <b-form-input :state="validateState('phone_type')" aria-describedby="phone_type" type="text" v-model="$v.phoneNumber.phone_type.$model" required></b-form-input>
                            <b-form-invalid-feedback id="phone_type">Phone Type Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Phone Validity" class="mb-2" id="phone_validity" label-for="phone_validity">
                            <b-form-input :state="validateState('phone_validity')" aria-describedby="phone_validity" type="text" v-model="$v.phoneNumber.phone_validity.$model" required></b-form-input>
                            <b-form-invalid-feedback id="phone_type">Phone Validity Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Skip Source" class="mb-2" id="phone_skip_source" label-for="phone_skip_source">
                            <b-form-input :state="validateState('phone_skip_source')" aria-describedby="phone_skip_source" type="text" v-model="$v.phoneNumber.phone_skip_source.$model" required></b-form-input>
                            <b-form-invalid-feedback id="phone_type">Phone Skip Source Field is Required.</b-form-invalid-feedback>
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
import {
    required
    } from "vuelidate/lib/validators";
    export default {
        mixins: [validationMixin],
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
        validations: {
                phoneNumber: {
                    phone_number: { required },
                    phone_type: { required },
                    phone_validity: { required },
                    phone_skip_source: { required }
                },  
        },
        methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.phoneNumber[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.phoneNumber.$touch();
                if (this.$v.phoneNumber.$anyError) {
                    return;
                }
            this. $emit('save', this.phoneNumber);
            },
        },
        watch: {
            showModal() {
                this.phoneNumber = {...this.propsData}
            }
        }

    }
</script>
