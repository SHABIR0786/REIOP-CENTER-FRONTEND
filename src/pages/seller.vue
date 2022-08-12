<template>
<div :class="`list-page seller main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Sellers</h3>
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
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Add Seller
                </b-button>
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
                    <b-input-group-append v-if="isClearSearch">
                        <b-button @click="clearsearch" variant="outline-primary">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Clear Search
                        </b-button>
                    </b-input-group-append>
                    <b-form-input v-model="searchSeller" @keyup.enter="search" placeholder="Search"></b-form-input>
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
    <b-table id="seller-table" small striped sort-icon-left no-local-sorting hover :busy="isBusy" :fields="fields" :items="filteredOrAllData" @sort-changed="sortingChanged" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
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
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(seller_total_subjects)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(seller_total_phones)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(seller_total_emails)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(attempted_skip_traces)="scope">
            <div style="width: 70px;">{{scope.label}}</div>
        </template>
        <template #head(attempted_skip_trace_sources)="scope">
            <div style="width: 70px;">{{scope.label}}</div>
        </template>
        <template #head(seller_first_name)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(seller_middle_name)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(seller_last_name)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(seller_mailing_address)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
        </template>
        <template #head(seller_mailing_address_line2)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
        </template>
        <template #head(seller_mailing_city)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(seller_company_owned)="scope">
            <div style="width: 70px;">{{scope.label}}</div>
        </template>
        <template #head(seller_error)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(seller_error_type)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
        </template>
        <template #head(seller_mailing_state)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(seller_mailing_zip)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
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
        <template v-slot:cell(seller_first_name)="data">
            <div v-b-tooltip.hover :title="data.item.seller_first_name">{{ data.item.seller_first_name }}</div>
        </template>
        <template v-slot:cell(seller_last_name)="data">
            <div v-b-tooltip.hover :title="data.item.seller_last_name">{{ data.item.seller_last_name }}</div>
        </template>
        <template v-slot:cell(seller_middle_name)="data">
            <div v-b-tooltip.hover :title="data.item.seller_middle_name">{{ data.item.seller_middle_name }}</div>
        </template>
        <template v-slot:cell(seller_mailing_address)="data">
            <div v-b-tooltip.hover :title="data.item.seller_mailing_address">{{ data.item.seller_mailing_address }}</div>
        </template>
        <template v-slot:cell(seller_mailing_address_line2)="data">
            <div v-b-tooltip.hover :title="data.item.seller_mailing_address_line2">{{ data.item.seller_mailing_address_line2 }}</div>
        </template>
        <template v-slot:cell(seller_error_type)="data">
            <div v-b-tooltip.hover :title="data.item.seller_error_type">{{ data.item.seller_error_type }}</div>
        </template>
        <template v-slot:cell(user_name)="data">
            <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
        </template>
        <template v-slot:cell(seller_mailing_zip)="data">
            <div v-b-tooltip.hover :title="data.item.seller_mailing_zip">{{ data.item.seller_mailing_zip }}</div>
        </template>
        <template v-slot:cell(seller_mailing_city)="data">
            <div v-b-tooltip.hover :title="data.item.seller_mailing_city">{{ data.item.seller_mailing_city }}</div>
        </template>
        <template v-slot:cell(seller_mailing_state)="data">
            <div v-b-tooltip.hover :title="data.item.seller_mailing_state">{{ data.item.seller_mailing_state }}</div>
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
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="itemsCount" :per-page="perPage" aria-controls="seller-table"></b-pagination>
        </b-col>
    </b-row>
    <edit-seller-modal :showModal="showModal" :propsSeller="editedItem" @cancel="showModal=false" @save="save"></edit-seller-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    <add-seller-modal :showModal="showAddModal" @cancel="showAddModal=false" @save="add"></add-seller-modal>
    <filter-sellers ref="filterSellers" :search="searchSeller" @filter="filter" @finish-process="isFinishedFilterSellers = true" @filtersCount="filtersCount" :propsData="filteredOrAllData" :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false"></filter-sellers>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    BIcon
} from "bootstrap-vue"
// import SellerModal from '@/components/seller/SellerModal'
import DeleteModal from '@/components/deleteModal/DeleteModal'
import EditSellerModal from "../components/seller/EditSellerModal"
import AddSellerModal from "../components/seller/AddSellerModal";
import FilterSellers from "../components/seller/FilterSellers";

