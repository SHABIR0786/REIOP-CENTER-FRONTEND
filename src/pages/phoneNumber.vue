<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Phone Numbers</h3>
    <div>
        <b-row>
            <!-- <b-col cols="4" class="d-flex">
                <h3>Phone Numbers</h3>
            </b-col> -->
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
        </b-row>
        <hr>
        <b-row class="mb-3">
            <b-col cols="6" class="d-flex align-items-center">
                <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-button>
                <b-button v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters()" class="filter d-flex float-right r-0 align-items-right mr-2">
                    <b-icon icon="x" aria-hidden="true"></b-icon> Clear All
                </b-button>
                <span v-if="totalFilters > 0" class="filter-count filter-top">{{ totalFilters }}</span>
                <b-input-group class="mb-2 save-filter-dropdown">
                    <b-form-select class="select-template w-100" @change="applyFilter" v-model="selectedFilter" :options="savedFilters"></b-form-select>
                </b-input-group>
            </b-col>
            <b-col cols="6">
                <b-input-group class="mt-3">
                    <b-input-group-append v-if="isPhoneSearched">
                        <b-button @click="clearsearch" variant="outline-primary">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Clear Search
                        </b-button>
                    </b-input-group-append>
                    <b-form-input v-model="searchPhone" @keyup.enter="search" placeholder="Search"></b-form-input>
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
        <b-form-checkbox @change="selectAll" v-model='allSelected'></b-form-checkbox>
        <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
            <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected
        </b-button>
    </div>
    <b-table id="phone-number-table" small striped hover sort-icon-left no-local-sorting :busy="isBusy" :fields="phoneNumberFields" :items="filteredOrAllData" @sort-changed="sortingChanged" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
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
        <template #head(phone_number)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(phone_type)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
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
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(phone_skip_source)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(phone_error)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(phone_error_type)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
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
            <b-form-group label="Show" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>itemsCount?itemsCount:(currentPage*perPage)}} of {{itemsCount}} entries</p>

        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="itemsCount" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
    <edit-phone-number-modal :showModal="showModal" :customFields="customSectionLabels" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-phone-number-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    <add-phone-number-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-phone-number-modal>
    <filter-phone-numbers ref="filterPhone" :search="searchPhone" @filter="filter" @finish-process="isFinishedFilterPhoneNumbers = true" @filtersCount="filtersCount" :propsData="filteredOrAllData" :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false"></filter-phone-numbers>
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
    data() {
        return {
            isBusy: false,
            showModal: false,
            phoneNumberFields: [],
            selectedFilter: null,
            isFinishedFilterPhoneNumbers: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {},
            itemsCount: 0,
            showDeleteModal: false,
            showFilterPropertiesModal: false,
            filteredOrAllData: [],
            totalFilters: 0,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchPhone: '',
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
            filtersName: {
                Market: [],
                Group: [],
                Type: [],
                Source: [],
                Errors: [],
                Error:[],
                RunDate: [],
                SkipSource: [],
            },
            savedFilters: [{
                value: null,
                text: "Save Filters"
            }],
            sortBy: 'id',
            sortDesc: true,
            isPhoneSearched: false
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'phoneNumberModule/fields',
            items: 'phoneNumberModule/phoneNumbers',
            filters: 'filterModule/filters',
            total: 'phoneNumberModule/total',
            filteredPhoneNumber: 'phoneNumberModule/filteredPhoneNumber',
            filteredPhoneNumbersCount: 'phoneNumberModule/filteredPhoneNumbersCount',
            filtersCountTable: 'phoneNumberModule/filtersCountTable',
            selectedPhoneNumber: 'phoneNumberModule/phoneNumber',
            customSectionLabels: 'labelModule/customSectionLabels'
        }),
        rows() {
            return this.total ? this.total : 1
        }
    },
    async created() {
        // this.$store.dispatch('phoneNumberModule/getTotal')
        try {
            this.$store.dispatch('uxModule/setLoading')
            // Fetching the visible custom fields
            await this.$store.dispatch('labelModule/sectionVisibleCustomFields',{section:'phone'});
            this.phoneNumberFields  = [...this.fields];
            const subjectAgeIndex = this.phoneNumberFields.findIndex(x=>x.key == "phone_skip_source");
            const instance = this;
            if(this.customSectionLabels) {
                this.customSectionLabels.forEach(function(item,index) {
                    instance.phoneNumberFields.splice((subjectAgeIndex + (index+1)),0,{key: item.field, stickyColumn: true, label: item.label, sortable: true});
                });
            }
            await this.$store.dispatch("phoneNumberModule/getAllPhoneNumbers", {
                page: 1,
                perPage: this.perPage,
                search: this.searchPhone,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
        if (this.$route.query.phone_id) {
            await this.$store.dispatch('phoneNumberModule/getPhoneNumber', this.$route.query.phone_id).then((response) => {
                    this.editedItem = this.selectedPhoneNumber;
                    this.editedItem.sellers = response.sellers;
                    const subjects = [];
                    response.sellers.forEach(function(seller) {
                        if(seller.subjects) {
                            seller.subjects.forEach(function(subject) {
                                if(subjects.length == 0) {
                                    subjects.push(subject);
                                } else {
                                    if(subjects.findIndex(x=>x.id == subject.id) == -1) {
                                        subjects.push(subject);
                                    }
                                }
                            })
                        }
                    });
                    this.editedItem.subjects = subjects;
                    this.showModal = true
            });
        }
        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;
        await this.$store.dispatch("filterModule/getAllFilters", 'phonenumbers');
        await this.$store.dispatch("phoneNumberModule/filtersOnTable", 'phonenumbers');
        this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            console.log(error);
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        async getPhoneNumbers() {
        this.$store.dispatch('uxModule/setLoading');
            try {
                if (!this.totalFilters) {
                    await this.$store.dispatch('phoneNumberModule/searchPhoneNumbers', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchPhone,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.itemsCount = this.total;
                    this.filteredOrAllData = this.items;
                } else {
                    await this.$store.dispatch("phoneNumberModule/filterPhoneNumber", {
                        page: 1,
                        perPage: this.perPage,
                        search: this.searchPhone,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.filteredOrAllData = this.filteredPhoneNumber
                    this.itemsCount = this.filteredPhoneNumbersCount

                }
                if (this.searchPhone.length == 0) {
                    this.isPhoneSearched = false;
                } else {
                    this.isPhoneSearched = true;
                }
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
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
            this.searchPhone = '';
            await this.search();
            this.isPhoneSearched = false;
        },
        async clearAllFilters() {
            this.selectedFilter = null;
            this.$refs.filterPhone.clearAllFilters();
            this.$refs.filterPhone.filtersAlreadyApplied = null;
            this.filtersName = {
                    Market: [],
                    Group: [],
                    Type: [],
                    Source: [],
                    Errors: [],
                    Error:[],
                    RunDate: [],
                    SkipSource: [],
                },
                await this.search();
        },
        async search() {
            if(this.currentPage == 1) {
                this.getPhoneNumbers();
            } else {
                this.currentPage  = 1;
            }     
        },
        async sortingChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            if(this.currentPage == 1) {
                this.getPhoneNumbers();
            } else {
                this.currentPage  = 1;
            } 
        },
        filter(data, filterValue) {
            this.filtersName = data;
            this.totalFilters = filterValue;
            if(this.currentPage == 1) {
                this.getPhoneNumbers();
            } else {
                this.currentPage  = 1;
            } 
            this.showFilterPropertiesModal = false;
        },
        async editItem(item) {
                const subjects = [];
                item.sellers.forEach(function(seller) {
                    if(seller.subjects) {
                        seller.subjects.forEach(function(subject) {
                            if(subjects.length == 0) {
                                subjects.push(subject);
                            } else {
                                if(subjects.findIndex(x=>x.id == subject.id) == -1) {
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
            this.$store.dispatch('uxModule/setLoading');
            try {
                // this.showModal = false
                this.$store.dispatch('phoneNumberModule/editPhoneNumber', {
                    ...item
                })
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        add(item) {
            this.showAddModal = false
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.$store.dispatch('phoneNumberModule/addPhoneNumber', {...item})
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        deleteItem(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        async modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('uxModule/setLoading');
                try {
                    let responseRequest = await this.$store.dispatch('phoneNumberModule/deletePhoneNumber', this.itemToDelete.id);
                    if(responseRequest.status==200) {
                        this.$bvToast.toast("Item Deleted Successfully.", {
                                title: "Message",
                                variant: 'success',
                                autoHideDelay: 5000,
                        });
                        const findIndex = this.filteredOrAllData.findIndex(({ id }) => id == this.itemToDelete.id)
                        findIndex !== -1 && this.filteredOrAllData.splice(findIndex, 1)
                    }else{
                        this.$bvToast.toast("Somethin went wrong!", {
                            title: "Error",
                            variant: 'danger',
                            autoHideDelay: 5000,
                        });
                    }
                    this.$store.dispatch('uxModule/hideLoader');
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader');
                }
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete() {
            this.$store.dispatch('uxModule/setLoading');
            try {
                const instance = this;
                this.bulkDeleteItems.forEach(function(item) {
                    let index = instance.filteredOrAllData.findIndex(x=>x.id == item);
                    instance.filteredOrAllData.splice(index,1);
                }); 
                this.$store.dispatch('phoneNumberModule/deleteMultiplePhoneNumber', this.bulkDeleteItems).then(() => {
                    this.$store.dispatch('phoneNumberModule/getAllPhoneNumbers', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchPhone,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    //   this.$store.dispatch('phoneNumberModule/getTotal')
                })
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        selectAll() {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }
        },
        filtersCount(total) {
            this.totalFilters = total
            return total
        },
        async doCreatedOperation() {
            try {
                await this.$store.dispatch("phoneNumberModule/getAllPhoneNumbers", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchPhone,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
            if (this.$route.query.phone_id) {
                this.$store.dispatch('phoneNumberModule/getPhoneNumber', this.$route.query.phone_id).then((response) => {
                    this.editedItem = this.selectedPhoneNumber;
                    this.editedItem.sellers = [response.seller];
                    this.editedItem.subjects = response.seller.subjects;
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
            handler: async function () {
                this.getPhoneNumbers();
            }
        },
        perPage: {
            handler: async function () {
            if(this.currentPage == 1) {
                this.getPhoneNumbers();
            } else {
                this.currentPage  = 1;
            }   
            }
        },
        isFinishedFilterPhoneNumbers() {
            if (this.isFinishedFilterPhoneNumbers) {
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

.filter-top {
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
    max-height: calc(100vh - 372px) !important;
}

table th {
    vertical-align: inherit !important;
    height: 64px;
}
</style>
