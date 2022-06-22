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
        <slide-pop-up-filter :search="searchProperty" :selectedItems="bulkDeleteItems" :custom_view="selectedTemplate" @filterProperties="filterProperties"  :sortBy="sortBy" :sortDesc="sortDesc"></slide-pop-up-filter>
        <hr>
        <div>
            <b-row class="text-end mb-3">
                <!-- <b-col cols="8" class="d-flex align-items-center">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-col> -->
                <b-col cols="12"  class="d-flex justify-content-end">
                    <b-input-group class="col-6 d-flex align-items-center">
                        <b-input-group-append v-if="isPropertySearched">
                        <b-button @click="clearsearch" variant="outline-primary"><b-icon icon="x" aria-hidden="true"></b-icon> Clear Search</b-button>
                        </b-input-group-append>
                        <b-form-input v-model="searchProperty" @keyup.enter="search" placeholder="Search"></b-form-input>
                        <b-input-group-append>
                        <b-button @click="search" variant="primary">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>


                </b-col>
            </b-row>
            <b-row class="text-end">
                <!-- <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                        <b-icon icon="filter" aria-hidden="true"></b-icon> Filter</b-button>
                    <b-button variant="outline-primary" class="filter d-flex align-items-center">
                        <b-icon icon="x" aria-hidden="true"></b-icon> Reset</b-button>
                </b-col> -->
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
            <!-- <b-row class="mt-2">
                <b-col cols="8">
                        <div class="info latest d-flex justify-content-center ml-0" @click="showFileType = !showFileType">
                            <div>Export</div>
                        </div>
                    <div v-if="showFileType" class="mt-2">
                        <b-button variant="primary" class="mr-2" @click="exportProperties('xlsx')">Excel</b-button>
                        <b-button variant="primary" @click="exportProperties('csv')">CSV</b-button>
                    </div>
                </b-col>
                <b-col cols="4" class="d-flex justify-content-end">
                    <b-form-select class="select-template mr-2" v-model="selectedTemplate" @change="getTemplate($event)" :options="templatesToExport"></b-form-select>
                </b-col>
            </b-row>
            <hr> -->
        </div>
        <!-- <hr> -->
        <!-- <div class="d-flex align-items-center mb-4">
            <b-form-checkbox  @change="selectAll" v-model='allSelected'></b-form-checkbox>
            <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
                <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected</b-button>
        </div> -->
        
        <b-table
            style="margin-left:20px;"
            id="subject-table"
            small
            striped
            sort-icon-left
            no-local-sorting
            @sort-changed="sortingChanged"
            hover
            :busy="isBusy"
            :fields="propertyFields"
            :items="items"
            responsive
            :per-page="0"
            :current-page="currentPage"
            :sticky-header="true"
        >
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
                <b-form-checkbox :value='data.item.id' v-model='bulkDeleteItems'></b-form-checkbox>
                               <!-- <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
               <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon> -->
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
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
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
                <b-form-group
                        label="Show"
                        label-for="show-select"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-size="xs"
                        class="mb-0"
                >
                    <b-form-select
                            id="show-select"
                            v-model="perPage"
                            :options="pageOptions"
                            size="xs"
                            class="ml-3"
                    ></b-form-select>
                </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{total}} entries</p>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
            </b-col>
        </b-row>
        <edit-subject-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-subject-modal>
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
        <add-subject-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-subject-modal>
        <custom-view-v2 :customViews="templatesToExport" :showModal="showCustomModalView" @cancel="showCustomModalView=false" @show="showCustomView" @save="saveCustomView"></custom-view-v2>
        <filter-properties :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false" @save="triggerFilter"></filter-properties>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import EditSubjectModal from "../components/subject/EditSubjectModal";
import AddSubjectModal from "../components/subject/AddSubjectModal";
import CustomViewV2 from "../components/properties/CustomViewV2";
import FilterProperties from "../components/properties/FilterProperties";
import SlidePopUpFilter from "../components/properties/SlidePopUpFilter";

