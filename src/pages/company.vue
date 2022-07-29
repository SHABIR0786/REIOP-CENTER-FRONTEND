<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Companies</h3>
    <div>
        <b-row>
            <b-col cols="12" class="d-flex justify-content-end">
                <b-button variant="primary" class="add-seller" @click="addItem()">
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Add Company
                </b-button>
            </b-col>
        </b-row>
        <hr>
        <b-row class="mb-3">
            <b-col cols="6" offset-md="6">
                <b-input-group class="mt-3">
                    <b-input-group-append v-if="isSearched">
                        <b-button @click="clearsearch" variant="outline-primary">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Clear Search
                        </b-button>
                    </b-input-group-append>
                    <b-form-input v-model="searchCompany" @keyup.enter="search" placeholder="Search"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="search" variant="primary">Search</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
    <b-table id="user-table" lg sort-icon-left no-local-sorting striped hover :busy="isBusy" :fields="fields" @sort-changed="sortingChanged" :items="filteredOrAllData" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
        <template v-slot:cell(actions)="data">
            <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
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
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
    <edit-company-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-company-modal>
    <add-company-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @add="add"></add-company-modal>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    BIcon
} from "bootstrap-vue"
import EditCompanyModal from "../components/company/EditCompanyModal";
import AddCompanyModal from "../components/company/AddCompanyModal";


export default {
    name: "Companies",
    components: {
        BIcon,
        EditCompanyModal,
        AddCompanyModal
    },
    data() {
        return {
            isBusy: false,
            showModal: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchCompany: '',
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
            showFilterPropertiesModal: false,
            filteredOrAllData: [],
            itemsCount: 0,
            sortBy: 'id',
            sortDesc: false,
            isSearched: false,
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'companyModule/fields',
            items: 'companyModule/companies',
            total: 'companyModule/total',
            authUser: 'loginModule/getAuthUser',
        }),
        rows() {
            return this.itemsCount ? this.itemsCount : 1
        },
    },
    async created() {
        try {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("companyModule/getAllCompanies", {
                page: 1,
                perPage: this.perPage,
                search: this.searchCompany,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;
    },
    methods: {
        editItem(item) {
            this.showModal = true
            this.editedItem = {
                ...item
            }
        },
        async clearsearch() {
            this.searchCompany = '';
            await this.search();
            this.isSearched = false;
        },
        async search() {
            await this.$store.dispatch('companyModule/searchCompanies', {
                page: this.currentPage,
                perPage: this.perPage,
                search: this.searchCompany,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.itemsCount = this.total;
            this.filteredOrAllData = this.items;
            if (this.searchCompany.length == 0) {
                this.isSearched = false;
            } else {
                this.isSearched = true;
            }
        },
        async sortingChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            await this.$store.dispatch("companyModule/getAllCompanies", {
                page: 1,
                perPage: this.perPage,
                search: this.searchCompany,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            });
            this.filteredOrAllData = this.items;
        },
        editCompany(item) {
            this.showModal = true
            this.editedItem = {
                ...item
            }
        },
       async save(item) {
           await this.$store.dispatch('uxModule/setLoading')
            try {
            this.$store.dispatch('companyModule/editCompany', {
                ...item
            })
            this.$store.dispatch('uxModule/hideLoader')
            } catch(error) {
            this.$store.dispatch('uxModule/hideLoader')
            }
            this.showModal = false
        },
        async add(item) {
            this.$store.dispatch('uxModule/setLoading')
           await this.$store.dispatch('companyModule/addCompany', {
                ...item
            });
            this.showAddModal = false;
            this.$store.dispatch('uxModule/hideLoader')
        },
        deleteCompany(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('companyModule/deleteCompany', this.itemToDelete.id)
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete() {
            this.$store.dispatch('companyModule/deleteMultipleCompanies', this.bulkDeleteItems).then(() => {
                this.$store.dispatch('companyModule/getAllCompanies', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchCompany,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
            })
        },
        selectAll() {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }
        },
        async doCreatedOperation() {
            try {
                await this.$store.dispatch("companyModule/getAllCompanies", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchCompany,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
            if (this.$route.query.company_id) {
                this.$store.dispatch('companyModule/getCompany', this.$route.query.company_id).then(() => {
                    this.editedItem = this.selectedCompany
                    this.showModal = true
                });
            }
            this.filteredOrAllData = this.items;
            this.itemsCount = this.total;
        }
    },
    watch: {
        currentPage: {
            handler: async function () {
                await this.$store.dispatch('companyModule/getAllCompanies', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchCompany,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.filteredOrAllData = this.items
            }
        },
        perPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                await this.$store.dispatch('companyModule/getAllCompanies', {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchCompany,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.filteredOrAllData = this.items
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
    }
}
</script>

<style>
.filter-count {
    border-radius: 50%;
    background-color: #808080a6;
    color: #ffffff;
    font-size: 13px;
    text-align: center;
    width: 20px;
    height: 20px;
}

.filter-top {
    margin-left: -5px;
    margin-top: -30px;
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
