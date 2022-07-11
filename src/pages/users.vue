<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Users</h3>
    <div>
        <b-row>
            <b-col cols="12" class="d-flex justify-content-end">
                <b-button variant="primary" class="add-seller" @click="addItem()">
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Add User
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
                    <b-form-input v-model="searchUser" @keyup.enter="search" placeholder="Search"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="search" variant="primary">Search</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
    <b-table id="user-table" small sort-icon-left no-local-sorting striped hover :busy="isBusy" :fields="fields" @sort-changed="sortingChanged" :items="filteredOrAllData" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">       
        <template v-slot:cell(company_role)="data">
            <b-icon class="mr-2 cursor-pointer" icon="info-circle" variant="primary" @click="companyRoleItem(data.item)"></b-icon>
        </template>
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
    <edit-user-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-user-modal>
    <add-user-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @add="add"></add-user-modal>
    <company-role-user-modal :showModal="showCompanyRoleModal" :propsData="CompanyRole_Item" @cancel="showCompanyRoleModal=false"></company-role-user-modal>

</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    BIcon
} from "bootstrap-vue"
import EditUserModal from "../components/user/EditUserModal";
import CompanyRoleUserModal from "../components/user/CompanyRoleUserModal";
import AddUserModal from "../components/user/AddUserModal";
import { setLocalStorage } from '../utils/localStorage'


export default {
    name: "Users",
    components: {
        BIcon,
        EditUserModal,
        AddUserModal,
        CompanyRoleUserModal
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
            searchUser: '',
            showAddModal: false,
            showCompanyRoleModal: false,
            CompanyRole_Item: {},

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
            fields: 'userModule/fields',
            items: 'userModule/users',
            total: 'userModule/total',
            authUser: 'loginModule/getAuthUser',
        }),
        rows() {
            return this.itemsCount ? this.itemsCount : 1
        },
    },
    async created() {
        // this.$store.dispatch('userModule/getTotal')
        try {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("userModule/getAllUsers", {
                page: 1,
                perPage: this.perPage,
                search: this.searchUser,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            console.log(error);
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
        companyRoleItem(item) {
            this.showCompanyRoleModal = true
            this.CompanyRole_Item = {
                ...item
            }
        },
        async clearsearch() {
            this.searchUser = '';
            await this.search();
            this.isSearched = false;
        },
        async search() {
            await this.$store.dispatch('userModule/searchUsers', {
                page: this.currentPage,
                perPage: this.perPage,
                search: this.searchUser,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.itemsCount = this.total;
            this.filteredOrAllData = this.items;
            if (this.searchUser.length == 0) {
                this.isSearched = false;
            } else {
                this.isSearched = true;
            }
        },
        async sortingChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            await this.$store.dispatch("userModule/getAllUsers", {
                page: 1,
                perPage: this.perPage,
                search: this.searchUser,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            });
            this.filteredOrAllData = this.items;
        },
        editUser(item) {
            this.showModal = true
            this.editedItem = {
                ...item
            }
        },
       async save(item) {
           await this.$store.dispatch('uxModule/setLoading')
            try {
            this.$store.dispatch('userModule/editUser', {
                ...item
            })
            if(this.authUser.id == item.id) {
                setLocalStorage('authUser', JSON.stringify(item));
            }
            this.$store.dispatch('uxModule/hideLoader')
            } catch(error) {
            this.$store.dispatch('uxModule/hideLoader')
            }
            this.showModal = false
        },
        async add(item) {
            this.$store.dispatch('uxModule/setLoading')
           let result = await this.$store.dispatch('userModule/addUser', {
                ...item
            });
            if(result == "user_exist") {
                this.$bvToast.toast(`User with the following Email Already exist`, {
                title: 'Already Exist',
                autoHideDelay: 5000,
                variant: "danger",
                appendToast: false
                });
            } else {
                this.showAddModal = false;
            }
            this.$store.dispatch('uxModule/hideLoader')
        },
        deleteUser(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('userModule/deleteUser', this.itemToDelete.id)
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete() {
            this.$store.dispatch('userModule/deleteMultipleUsers', this.bulkDeleteItems).then(() => {
                this.$store.dispatch('userModule/getAllUsers', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchUser,
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
                await this.$store.dispatch("userModule/getAllUsers", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchUser,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
            if (this.$route.query.user_id) {
                this.$store.dispatch('userModule/getUser', this.$route.query.user_id).then(() => {
                    this.editedItem = this.selectedUser
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
                await this.$store.dispatch('userModule/getAllUsers', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchUser,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.filteredOrAllData = this.items
            }
        },
        perPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                await this.$store.dispatch('userModule/getAllUsers', {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchUser,
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
