<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Subjects</h3>
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
                        <b-icon icon="plus" aria-hidden="true"></b-icon> Add Subject</b-button>
                </b-col>
            </b-row>
            <hr>
            <b-row class="mb-3">
                <b-col cols="8" class="d-flex align-items-center">
                  <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon></b-button>
                  <span v-if="totalFilters > 0" class="filter-count">{{ totalFilters }}</span>
                </b-col>
                <b-col cols="4">
                    <b-form-input v-model="searchSubject" placeholder="Search"></b-form-input>
                </b-col>
            </b-row>
        </div>
        <div class="d-flex align-items-center mb-4">
            <b-form-checkbox  @change="selectAll" v-model='allSelected'></b-form-checkbox>
            <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
                <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected</b-button>
        </div>
        <b-table
            id="subject-table"
            small
            sort-icon-left
            striped
            hover
            :busy="isBusy"
            :fields="fields"
            :items="filteredOrAllData"
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
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(total_sellers)="scope">
                <div style="width: 45px;">{{scope.label}}</div>
            </template>
            <template #head(list_stack)="scope">
                <div style="width: 45px;">{{scope.label}}</div>
            </template>
            <template #head(subject_address)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
            </template>
            <template #head(subject_address_line2)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
            </template>
            <template #head(subject_city)="scope">
                <div  style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(subject_state)="scope">
                <div  style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(subject_zip)="scope">
                <div style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(subject_county)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(subject_market)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(subject_type)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(subject_age)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
            </template>
            <template #head(subject_last_marked_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(subject_last_exported_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(subject_skip_trace_date)="scope">
                <div style="width: 80px;">{{scope.label}}</div>
            </template>
            <template #head(subject_pull_date)="scope">
                <div style="width: 80px;">{{scope.label}}</div>
            </template>
            <template #head(subject_error)="scope">
                <div style="width: 40px;">{{scope.label}}</div>
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
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
            </template>
            <template v-slot:cell(subject_address)="data">
                <div v-b-tooltip.hover :title="data.item.subject_address">{{ data.item.subject_address }}</div>
            </template>
            <template v-slot:cell(subject_city)="data">
                <div v-b-tooltip.hover :title="data.item.subject_city">{{ data.item.subject_city }}</div>
            </template>
            <template v-slot:cell(subject_zip)="data">
                <div v-b-tooltip.hover :title="data.item.subject_zip">{{ data.item.subject_zip }}</div>
            </template>
            <template v-slot:cell(subject_county)="data">
                <div v-b-tooltip.hover :title="data.item.subject_county">{{ data.item.subject_county }}</div>
            </template>
            <template v-slot:cell(subject_state)="data">
                <div v-b-tooltip.hover :title="data.item.subject_state">{{ data.item.subject_state }}</div>
            </template>
              <template v-slot:cell(subject_market)="data">
                <div v-b-tooltip.hover :title="data.item.subject_market">{{ data.item.subject_market }}</div>
            </template>
            <template v-slot:cell(subject_address_line2)="data">
                <div v-b-tooltip.hover :title="data.item.subject_address_line2">{{ data.item.subject_address_line2 }}</div>
            </template>
            <template v-slot:cell(subject_type)="data">
                <div v-b-tooltip.hover :title="data.item.subject_type">{{ data.item.subject_type }}</div>
            </template>
            <template v-slot:cell(subject_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.subject_error_type">{{ data.item.subject_error_type }}</div>
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
                <p class="mb-0">Showing 1 to {{perPage}} of {{itemsCount}} entries</p>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
            </b-col>
        </b-row>
        <edit-subject-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-subject-modal>
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
        <add-subject-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-subject-modal>
        <filter-subjects @filter="filter" @finish-process="isFinishedFilterSubjects = true" @filtersCount="filtersCount" :propsData="filteredOrAllData"  :currentPage="currentPage" :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false" ></filter-subjects>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import EditSubjectModal from "../components/subject/EditSubjectModal";
import AddSubjectModal from "../components/subject/AddSubjectModal";
import FilterSubjects from "@/components/subject/FilterSubjects";

export default {
    name: "Subject",
    components: {
        BIcon,
        EditSubjectModal,
        DeleteModal,
        AddSubjectModal,
        FilterSubjects
    },
    data () {
        return {
            isBusy: false,
            showModal: false,
            perPage: 20,
            isFinishedFilterSubjects: false,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchSubject: '',
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
            showFilterPropertiesModal: false,
            filteredOrAllData:[],
            itemsCount:0,
            totalFilters:0,
            filtersName:{
              Market:[],
              Group:[],
              Type:[],
              Source:[],
              Errors:[],
              RunDate:[],
            },
            searchInFiltered: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'subjectModule/fields',
            items: 'subjectModule/subjects',
            filteredItems: 'subjectModule/filteredSubject',
            filteredSubjectsCount:'subjectModule/filteredSubjectsCount',
            total: 'subjectModule/total',
            selectedSubject: 'subjectModule/subject'
        }),
        rows() { return this.itemsCount ? this.itemsCount : 1},

    },
    async created () {
        this.$store.dispatch('subjectModule/getTotal')
        try {
          this.$store.dispatch('uxModule/setLoading')
          const filters = JSON.parse(localStorage.getItem('subject-applied-filters'))
          let filterValue = 0;
          for (let i in filters){
            filterValue += filters[i].length
          }
          if(filterValue) {
            this.filter(filters, filterValue)
          } else {
            await this.$store.dispatch("subjectModule/getAllSubjects", {page: 1, perPage: this.perPage})
          }
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.subject_id) {
            this.$store.dispatch('subjectModule/getSubject', this.$route.query.subject_id).then(() => {
              this.editedItem = this.selectedSubject
              this.showModal = true
            });
        }
      this.filteredOrAllData = this.items;
      this.itemsCount = this.total;
    },
    methods: {

     async filter(data,filterValue, dataAfterFiltering){
         this.filtersName = data
         await this.$store.dispatch("subjectModule/filterSubject", {page: 1, perPage: this.perPage, filter: data})
         localStorage.setItem('subject-applied-filters', JSON.stringify(data))
         if(dataAfterFiltering) {
           localStorage.setItem('subject-data-after-filtering', JSON.stringify(dataAfterFiltering))
           localStorage.setItem('subject-filters-count', filterValue)
         }
         if (!filterValue){
            if(!this.items.length){
              await this.$store.dispatch("subjectModule/getAllSubjects", {page: 1, perPage: this.perPage})
           }
            this.filteredOrAllData = this.items
            this.itemsCount = this.total
          }else{
            this.filteredOrAllData = this.filteredItems
            this.itemsCount = this.filteredSubjectsCount
          }
            this.showFilterPropertiesModal =false
        },
        editSubject(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        save(item) {
            // this.showModal = false
            delete item.lists
            delete item.list_stack
            this.$store.dispatch('subjectModule/editSubject', {...item})
        },

        add(item) {
            this.showAddModal = false
            this.$store.dispatch('subjectModule/addSubject', {...item})
        },
        deleteSubject(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('subjectModule/deleteSubject', this.itemToDelete.id)
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete () {
            this.$store.dispatch('subjectModule/deleteMultipleSubjects', this.bulkDeleteItems).then(() => {
              this.$store.dispatch('subjectModule/getAllSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchSubject})
              this.$store.dispatch('subjectModule/getTotal')
            })
        },
        selectAll () {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }
        },
      filtersCount(total){
        this.totalFilters = total
        return  total
      },
      async doCreatedOperation() {
        this.$store.dispatch('subjectModule/getTotal')
        try {
         // this.$store.dispatch('uxModule/setLoading')
          const filters = JSON.parse(localStorage.getItem('subject-applied-filters'))
          let filterValue = 0;
          for (let i in filters){
            filterValue += filters[i].length
          }
          if(filterValue) {
            this.filter(filters, filterValue)
          } else {
            await this.$store.dispatch("subjectModule/getAllSubjects", {page: 1, perPage: this.perPage})
          }
         this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.subject_id) {
          this.$store.dispatch('subjectModule/getSubject', this.$route.query.subject_id).then(() => {
            this.editedItem = this.selectedSubject
            this.showModal = true
          });
        }
        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;
      }
    },
    watch: {
        currentPage: {
            handler: async function() {
              if (!this.total){
                await this.$store.dispatch('subjectModule/getAllSubjects', { page: this.currentPage, perPage: this.perPage })
                this.filteredOrAllData = this.items
              }else{
                await this.$store.dispatch("subjectModule/filterSubject", { page: this.currentPage, perPage: this.perPage, filter: this.filtersName })
                this.filteredOrAllData = this.filteredItems
              }
            }
        },
        perPage: {
            handler: async function () {
              if (!this.total){
                await this.$store.dispatch('subjectModule/getAllSubjects', { page: 1, perPage: this.perPage, search: this.searchSubject })
                this.filteredOrAllData = this.items
              }else{
                await this.$store.dispatch("subjectModule/filterSubject", { page: 1, perPage: this.perPage, filter: this.filtersName })
                this.filteredOrAllData = this.filteredItems
              }
            }
        },
        searchSubject: {
            handler: async function () {
              if (!this.total || (this.filteredItems.length == 0)) {
                await this.$store.dispatch('subjectModule/searchSubjects', { page: this.currentPage, perPage: this.perPage, search: this.searchSubject })
                if(this.searchSubject == '') {
                  this.itemsCount = this.total;
                } else { 
                this.itemsCount = this.items.length
                }
                this.filteredOrAllData = this.items;
              } else {
                this.currentPage = 1;
                let searchInFiltered = [...this.filteredItems]
                 searchInFiltered = searchInFiltered.filter(el => {
                 return  el.subject_address.toLocaleLowerCase().includes(this.searchSubject.toLocaleLowerCase())||
                   el.subject_city.toLocaleLowerCase().includes(this.searchSubject.toLocaleLowerCase())  ||
                   el.subject_state.toLocaleLowerCase().includes(this.searchSubject.toLocaleLowerCase()) ||
                   el.subject_zip.toLocaleLowerCase().includes(this.searchSubject.toLocaleLowerCase())   ||
                   el.id.toString().includes(this.searchSubject)
                 });
                if(this.searchSubject) {
                  this.itemsCount = searchInFiltered.length
                } else {
                  this.itemsCount = this.total;
                }
                this.filteredOrAllData =  searchInFiltered
                // await this.$store.dispatch('subjectModule/searchSubjects', { page: this.currentPage, perPage: this.perPage, search: this.searchSubject })
              }
            }
        },
      isFinishedFilterSubjects() {
        if(this.isFinishedFilterSubjects) {
          this.doCreatedOperation()
        }
      },
    }
}
</script>

<style>
    .filter-count{
      border-radius: 50%;
      background-color: #808080a6;
      color: #ffffff;
      font-size: 13px;
      text-align: center;
      width: 20px;
      height: 20px;
    }
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
