<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Companies</h3>
    <div>
        <b-row>
            <b-col cols="12" class="d-flex justify-content-end">
                <b-button variant="primary" class="add-seller cursor-pointer" @click="addItem()">
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
            <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteCompany(data.item)"></b-icon>
        </template>
        <template v-slot:cell(plan)="data">
            <div v-b-tooltip.hover :title="data.item.plan.name"><b-icon  icon="box-arrow-up-right" variant="primary" class="mr-1" title="Company Detail" @click="editPlanLink(data.item.plan)" ></b-icon>{{ data.item.plan.name }}</div>
        </template>
        <template v-slot:cell(number_of_users)="data">
            <div v-b-tooltip.hover :title="data.item.plan.number_of_users">{{ data.item.plan.number_of_users }}</div>
        </template>
        <template v-slot:cell(number_of_teams)="data">
            <div v-b-tooltip.hover :title="data.item.plan.number_of_teams">{{ data.item.plan.number_of_teams }}</div>
        </template>
    </b-table>
    <b-row>
        <b-col class="d-flex align-items-center">
            <b-form-group label="Show" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>total?total:(currentPage*perPage)}} of {{total}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="total" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
    <edit-company-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-company-modal>
    <add-company-modal ref="addcompanymodal" :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @add="add"></add-company-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse" title="Are you sure? you want to delete this Company with all of its teams"></delete-modal>

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
import DeleteModal from "../components/deleteModal/DeleteModal";



export default {
    name: "Companies",
    components: {
        BIcon,
        EditCompanyModal,
        AddCompanyModal,
        DeleteModal
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
            editCompany: 'companyModule/company',
            total: 'companyModule/total',
            authUser: 'loginModule/getAuthUser',
        }),
    rows() { return this.total ? this.total : 1 }
    },
    async created() {
        try {
            this.$store.dispatch('uxModule/setLoading')
            if (this.$route.query.id) {
                await this.$store.dispatch('companyModule/getCompany', this.$route.query.id).then(() => {
                    this.editedItem = this.editCompany
                    this.showModal = true
                })
            }
            await this.$store.dispatch("companyModule/getAllCompanies", {
                page: 1,
                perPage: this.perPage,
                search: this.searchCompany,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            await this.$store.dispatch('companyModule/getTotal')
            this.filteredOrAllData = this.items;
            this.itemsCount = this.total;

            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        
    },
    methods: {
        editItem(item) {
            console.log('hello',item);
            this.showModal = true
            this.editedItem = JSON.parse(JSON.stringify(item));
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
       async save(item) {
            this.$store.dispatch('uxModule/setLoading')
            try {
                let response = await this.$store.dispatch('companyModule/editCompany', {
                ...item
            });
            if(response.success == true){
                this.$bvToast.toast("Company Updated successfully", {
                    title: "Message",
                    variant: 'success',
                    autoHideDelay: 5000,
                });
            }else{
                this.$bvToast.toast(response.error, {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
            }
            this.$store.dispatch('uxModule/hideLoader')
            } catch(error) {
            this.$store.dispatch('uxModule/hideLoader')
            }
            this.showModal = false
        },
        async add(item) {
            this.$store.dispatch('uxModule/setLoading')
            let response = await this.$store.dispatch('companyModule/addCompany', {
                ...item
            });
            if(response.success){
                this.showAddModal = false;
                this.$refs.addcompanymodal.reset();
                this.$bvToast.toast("Company Added successfully", {
                    title: "Message",
                    variant: 'success',
                    autoHideDelay: 5000,
                });
            }else{
                this.$bvToast.toast(response.error, {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
            }
            this.$store.dispatch('uxModule/hideLoader')
        },
        deleteCompany(item) {
            // this.$bvToast.toast("Company Delete Functionality is in progress! Because of table relationships", {
            //         title: "In progress",
            //         variant: 'warning',
            //         autoHideDelay: 5000,

            //   });
            //   return item;
              this.showDeleteModal = true;
                this.itemToDelete = item;
        },
        async modalResponse(response) {
        this.$store.dispatch('uxModule/setLoading')

      this.showDeleteModal = false;
        if (response) {
            let responseRequest = await this.$store.dispatch('companyModule/deleteCompany', this.itemToDelete.id)
            if(responseRequest.success==true) {

            this.$bvToast.toast(responseRequest.message, {
                title: "Message",
                variant: 'success',
                autoHideDelay: 5000,
            });

            const findIndex = this.items.findIndex(({ id }) => id == this.itemToDelete.id)
            findIndex !== -1 && this.items.splice(findIndex, 1)

            }else{
            this.$bvToast.toast(responseRequest.error, {
                title: "Error",
                variant: 'danger',
                autoHideDelay: 5000,
            });
            }

        }
        this.$store.dispatch('uxModule/hideLoader');
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
        // planData(item,column) {
        //     if(column)
        // },
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
        },
        editPlanLink(plan) { 
            let plan_id = plan?.id;
            if(plan_id){
            const route = '/plans?id=' + plan_id;
            let routeData = this.$router.resolve({path: route});
            window.open(routeData.href, '_blank');
        }else{
            this.$bvToast.toast("Plan Id not found", {
                title: "Validate",
                variant: 'warning',
                autoHideDelay: 5000,
            });
        }

        },
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
