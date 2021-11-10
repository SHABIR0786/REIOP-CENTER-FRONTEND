<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Lists</h3>
        <div>
            <b-row>
                <b-col cols="8" class="d-flex">
                    <div class="info total">
                        <b-icon class="mr-2 cursor-pointer" icon="graph-up" variant="primary" @click="editItem(data.item)"></b-icon>
                        <div>{{total}}</div>
                        <div>Total</div>
                    </div>
                    <div class="info latest">
                        <b-icon class="mr-2 cursor-pointer" icon="arrow-up" variant="primary" @click="editItem(data.item)"></b-icon>
                        <div>{{total}}</div>
                        <div>Added This Month</div>
                    </div>
                </b-col>
                <b-col cols="4" class="d-flex justify-content-end">
                    <b-button variant="primary" class="add-seller" @click="addItem()">
                        <b-icon icon="plus" aria-hidden="true"></b-icon> Add List</b-button>
                </b-col>
            </b-row>
            <hr>
            <b-row class="mb-3">
                <b-col cols="8" class="d-flex align-items-center">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-col>
                <b-col cols="4">
                    <b-form-input v-model="searchList" placeholder="Search"></b-form-input>
                </b-col>
            </b-row>
        </div>
        <b-table
            id="list-table"
            small
            striped
            hover
            responsive
            :busy="isBusy"
            :fields="fields"
            :items="items"
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

            <template #head(list_type)="scope">
                <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
            </template>

            <template #head(list_group)="scope">
                <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
            </template>

            <template #head(list_marjet)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>

            <template #head(list_total_subject)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>

            <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
            </template>

            <template v-slot:cell(id)="data">
                <div :title="data.item.id">
                    <p class="user-email">{{data.item.id}}</p>
                </div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
            </template>
            <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>
            <template v-slot:cell(list_type)="data">
                <div :title="data.item.list_type">
                    <p class="user-email">{{data.item.list_type}}</p>
                </div>
            </template>
            <template v-slot:cell(list_group)="data">
                <div :title="data.item.list_group">
                    <p class="user-email">{{data.item.list_group}}</p>
                </div>
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
                    <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{total}} entries</p>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
            </b-col>
        </b-row>
        <add-list-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-list-modal>
        <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
        <edit-list-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-list-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import AddListModal from "../components/list/AddListModal"
import EditListModal from "../components/list/EditListModal";

export default {
    name: "List",
    components: {
        BIcon,
        AddListModal,
        DeleteModal,
        EditListModal
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
            noCollapse: false,
            searchList: '',
            showAddModal: false
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'listModule/fields',
            items: 'listModule/lists',
            total: 'listModule/total'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        this.$store.dispatch('listModule/getTotal')
        try {
            await this.$store.dispatch("listModule/getAllLists", {page: 1, perPage: this.perPage})
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
            if (item.subjects) {
                delete item.subjects
            }
            this.$store.dispatch('listModule/editList', {...item})
        },
        add(item) {
            this.showAddModal = false
            this.$store.dispatch('listModule/addList', {...item})
        },
        deleteItem(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('listModule/deleteList', this.itemToDelete.id)
            }
        },
        addItem() {
            this.showAddModal = true;
        }
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('listModule/getAllLists', {page: this.currentPage, perPage: this.perPage})
            }
        },
        perPage: {
            handler: function () {
                this.$store.dispatch('listModule/getAllLists', {page: 1, perPage: this.perPage})
            }
        },
        searchList: {
            handler: function () {
                this.$store.dispatch('listModule/searchLists', {page: this.currentPage, perPage: this.perPage, search: this.searchList});
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
        justify-content: space-between;
    }

    .total {
        background-color: #F9CB9C;
    }

    .latest {
        background-color: #B6D7A8;
        margin-left: 20px;
    }
    .add-seller {
        width: 200px;
        background-color: #45818E !important;
        color: white;
    }

    .filter-icon {
        font-size: 25px;
    }
    .b-table-sticky-header {
        max-height: calc(100vh - 372px) !important;
    }
</style>
