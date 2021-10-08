<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Seller
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center text-center d-flex align-items-center p-3">
                    <div>Seller Details</div>
                    <b-button
                            v-if="isReadOnly"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="isReadOnly = false"
                    >
                        Edit
                    </b-button>
                    <b-button
                            v-if="isReadOnly === false"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="edit()"
                    >
                        Save
                    </b-button>
                </b-row>
                <b-row>
                    <b-col>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="First Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_first_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Last Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_last_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Middle Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_middle_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing City" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_city"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing State" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_state"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing Zip" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_zip"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Company Owned" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_company_owned"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Full Mailing Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_full_mailing_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Mailing Address 2" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_address_line2"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Id" class="mb-2">
                                    <b-form-input readonly v-model="seller.user_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Id" class="mb-2">
                                    <b-form-input readonly v-model="seller.subject_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-row>

            <b-row class="mt-5">
                <b-tabs class="w-100" content-class="mt-3" fill>
                    <b-tab title="Related Phones" active>
                        <p>Related Phones</p>
                    </b-tab>
                    <b-tab title="Related Emails">
                        <p>Related Emails</p>
                    </b-tab>
                    <b-tab title="Related Golden Addresses">
                        <p>Related Golden Addresses</p>
                    </b-tab>
                    <b-tab title="Related Subjects">
                        <p>Related Subjects</p>
                    </b-tab>
                </b-tabs>
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
            </div>
        </template>
    </b-modal>
</template>
<script>
export default {
    name: 'EditSellerModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsSeller: {
            type: Object
        }
    },
    methods: {
        edit() {
            this.isReadOnly = true;
            this.$emit('save', this.seller);
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
                seller_full_mailing_address: '',
                seller_mailing_address_line2: '',
                user_id: '',
                subject_id: '',
            },
            isReadOnly: true
        }
    },
    watch: {
        showModal() {
            this.seller = {...this.propsSeller}
        }
    }

}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
</style>
