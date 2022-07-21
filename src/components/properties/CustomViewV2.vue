<template>
    <b-modal size="md" v-model="showModal" class="my-modal" scrollable no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Custom View
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid class="container-row">
                    <div>
                        <b-button
                                variant="none"
                                class="w-100"
                                @click="lsit_collapse_icon = !lsit_collapse_icon"
                                v-b-toggle.collapse_custom_view_list>
                                <span class="h6 float-left">List</span>   <b-icon v-if="lsit_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                        <hr>
                        <b-collapse id="collapse_custom_view_list">
                    <!-- <b-form-checkbox id="list_dept" v-model="template.list_dept" name="list_dept" value="accepted">
                        List Dept
                        </b-form-checkbox> -->
                        <b-form-checkbox id="list_type" v-model="template.list_type" name="list_type" value="accepted">
                            List Type
                        </b-form-checkbox>
                        <b-form-checkbox id="list_group" v-model="template.list_group" name="list_group" value="accepted">
                            List Group
                        </b-form-checkbox>
                        <b-form-checkbox id="list_market" v-model="template.list_market" name="list_market" value="accepted">
                            List Market
                        </b-form-checkbox>
                        <b-form-checkbox id="list_source" v-model="template.list_source" name="list_source" value="accepted">
                            List Source
                        </b-form-checkbox>
                        </b-collapse>
                    </div>
                    <div class="mt-3">
                        <b-button
                                variant="none"
                                class="w-100"
                                @click="subject_collapse_icon = !subject_collapse_icon"
                                v-b-toggle.collapse_custom_view_subject>
                                <span class="h6 float-left">Subject</span>   <b-icon v-if="subject_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                        <hr>
                        <b-collapse id="collapse_custom_view_subject">
                            <b-form-checkbox id="subject_Id" v-model="template.id" name="Id" value="accepted">
                                Id
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_address" v-model="template.subject_address" name="subject_address" value="accepted">
                                Subject Address
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_city" v-model="template.subject_city" name="subject_city" value="accepted">
                                Subject City
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_state" v-model="template.subject_state" name="subject_state" value="accepted">
                                Subject State
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_zip" v-model="template.subject_zip" name="subject_zip" value="accepted">
                                Subject Zip
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_country" v-model="template.subject_country" name="subject_country" value="accepted">
                                Subject County
                            </b-form-checkbox>
    <!--                        <b-form-checkbox id="subject_market" v-model="template.subject_market" name="subject_market" value="accepted">-->
    <!--                            Market-->
    <!--                        </b-form-checkbox>-->
                            <b-form-checkbox id="subject_age" v-model="template.subject_age" name="subject_age" value="accepted">
                                Subject Age
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_type" v-model="template.subject_type" name="subject_type" value="accepted">
                                Subject Type
                            </b-form-checkbox>
                            <b-form-checkbox id="subject_liststack" v-model="template.subject_liststack" name="subject_liststack" value="accepted">
                                List stack
                            </b-form-checkbox>
                            <b-form-checkbox id="total_sellers" v-model="template.total_sellers" name="total_sellers" value="accepted">
                                Total Seller
                            </b-form-checkbox>
                        </b-collapse>
                    </div>
                    <div class="mt-3">
                        <b-button
                                variant="none"
                                class="w-100"
                                @click="seller_collapse_icon = !seller_collapse_icon"
                                v-b-toggle.collapse_custom_view_seller>
                                <span class="h6 float-left">Seller</span>   <b-icon v-if="seller_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                        <hr>
                        <b-collapse id="collapse_custom_view_seller">
                            <b-form-checkbox id="seller_full_name" v-model="template.seller_full_name" name="seller_full_name" value="accepted">
                                Seller Full Name
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_first_name" v-model="template.seller_first_name" name="seller_first_name" value="accepted">
                                Seller First Name
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_last_name" v-model="template.seller_last_name" name="seller_last_name" value="accepted">
                                Seller Last Name
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_middle_name" v-model="template.seller_middle_name" name="seller_middle_name" value="accepted">
                                Seller Middle Name
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_mailing_address" v-model="template.seller_mailing_address" name="seller_mailing_address" value="accepted">
                                Seller Mailing Address
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_mailing_city" v-model="template.seller_mailing_city" name="seller_mailing_city" value="accepted">
                                Seller Mailing City
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_mailing_state" v-model="template.seller_mailing_state" name="seller_mailing_state" value="accepted">
                                Seller Mailing State
                            </b-form-checkbox>
                            <b-form-checkbox id="seller_mailing_zip" v-model="template.seller_mailing_zip" name="seller_mailing_zip" value="accepted">
                                Seller Mailing Zip
                            </b-form-checkbox>
    <!--                        <b-form-checkbox id="seller_company_owned" v-model="template.seller_company_owned" name="seller_company_owned" value="accepted">-->
    <!--                            Seller Company Owned-->
    <!--                        </b-form-checkbox>-->
    <!--                        <b-form-checkbox id="seller_total_subjects" v-model="template.seller_total_subjects" name="seller_total_subjects" value="accepted">-->
    <!--                            Total Subject-->
    <!--                        </b-form-checkbox>-->
                        </b-collapse>
                    </div>
                    <div class="mt-3">
                       <b-button
                                variant="none"
                                class="w-100"
                                @click="phone_number_collapse_icon = !phone_number_collapse_icon"
                                v-b-toggle.collapse_custom_view_phone_number>
                                <span class="h6 float-left">Phone Number</span>   <b-icon v-if="phone_number_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                       <hr>
                        <b-collapse id="collapse_custom_view_phone_number">

                            <b-form-checkbox id="phone_number" v-model="template.phone_number" name="phone_number" value="accepted">
                                Phone Number
                            </b-form-checkbox>
                            <b-form-checkbox id="phone_type" v-model="template.phone_type" name="phone_type" value="accepted">
                                Phone Type
                            </b-form-checkbox>
                            <b-form-checkbox id="phone_validity" v-model="template.phone_validity" name="phone_validity" value="accepted">
                                Phone Validity
                            </b-form-checkbox>
                            <b-form-checkbox id="phone_skip_source" v-model="template.phone_skip_source" name="phone_skip_source" value="accepted">
                                Skip Source
                            </b-form-checkbox>
                       </b-collapse>
                   </div>
                    <div class="mt-3">
                       <b-button
                                variant="none"
                                class="w-100"
                                @click="email_collapse_icon = !email_collapse_icon"
                                v-b-toggle.collapse_custom_view_email>
                                <span class="h6 float-left">Email</span>   <b-icon v-if="email_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                       <hr>
                        <b-collapse id="collapse_custom_view_email">
                            <b-form-checkbox id="email_address" v-model="template.email_address" name="email_address" value="accepted">
                                Email Address
                            </b-form-checkbox>
                            <b-form-checkbox id="email_validity" v-model="template.email_validity" name="email_validity" value="accepted">
                                Email Validity
                            </b-form-checkbox>
                            <b-form-checkbox id="email_skip_source" v-model="template.email_skip_source" name="email_skip_source" value="accepted">
                                Skip Source
                            </b-form-checkbox>
                       </b-collapse>
                   </div>
                    <div class="mt-3">
                       <b-button
                                variant="none"
                                class="w-100"
                                @click="golden_address_collapse_icon = !golden_address_collapse_icon"
                                v-b-toggle.collapse_custom_view_golden_address>
                                <span class="h6 float-left">Golden Address</span>   <b-icon v-if="golden_address_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                       <hr>
                       <b-collapse id="collapse_custom_view_golden_address">
                        <b-form-checkbox id="golden_address_address" v-model="template.golden_address_address" name="golden_address_address" value="accepted">
                            Golden Address
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_city" v-model="template.golden_address_city" name="golden_address_city" value="accepted">
                            Golden City
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_state" v-model="template.golden_address_state" name="golden_address_state" value="accepted">
                            Golden State
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_zip" v-model="template.golden_address_zip" name="golden_address_zip" value="accepted">
                            Golden Zip
                        </b-form-checkbox>
                       </b-collapse>
                   </div>
                    <div class="mt-3">
                        <b-button
                                variant="none"
                                class="w-100"
                                @click="running_list_collapse_icon = !running_list_collapse_icon"
                                v-b-toggle.collapse_custom_view_running_list>
                                <span class="h6 float-left">Running List</span>   <b-icon v-if="running_list_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon><b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                        </b-button>
                        <hr>
                        <b-collapse id="collapse_custom_view_running_list">
                            <b-form-checkbox id="list_run_month" disabled v-model="template.list_run_month" name="list_run_month" value="accepted">
                                List Run Month
                            </b-form-checkbox>
                            <b-form-checkbox id="list_run_year" disabled v-model="template.list_run_year" name="list_run_year" value="accepted">
                                List Run Year
                            </b-form-checkbox>
                        </b-collapse>
                    </div>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-row>
                    <b-col>
                        <b-row>
                        <b-col>
                        <b v-b-toggle.new-template-collapse>Create New View Template</b>
                        </b-col>
                        <b-col>
                        <b-button
                                variant="primary"
                                size="sm"
                                class="mr-2 float-right"
                                @click="$emit('show',template);">
                            show View
                        </b-button> 
                        </b-col>
                        </b-row>
                        <b-collapse id="new-template-collapse" class="mt-2">
                        <div class="mr-2">
                          <b-form-input v-model="template.name" placeholder="Enter View Name"></b-form-input>
                          <p class="mt-2 text-center">Or Replace Existing View</p>
                        <b-form-select class="select-template w-100 float-right" v-model="selectedView" :options="customViews"></b-form-select>
                        <b-button
                            variant="primary"
                            size="sm"
                            class="mt-2 float-right"
                            @click="saveOrUpdateTemplate()">
                            Save View Template
                        </b-button>
                        </div>
                        </b-collapse>


                        <!-- <div style="width: 160px;" class="mr-2">
                          <b-form-input v-model="template.name" placeholder="Template Name"></b-form-input>
                        </div>

                        <b-button
                                variant="primary"
                                size="sm"
                                class="mr-2"
                                @click="$emit('cancel'); resetData()"
                        >
                            Cancel
                        </b-button>

                        <b-button
                                variant="primary"
                                size="sm"
                                class="mr-2"
                                @click="$emit('save', template, 'save'); resetData()"
                        >
                            Save
                        </b-button>

                        <b-button
                                variant="primary"
                                size="sm"
                                @click="$emit('save', template, 'saveAndMakeTemplate'); resetData()"
                        >
                            Save and Create Template
                        </b-button> -->
                    </b-col>
                </b-row>
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
            customViews: {
                type: Array
            },
        },
        data() {
            return {
                selectedView: null,
                template: {
                  name: '',
                  // list
                  list_dept: false,
                  list_type: false,
                  list_group: false,
                  list_market: false,
                  list_source: false,
                  list_run_month: false,
                  list_run_year: false,

                  // seller
                  seller_full_name: false,
                  seller_first_name: false,
                  seller_last_name: false,
                  seller_middle_name: false,
                  seller_mailing_address: false,
                  seller_mailing_city: false,
                  seller_mailing_state: false,
                  seller_mailing_zip: false,
                  seller_company_owned: false,
                  seller_total_subjects: false,

                  //subject
                  subject_address: false,
                  subject_city: false,
                  subject_state: false,
                  subject_zip: false,
                  subject_country: false,
                  subject_market: false,
                  subject_age: false,
                  subject_type: false,
                  subject_liststack: false,
                  total_sellers: false,

                  // Phone
                  phone_number: false,
                  phone_type: false,
                  phone_validity: false,
                  phone_skip_source: false,

                  // Email
                  email_address: false,
                  email_validity: false,
                  email_skip_source: false,
                  
                  // Golden Address

                  golden_address_address: false,
                  golden_address_city: false,
                  golden_address_state: false,
                  golden_address_zip: false,
                },
                lsit_collapse_icon:false,
                subject_collapse_icon:false,
                seller_collapse_icon:false,
                phone_number_collapse_icon:false,
                email_collapse_icon:false,
                golden_address_collapse_icon:false,
                running_list_collapse_icon:false,

            }
        },
        methods: {
            resetData () {
                for(let key in this.template) {
                    if(key !== 'name') {
                        this.template[key] = false;
                    } else {
                        this.template.name = 'Template ' + Math.floor(1000 + Math.random() * 9000);
                    }
                }
            },
            saveOrUpdateTemplate() {
                if(this.selectedView) {
                    this.template.id = this.selectedView;
                    this.template.name = this.customViews.find(x=>x.value == this.selectedView).text;
                    this.$emit('save', Object.assign({},this.template), 'update');
                } else {
                    this.$emit('save', Object.assign({},this.template), 'save');
                }                
                this.resetData();
            },
        }
    }
</script>

<style scoped>
    @media (min-width: 1200px) {
        .modal-xl {
            max-width: 90% !important;
        }
    }
</style>
