<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <div>
            <b-row>
              <b-col cols="4" class="d-flex">
                <h3>Emails</h3>
              </b-col>
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
<!--                <b-col cols="4" class="d-flex justify-content-end">-->
<!--                    <b-button variant="primary" class="add-seller" @click="addItem()">-->
<!--                        <b-icon icon="plus" aria-hidden="true"></b-icon> Add Email</b-button>-->
<!--                </b-col>-->
            </b-row>
            <hr>
            <b-row class="mb-3">
                <b-col cols="6" class="d-flex align-items-center">
                  <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon></b-button>
                    <b-button  v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters()" class="filter d-flex float-right r-0 align-items-right mr-2">
                    <b-icon icon="x" aria-hidden="true"></b-icon> Clear All </b-button>
                  <span v-if="totalFilters > 0" class="filter-count filter-top">{{ totalFilters }}</span>
                  <b-input-group class="mb-2 save-filter-dropdown">
                    <b-form-select class="select-template w-100" @change="applyFilter" v-model="selectedFilter" :options="savedFilters"></b-form-select>
                </b-input-group>
                </b-col>
                <b-col cols="6">
                    <b-input-group class="">
                        <b-input-group-append v-if="isEmailSearched">
                        <b-button @click="clearsearch" variant="outline-primary"><b-icon icon="x" aria-hidden="true"></b-icon> Clear Search</b-button>
                        </b-input-group-append>
                        <b-form-input v-model="searchEmail" @keyup.enter="search" placeholder="Search"></b-form-input>
                        <b-input-group-append>
                        <b-button @click="search" variant="primary">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row>
            <div class="filters-count" v-for="filter in filtersCountTable" :key="filter.name">
                {{filter.count}} items {{filter.filter}} 
            </div>
        </b-row>
        </div>
        <div class="d-flex align-items-center mb-4">
            <b-form-checkbox  @change="selectAll" v-model='allSelected'></b-form-checkbox>
            <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
                <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected</b-button>
        </div>
        <b-table
            id="email-table"
            small
            striped
            hover
            sort-icon-left
            no-local-sorting
            :busy="isBusy"
            :fields="fields"
            :items="filteredOrAllData"
            @sort-changed="sortingChanged"
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
            </template>
            <template #head(id)="scope">
                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(email_address)="scope">
              <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
            </template>
            <template #head(email_validity)="scope">
              <div style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(email_skip_source)="scope">
              <div style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(email_error)="scope">
              <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(email_error_type)="scope">
              <div style="width: 150px;">{{scope.label}}</div>
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
            <template v-slot:cell(email_address)="data">
                <div v-b-tooltip.hover :title="data.item.email_address">{{ data.item.email_address }}</div>
            </template>
            <template v-slot:cell(email_skip_source)="data">
                <div v-b-tooltip.hover :title="data.item.email_skip_source">{{ data.item.email_skip_source }}</div>
            </template>
            <template v-slot:cell(email_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.email_error_type">{{ data.item.email_error_type }}</div>
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
                <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>itemsCount?itemsCount:(currentPage*perPage)}} of {{itemsCount}} entries</p>

            </b-col>
            <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
            </b-col>
        </b-row>
        <edit-email-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-email-modal>
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
        <add-email-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-email-modal>
        <filter-emails ref="filterEmail" :search="searchEmail" @filter="filter" @finish-process="isFinishedFilterEmails = true" @filtersCount="filtersCount" :propsData="filteredOrAllData"  :currentPage="currentPage" :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false" ></filter-emails>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import EditEmailModal from "../components/email/EditEmailModal"
import AddEmailModal from "../components/email/AddEmailModal";
import FilterEmails from "../components/email/FilterEmails";

