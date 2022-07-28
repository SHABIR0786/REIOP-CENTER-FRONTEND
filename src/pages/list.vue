<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Lists</h3>
        <div>
            <b-row>
                <b-col cols="8" class="d-flex">
                    <div class="info total">
                        <b-icon class="mr-2 cursor-pointer" icon="graph-up" variant="primary" @click="editItem(data.item)"></b-icon>
                        <div>{{totalAllTime}}</div>
                        <div>Total</div>
                    </div>
                    <div class="info latest">
                        <b-icon class="mr-2 cursor-pointer" icon="arrow-up" variant="primary" @click="editItem(data.item)"></b-icon>
                        <div>{{totalCurrentMonth}}</div>
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
        <div class="d-flex align-items-center mb-4">
            <b-form-checkbox  @change="selectAll" v-model='allSelected'></b-form-checkbox>
            <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
                <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected</b-button>
        </div>
        <b-table
            id="list-table"
            small
            striped
            sort-icon-left
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
            <template #head(delete)="scope">
                <div class="text-nowrap" style="width: 30px;">{{scope.label}}</div>
            </template>
            <template v-slot:cell(delete)="data">
                <b-form-checkbox :value='data.item.id' v-model='bulkDeleteItems'></b-form-checkbox>
            </template>
            <template #head(id)="scope">
                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(subjects_unique_count)="scope">
                <div style="width: 70px;">{{scope.label}}</div>
            </template>
            <template #head(total_running_lists)="scope">
                <div style="width: 70px;">{{scope.label}}</div>
            </template>
            <template #head(list_market)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(list_group)="scope">
                <div style="width: 120px;">{{scope.label}}</div>
            </template>
            <template #head(list_type)="scope">
                <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
            </template>
            <template #head(list_source)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
            </template>
            <template #head(list_pull_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(created_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(updated_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(user_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
            </template>

            <template #head(list_total_subject)="scope">
                <div class="text-nowrap" style="width: 120px;">{{scope.label}}</div>
            </template>

            <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
            </template>

            <template v-slot:cell(id)="data">
                <div :title="data.item.id">
                    <p class="user-email">{{data.item.id}}</p>
                </div>
            </template>
            <template v-slot:cell(list_total_subject)="data">
                <div class="text-nowrap" style="width: 100px;">{{data.item.subjects_unique_count}}</div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item) "></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
            </template>
            <template v-slot:cell(list_source)="data">
                <div v-b-tooltip.hover :title="data.item.list_source">{{ data.item.list_source }}</div>
            </template>
            <template v-slot:cell(list_market)="data">
                <div v-b-tooltip.hover :title="data.item.list_market">{{ data.item.list_market }}</div>
            </template>
            <template v-slot:cell(list_group)="data">
                <div v-b-tooltip.hover :title="data.item.list_group">{{ data.item.list_group }}</div>
            </template>
            <template v-slot:cell(list_type)="data">
                <div v-b-tooltip.hover :title="data.item.list_type">{{ data.item.list_type }}</div>
            </template>
            <template v-slot:cell(user_name)="data">
                <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
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
            <b-col v-if="total > 0" class="d-flex align-items-center justify-content-center">
              <p class="mb-0">Showing {{pageFrom}} to {{pageTo}} of {{total}} entries</p>
            </b-col>
            <b-col v-else class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 0 entries of 0</p>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" @input="handlePageClick" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
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
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
            totalAllTime: 0,
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'listModule/fields',
            items: 'listModule/lists',
            total: 'listModule/total',
            pageTo: 'listModule/pageTo',
            pageFrom: 'listModule/pageFrom',
            tabData: 'listModule/list',
            totalCurrentMonth: 'listModule/totalCurrentMonth'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {

        this.$store.dispatch('uxModule/setLoading')
        this.$store.dispatch('listModule/getTotal')
        try {
            await this.$store.dispatch("listModule/getAllLists", {page: this.currentPage, perPage: this.perPage})
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.id) {
          this.$store.dispatch('listModule/getSelectedList', this.$route.query.id).then(() => {
            this.editedItem = this.tabData
            this.showModal = true
          })
        }
      this.$store.dispatch("listModule/getTotalCurrentMonth")
      this.items.forEach(e => {
        this.totalAllTime +=e.list_total_individual_list
      })
    },
    methods: {
        async getList(){
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch('listModule/searchLists', {page: this.currentPage, perPage: this.perPage, search: this.searchList});
            this.$store.dispatch('uxModule/hideLoader');
        },
        async handlePageClick(){
            this.getList()
        },
        editItem(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        save(item) {
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
        async modalResponse(response) {
            this.showDeleteModal = false;
            this.$store.dispatch('uxModule/setLoading')
            if (response) {
               await this.$store.dispatch('listModule/deleteList', this.itemToDelete.id)
            }
            this.$store.dispatch('uxModule/hideLoader')
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete () {
            this.$store.dispatch('listModule/deleteMultipleLists', this.bulkDeleteItems).then(() => {
              this.$store.dispatch('listModule/getAllLists', {page: this.currentPage, perPage: this.perPage})
              this.$store.dispatch('listModule/getTotal')
            })
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
    watch: {
        currentPage: {
            handler: function() {
                this.getList();
            }
        },
        perPage: {
            handler: function () {
                this.getList();
            }
        },
        searchList: {
            handler: function () {
                this.currentPage = 1;
                this.getList();
                // this.$store.dispatch('listModule/searchLists', {page: this.currentPage, perPage: this.perPage, search: this.searchList});
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
        table th {
      vertical-align: inherit !important;
      height: 64px;
    }
</style>