export default {
    name: "Properties",
    components: {
        BIcon,
        EditSubjectModal,
        DeleteModal,
        AddSubjectModal,
        CustomViewV2,
        FilterProperties,
        SlidePopUpFilter
    },
    data () {
        return {
                allFields: [
                //Subject
                {key:"id", label: "Id", sortable: true},
                {key: "actions", label: "Actions"},
                {key: "total_sellers", label: "Total Sellers", sortable: true},
                {key: "list_stack", label: "List Stack", sortable: true},

                {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true, visible: false},
                // {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
                {key: "subject_city", label: "Subject City", sortable: true, visible: false},
                {key: "subject_state", label: "Subject State", sortable: true, visible: false},
                {key: "subject_zip", label: "Subject Zip", sortable: true},
                {key: "subject_country", label: "Subject County", sortable: true},
                // {key: "subject_market", label: "Market", sortable: true},
                {key: "subject_type", label: "Subject Type", sortable: true},
                {key: "subject_age", label: "Subject Age", sortable: true},


                // Custom Fields
                // {key: "subject_last_marked_date", label: "Last Marketed Date", sortable: true},
                // {key: "subject_last_exported_date", label: "Last Exported Date", sortable: true},
                // {key: "subject_pull_date", label: "Pull Date", sortable: true},
                // {key: "subject_skip_trace_date", label: "Skip Trace Date", sortable: true},

                {key:"created_at", label: "Created Date", sortable: true},
                {key:"updated_at", label: "Updated Date", sortable: true},
                {key:"user_id", label: "Uploaded By", sortable: true},

                //List
                {key:"list_market", label: "Markets", sortable: true, visible: false},
                {key:"list_group", label: "Group", sortable: true},
                {key:"list_type", label: "Type", sortable: true},
                {key:"list_source", label: "Source", sortable: true},

                //Seller
                {key: "seller_first_name", label: "First Name", sortable: true},
                {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},
                {key: "seller_mailing_address", label: "Mailing Address"},
                {key: "seller_mailing_state", label: "Mailing State"},
                {key: "seller_mailing_city", label: "Mailing City"},
                {key: "seller_mailing_zip", label: "Mailing Zip"},
            ],
            isBusy: false,
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
            showFilterPropertiesModal: false,
            showFileType: false,
            selectedTemplate: null,
            templatesToExport: [
                { value: null, text: 'Select Template' }
            ],
            bulkDeleteItems: [],
            allSelected: false,
            propertyFields: [],
            totals: {},
            filtersName: {
                "Market": [],
                "Group": [],
                "Type": [],
                "Source": []
            },
            sortBy: 'id',
            sortDesc: false,
            isPropertySearched:false
        }
    },
    computed: {
        ...mapGetters({
          isCollapsed: 'uxModule/isCollapsed',
          fields: 'propertyModule/fields',
          items: 'propertyModule/subjects',
          total: 'propertyModule/total',
          filteredItems: 'subjectModule/filteredSubject',
          templates: 'templatesModule/templates'
        }),
         filtersCount(){
            let total = 0
            for (let item in this.filtersName) {
                total += this.filtersName[item].length
            }
        return total;
        },
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        this.totals = await this.$store.dispatch('propertyModule/getTotals',{filter: this.filtersName})
        this.$store.dispatch('propertyModule/getTotal')

        try {
            await this.$store.dispatch("propertyModule/getAllSubjectsV2", {page: 1, perPage: this.perPage,filter: this.filtersName})
            await this.$store.dispatch("templatesModule/getAllTemplates")
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        async sortingChanged(ctx) {
           this.sortBy = ctx.sortBy;
           this.sortDesc = ctx.sortDesc;
            if (this.filtersCount > 0) {
                await this.$store.dispatch("propertyModule/getAllSubjectsV2", { page: this.currentPage, perPage: this.perPage,search: this.searchProperty, filter: this.filtersName, sortBy: this.sortBy, sortDesc: this.sortDesc });
            } else {
                await this.$store.dispatch('propertyModule/searchSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty,sortBy: this.sortBy, sortDesc: this.sortDesc});
            }
        },
      async  clearsearch(){
            this.searchProperty = '';
        if(this.filtersCount > 0) {
            await this.$store.dispatch("propertyModule/getAllSubjectsV2", { page: this.currentPage, perPage: this.perPage,search: this.searchProperty, filter: this.filtersName, sortBy: this.sortBy, sortDesc: this.sortDesc });
        } else {
        this.$store.dispatch('propertyModule/searchSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty,sortBy: this.sortBy, sortDesc: this.sortDesc});
        }
        this.totals = await this.$store.dispatch('propertyModule/getTotals',{filter: this.filtersName,search: this.searchProperty});
        this.isPropertySearched = false;
        },
    async search() {
        if(this.filtersCount > 0) {
            await this.$store.dispatch("propertyModule/getAllSubjectsV2", { page: this.currentPage, perPage: this.perPage,search: this.searchProperty, filter: this.filtersName, sortBy: this.sortBy, sortDesc: this.sortDesc });
        } else {
        this.$store.dispatch('propertyModule/searchSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty,sortBy: this.sortBy, sortDesc: this.sortDesc});
        }
        this.totals = await this.$store.dispatch('propertyModule/getTotals',{filter: this.filtersName,search: this.searchProperty});
        if(this.searchProperty.length == 0) {
            this.isPropertySearched = false;
        } else {
            this.isPropertySearched = true;
        }
    },
     async filterProperties(filtersName) {
        this.filtersName = filtersName;
            await this.$store.dispatch("propertyModule/getAllSubjectsV2", { page: this.currentPage, perPage: this.perPage,search: this.searchProperty, filter: filtersName, sortBy: this.sortBy, sortDesc: this.sortDesc });
            this.totals = await this.$store.dispatch('propertyModule/getTotals',{filter: this.filtersName,search:this.searchProperty});
        },
        editItem(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        showCustomView(template) {
            this.showCustomModalView = false;
            const fields = [
                {key:"delete", label: ""},
                {key:"id", label: "Id", sortable: true},
                {key: "actions", label: "Actions"},
            ];
            for(let key in template) {
                if(key !== 'name' && template[key] !== false) {
                    let obj = this.allFields.find(o => o['key'] === key);
                    fields.push(obj);
                }
            }

            this.propertyFields = [...this.fields];
        },
        save(item) {
            // this.showModal = false
            this.$store.dispatch('propertyModule/editSubject', {...item})
        },
        add(item) {
            this.showAddModal = false
            this.$store.dispatch('propertyModule/addSubject', {...item})
        },
        deleteItem(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('propertyModule/deleteSubject', this.itemToDelete.id)
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        exportProperties (fileType = 'csv') {
            this.showFileType = false;
            this.$store.dispatch('propertyModule/exportProperties', {filter: this.filter, template: this.selectedTemplate, fileType: fileType});
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
            if(response.template) {
                response = response.template;
            this.templatesToExport.push({ value: response.id, text: response.name });
            }
          }else if(type == 'update') {
            const templateDuplication = Object.assign({}, template);
            const keys = Object.keys(templateDuplication);
            keys.forEach(key => {
              if (!templateDuplication[key]) {
                delete templateDuplication[key];
              }
            });
             await this.$store.dispatch('templatesModule/editTemplate', templateDuplication);
             await this.$store.dispatch("templatesModule/getAllTemplates")
          }
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

          this.$store.dispatch("propertyModule/getAllSubjectsV2", {page: 1, perPage: this.perPage, filter: this.filter})
        },
        getTemplate (event) {
          this.$store.dispatch("propertyModule/getTemplate", {id: event})
          this.propertyFields = [...this.fields];
          this.propertyFields.unshift({key:"delete", label: ""});
        },
        bulkDelete () {
            this.$store.dispatch('propertyModule/deleteMultipleSubjects', this.bulkDeleteItems).then(
                this.$store.dispatch('propertyModule/getAllSubjectsV2', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty})
            )
        },
        selectAll () {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }

        }
    },
    mounted() {
        if(this.templates) {
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
        this.propertyFields = [...this.fields];
        this.propertyFields.unshift({key:"delete", label: ""});
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('propertyModule/getAllSubjectsV2', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty, fitler: this.filtersName})
            }
        },
        perPage: {
            handler: function () {
                this.$store.dispatch('propertyModule/getAllSubjectsV2', {page: 1, perPage: this.perPage, search: this.searchProperty, fitler: this.filtersName})
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
    .list-page.main-content.wide-content{
        position:relative;
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
        float:right;
    }
    .properties-header .boxes div{
        border: 1px solid #d3d8de;
        border-radius: 0.25rem;
        color: #3e3e3e;
        text-align: center;
        display: inline-block;
        padding-top: 10px;
        width: 167px;
        padding-bottom: 10px;
        margin-left: 10px;
        cursor:pointer;
    }
    .properties-header h3{
        display:inline-block;
    }
</style>

