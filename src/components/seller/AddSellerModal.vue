<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Seller
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="First Name" class="mb-2" id="seller_first_name" label-for="seller_first_name">
                            <b-form-input :state="validateState('seller_first_name')" aria-describedby="seller_first_name" type="text" v-model="$v.seller.seller_first_name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_first_name">Seller First Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Last Name" class="mb-2">
                            <b-form-input :state="validateState('seller_last_name')" aria-describedby="seller_last_name" type="text" v-model="$v.seller.seller_last_name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_last_name">Seller Last Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Middle Name" class="mb-2">
                            <b-form-input :state="validateState('seller_middle_name')" aria-describedby="seller_middle_name" type="text" v-model="$v.seller.seller_middle_name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_middle_name">Seller Middle Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Mailing Address" class="mb-2">
                            <b-form-input :state="validateState('seller_mailing_address')" aria-describedby="seller_mailing_address" type="text" v-model="$v.seller.seller_mailing_address.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_mailing_address">Seller Mailing Address Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Mailing City" class="mb-2">
                            <b-form-input :state="validateState('seller_mailing_city')" aria-describedby="seller_mailing_city" type="text" v-model="$v.seller.seller_mailing_city.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_mailing_city">Seller Mailing City Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Mailing State" class="mb-2">
                            <b-form-input :state="validateState('seller_mailing_state')" aria-describedby="seller_mailing_state" type="text" v-model="$v.seller.seller_mailing_state.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_mailing_state">Seller Mailing State Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Mailing Zip" class="mb-2">
                            <b-form-input :state="validateState('seller_mailing_zip')" aria-describedby="seller_mailing_zip" type="text" v-model="$v.seller.seller_mailing_zip.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_mailing_zip">Seller Mailing Zip Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Company Owned" class="mb-2">
                            <b-form-input :state="validateState('seller_company_owned')" aria-describedby="seller_company_owned" type="text" v-model="$v.seller.seller_company_owned.$model" required></b-form-input>
                            <b-form-invalid-feedback id="seller_company_owned">Seller Company Owned Field is Required.</b-form-invalid-feedback>
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
        name: 'AddSellerModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsSeller: {
                type: Object
            }
        },
        data() {
            return {
                seller: {
                    seller_full_name: '',
                    seller_first_name: '',
                    seller_last_name: '',
                    seller_middle_name: '',
                    seller_mailing_address: '',
                    seller_mailing_state: '',
                    seller_mailing_city: '',
                    seller_mailing_zip: '',
                    seller_company_owned: '',
                },
            }
        },
        validations: {
            seller:{
                seller_full_name: {
                    required
                },
                seller_first_name: {
                    required
                },
                seller_last_name: {
                    required
                },
                seller_middle_name: {
                    required
                },
                seller_mailing_address: {
                    required
                },
                seller_mailing_state: {
                    required
                },
                seller_mailing_city: {
                    required
                },
                seller_mailing_zip: {
                    required
                },
                seller_company_owned: {
                    required
                }
            }
        },
        methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.seller[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.seller.$touch();
                if (this.$v.seller.$anyError) {
                    return;
                }
            this. $emit('save', this.seller);
            },
        },
        watch: {
            showModal() {
                this.seller = {...this.propsSeller}
            }
        }

    }
</script>
