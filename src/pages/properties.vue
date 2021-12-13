<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Properties</h3>
        <div>
            <b-row class="text-end">
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                        <b-icon icon="filter" aria-hidden="true"></b-icon> Filter</b-button>
                    <b-button variant="outline-primary" class="filter d-flex align-items-center">
                        <b-icon icon="x" aria-hidden="true"></b-icon> Reset</b-button>
                </b-col>
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="primary" class="filter d-flex align-items-center mt-2" @click="showCustomModalView = true">Custom View</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-2">
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
            <hr>
            <b-row class="mb-3">
                <b-col cols="8" class="d-flex align-items-center">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-col>
                <b-col cols="4">
                    <b-form-input v-model="searchProperty" placeholder="Search"></b-form-input>
                </b-col>
            </b-row>
        </div>
        <hr>
        <div class="d-flex align-items-center mb-4">
            <b-form-checkbox  @change="selectAll" v-model='allSelected'></b-form-checkbox>
            <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
                <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected</b-button>
        </div>
        <b-table
            id="subject-table"
            small
            striped
            hover
            :busy="isBusy"
            :fields="fields"
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
<!--                                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>-->
<!--                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>-->
            </template>
            <template #head(id)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(total_sellers)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
            </template>
            <template #head(subject_state)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
            </template>
            <template #head(subject_zip)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
            </template>
            <template #head(subject_address)="scope">
                <div class="text-nowrap" style="width: 250px;">{{scope.label}}</div>
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
        </b-table>
        <b-row>
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
        <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
        <add-subject-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-subject-modal>
        <custom-view :showModal="showCustomModalView" @cancel="showCustomModalView=false" @save="saveCustomView"></custom-view>
        <filter-properties :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false" @save="triggerFilter"></filter-properties>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import EditSubjectModal from "../components/subject/EditSubjectModal";
import AddSubjectModal from "../components/subject/AddSubjectModal";
import CustomView from "../components/properties/CustomView";
import FilterProperties from "../components/properties/FilterProperties";

export default {
    name: "Properties",
    components: {
        BIcon,
        EditSubjectModal,
        DeleteModal,
        AddSubjectModal,
        CustomView,
        FilterProperties
    },
    data () {
        return {
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
        }
    },
    computed: {
        ...mapGetters({
          isCollapsed: 'uxModule/isCollapsed',
          fields: 'propertyModule/fields',
          items: 'propertyModule/subjects',
          total: 'propertyModule/total',
          templates: 'templatesModule/templates'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        this.$store.dispatch('propertyModule/getTotal')
        try {
            await this.$store.dispatch("propertyModule/getAllSubjectsV2", {page: 1, perPage: this.perPage})
            await this.$store.dispatch("templatesModule/getAllTemplates")
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        editItem(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        save(item) {
            // this.showModal = false
            this.$store.dispatch('propertyModule/editSubject', {...item})
        },
        add(item) {
            this.showAddModal = false
            this.$store.dispatch('propertyModule/addSubject', {...item})
        },
        deleteItem(item){
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
        saveCustomView(template, type) {
          this.showCustomModalView = false;
          if (type === 'saveAndMakeTemplate' && template) {
            const templateDuplication = Object.assign({}, template);
            const keys = Object.keys(templateDuplication);
            keys.forEach(key => {
              if (!templateDuplication[key]) {
                delete templateDuplication[key];
              }
            })

            this.$store.dispatch('templatesModule/createTemplate', templateDuplication);
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
        },
        bulkDelete () {
            console.log(this.bulkDeleteItems);
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

            console.log(this.bulkDeleteItems);
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
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('propertyModule/getAllSubjectsV2', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty})
            }
        },
        perPage: {
            handler: function () {
                this.$store.dispatch('propertyModule/getAllSubjectsV2', {page: 1, perPage: this.perPage, search: this.searchProperty})
            }
        },
        searchProperty: {
            handler: function () {
                this.$store.dispatch('propertyModule/searchSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty})
            }
        }
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
</style>

