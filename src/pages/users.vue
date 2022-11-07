<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Users</h3>
    <div>
        <b-row class="mb-3">
            <b-col cols="6" offset-md="6">
                <b-input-group class="mt-3">
                    
                    <b-form-input v-model="searchUser" debounce="500" @keyup.enter="search" placeholder="Search"></b-form-input>
                    <b-input-group-append >
                        <b-form-select v-model="isActive" :options="isActiveStatus" @change="search()"></b-form-select>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
    <b-table id="user-table" small sort-icon-left no-local-sorting striped hover :busy="isBusy" :fields="fields" @sort-changed="sortingChanged" :items="filteredOrAllData" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
        <template v-slot:cell(actions)="data">
            <b-icon class="mr-2 cursor-pointer" icon="pencil" v-b-tooltip.hover title="Edit User" variant="primary" @click="editItem(data.item)"></b-icon>
            <b-icon class="cursor-pointer" variant="danger" icon="gear" v-b-tooltip.hover title="Deactivate User" @click="deleteUser(data.item)"></b-icon>
        </template>
        <template v-slot:cell(status)="data">
            <b-icon class="mr-2 cursor-pointer" :icon="userStatusIcon[data.item.status]" :variant="userStatusVariant[data.item.status]"></b-icon> {{userStatus[data.item.status]}}
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
    <edit-user-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save" @status_modal="showUserStatusModal=true;showModal=false"></edit-user-modal>
    <user-status-modal :showModal="showUserStatusModal" :propsData="editedItem" @cancel="showUserStatusModal=false" @save="UserStausUpdate"></user-status-modal>
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
import UserStatusModal from "../components/user/UserStatusModal";

// import { setLocalStorage } from '../utils/localStorage';



export default {
    name: "Users",
    components: {
        BIcon,
        EditUserModal,
        UserStatusModal
    },
    data() {
        return {
            isBusy: false,
            showModal: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {},
            showUserStatusModal:false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchUser: '',
            showCompanyRoleModal: false,
            CompanyRole_Item: {},

            bulkDeleteItems: [],
            allSelected: false,
            showFilterPropertiesModal: false,
            filteredOrAllData: [],
            itemsCount: 0,
            sortBy: 'id',
            sortDesc: false,
            isActive: 'All',

            role_text : ['','SuperAdmin','Admin','User'],
            fields: [
                {key:"id", label: "Id", sortable: true},
                {key: "name", label: "Name", sortable: true},
                {key: "email", label: "email", sortable: true},
                {key: "status", label: "Status", sortable: true},
                {key:"created_at", label: "Created Date", sortable: true},
                {key:"updated_at", label: "Updated Date", sortable: true},
                {key:"actions", label: "Actions"},
            ],
            userStatus :['Deactive','Active'],
            userStatusIcon :['x-circle','check-circle-fill'],
            userStatusVariant :['danger','success'],

            isActiveStatus: [
                { value: 'All', text: 'All Users' },
                { value: 'Active', text: 'Active Users' },
                { value: 'Deactive', text: 'Deactive Users' },


            ]




        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            items: 'userModule/users',
            total: 'userModule/total',
            authUser: 'loginModule/getAuthUser',
            editUserData: 'userModule/user',
        }),
        rows() {
            return this.itemsCount ? this.itemsCount : 1
        },
    },
    async created() {
        try {
            this.$store.dispatch('uxModule/setLoading')
            if (this.$route.query.id) {
                await this.$store.dispatch('userModule/getUser', this.$route.query.id).then(() => {
                    
                    this.editedItem = {...this.editUserData}
                    this.showModal = true
                })
            }
        
            await this.$store.dispatch('userModule/getTotal');
            await this.$store.dispatch("userModule/getAllUsers", {
                page: 1,
                perPage: this.perPage,
                search: this.searchUser,
                isActive: this.isActive,
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
        async editItem(item) {   
            this.editedItem = {...item}
            this.showModal = true
            // try {
            //     this.$store.dispatch('uxModule/setLoading')         
            //     await this.$store.dispatch('userModule/getUser', item.id).then(() => {                    
            //             this.editedItem = {...this.editUserData}
            //             this.showModal = true
            //         })
            //     this.$store.dispatch('uxModule/hideLoader')
            // } catch (error) {
            //     console.log(error);
            //     this.$store.dispatch('uxModule/hideLoader')
            // }
        },
        status(){
            this.isActive =!this.isActive;
           this.search();
        },
        async search() {
           this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('userModule/searchUsers', {
                page: this.currentPage,
                perPage: this.perPage,
                search: this.searchUser,
                isActive: this.isActive,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.itemsCount = this.total;
            this.filteredOrAllData = this.items;
            this.$store.dispatch('uxModule/hideLoader')
        },
        async sortingChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            await this.$store.dispatch("userModule/getAllUsers", {
                page: 1,
                perPage: this.perPage,
                search: this.searchUser,
                isActive: this.isActive,
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
           this.$store.dispatch('uxModule/setLoading')
            try {
            let response = await this.$store.dispatch('userModule/editUser', {
                ...item
            })
            if(this.authUser.id == item.id) {
                // setLocalStorage('authUser', JSON.stringify(response));
                    await this.$store.dispatch('loginModule/logout')
                    this.$router.push({name: "Login"}).catch(() => {})
            }
            if(response.user){
                this.$bvToast.toast("User Updated successfully", {
                    title: "Message",
                    variant: 'success',
                    autoHideDelay: 5000,
                });
            }
            this.$store.dispatch('uxModule/hideLoader')
            } catch(error) {
            this.$store.dispatch('uxModule/hideLoader')
            }
            this.showModal = false
        },

        deleteUser(item) {
            this.showUserStatusModal = true;
            this.editedItem = item;
        },
        async UserStausUpdate(user) {

            console.log('user',user);
            this.showUserStatusModal = false;
            if (user) {
                this.$store.dispatch('uxModule/setLoading');
                try {
                    let response = await this.$store.dispatch('userModule/deleteUser', user)
                    if(response.success==true){
                        this.$bvToast.toast("User Status Updated Successfully!", {
                            title: "User Status!",
                            variant: 'success',
                            autoHideDelay: 5000,
                        });
                    }
                    
                this.$store.dispatch('uxModule/hideLoader');
                }catch(error) {
                this.$store.dispatch('uxModule/hideLoader');
                }
            }
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
                    isActive: this.isActive,
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
                this.$store.dispatch('uxModule/setLoading');

                await this.$store.dispatch('userModule/getAllUsers', {
                    page: this.currentPage,
                    perPage: this.perPage,
                    search: this.searchUser,
                    isActive: this.isActive,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.$store.dispatch('uxModule/hideLoader');
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
                    isActive: this.isActive,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.filteredOrAllData = this.items
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        searchUser() {
            console.log('this.searchUser',this.searchUser);
            this.search();
        }
    },

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
