<template>
    <b-modal
        v-model="showModal"
        no-close-on-backdrop
    >
        <template #modal-header>
            <div class="w-100">
                Seller
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row
                    class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                            prepend="First Name"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.first_name"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Last Name"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.last_name"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Middle Name"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.middle_name"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Mailing Address"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.mailing_address"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Mailing City"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.mailing_city"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Mailing State"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.mailing_state"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Mailing Zip"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.mailing_zip"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Company Owned"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.company_owned"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                            prepend="Total Seller"
                            class="mb-2"
                        >
                            <b-form-input
                                v-model="seller.total_seller"
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
    name: 'sellerMoal',
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
                full_name: '',
                first_name: '',
                last_name: '',
                middle_name: '',
                mailing_address: '',
                mailing_state: '',
                mailing_city: '',
                mailing_zip: '',
                company_owned: '',
                total_seller: null
            },
        }
    },
    watch: {
        showModal() {
            this.seller = this.propsSeller
        }
    }

}
</script>