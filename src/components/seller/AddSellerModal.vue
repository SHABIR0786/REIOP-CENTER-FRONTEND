<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Seller
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="First Name" class="mb-2">
                            <b-form-input v-model="seller.seller_first_name"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Last Name" class="mb-2">
                            <b-form-input v-model="seller.seller_last_name"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Middle Name" class="mb-2">
                            <b-form-input v-model="seller.seller_middle_name"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Mailing Address" class="mb-2">
                            <b-form-input v-model="seller.seller_mailing_address"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Mailing City" class="mb-2">
                            <b-form-input v-model="seller.seller_mailing_city"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Mailing State" class="mb-2">
                            <b-form-input v-model="seller.seller_mailing_state"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Mailing Zip" class="mb-2">
                            <b-form-input v-model="seller.seller_mailing_zip"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Company Owned" class="mb-2">
                            <b-form-input v-model="seller.seller_company_owned"></b-form-input>
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
                        @click="$emit('save', seller)"
                >
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
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
        watch: {
            showModal() {
                this.seller = {...this.propsSeller}
            }
        }

    }
</script>
