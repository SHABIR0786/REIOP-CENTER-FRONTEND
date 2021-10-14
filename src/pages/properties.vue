<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Properties</h3>
        <div>
            <b-row>
                <b-col cols="8" class="d-flex">
                    <div class="info latest d-flex justify-content-center ml-0" @click="exportProperties()">
                        <div>Export</div>
                    </div>
                </b-col>
                <b-col cols="4" class="d-flex justify-content-end">
                    <b-button variant="primary" class="add-seller" @click="addItem()">
                        <b-icon icon="plus" aria-hidden="true"></b-icon> Add Properties</b-button>
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
            <template #head(id)="scope">
                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
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
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import EditSubjectModal from "../components/subject/EditSubjectModal";
import AddSubjectModal from "../components/subject/AddSubjectModal";

export default {
    name: "Properties",
    components: {
        BIcon,
        EditSubjectModal,
        DeleteModal,
        AddSubjectModal
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
            showAddModal: false
        }
    },
    computed: {
        ...mapGetters({
          isCollapsed: 'uxModule/isCollapsed',
          fields: 'propertyModule/fields',
          items: 'propertyModule/subjects',
          total: 'propertyModule/total',
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("propertyModule/getAllSubjects", {page: 1, perPage: this.perPage})
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
        exportProperties () {
            console.log('export');
        }
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('propertyModule/getAllSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchProperty})
            }
        },
        perPage: {
            handler: function () {
                this.$store.dispatch('propertyModule/getAllSubjects', {page: 1, perPage: this.perPage, search: this.searchProperty})
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
</style>

