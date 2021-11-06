<template>
    <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                TABLE CONFIGURATION
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid class="container-row">
            <b-row>
                <b-col cols="6">
                    <div>
                        <h6>List</h6>
                        <hr>
                        <b-form-checkbox id="list_dept" v-model="status" name="list_dept" value="accepted">
                            List Dept
                        </b-form-checkbox>
                        <b-form-checkbox id="list_type" v-model="status" name="list_type" value="accepted">
                            List Type
                        </b-form-checkbox>
                        <b-form-checkbox id="list_group" v-model="status" name="list_group" value="accepted">
                            List Group
                        </b-form-checkbox>
                        <b-form-checkbox id="list_code" v-model="status" name="list_code" value="accepted">
                            List Code
                        </b-form-checkbox>
                        <b-form-checkbox id="list_source" v-model="status" name="list_source" value="accepted">
                            List Source
                        </b-form-checkbox>
                    </div>
                    <div class="mt-3">
                        <h6>Golden Address</h6>
                        <hr>
                        <b-form-checkbox id="golden_address_address" v-model="status" name="golden_address_address" value="accepted">
                            Golden Address
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_city" v-model="status" name="golden_address_city" value="accepted">
                            Golden City
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_state" v-model="status" name="golden_address_state" value="accepted">
                            Golden State
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_zip" v-model="status" name="golden_address_zip" value="accepted">
                            Golden Zip
                        </b-form-checkbox>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div>
                        <h6>Subject</h6>
                        <hr>
                        <b-form-checkbox id="subject_address" v-model="status" name="subject_address" value="accepted">
                            Subject Address
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_city" v-model="status" name="subject_city" value="accepted">
                            Subject City
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_state" v-model="status" name="subject_state" value="accepted">
                            Subject State
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_zip" v-model="status" name="subject_zip" value="accepted">
                            Subject Zip
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_country" v-model="status" name="subject_country" value="accepted">
                            Subject County
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_market" v-model="status" name="subject_market" value="accepted">
                            Market
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_submarket" v-model="status" name="subject_submarket" value="accepted">
                            Submarket
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_age" v-model="status" name="subject_age" value="accepted">
                            Subject Age
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_type" v-model="status" name="subject_type" value="accepted">
                            Subject Type
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_liststack" v-model="status" name="subject_liststack" value="accepted">
                            Liststack
                        </b-form-checkbox>
                        <b-form-checkbox id="total_sellers" v-model="status" name="total_sellers" value="accepted">
                            Total Seller
                        </b-form-checkbox>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <div class="mt-3">
                        <h6>Email</h6>
                        <hr>
                        <b-form-checkbox id="email_address" v-model="status" name="email_address" value="accepted">
                            Email Address
                        </b-form-checkbox>
                        <b-form-checkbox id="email_validity" v-model="status" name="email_validity" value="accepted">
                            Email Validity
                        </b-form-checkbox>
                        <b-form-checkbox id="email_skip_source" v-model="status" name="email_skip_source" value="accepted">
                            Skip Source
                        </b-form-checkbox>
                    </div>
                    <div class="mt-3">
                        <h6>Phone Number</h6>
                        <hr>
                        <b-form-checkbox id="phone_number" v-model="status" name="phone_number" value="accepted">
                            Phone Number
                        </b-form-checkbox>
                        <b-form-checkbox id="phone_type" v-model="status" name="phone_type" value="accepted">
                            Phone Type
                        </b-form-checkbox>
                        <b-form-checkbox id="phone_validity" v-model="status" name="phone_validity" value="accepted">
                            Phone Validity
                        </b-form-checkbox>
                        <b-form-checkbox id="phone_skip_source" v-model="status" name="phone_skip_source" value="accepted">
                            Skip Source
                        </b-form-checkbox>
                    </div>
                    <div class="mt-3">
                        <h6>Running List</h6>
                        <hr>
                        <b-form-checkbox id="list_run_month" v-model="status" name="list_run_month" value="accepted">
                            List Run Month
                        </b-form-checkbox>
                        <b-form-checkbox id="list_run_year" v-model="status" name="list_run_year" value="accepted">
                            List Run Year
                        </b-form-checkbox>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div class="mt-3">
                        <h6>Seller</h6>
                        <hr>
                        <b-form-checkbox id="seller_full_name" v-model="status" name="seller_full_name" value="accepted">
                            Seller Full Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_first_name" v-model="status" name="seller_first_name" value="accepted">
                            Seller First Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_last_name" v-model="status" name="seller_last_name" value="accepted">
                            Seller Last Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_middle_name" v-model="status" name="seller_middle_name" value="accepted">
                            Seller Middle Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_address" v-model="status" name="seller_mailing_address" value="accepted">
                            Seller Mailing Address
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_city" v-model="status" name="seller_mailing_city" value="accepted">
                            Seller Mailing City
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_state" v-model="status" name="seller_mailing_state" value="accepted">
                            Seller Mailing State
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_zip" v-model="status" name="seller_mailing_zip" value="accepted">
                            Seller Mailing Zip
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_company_owned" v-model="status" name="seller_company_owned" value="accepted">
                            Seller Company Owned
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_total_subjects" v-model="status" name="seller_total_subjects" value="accepted">
                            Total Subject
                        </b-form-checkbox>
                    </div>
                </b-col>
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
                >
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'CustomView',
        props: {
            showModal: {
                type: Boolean
            },
        },
        data() {
            return {
                status: '',
            }
        },
        watch: {
        }

    }
</script>

<style>
    /*.container-row {*/
    /*    height: 100%;*/
    /*    overflow-x: hidden;*/
    /*}*/
</style>
