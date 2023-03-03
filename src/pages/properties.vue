<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div class="properties-header">
        <h3>Properties</h3>
        <div class="boxes">
            <div>{{totals.subjectsCount}} Subjects</div>
            <div>{{totals.sellersCount}} Sellers</div>
            <div>{{totals.phonesCount}} Phones</div>
            <div>{{totals.emailsCount}} Emails</div>
            <div>{{totals.goldenAddressesCount}} Golden Addresses</div>
        </div>
    </div>
    <hr>
    <div>
        <b-row class=" mb-3">
            <b-col cols="6" class="d-flex align-items-center">
                <!-- <b-button variant="primary" class="filter d-flex align-items-center mr-2" v-b-tooltip.hover title="Properties Filter" @click="showNewFilterPropertiesModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-button> -->
                <b-button variant="primary" class="filter d-flex align-items-center mr-2" v-b-tooltip.hover title="Lsit Filter" @click="showListFilterModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-button>
                <b-button variant="primary" class="filter d-flex align-items-center mr-2" v-b-tooltip.hover title="Export" @click="showNewExportPropertiesModal = true">
                    <b-icon class="download" icon="download" aria-hidden="true"></b-icon>
                </b-button>
                <!-- <b-button v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters()" class="filter d-flex float-right r-0 align-items-right mr-2">
                    <b-icon icon="x" aria-hidden="true"></b-icon> Clear All
                </b-button>
                <span v-if="totalFilters > 0" class="filter-count filter-top">{{ totalFilters }}</span>
                <b-input-group class="mb-2 save-filter-dropdown">
                    <b-form-select class="select-template w-100" @change="applyFilter" v-model="selectedFilter" :options="savedFilters"></b-form-select>
                </b-input-group> -->
            </b-col>
            <b-col cols="6" class="d-flex justify-content-end">
                <b-input-group class="col-6 d-flex align-items-center">
                    <b-input-group-append v-if="isPropertySearched">
                        <b-button @click="clearsearch" variant="outline-primary">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Clear Search
                        </b-button>
                    </b-input-group-append>
                    <b-form-input v-model="searchProperty" @keyup.enter="search" placeholder="Search"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="search" variant="primary">Search</b-button>
                    </b-input-group-append>
                </b-input-group>

            </b-col>
        </b-row>
        <b-row class="text-end">
            <div class="d-flex justify-content-end col-12">
                <b-col cols="2">
                    <b-button variant="primary" class="filter float-right" @click="showCustomModalView = true">Custom View</b-button>
                </b-col>
                <p class="pr-3 pt-1">or</p>
                <b-col cols="4 p-0">
                    <b-form-select class="select-template w-100 float-right" v-model="selectedTemplate" @change="getTemplate($event)" :options="templatesToExport"></b-form-select>
                </b-col>
            </div>
        </b-row>
    </div>
    <b-table style="margin-left:20px;" id="subject-table" small striped sort-icon-left no-local-sorting @sort-changed="sortingChanged" hover :busy="isBusy" :fields="propertyColumns" :items="properties" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
        <template #table-busy>
            <div class="text-center" my-2>
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
        <template #head(delete)="scope">
            <div class="text-nowrap" style="width: 30px;">{{scope.label}}</div>
        </template>
        <template v-slot:cell(delete)="data">
            <div v-if="fieldsType == 'samerows' || fieldsType == null">
                <b-form-checkbox :value='data.item.id' v-model='bulkDeleteItems'></b-form-checkbox>
            </div>
            <div v-else>
                <b-form-checkbox :value='data.item.id+","+data.item.seller_id+","+data.item.phone_id+","+data.item.email_id+","+data.item.golden_id' v-model='bulkDeleteItems'></b-form-checkbox>
            </div>
        </template>
        <template #head(id)="scope">
            <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(actions)="scope">
            <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(total_sellers)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(list_stack)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(subject_state)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(subject_zip)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(subject_address)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
        </template>
        <template #head(subject_county)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(subject_city)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(subject_type)="scope">
            <div style="width: 90px;">{{scope.label}}</div>
        </template>
        <template #head(subject_age)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(user_id)="scope">
            <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
        </template>
        <template #head(created_at)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(updated_at)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head()="scope">
            <div style="width: 150px;">{{ scope.label }}</div>
        </template>
        <template v-slot:cell(actions)="data">
            <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
            <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
        </template>
        <template v-slot:cell(subject_address)="data">
            <div v-b-tooltip.hover :title="data.item.subject_address">{{ data.item.subject_address }}</div>
        </template>
        <template v-slot:cell(subject_city)="data">
            <div v-b-tooltip.hover :title="data.item.subject_city">{{ data.item.subject_city }}</div>
        </template>
        <template v-slot:cell(subject_state)="data">
            <div v-b-tooltip.hover :title="data.item.subject_state">{{ data.item.subject_state }}</div>
        </template>
        <template v-slot:cell(subject_zip)="data">
            <div v-b-tooltip.hover :title="data.item.subject_zip">{{ data.item.subject_zip }}</div>
        </template>
        <template v-slot:cell(subject_county)="data">
            <div v-b-tooltip.hover :title="data.item.subject_county">{{ data.item.subject_county }}</div>
        </template>
        <template v-slot:cell(subject_type)="data">
            <div v-b-tooltip.hover :title="data.item.subject_type">{{ data.item.subject_type }}</div>
        </template>
    </b-table>
    <b-row style="margin-left:20px;">
        <b-col class="d-flex align-items-center">
            <b-form-group label="Show" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{perPage * currentPage}} of {{total}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
    <div v-if="componentMounted">
    <filter-properties :search="searchProperty" :selectedItems="bulkDeleteItems" :showModal="showNewFilterPropertiesModal" @cancel="showNewFilterPropertiesModal=false" :custom_view="getCustomView" :template_id="selectedTemplate" @filterProperties="filterProperties" :sortBy="sortBy" :sortDesc="sortDesc" :totals="exportCount" :fields_type="fieldsType"></filter-properties>
    <export-properties-modal :search="searchProperty" :selectedItems="bulkDeleteItems" :showModal="showNewExportPropertiesModal" @cancel="showNewExportPropertiesModal=false" :custom_view="getCustomView" :template_id="selectedTemplate" @filterProperties="filterProperties" :sortBy="sortBy" :sortDesc="sortDesc" :totals="exportCount" :fields_type="fieldsType"></export-properties-modal>
    <edit-subject-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-subject-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    <!-- <add-subject-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-subject-modal> -->
    <custom-view :customViews="templatesToExport" :changeTemplate="changeTemplate" :showModal="showCustomModalView" @cancel="showCustomModalView=false" @show="showCustomView" @save="saveCustomView"></custom-view>
    <list-filter :showModal="showListFilterModal" @cancel="showListFilterModal=false" :search="searchProperty" :selectedItems="bulkDeleteItems"  :custom_view="getCustomView" :template_id="selectedTemplate" @filterProperties="filterProperties" :sortBy="sortBy" :sortDesc="sortDesc" :totals="exportCount" :fields_type="fieldsType"></list-filter>

    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    BIcon
} from "bootstrap-vue"
import DeleteModal from '@/components/deleteModal/DeleteModal'
import EditSubjectModal from "../components/subject/EditSubjectModal";
// import AddSubjectModal from "../components/subject/AddSubjectModal";
import CustomView from "../components/properties/CustomView";
import FilterProperties from "../components/properties/FilterProperties";
import ExportPropertiesModal from "../components/properties/ExportPropertiesModal";
import ListFilter from "../components/properties/ListFilter2";