export default {
    name: "Seller",
    components: {
        BIcon,
        EditSellerModal,
        DeleteModal,
        AddSellerModal,
        FilterSellers
    },
    data() {
        return {
            isBusy: false,
            selectedFilter: null,
            totalFilters: 0,
            isFinishedFilterSellers: false,
            showFilterPropertiesModal: false,
            showModal: false,
            perPage: 20,
            currentPage: 1,
            itemsCount: 0,
            editedItem: {},
            filteredOrAllData: [],
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchSeller: '',
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
                CompanyOwned: [],
                TotalSubjects:[],
                TotalPhones:[],
                TotalEmails:[],
                AttemptedSkipTraceSources:[],
                HasSkipTraceData:[]
            },
            savedFilters: [{
                value: null,
                text: "Save Filters"
            }],
            sortBy: 'attempted_skip_trace_sources',
            sortDesc: true,
            isClearSearch: false
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'sellerModule/fields',
            items: 'sellerModule/sellers',
            total: 'sellerModule/total',
            filters: 'filterModule/filters',
            selectedSeller: 'sellerModule/seller',
            filteredItems: 'sellerModule/filteredSeller',
            filtersCountTable: 'sellerModule/filtersCountTable',
            filteredSellersCount: 'sellerModule/filteredSellersCount',
        }),
        rows() {
            return this.total ? this.total : 1
        }
    },
    async created() {
        try {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("sellerModule/getAllSellers", {
                page: 1,
                perPage: this.perPage,
                search: this.searchSeller,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            });
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.seller_id) {
            this.$store.dispatch('sellerModule/getSeller', this.$route.query.seller_id).then(() => {
                this.editedItem = this.selectedSeller
                this.showModal = true
            });
        }

        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;
        await this.$store.dispatch("filterModule/getAllFilters", 'sellers');
        await this.$store.dispatch("sellerModule/filtersOnTable", 'sellers');

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
            this.searchSeller = '';
            await this.search();
            this.isClearSearch = false;
        },
        async clearAllFilters() {
            this.selectedFilter = null;
            this.$refs.filterSellers.clearAllFilters();
            this.$refs.filterSellers.filtersAlreadyApplied = null;
            this.filtersName = {
                    Market: [],
                    Group: [],
                    Type: [],
                    Source: [],
                    Errors: [],
                    Error: [],
                    RunDate: [],
                    CompanyOwned: [],
                    TotalSubjects:[],
                    TotalPhones:[],
                    TotalEmails:[],
                    AttemptedSkipTraceSources:[],
                    HasSkipTraceData:[]
                },
                await this.search();
        },
        async search() {
            this.$store.dispatch('uxModule/setLoading');
            try {
                if (!this.totalFilters) {
                    await this.$store.dispatch('sellerModule/searchSellers', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchSeller,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.itemsCount = this.total;
                    this.filteredOrAllData = this.items;
                } else {
                    await this.$store.dispatch("sellerModule/filterSeller", {
                        page: 1,
                        perPage: this.perPage,
                        search: this.searchSeller,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.filteredOrAllData = this.filteredItems
                    this.itemsCount = this.filteredSellersCount;
                }
                if (this.searchSeller.length == 0) {
                    this.isClearSearch = false;
                } else {
                    this.isClearSearch = true;
                }
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        async sortingChanged(ctx) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.sortBy = ctx.sortBy;
                this.sortDesc = ctx.sortDesc;
                if (!this.totalFilters) {
                    await this.$store.dispatch("sellerModule/getAllSellers", {
                        page: 1,
                        perPage: this.perPage,
                        search: this.searchSeller,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.filteredOrAllData = this.items;
                } else {
                    await this.$store.dispatch("sellerModule/filterSeller", {
                        page: 1,
                        perPage: this.perPage,
                        search: this.searchSeller,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.filteredOrAllData = this.filteredItems
                }
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        filtersCount(total) {
            this.totalFilters = total
            return total
        },
        async doCreatedOperation() {
            try {
                await this.$store.dispatch("sellerModule/getAllSellers", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchSeller,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
            if (this.$route.query.seller_id) {
                this.$store.dispatch('sellerModule/getSeller', this.$route.query.seller_id).then(() => {
                    this.editedItem = this.selectedSeller
                    this.showModal = true
                });
            }
            this.filteredOrAllData = this.items;
            this.itemsCount = this.total;
        },
        async filter(data, filterValue) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.filtersName = data
                await this.$store.dispatch("sellerModule/filterSeller", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchSeller,
                    filter: data,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                if (!filterValue) {
                    if (!this.items.length) {
                        await this.$store.dispatch("sellerModule/getAllSellers", {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSeller,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                    }
                    this.filteredOrAllData = this.items
                    this.itemsCount = this.total
                } else {
                    this.filteredOrAllData = this.filteredItems
                    this.itemsCount = this.filteredSellersCount
                }
                this.showFilterPropertiesModal = false;
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        editItem(item) {
            this.showModal = true
            const data = {
                ...item
            }
            data.lists.forEach(e => {
                e.created_at = e.created_at.split('T')[0];
                e.updated_at = e.updated_at.split('T')[0];
            })
            this.editedItem = {
                ...data
            }
        },
        save(item) {
            // this.showModal = false
            this.$store.dispatch('sellerModule/editSeller', {
                ...item
            })
        },
        add(item) {
            this.showAddModal = false
            this.$store.dispatch('sellerModule/addSeller', {
                ...item
            })
        },
        deleteItem(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                try {
                    this.$store.dispatch('uxModule/setLoading');
                    this.$store.dispatch('sellerModule/deleteSeller', this.itemToDelete.id)
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
            try {
                this.$store.dispatch('uxModule/setLoading');
                this.$store.dispatch('sellerModule/deleteMultipleSellers', this.bulkDeleteItems).then(() => {
                    this.$store.dispatch('sellerModule/getAllSellers', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchSeller,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    });
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
                this.$store.dispatch('uxModule/setLoading');
                try {
                    if (!this.totalFilters) {
                        await this.$store.dispatch('sellerModule/getAllSellers', {
                            page: this.currentPage,
                            perPage: this.perPage,
                            search: this.searchSeller,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.items
                    } else {
                        await this.$store.dispatch("sellerModule/filterSeller", {
                            page: this.currentPage,
                            perPage: this.perPage,
                            search: this.searchSeller,
                            filter: this.filtersName,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.filteredItems
                    }
                    this.$store.dispatch('uxModule/hideLoader');
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader');
                }
            }
        },
        perPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading');
                try {
                    if (!this.totalFilters) {
                        this.$store.dispatch('sellerModule/getAllSellers', {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSeller,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.items
                    } else {
                        await this.$store.dispatch("sellerModule/filterSeller", {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSeller,
                            filter: this.filtersName,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.filteredItems
                    }
                    this.$store.dispatch('uxModule/hideLoader');
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader');
                }
            }
        },
        isFinishedFilterSellers() {
            if (this.isFinishedFilterSellers) {
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
