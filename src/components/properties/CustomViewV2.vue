<template>
<b-modal size="xl" v-model="showModal" class="my-modal" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Custom View
        </div>
        <div>
            <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
        </div>
    </template>
    <b-container fluid class="container-row">
        <b-row>
            <b-col class="custom-view-col">
                <div>
                    <b-button variant="none" class="w-100" @click="lsit_collapse_icon = !lsit_collapse_icon" v-b-toggle.collapse_custom_view_list>
                        <span class="h6 float-left">List</span>
                        <b-icon v-if="lsit_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_list" class="mt-3">
                        <b-form-checkbox id="list_type" @change="mapCustomView('list_type','List Type')" v-model="template.list_type" name="list_type" value="accepted">
                            List Type
                        </b-form-checkbox>
                        <b-form-checkbox id="list_group" @change="mapCustomView('list_group','List Group')" v-model="template.list_group" name="list_group" value="accepted">
                            List Group
                        </b-form-checkbox>
                        <b-form-checkbox id="list_market" @change="mapCustomView('list_market','List Market')" v-model="template.list_market" name="list_market" value="accepted">
                            List Market
                        </b-form-checkbox>
                        <b-form-checkbox id="list_source" @change="mapCustomView('list_source','List Source')" v-model="template.list_source" name="list_source" value="accepted">
                            List Source
                        </b-form-checkbox>
                    </b-collapse>
                </div>
                <div class="mt-1">
                    <b-button variant="none" class="w-100" @click="subject_collapse_icon = !subject_collapse_icon" v-b-toggle.collapse_custom_view_subject>
                        <span class="h6 float-left">Subject</span>
                        <b-icon v-if="subject_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_subject" class="mt-3">
                        <b-form-checkbox id="subject_Id" @change="mapCustomView('id','Id')" v-model="template.id" name="Id" value="accepted">
                            Id
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_address" @change="mapCustomView('subject_address','Subject Address')" v-model="template.subject_address" name="subject_address" value="accepted">
                            Subject Address
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_city" @change="mapCustomView('subject_city','Subject City')" v-model="template.subject_city" name="subject_city" value="accepted">
                            Subject City
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_state" @change="mapCustomView('subject_state','Subject State')" v-model="template.subject_state" name="subject_state" value="accepted">
                            Subject State
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_zip" @change="mapCustomView('subject_zip','Subject Zip')" v-model="template.subject_zip" name="subject_zip" value="accepted">
                            Subject Zip
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_country" @change="mapCustomView('subject_country','Subject County')" v-model="template.subject_country" name="subject_country" value="accepted">
                            Subject County
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_age" @change="mapCustomView('subject_age','Subject Age')" v-model="template.subject_age" name="subject_age" value="accepted">
                            Subject Age
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_type" @change="mapCustomView('subject_type','Subject Type')" v-model="template.subject_type" name="subject_type" value="accepted">
                            Subject Type
                        </b-form-checkbox>
                        <b-form-checkbox id="subject_liststack" @change="mapCustomView('subject_liststack','List stack')" v-model="template.subject_liststack" name="subject_liststack" value="accepted">
                            List stack
                        </b-form-checkbox>
                        <b-form-checkbox id="total_sellers" @change="mapCustomView('total_sellers','Total Seller')" v-model="template.total_sellers" name="total_sellers" value="accepted">
                            Total Seller
                        </b-form-checkbox>
                        </b-collapse>
                </div>
                <div class="mt-1">
                    <b-button variant="none" class="w-100" @click="seller_collapse_icon = !seller_collapse_icon" v-b-toggle.collapse_custom_view_seller>
                        <span class="h6 float-left">Seller</span>
                        <b-icon v-if="seller_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_seller" class="mt-3">
                        <b-form-checkbox id="seller_full_name" @change="mapCustomView('seller_full_name',' Seller Full Name')" v-model="template.seller_full_name" name="seller_full_name" value="accepted">
                            Seller Full Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_first_name" @change="mapCustomView('seller_first_name','Seller First Name')" v-model="template.seller_first_name" name="seller_first_name" value="accepted">
                            Seller First Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_last_name" @change="mapCustomView('seller_last_name','Seller Last Name')" v-model="template.seller_last_name" name="seller_last_name" value="accepted">
                            Seller Last Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_middle_name" @change="mapCustomView('seller_middle_name','Seller Middle Name')" v-model="template.seller_middle_name" name="seller_middle_name" value="accepted">
                            Seller Middle Name
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_address" @change="mapCustomView('seller_mailing_address','Seller Mailing Address')" v-model="template.seller_mailing_address" name="seller_mailing_address" value="accepted">
                            Seller Mailing Address
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_city" @change="mapCustomView('seller_mailing_city','Seller Mailing City')" v-model="template.seller_mailing_city" name="seller_mailing_city" value="accepted">
                            Seller Mailing City
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_state" @change="mapCustomView('seller_mailing_state','Seller Mailing State')" v-model="template.seller_mailing_state" name="seller_mailing_state" value="accepted">
                            Seller Mailing State
                        </b-form-checkbox>
                        <b-form-checkbox id="seller_mailing_zip" @change="mapCustomView('seller_mailing_zip','Seller Mailing Zip')" v-model="template.seller_mailing_zip" name="seller_mailing_zip" value="accepted">
                            Seller Mailing Zip
                        </b-form-checkbox>
                    </b-collapse>
                </div>
                <div class="mt-1">
                    <b-button variant="none" class="w-100" @click="phone_number_collapse_icon = !phone_number_collapse_icon" v-b-toggle.collapse_custom_view_phone_number>
                        <span class="h6 float-left">Phone Number</span>
                        <b-icon v-if="phone_number_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_phone_number" class="mt-3">
                        <b-form-checkbox id="phone_number" @change="mapCustomView('phone_number','Phone Number')" v-model="template.phone_number" name="phone_number" value="accepted">
                            Phone Number
                        </b-form-checkbox>
                        <b-form-checkbox id="phone_type" @change="mapCustomView('phone_type','Phone Type')" v-model="template.phone_type" name="phone_type" value="accepted">
                            Phone Type
                        </b-form-checkbox>
                        <b-form-checkbox id="phone_validity" @change="mapCustomView('phone_validity','Phone Validity')" v-model="template.phone_validity" name="phone_validity" value="accepted">
                            Phone Validity
                        </b-form-checkbox>
                        <b-form-checkbox id="phone_skip_source" @change="mapCustomView('phone_skip_source','Skip Source')" v-model="template.phone_skip_source" name="phone_skip_source" value="accepted">
                            Skip Source
                        </b-form-checkbox>
                    </b-collapse>
                </div>
                <div class="mt-1">
                    <b-button variant="none" class="w-100" @click="email_collapse_icon = !email_collapse_icon" v-b-toggle.collapse_custom_view_email>
                        <span class="h6 float-left">Email</span>
                        <b-icon v-if="email_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_email" class="mt-3">

                        <b-form-checkbox id="email_address" @change="mapCustomView('email_address','Email Address')" v-model="template.email_address" name="email_address" value="accepted">
                            Email Address
                        </b-form-checkbox>
                        <b-form-checkbox id="email_validity" @change="mapCustomView('email_validity','Email Validity')" v-model="template.email_validity" name="email_validity" value="accepted">
                            Email Validity
                        </b-form-checkbox>
                        <b-form-checkbox id="email_skip_source" @change="mapCustomView('email_skip_source','Skip Source')" v-model="template.email_skip_source" name="email_skip_source" value="accepted">
                            Skip Source
                        </b-form-checkbox>
                    </b-collapse>
                </div>
                <div class="mt-1">
                    <b-button variant="none" class="w-100" @click="golden_address_collapse_icon = !golden_address_collapse_icon" v-b-toggle.collapse_custom_view_golden_address>
                        <span class="h6 float-left">Golden Address</span>
                        <b-icon v-if="golden_address_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_golden_address" class="mt-3">
                        <b-form-checkbox id="golden_address_address" @change="mapCustomView('golden_address_address','Golden Address')" v-model="template.golden_address_address" name="golden_address_address" value="accepted">
                            Golden Address
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_city" @change="mapCustomView('golden_address_city','Golden City')" v-model="template.golden_address_city" name="golden_address_city" value="accepted">
                            Golden City
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_state" @change="mapCustomView('golden_address_state','Golden State')" v-model="template.golden_address_state" name="golden_address_state" value="accepted">
                            Golden State
                        </b-form-checkbox>
                        <b-form-checkbox id="golden_address_zip" @change="mapCustomView('golden_address_zip','Golden Zip')" v-model="template.golden_address_zip" name="golden_address_zip" value="accepted">
                            Golden Zip
                        </b-form-checkbox>
                    </b-collapse>
                </div>
                <div class="mt-1">
                    <b-button variant="none" class="w-100" @click="running_list_collapse_icon = !running_list_collapse_icon" v-b-toggle.collapse_custom_view_running_list>
                        <span class="h6 float-left">Running List</span>
                        <b-icon v-if="running_list_collapse_icon" icon="chevron-compact-up" aria-hidden="true" class="float-right"></b-icon>
                        <b-icon v-else icon="chevron-compact-down" aria-hidden="true" class="float-right"></b-icon>
                    </b-button>
                    <hr class="m-0">
                    <b-collapse id="collapse_custom_view_running_list" class="mt-3">
                        <b-form-checkbox id="list_run_month" disabled v-model="template.list_run_month" name="list_run_month" value="accepted">
                            List Run Month
                        </b-form-checkbox>
                        <b-form-checkbox id="list_run_year" disabled v-model="template.list_run_year" name="list_run_year" value="accepted">
                            List Run Year
                        </b-form-checkbox>
                    </b-collapse>
                </div>
            </b-col>
            <b-col class="custom-view-col">
                <draggable v-model="TemplateMap">
                    <transition-group>
                        <div v-for="element in TemplateMap" :key="element.prop" class="custom-view-item">
                            {{element.title}}
                            <b-icon @click="RemoveMapping(element)" class="square-close-icon" icon="x-square"></b-icon>
                        </div>
                    </transition-group>
                </draggable>
            </b-col>
        </b-row>
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
                            <b-button variant="primary" size="sm" class="mr-2 float-right" @click="$emit('show', customTemplate);">
                                show View
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-collapse id="new-template-collapse" class="mt-2">
                        <div class="mr-2">
                            <div class="invalid-feedback-template" v-if="invalidForm && (template.name == '' || selectedView == null)">Template Name Field or Select Template Field is Required.</div>
                            <b-form-input v-model="template.name" placeholder="Enter View Name"></b-form-input>
                            <p class="mt-2 text-center">Or Replace Existing View</p>
                            <b-form-select class="select-template w-100 float-right" v-model="selectedView" :options="customViews"></b-form-select>
                            <b-button variant="primary" size="sm" class="mt-2 float-right" @click="saveOrUpdateTemplate()">
                                Save View Template
                            </b-button>
                        </div>
                    </b-collapse>
                </b-col>
            </b-row>
        </div>
    </template>