export default {
    name: "Properties",
    components: {
        BIcon,
        EditSubjectModal,
        DeleteModal,
        // AddSubjectModal,
        CustomView,
        FilterProperties,
        ExportPropertiesModal,
        ListFilter

    },
    data() {
        return {
            componentMounted: false,
            allFields: [
                //Subject
                {
                    key: "id",
                    label: "Id",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "Actions"
                },
                {
                    key: "total_sellers",
                    label: "Total Sellers",
                    sortable: true
                },
                {
                    key: "list_stack",
                    label: "List Stack",
                    sortable: true
                },

                {
                    key: "subject_address",
                    stickyColumn: true,
                    label: "Subject Address",
                    sortable: true,
                    visible: false
                },
                // {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
                {
                    key: "subject_city",
                    label: "Subject City",
                    sortable: true,
                    visible: false
                },
                {
                    key: "subject_state",
                    label: "Subject State",
                    sortable: true,
                    visible: false
                },
                {
                    key: "subject_zip",
                    label: "Subject Zip",
                    sortable: true
                },
                {
                    key: "subject_county",
                    label: "Subject County",
                    sortable: true
                },
                // {key: "subject_market", label: "Market", sortable: true},
                {
                    key: "subject_type",
                    label: "Subject Type",
                    sortable: true
                },
                {
                    key: "subject_age",
                    label: "Subject Age",
                    sortable: true
                },

                {
                    key: "created_at",
                    label: "Created Date",
                    sortable: true
                },
                {
                    key: "updated_at",
                    label: "Updated Date",
                    sortable: true
                },
                {
                    key: "user_id",
                    label: "Uploaded By",
                    sortable: true
                },

                //List
                {
                    key: "list_market",
                    label: "Markets",
                    sortable: true,
                    visible: false
                },
                {
                    key: "list_group",
                    label: "Group",
                    sortable: true
                },
                {
                    key: "list_type",
                    label: "Type",
                    sortable: true
                },
                {
                    key: "list_source",
                    label: "Source",
                    sortable: true
                },

                //Seller
                {
                    key: "seller_full_name",
                    label: "Full Name",
                    sortable: true
                },
                {
                    key: "seller_first_name",
                    label: "First Name",
                    sortable: true
                },
                {
                    key: "seller_middle_name",
                    label: "Middle Name",
                    sortable: true
                },
                {
                    key: "seller_last_name",
                    stickyColumn: true,
                    label: "Last Name",
                    sortable: true
                },
                {
                    key: "seller_mailing_address",
                    label: "Mailing Address"
                },
                {
                    key: "seller_mailing_state",
                    label: "Mailing State"
                },
                {
                    key: "seller_mailing_city",
                    label: "Mailing City"
                },
                {
                    key: "seller_mailing_zip",
                    label: "Mailing Zip"
                },
                // Phone Fields 
                {
                    key: "phone_number",
                    label: "Phone Number",
                    sortable: true
                },
                {
                    key: "phone_type",
                    label: "Phone Type",
                    sortable: true
                },
                {
                    key: "phone_validity",
                    label: "Phone Validity",
                    sortable: true
                },
                {
                    key: "phone_skip_source",
                    label: "Phone Skip Source",
                    sortable: true
                },
                // Email Fields
                {
                    key: "email_address",
                    label: "Email Address",
                    sortable: true
                },
                {
                    key: "email_validity",
                    label: "Email Validity",
                    sortable: true
                },
                {
                    key: "email_skip_source",
                    label: "Skip Source",
                    sortable: true
                },
                // Golden Addresses
                {
                    key: "golden_address_address",
                    label: "Golden Address",
                    sortable: true
                },
                {
                    key: "golden_address_city",
                    label: "Golden City",
                    sortable: true
                },
                {
                    key: "golden_address_state",
                    label: "Golden State",
                    sortable: true
                },
                {
                    key: "golden_address_zip",
                    label: "Golden Zip",
                    sortable: true
                }
            ],
            isBusy: false,
            fieldsType: null,
            showModal: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchProperty: '',
            showAddModal: false,
            showCustomModalView: false,
            showNewFilterPropertiesModal: false,
            showNewExportPropertiesModal: false,
            changeTemplate: false,
            showFilterPropertiesModal: false,
            showFileType: false,
            selectedTemplate: null,
            templatesToExport: [{
                value: null,
                text: 'Select Template'
            }],
            bulkDeleteItems: [],
            allSelected: false,
            propertyFields: [],
            totals: {},
            filtersName: {
                Market:[],
                Group:[],
                Type:[],
                Source:[],
                Errors:[],
                Error:[],
                RunDate:[],
                TotalSellers:[],
                ListStack:[],
                list_custom_field_1:[],
                list_custom_field_2:[],
                list_custom_field_3:[],
                list_custom_field_4:[],
                list_custom_field_5:[]
            },
            sortBy: 'id',
            sortDesc: true,
            isPropertySearched: false,
            customViewTemplate: null,
            exportCount: 0,
            showListFilterModal: false,
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'propertyModule/fields',
            items: 'propertyModule/sameRowSubjects',
            seperatedRowSubjects: 'propertyModule/seperatedRowSubjects',
            total: 'propertyModule/total',
            maxSellers: 'propertyModule/maxSellers',
            maxPhones: 'propertyModule/maxPhones',
            maxEmails: 'propertyModule/maxEmails',
            maxGoldenAddresses: 'propertyModule/maxGoldenAddresses',
            filteredItems: 'subjectModule/filteredSubject',
            templates: 'templatesModule/templates',
            template: 'templatesModule/template',
            customViewVisibleFields: 'importModule/customViewVisibleFields',
            customFieldsArray: 'labelModule/customFieldsArray',
        }),
        properties() {
            if (this.fieldsType == "samerows" || this.fieldsType == null) {
                return this.items;
            } else {
                return this.seperatedRowSubjects;
            }
        },
        propertyColumns() {
            if (this.fieldsType == null) {
                return this.fields;
            } else if (this.fieldsType == "samerows" || this.fieldsType == "separatedrows") {
                return this.propertyFields;
            } else {
                return this.fields;
            }
        },
        filtersCount() {
            let total = 0
            for (let item in this.filtersName) {
                total += this.filtersName[item].length
            }
            return total;
        },
        getCustomView() {
            if (this.customViewTemplate) {
                let customViewTemplate = JSON.parse(JSON.stringify(this.customViewTemplate));
                customViewTemplate.customView = true;
                return customViewTemplate;
            } else {
                return this.propertyColumns;
            }
        },
        rows() {
            return this.total ? this.total : 1
        }
    },
    async mounted() {
        this.totals = await this.$store.dispatch('propertyModule/getTotals', {
            filter: this.filtersName
        });
        console.log(this.totals);
    },
    async created() {
        this.$store.dispatch('uxModule/setLoading')

        // this.exportCount = this.totals.subjectsCount;
        try {
            await this.$store.dispatch("propertyModule/getAllSubjectsV2", {
                page: 1,
                perPage: this.perPage,
                filter: this.filtersName,
                custom: '',
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
            })
            this.propertyFields = [...this.fields];
            this.propertyFields.unshift({
                key: "delete",
                label: ""
            });
            this.$store.dispatch('uxModule/hideLoader');
            this.componentMounted = true;
            // Fetching the visible custom fields
            await this.$store.dispatch('labelModule/visibleCustomFields');
            // Load the Temaplates for get all templates
            await this.$store.dispatch("templatesModule/getAllTemplates");
            if (this.templates) {
                this.templates.forEach(e => {
                    const template = {
                        value: '',
                        text: '',
                    }
                    template.value = e.id;
                    template.text = e.name;
                    this.templatesToExport.push(template);
                })
            }
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        async sortingChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            if (this.filtersCount > 0) {
                await this.$store.dispatch("propertyModule/getAllSubjectsV2", {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchProperty,
                    filter: this.filtersName,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc,
                    custom: this.customViewTemplate
                });
            } else {
                await this.$store.dispatch('propertyModule/searchSubjects', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchProperty,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                });
            }
        },
        async clearsearch() {
            this.searchProperty = '';
            this.$store.dispatch('uxModule/setLoading')
            try {
                if (this.filtersCount > 0) {
                    await this.$store.dispatch("propertyModule/getAllSubjectsV2", {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchProperty,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc,
                        custom: this.customViewTemplate
                    });
                } else {
                    this.$store.dispatch('propertyModule/searchSubjects', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchProperty,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    });
                }
                this.totals = await this.$store.dispatch('propertyModule/getTotals', {
                    filter: this.filtersName,
                    search: this.searchProperty
                });
                this.isPropertySearched = false;
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        async search() {
            this.$store.dispatch('uxModule/setLoading')
            try {
                if (this.filtersCount > 0) {
                    await this.$store.dispatch("propertyModule/getAllSubjectsV2", {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchProperty,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc,
                        custom: this.customViewTemplate
                    });
                } else {
                    this.$store.dispatch('propertyModule/searchSubjects', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchProperty,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    });
                }
                this.totals = await this.$store.dispatch('propertyModule/getTotals', {
                    filter: this.filtersName,
                    search: this.searchProperty
                });
                if (this.customViewTemplate) {
                    this.showCustomView();
                }
                if (this.searchProperty.length == 0) {
                    this.isPropertySearched = false;
                } else {
                    this.isPropertySearched = true;
                }
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        async filterProperties(filtersName) {
            // console.log(filtersName);
            // this.$store.dispatch('uxModule/setLoading')
            // try {
            //     this.showNewFilterPropertiesModal = false;
            //     this.showListFilterModal = false;
                
            //     this.currentPage = 1;
            //     this.filtersName = filtersName;
            //     await this.$store.dispatch("propertyModule/getAllSubjectsV2", {
            //         page: this.currentPage,
            //         perPage: this.perPage,
            //         search: this.searchProperty,
            //         filter: filtersName,
            //         sortBy: this.sortBy,
            //         sortDesc: this.sortDesc,
            //         custom: this.customViewTemplate
            //     });
            //     this.totals = await this.$store.dispatch('propertyModule/getTotals', {
            //         filter: this.filtersName,
            //         search: this.searchProperty
            //     });
            //     if (this.customViewTemplate) {
            //         this.showCustomView();
            //     }
            //     this.$store.dispatch('uxModule/hideLoader')
            // } catch (error) {
            //     this.$store.dispatch('uxModule/hideLoader')
            // }
            
            this.$store.dispatch('uxModule/setLoading')
            try {
                this.showNewFilterPropertiesModal = false;
                this.showListFilterModal = false;
                this.currentPage = 1;
                // this.filtersName = filtersName;
                await this.$store.dispatch("propertyModule/filterProperties", {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchProperty,
                    filter: JSON.stringify(filtersName),
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc,
                    custom: this.customViewTemplate
                });
                this.$store.dispatch('uxModule/hideLoader')
                this.totals = await this.$store.dispatch('propertyModule/getTotals', {
                    filter: this.filtersName,
                    search: this.searchProperty
                });
                if (this.customViewTemplate) {
                    this.showCustomView();
                }
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        editItem(item) {
            this.showModal = true
            this.editedItem = {
                ...item
            }
        },
        addPhoneFields(key) {
            let fields = [];
            if (this.maxPhones > 0) {
                for (let ms = 0; ms < this.maxSellers; ms++) {
                    let sellerCount = ms + 1;
                    // Adding Phones Fields
                    for (let z = 0; z < this.maxPhones; z++) {
                        let phoneCount = z + 1;
                        if (key == 'phone_number') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_phone_' + phoneCount + '_phone_number',
                                label: "Seller " + sellerCount + " Phone " + phoneCount + " Phone Number",
                                sortable: false
                            });
                        }

                        if (key == 'phone_type') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_phone_' + phoneCount + '_phone_type',
                                label: "Seller " + sellerCount + " Phone " + phoneCount + " Phone Type",
                                sortable: false
                            });
                        }

                        if (key == 'phone_validity') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_phone_' + phoneCount + '_phone_validity',
                                label: "Seller " + sellerCount + " Phone " + phoneCount + " Phone Validity",
                                sortable: false
                            });
                        }

                        if (key == 'phone_skip_source') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_phone_' + phoneCount + '_phone_skip_source',
                                label: "Seller " + sellerCount + " Phone" + phoneCount + "phone Skip Source",
                                sortable: false
                            });
                        }
                    }
                }
            }
            return fields;
        },
        addEmailFields(key) {
            let fields = [];
            // Adding Email Fields
            if (this.maxEmails > 0) {
                for (let ms = 0; ms < this.maxSellers; ms++) {
                    let sellerCount = ms + 1;
                    for (let z = 0; z < this.maxEmails; z++) {
                        let emailCount = z + 1;
                        if (key == 'email_address') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_email_' + emailCount + '_email_address',
                                label: "Seller " + sellerCount + " Email " + emailCount + " Email Address",
                                sortable: false
                            });
                        }

                        if (key == 'email_validity') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_email_' + emailCount + '_email_validity',
                                label: "Seller " + sellerCount + " Email " + emailCount + " Email Validity",
                                sortable: false
                            });
                        }

                        if (key == 'email_skip_source') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_email_' + emailCount + '_email_skip_source',
                                label: "Seller " + sellerCount + " Email " + emailCount + " Email Skip Source",
                                sortable: false
                            });
                        }
                    }
                }
            }
            return fields;
        },
        addGoldenAddressesFields(key) {
            let fields = [];
            // Adding Golden Addresses Fields
            if (this.maxGoldenAddresses > 0) {
                for (let ms = 0; ms < this.maxSellers; ms++) {
                    let sellerCount = ms + 1;
                    for (let z = 0; z < this.maxGoldenAddresses; z++) {
                        let goldenCount = z + 1;
                        if (key == 'golden_address_address') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_address',
                                label: "Seller " + sellerCount + " Golden Address  " + goldenCount + " Golden Address",
                                sortable: false
                            });
                        }
                        if (key == 'golden_address_city') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_city',
                                label: "Seller " + sellerCount + " Golden Address  " + goldenCount + " Golden City",
                                sortable: false
                            });
                        }
                        if (key == 'golden_address_state') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_state',
                                label: "Seller " + sellerCount + " Golden Address  " + goldenCount + " Golden State",
                                sortable: false
                            });
                        }
                        if (key == 'golden_address_zip') {
                            fields.push({
                                key: 'seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_zip',
                                label: "Seller " + sellerCount + " Golden Address  " + goldenCount + " Golden Zip",
                                sortable: false
                            });
                        }
                    }
                }
            }
            return fields;
        },
        addSellerFields(key) {
            let fields = [];
            // Adding Seller Fields.
            for (let z = 0; z < this.maxSellers; z++) {
                let sellerCount = z + 1;
                if (key == 'seller_full_name') {
                    fields.push({
                        key: sellerCount + '_seller_full_name',
                        label: "Seller " + sellerCount + " Full Name",
                        sortable: false
                    });
                }
                if (key == 'seller_first_name') {
                    fields.push({
                        key: sellerCount + '_seller_first_name',
                        label: "Seller " + sellerCount + " First Name",
                        sortable: false
                    });
                }
                if (key == 'seller_last_name') {
                    fields.push({
                        key: sellerCount + '_seller_last_name',
                        label: "Seller " + sellerCount + " Last Name",
                        sortable: false
                    });
                }
                if (key == 'seller_middle_name') {
                    fields.push({
                        key: sellerCount + '_seller_middle_name',
                        label: "Seller " + sellerCount + " Middle Name",
                        sortable: false
                    });
                }
                if (key == 'seller_mailing_address') {
                    fields.push({
                        key: sellerCount + '_seller_mailing_address',
                        label: "Seller " + sellerCount + " Mailing Address",
                        sortable: false
                    });
                }
                if (key == 'seller_mailing_city') {
                    fields.push({
                        key: sellerCount + '_seller_mailing_city',
                        label: "Seller " + sellerCount + " Mailing City",
                        sortable: false
                    });
                }
                if (key == 'seller_mailing_state') {
                    fields.push({
                        key: sellerCount + '_seller_mailing_state',
                        label: "Seller " + sellerCount + " Mailing State",
                        sortable: false
                    });
                }
                if (key == 'seller_mailing_zip') {
                    fields.push({
                        key: sellerCount + '_seller_mailing_zip',
                        label: "Seller " + sellerCount + " Mailing Zip",
                        sortable: false
                    });
                }
            }
            return fields;
        },
        async showCustomView(template, fieldsType = null, resetSelectedTemplate= false) {
            if (template) {
                this.customViewTemplate = template;
                if(resetSelectedTemplate){
                    this.selectedTemplate= null;
                    this.changeTemplate= false;
                }

            }
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch('propertyModule/getAllSubjectsV2', {
                page: this.currentPage,
                perPage: this.perPage,
                search: this.searchProperty,
                filter: this.filtersName,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
                custom: this.customViewTemplate
            });
            if (fieldsType) {
                this.fieldsType = fieldsType;
            }
            this.$store.dispatch('uxModule/hideLoader');
            this.showCustomModalView = false;
            let fields = [];
            if (this.fieldsType == null || this.fieldsType == "samerows") {
                for (let key in this.customViewTemplate) {                    
                    if (key !== 'name' && this.customViewTemplate[key] !== false) {
                    let customField = this.customViewVisibleFields.find(x=>(x.field == key && x.field.includes("custom") && x.visible ==1));
                    if(customField) {
                            fields.push({
                                key: customField.field,
                                label: customField.label,
                                sortable: false
                            });
                    } else {
                        if (key.includes("seller_")) {
                            let sellerFields = this.addSellerFields(key);
                            fields.push(...sellerFields);
                        } else if (key.includes("phone_")) {
                            let phoneFields = this.addPhoneFields(key);
                            fields.push(...phoneFields);
                        } else if (key.includes("email_")) {
                            let emailFields = this.addEmailFields(key);
                            fields.push(...emailFields);
                        } else if (key.includes("golden_address_")) {
                            let goldenAddressesFields = this.addGoldenAddressesFields(key);
                            fields.push(...goldenAddressesFields);
                        } else {
                            let obj = this.allFields.find(o => o['key'] === key);
                            fields.push(obj);
                        }
                    }
                    }
                }
                fields.unshift({
                    key: "delete",
                    label: ""
                }, {
                    key: "actions",
                    label: "Actions"
                });
                this.propertyFields = [...fields];
            } else {
                fields.unshift({
                    key: "delete",
                    label: ""
                }, {
                    key: "actions",
                    label: "Actions"
                });
                for (let key in this.customViewTemplate) {
                    if (key !== 'name' && this.customViewTemplate[key] !== false) {
                        let field = this.allFields.find(o => o['key'] === key);
                        fields.push(field);
                    }
                }
                this.propertyFields = [...fields];
            }
        },
        save(item) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                // this.showModal = false
                this.$store.dispatch('propertyModule/editSubject', {
                    ...item
                })
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
            this.$store.dispatch('uxModule/hideLoader');
        },
        add(item) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.showAddModal = false
                this.$store.dispatch('propertyModule/addSubject', {
                    ...item
                });
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        deleteItem(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('uxModule/setLoading');
                try {
                    this.$store.dispatch('propertyModule/deleteSubject', this.itemToDelete.id);
                    this.$store.dispatch('uxModule/hideLoader');
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader');
                }
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        async saveCustomView(template, type) {
            this.showCustomModalView = false;
            if (type === 'save' && template) {
                const templateDuplication = Object.assign({}, template);
                const keys = Object.keys(templateDuplication);
                keys.forEach(key => {
                    if (!templateDuplication[key]) {
                        delete templateDuplication[key];
                    }
                });
                let response = await this.$store.dispatch('templatesModule/createTemplate', templateDuplication);
                if (response.template) {
                    response = response.template;
                    this.templatesToExport.push({
                        value: response.id,
                        text: response.name
                    });
                    this.selectedTemplate = response.id;
                }
            } else if (type == 'update') {
                const templateDuplication = Object.assign({}, template);
                const keys = Object.keys(templateDuplication);
                keys.forEach(key => {
                    if (!templateDuplication[key]) {
                        delete templateDuplication[key];
                    }
                });
                this.selectedTemplate = template.templateId;
                await this.$store.dispatch('templatesModule/editTemplate', templateDuplication);
                await this.$store.dispatch("templatesModule/getAllTemplates")
            }
            this.showCustomView(template, template.fields_type);

        },
        triggerFilter(filter) {
            this.filter = {};
            this.showFilterPropertiesModal = false;

            if (filter) {
                const keys = Object.keys(filter);
                keys.filter(key => {
                    if (filter[key]) {
                        this.filter[key] = filter[key];
                    }
                })
            }
            this.$store.dispatch("propertyModule/getAllSubjectsV2", {
                page: 1,
                perPage: this.perPage,
                filter: this.filter,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,
                custom: this.customViewTemplate
            })
        },
        async getTemplate(event) {
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch("templatesModule/getTemplate", {
                id: event
            });
            this.showCustomView(this.template,"samerows",false);
            if(event!=null){
                this.changeTemplate= true;
            }else{
                this.changeTemplate= false;

            }
            this.$store.dispatch('uxModule/hideLoader');

        },
        bulkDelete() {
            this.$store.dispatch('propertyModule/deleteMultipleSubjects', this.bulkDeleteItems).then(
                this.$store.dispatch('propertyModule/getAllSubjectsV2', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchProperty,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc,
                    custom: this.customViewTemplate
                })
            )
        },
        selectAll() {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }
        }
    },
    watch: {
        totals: {
            handler: function () {
                this.exportCount = this.totals.subjectsCount;
                console.log(this.exportCount);
            }
        },
        currentPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                await this.$store.dispatch('propertyModule/getAllSubjectsV2', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchProperty,
                    filter: this.filtersName,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc,
                    custom: this.customViewTemplate
                })
                if (this.customViewTemplate) {
                    this.showCustomView();
                }
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        perPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                await this.$store.dispatch('propertyModule/getAllSubjectsV2', {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchProperty,
                    filter: this.filtersName,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc,
                    custom: this.customViewTemplate
                })
                if (this.customViewTemplate) {
                    this.showCustomView();
                }
                this.$store.dispatch('uxModule/hideLoader')
            }
        },

    }
}
</script>

<style>
.info {
    border: 1px solid black;
    border-radius: 5px;
    width: 200px;
    height: 38px;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.list-page.main-content.wide-content {
    position: relative;
}

.latest {
    background-color: #B6D7A8;
}

.add-seller {
    width: 200px;
}

.filter-icon {
    font-size: 25px;
}

.b-table-sticky-header {
    max-height: calc(100vh - 372px) !important;
}

.filter-container {
    text-align: end;
}

.select-template {
    width: 80% !important;
}

table th {
    vertical-align: inherit !important;
    height: 64px;
}

.properties-header .boxes {
    float: right;
}

.properties-header .boxes div {
    border: 1px solid #d3d8de;
    border-radius: 0.25rem;
    color: #3e3e3e;
    text-align: center;
    display: inline-block;
    padding-top: 10px;
    min-width: 167px;
    padding-bottom: 10px;
    margin-left: 10px;
    cursor: pointer;
}

.properties-header h3 {
    display: inline-block;
}
</style>