export default {
    name: "Email",
    components: {
        BIcon,
        EditEmailModal,
        DeleteModal,
        AddEmailModal,
        FilterEmails
    },
    data () {
        return {
            isBusy: false,
            selectedFilter: null,
            showModal: false,
            isFinishedFilterEmails: false,
            totalFilters:0,
            perPage: 20,
            itemsCount:0,
            currentPage: 1,
            filteredOrAllData:[],
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            showFilterPropertiesModal: false,
            searchEmail: '',
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
            filtersName:{
              Market:[],
              Group:[],
              Type:[],
              Source:[],
              Errors:[],
              Error:[],
              RunDate:[],
              SkipSource:[],
            },
            savedFilters: [{
              value: null,
              text: "Save Filters"
            }],
            sortBy: 'id',
            sortDesc: false,
            isEmailSearched: false,
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'emailModule/fields',
            items: 'emailModule/emails',
            filters: 'filterModule/filters',
            total: 'emailModule/total',
            selectedEmail: 'emailModule/email',
            filteredItems: 'emailModule/filteredEmail',
            filtersCountTable: 'emailModule/filtersCountTable',
            filteredEmailsCount:'emailModule/filteredEmailsCount',
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        try {
          this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("emailModule/getAllEmails", {page: 1, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.email_id) {
            this.$store.dispatch('emailModule/getEmail', this.$route.query.email_id).then(() => {
              this.editedItem = this.selectedEmail
              this.showModal = true
            });
        }
      this.filteredOrAllData = this.items;
      this.itemsCount = this.total;
      await this.$store.dispatch("filterModule/getAllFilters", 'emails');
      await this.$store.dispatch("emailModule/filtersOnTable", 'emails');
    },
    methods: {
        applyFilter() {
            let filter = this.filters.find(x => x.id == this.selectedFilter);
            if (filter.configuration) {
                let allFilters = JSON.parse(filter.configuration);
                let total = 0
                for (let item in allFilters) {
                    total += allFilters[item].length
                }
                this.totalFilters = total;
                this.filter(allFilters, total);
            }
        },
        async clearsearch() {
            this.searchEmail = '';
            await this.search();
            this.isEmailSearched = false;
        },
        async clearAllFilters() {
            this.selectedFilter = null;
            this.$refs.filterEmail.clearAllFilters();
            this.$refs.filterEmail.filtersAlreadyApplied = null;
            this.filtersName = {
            Market:[],
            Group:[],
            Type:[],
            Source:[],
            Errors:[],
            Error:[],
            RunDate:[],
            SkipSource:[],
        },
        await this.search();
        },
        async search() {
          this.$store.dispatch('uxModule/setLoading')
            try {
              if (!this.totalFilters) {
                await this.$store.dispatch('emailModule/searchEmails', { page: this.currentPage, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc })
                  this.itemsCount = this.total;
                this.filteredOrAllData = this.items;
                } else {
                await this.$store.dispatch("emailModule/filterEmail", { page: 1, perPage: this.perPage, search: this.searchEmail, filter: this.filtersName, sortBy:this.sortBy,sortDesc:this.sortDesc })
                this.filteredOrAllData = this.filteredItems
                this.itemsCount = this.filteredEmailsCount
                }

              if(this.searchEmail.length == 0) {
                this.isEmailSearched = false;
              } else {
                this.isEmailSearched = true;
              }
            this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
          }
        },
        async sortingChanged(ctx) {
            this.$store.dispatch('uxModule/setLoading')
            try {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            if (!this.totalFilters){
                await this.$store.dispatch('emailModule/getAllEmails', {page: 1, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
                this.filteredOrAllData = this.items
              }else{
                await this.$store.dispatch("emailModule/filterEmail", { page: 1, perPage: this.perPage, search: this.searchEmail, filter: this.filtersName, sortBy:this.sortBy,sortDesc:this.sortDesc })
                this.filteredOrAllData = this.filteredItems
              }
          this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
          }
        },
        async filter(data,filterValue){
          this.$store.dispatch('uxModule/setLoading')
          try {
         this.filtersName = data
         await this.$store.dispatch("emailModule/filterEmail", {page: 1, perPage: this.perPage, search: this.searchEmail, filter: data, sortBy:this.sortBy,sortDesc:this.sortDesc})
         if (!filterValue) {
            if(!this.items.length){
              await this.$store.dispatch("emailModule/getAllEmails", {page: 1, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
           }
            this.filteredOrAllData = this.items
            this.itemsCount = this.total
          } else {
            this.filteredOrAllData = this.filteredItems
            this.itemsCount = this.filteredEmailsCount
          }
          this.showFilterPropertiesModal =false
          this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            console.log(error);
            this.$store.dispatch('uxModule/hideLoader')
          }
        },
        filtersCount(total){
        this.totalFilters = total
        return  total
        },
        async editItem(item) {
            const subjects = [];
                item.sellers.forEach(function(seller) {
                    if(seller.subjects) {
                        seller.subjects.forEach(function(subject) {
                            if(subjects.length == 0) {
                                subjects.push(subject);
                            } else {
                                if(subjects.findIndex(x=>x.id == subject.id) != -1) {
                                    subjects.push(subject);
                                }
                            }
                        })
                    }
                });
                item.subjects = subjects;
                this.editedItem = {
                    ...item
                }
                this.showModal = true
        },
        save(item) {
            this.$store.dispatch('emailModule/editEmail', {...item})
        },
        add(item) {
          this.$store.dispatch('uxModule/setLoading')
          try {
            this.showAddModal = false
            this.$store.dispatch('emailModule/addEmail', {...item})
            this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
          }
        },
        deleteItem(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
          this.$store.dispatch('uxModule/setLoading')
          try {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('emailModule/deleteEmail', this.itemToDelete.id)
            }
          this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
          } 
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete () {
          this.$store.dispatch('uxModule/setLoading')
          try {
            this.$store.dispatch('emailModule/deleteMultipleEmails', this.bulkDeleteItems).then(() => {
              this.$store.dispatch('emailModule/getAllEmails', {page: this.currentPage, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
            })
          this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
          }
        },
        selectAll () {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }
        },
        async doCreatedOperation() {
        try {
          const filters = JSON.parse(localStorage.getItem('email-applied-filters'))
          let filterValue = 0;
          for (let i in filters){
            filterValue += filters[i].length
          }
          if(filterValue) {
            this.filter(filters, filterValue)
          } else {
            await this.$store.dispatch("emailModule/getAllEmails", {page: 1, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
          }
         this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.email_id) {
          this.$store.dispatch('emailModule/getEmail', this.$route.query.email_id).then(() => {
            this.editedItem = this.selectedEmail
            this.showModal = true
          });
        }
        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;
      }
    },
    watch: {
        filters: {
            handler: function() {
                this.savedFilters = [{
                value: null,
                text: "Save Filters"
            }];
                this.filters.forEach(e => {
                    const filter = {
                        value: '',
                        text: '',
                    }
                    filter.value = e.id;
                    filter.text = e.name;
                    this.savedFilters.push(filter);
                });
            }
        },
        currentPage: {
            handler: async function() {
            this.$store.dispatch('uxModule/setLoading')
            try {
              if (!this.totalFilters){
                await this.$store.dispatch('emailModule/getAllEmails', {page: this.currentPage, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
                this.filteredOrAllData = this.items
              }else{
                await this.$store.dispatch("emailModule/filterEmail", { page: this.currentPage, perPage: this.perPage, search: this.searchEmail, filter: this.filtersName, sortBy:this.sortBy,sortDesc:this.sortDesc })
                this.filteredOrAllData = this.filteredItems
              }
            this.$store.dispatch('uxModule/hideLoader')
          } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
          }
            }
        },
        perPage: {
            handler: async function () {
            this.$store.dispatch('uxModule/setLoading')
            try {
              if (!this.totalFilters) {
                await this.$store.dispatch('emailModule/getAllEmails', {page: 1, perPage: this.perPage, search: this.searchEmail, sortBy:this.sortBy,sortDesc:this.sortDesc})
                this.filteredOrAllData = this.items
              } else {
                await this.$store.dispatch("emailModule/filterEmail", { page: 1, perPage: this.perPage, search: this.searchEmail, filter: this.filtersName, sortBy:this.sortBy,sortDesc:this.sortDesc })
                this.filteredOrAllData = this.filteredItems
              }
              this.$store.dispatch('uxModule/hideLoader')
              } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
              }
            }
        },
        isFinishedFilterEmails() {
        if(this.isFinishedFilterEmails) {
          this.doCreatedOperation()
        }
      },
    }
}
</script>

<style scoped>
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
    .filter-top{
      margin-left: -5px;
      margin-top: -30px;
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
    }

    .filter-icon {
        font-size: 25px;
    }
    .b-table-sticky-header {
        max-height: calc(100vh - 360px) !important;
    }
    table th {
      vertical-align: inherit !important;
      height: 64px;
    }
</style>