</b-modal>
</template>

<script>
import draggable from 'vuedraggable'
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
    components: {
        draggable,
    },
    computed: {
        customTemplate: {
            get() {
                let template = {};
                this.TemplateMap.forEach(x => {
                    template[x.prop] = 'accepted';
                });
                return template;
            }

        }
    },
    watch:{
        showModal(){
            this.lsit_collapse_icon = false;
            this.subject_collapse_icon = false;
            this.seller_collapse_icon =false;
            this.phone_number_collapse_icon = false;
            this.email_collapse_icon = false
            this.golden_address_collapse_icon = false;
            this.running_list_collapse_icon = false;
        }
    },
    data() {
        return {
            invalidForm: false,
            selectedView: null,
            TemplateMap: [],
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
            lsit_collapse_icon: false,
            subject_collapse_icon: false,
            seller_collapse_icon: false,
            phone_number_collapse_icon: false,
            email_collapse_icon: false,
            golden_address_collapse_icon: false,
            running_list_collapse_icon: false,
        }
    },
    methods: {
        mapCustomView(prop, title) {
            if (this.template[prop] == 'accepted') {
                this.TemplateMap.push({
                    prop: prop,
                    title: title
                });
            } else {
                let index = this.TemplateMap.findIndex(x => x.prop == prop);
                this.TemplateMap.splice(index, 1);
            }
        },
        RemoveMapping(item) {
            let index = this.TemplateMap.findIndex(x => x.prop == item.prop);
            this.TemplateMap.splice(index, 1);
            this.template[item.prop] = false;
        },
        resetData() {
            for (let key in this.template) {
                if (key !== 'name') {
                    this.template[key] = false;
                }
            }
            this.TemplateMap = [];
            this.template.name = '';
            this.selectedView = null;
        },
        saveOrUpdateTemplate() {
            if (this.selectedView == null && this.template.name == '') {
                this.invalidForm = true;
                return;
            } else {
                this.invalidForm = false;
            }
            let template = this.customTemplate;
            if (this.selectedView) {
                template.templateId = this.selectedView;
                template.name = this.customViews.find(x => x.value == this.selectedView).text;
                this.$emit('save', Object.assign({}, template), 'update');
            } else {
                template.name = this.template.name;
                this.$emit('save', Object.assign({}, template), 'save');
            }
            this.resetData();
        }
    }
}
</script>

<style scoped>
@media (min-width: 1200px) {
    .modal-xl {
        max-width: 90% !important;
    }
}

.custom-view-col {
    max-height: 100vh;
    overflow-y: scroll;
    padding-top: 10px;
}

/* width */
.custom-view-col::-webkit-scrollbar {
    width: 5px;
}

/* Track */
.custom-view-col::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.custom-view-col::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
.custom-view-col::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.custom-view-item {
    width: 100%;
    border: 1px solid gainsboro;
    padding: 10px;
    cursor: move;
    margin-top: 5px;
}

.square-close-icon {
    font-size: 25px;
    float: right;
    cursor: pointer;
}

.invalid-feedback-template {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
}
</style>
