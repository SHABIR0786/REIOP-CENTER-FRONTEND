<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Email Address
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Email Address" class="mb-2" id="email_address" label-for="email_address">
                            <b-form-input :state="validateState('email_address')" aria-describedby="email_address" type="text" v-model="$v.email.email_address.$model" required></b-form-input>
                            <b-form-invalid-feedback id="email_address">Email Address is invalid.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Email Validity" class="mb-2" id="email_validity" label-for="email_validity">
                            <b-form-input :state="validateState('email_validity')" aria-describedby="email_validity" type="text" v-model="$v.email.email_validity.$model" required></b-form-input>
                            <b-form-invalid-feedback id="email_validity">Email Validity Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Skip Source" class="mb-2" id="email_skip_source" label-for="email_skip_source">
                            <b-form-input :state="validateState('email_skip_source')" aria-describedby="email_skip_source" type="text" v-model="$v.email.email_skip_source.$model" required></b-form-input>
                            <b-form-invalid-feedback id="email_skip_source">Skip Source Field is Required.</b-form-invalid-feedback>
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
    required, email
    } from "vuelidate/lib/validators";
    export default {
        mixins: [validationMixin],
        name: 'AddEmailModal',
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
                email: {
                    email_address: '',
                    email_validity: '',
                    email_skip_source: ''
                },
            }
        },
        validations: {
                email: {
                    email_address: { required, email },
                    email_validity: { required },
                    email_skip_source: { required }
                },  
        },
        methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.email[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.email.$touch();
                if (this.$v.email.$anyError) {
                    return;
                }
            this. $emit('save', this.email);
            },
        },
        watch: {
            showModal() {
                this.email = {...this.propsData}
            }
        }

    }
</script>
