<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Phone Numbers</h3>
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
<!--                <b-col cols="4" class="d-flex justify-content-end">-->
<!--                    <b-button variant="primary" class="add-seller" @click="addItem()">-->
<!--                        <b-icon icon="plus" aria-hidden="true"></b-icon> Add Phone</b-button>-->
<!--                </b-col>-->
            </b-row>
            <hr>
            <b-row class="mb-3">
                <b-col cols="8" class="d-flex align-items-center">
                    <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon></b-button>
                    <span v-if="totalFilters > 0" class="filter-count">{{ totalFilters }}</span>
                </b-col>
                <b-col cols="4">
                    <b-form-input v-model="searchPhone" placeholder="Search"></b-form-input>
                </b-col>
            </b-row>
        </div>
        <div class="d-flex align-items-center mb-4">
            <b-form-checkbox  @change="selectAll" v-model='allSelected'></b-form-checkbox>
            <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
                <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected</b-button>
        </div>
        <b-table
            id="phone-number-table"
            small
            striped
            hover
            sort-icon-left
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
            </template>
            <template #head(id)="scope">
                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
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
            <template #head(phone_validity)="scope">
              <div class="text-nowrap" style="width: 200px;">{{scope.label}}</div>
            </template>
            <template #head(seller_id)="scope">
              <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(phone_error)="scope">
              <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
            </template>
            <template v-slot:cell(phone_number)="data">
                <div v-b-tooltip.hover :title="data.item.phone_number">{{ data.item.phone_number }}</div>
            </template>
            <template v-slot:cell(phone_skip_source)="data">
                <div v-b-tooltip.hover :title="data.item.phone_skip_source">{{ data.item.phone_skip_source }}</div>
            </template>
            <template v-slot:cell(phone_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.phone_error_type">{{ data.item.phone_error_type }}</div>
            </template>
            <template v-slot:cell(user_name)="data">
                <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
            </template>
                        <template v-slot:cell(phone_type)="data">
                <div v-b-tooltip.hover :title="data.item.phone_type">{{ data.item.phone_type }}</div>
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
        <edit-phone-number-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-phone-number-modal>
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
        <add-phone-number-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-phone-number-modal>
        <filter-phone-numbers @filter="filter" @finish-process="isFinishedFilterPhoneNumbers = true" @filtersCount="filtersCount" :propsData="filteredOrAllData"  :currentPage="currentPage" :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false" ></filter-phone-numbers>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import  DeleteModal from'@/components/deleteModal/DeleteModal'
import EditPhoneNumberModal from "../components/phoneNumber/EditPhoneNumberModal"
import AddPhoneNumberModal from "../components/phoneNumber/AddPhoneNumberModal";
import FilterPhoneNumbers from "../components/phoneNumber/FilterPhoneNumbers";

export default {
    name: "PhoneNumber",
    components: {
        BIcon,
        EditPhoneNumberModal,
        DeleteModal,
        AddPhoneNumberModal,
        FilterPhoneNumbers
    },
    data () {
        return {
            isBusy: false,
            showModal: false,
            isFinishedFilterPhoneNumbers: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            showFilterPropertiesModal: false,
            filteredOrAllData:[],
            totalFilters:0,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchPhone: '',
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'phoneNumberModule/fields',
            items: 'phoneNumberModule/phoneNumbers',
            total: 'phoneNumberModule/total',
            filteredItems: 'phoneNumberModule/filterPhoneNumber',
            filteredPhoneNumbersCount:'phoneNumberModule/filteredPhoneNumbersCount',
            selectedPhoneNumber: 'phoneNumberModule/phoneNumber'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        this.$store.dispatch('phoneNumberModule/getTotal')
        try {
          this.$store.dispatch('uxModule/setLoading')
          const filters = JSON.parse(localStorage.getItem('applied-filters'))
          let filterValue = 0;
          for (let i in filters){
            filterValue += filters[i].length
          }
          if(filterValue) {
            this.filter(filters, filterValue)
          } else {
            await this.$store.dispatch("phoneNumberModule/getAllPhoneNumbers", {page: 1, perPage: this.perPage})
          }
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.phone_id) {
            this.$store.dispatch('phoneNumberModule/getPhoneNumber', this.$route.query.phone_id).then(() => {
              this.editedItem = this.selectedPhoneNumber
              this.showModal = true
            });
        }
      this.filteredOrAllData = this.items;
      this.itemsCount = this.total;
    },
    methods: {
        async filter(data,filterValue, dataAfterFiltering){
         this.filtersName = data
         await this.$store.dispatch("phoneNumberModule/filterPhoneNumber", {page: 1, perPage: this.perPage, filter: data})
         localStorage.setItem('applied-filters', JSON.stringify(data))
         if(dataAfterFiltering) {
           localStorage.setItem('data-after-filtering', JSON.stringify(dataAfterFiltering))
           localStorage.setItem('filters-count', filterValue)
         }
         if (!filterValue){
            if(!this.items.length){
              await this.$store.dispatch("phoneNumberModule/getAllPhoneNumbers", {page: 1, perPage: this.perPage})
           }
            this.filteredOrAllData = this.items
            this.itemsCount = this.total
          }else{
            this.filteredOrAllData = this.filteredItems
            this.itemsCount = this.filteredPhoneNumbersCount
          }
            this.showFilterPropertiesModal =false
        },
        editItem(item) {
            this.$store.dispatch('sellerModule/getSeller', item.seller_id).then((response) => {
            item.sellers = [response.seller];
            item.subjects = response.seller.subjects;
            this.editedItem = { ...item }
            this.showModal = true
            });
        },
        save (item) {
            // this.showModal = false
            this.$store.dispatch('phoneNumberModule/editPhoneNumber', {...item})
        },
        add(item) {
            this.showAddModal = false
            this.$store.dispatch('phoneNumberModule/addPhoneNumber', {...item})
        },
        deleteItem(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('phoneNumberModule/deletePhoneNumber', this.itemToDelete.id)
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete () {
            this.$store.dispatch('phoneNumberModule/deleteMultiplePhoneNumber', this.bulkDeleteItems).then(() => {
              this.$store.dispatch('phoneNumberModule/getAllPhoneNumbers', {page: this.currentPage, perPage: this.perPage, search: this.searchPhone})
              this.$store.dispatch('phoneNumberModule/getTotal')
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
        this.$store.dispatch('phoneNumberModule/getTotal')
        try {
         // this.$store.dispatch('uxModule/setLoading')
          const filters = JSON.parse(localStorage.getItem('applied-filters'))
          let filterValue = 0;
          for (let i in filters){
            filterValue += filters[i].length
          }
          if(filterValue) {
            this.filter(filters, filterValue)
          } else {
            await this.$store.dispatch("phoneNumberModule/getAllPhoneNumbers", {page: 1, perPage: this.perPage})
          }
         this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.phone_id) {
          this.$store.dispatch('phoneNumberModule/getPhoneNumber', this.$route.query.phone_id).then(() => {
            this.editedItem = this.selectedPhoneNumber
            this.showModal = true
          });
        }
        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;
      }
    },
    watch: {
        currentPage: {
            handler:async function() {
                if (!this.total){
                await this.$store.dispatch('phoneNumberModule/getAllPhoneNumbers', { page: this.currentPage, perPage: this.perPage, search: this.searchPhone })
                this.filteredOrAllData = this.items
              }else{
                await this.$store.dispatch("phoneNumberModule/filterPhoneNumber", { page: this.currentPage, perPage: this.perPage, filter: this.filtersName })
                this.filteredOrAllData = this.filteredItems
              }
            }
            },
            perPage: {
                handler: async function () {
                if (!this.total){
                await this.$store.dispatch('phoneNumberModule/getAllPhoneNumbers', { page: 1, perPage: this.perPage, search: this.searchPhone })
                this.filteredOrAllData = this.items
              }else{
                await this.$store.dispatch("phoneNumberModule/filterPhoneNumber", { page: 1, perPage: this.perPage, filter: this.filtersName })
                this.filteredOrAllData = this.filteredItems
              }
                }
            },
            searchPhone: {
                handler: async function () {
                if (!this.total) {
                    await this.$store.dispatch('phoneNumberModule/searchPhoneNumbers', { page: this.currentPage, perPage: this.perPage, search: this.searchPhone })
                    this.itemsCount = this.items.length
                } else {
                this.currentPage = 1;
                let searchInFiltered = [...this.filteredItems]
                 searchInFiltered = searchInFiltered.filter(el => {
                 return el.id.toString().includes(this.searchPhone)
                 });
                if(this.searchPhone) {
                  this.itemsCount = searchInFiltered.length
                } else {
                  this.itemsCount = this.total;
                }
                this.filteredOrAllData =  searchInFiltered
                // await this.$store.dispatch('subjectModule/searchSubjects', { page: this.currentPage, perPage: this.perPage, search: this.searchSubject })
              }
                }
            },
        isFinishedFilterPhoneNumbers() {
            if(this.isFinishedFilterPhoneNumbers) {
                this.doCreatedOperation()
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
</style>

