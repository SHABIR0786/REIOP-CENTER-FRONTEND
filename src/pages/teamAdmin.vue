<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Team</h3>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col cols="6">
                                <b-input-group prepend="Team Name" class="mb-2">
                                    <b-form-input :readonly="true" v-model="team.name"></b-form-input>
                                    <b-input-group-append>
                                        <b-input-group-text title="Edit Team" role="button"  @click="showEditModal=true" >
                                            <b-icon icon="pencil" variant="primary"></b-icon>
                                        </b-input-group-text>
                                        <b-input-group-text v-if="authUser.role == 1" title="Team Detail" role="button"  @click="editTeamFunction(team)" >
                                            <b-icon icon="box-arrow-up-right" variant="primary"></b-icon>
                                        </b-input-group-text>
                                    </b-input-group-append>
                                </b-input-group>

                                

                            </b-col>
                            <b-col cols="6">
                                <b-input-group prepend="Company Name" class="mb-2">
                                    <b-form-input :readonly="true" :value="companyName(team)" ></b-form-input>
                                    <b-input-group-append>
                                            <b-input-group-text v-if="authUser.role == 1" title="Company Detail" role="button"  @click="editCompany(team)" >
                                                <b-icon  icon="box-arrow-up-right" variant="primary" ></b-icon> 
                                            </b-input-group-text>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>
                            <!-- <b-col cols="6">
                                <b-input-group prepend="Created Date" class="mb-2">
                                    <b-form-input :readonly="true" v-model="team.created_at"></b-form-input>
                                </b-input-group>
                            </b-col><b-col cols="6">
                                <b-input-group prepend="Updated Date" class="mb-2">
                                    <b-form-input :readonly="true" v-model="team.updated_at"></b-form-input>
                                </b-input-group>
                            </b-col> -->
                            <!-- <b-col cols="6">
                                <b-input-group prepend="Number of Users" class="mb-2">
                                    <b-form-input :readonly="true" v-model="team.total_users"></b-form-input>
                                </b-input-group>
                            </b-col> -->
                        </b-row>
<!--                        <b-row>-->
<!--                            <b-col cols="12">-->
<!--                                <b-input-group prepend="Team Owner" class="mb-2">-->
<!--                                    <b-form-input readonly v-model="team.owner"></b-form-input>-->
<!--                                </b-input-group>-->
<!--                            </b-col>-->
<!--                        </b-row>-->
                        <b-row class="my-2">
                            <b-col cols="6">

                            <h3>Team Members </h3>
                        </b-col>

                            <b-col cols="6" class="text-right">
                            <b-button variant="primary" class="add-member" @click="showAddMemberModal = true">
                            <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add New Team Member</b-button>
                        </b-col>

                        </b-row>

                        <!-- <b-row v-for="user in team.users" :key="user.id">
                            <b-col cols="12" class="d-flex justify-content-center align-items-center mb-2">
                                <b-form-input readonly  v-model="user.email"></b-form-input>
                                <b-button variant="outline-danger" @click="deleteMember(user.id)" class="ml-2">
                                    <b-icon icon="trash" aria-hidden="true"></b-icon>
                                </b-button>
                            </b-col>
                        </b-row> -->

                        <b-row class="my-2">
                        <b-col cols="12">
                            <b-table
                                id="team-member-list-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                responsive
                                :fields="fields"
                                :items="team.users"
                                :sticky-header="true"
                                >
                                <!-- <template v-slot:cell(role)="data">
                                    <div >{{ pivot_data_check(data.item,'role') }}</div>
                                </template> -->
                                <template v-slot:cell(created_at)="data">
                                    <div >{{ pivot_data_check(data.item,'created_at') }}</div>
                                </template>
                                <!-- <template v-slot:cell(updated_at)="data">
                                    <div >{{ pivot_data_check(data.item,'updated_at') }}</div>
                                </template> -->
                                    <template v-slot:cell(actions)="data">
                                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                                    <!-- <b-icon  icon="box-arrow-up-right" class="cursor-pointer mr-1" variant="primary" title="View Member" @click="editMember(data.item)"></b-icon>  -->
                                    <b-icon class="cursor-pointer" variant="danger" icon="dash-circle" title="Remove Member" @click="deleteMember(data.item)"></b-icon>
                                    </template>
                            </b-table>
                        </b-col>
                        </b-row>
                        
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <add-team-member-modal :showModal="showAddMemberModal" @cancel="showAddMemberModal=false" @add="addMember"></add-team-member-modal>
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse" title="Are you sure You want to remove this member?"></delete-modal>
        <edit-team-admin-modal :showModal="showEditModal" :propsData="team" @cancel="showEditModal=false" @save="updateTeamName"></edit-team-admin-modal>
        <edit-user-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="updateUser"></edit-user-modal>

</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    BIcon
} from "bootstrap-vue"
import AddTeamMemberModal from "../components/teams/AddTeamMemberModal.vue";
import  DeleteModal from'@/components/deleteModal/DeleteModal';
import EditTeamAdminModal from "../components/teamAdmin/EditTeamAdminModal";
import EditUserModal from "../components/user/EditUserModal";
// import { setLocalStorage } from '../utils/localStorage';




export default {
    name: "Users",
    components: {AddTeamMemberModal,DeleteModal,BIcon,EditTeamAdminModal,EditUserModal},

    data() {
        return {
            team: {
                    name: ''
                },
                delete_member: {
                    user_id: '',
                    team_id: '',
                },
                EditUserModal:false,
                showEditModal:false,
                showModal:false,
                showDeleteModal: false,
                showAddMemberModal: false,
                editedItem: {},
                fields: [
                    {key:"id", label: "Id", sortable: true},
                    {key: "name", label: "Name", sortable: true},
                    {key: "email", label: "Email", sortable: true},
                    // {key: "role", label: "Role", sortable: true},
                    {key:"created_at", label: "Team Joining Date", sortable: true},
                    // {key:"updated_at", label: "Updated Date", sortable: true},
                    {key: "actions", label: "Actions"},
                ],
                role_text : ['','SuperAdmin','Admin','User'],
            

        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            items: 'userModule/users',
            total: 'userModule/total',
            authUser: 'loginModule/getAuthUser',
            editUserData: 'userModule/user',
            editTeam: 'teamModule/team',

        }),
        rows() {
            return this.itemsCount ? this.itemsCount : 1
        },
    },
    async created() {
        if(!this.authUser.team_id){
            this.$bvToast.toast("Please select any Team (from Switch Team)", {
                title: "Warning",
                variant: 'warning',
                autoHideDelay: 5000,
            });
            return;
        }
        try {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('teamModule/getTeam', this.authUser.team_id)
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            console.log(error);
            this.$store.dispatch('uxModule/hideLoader')
        }
        this.team = this.editTeam;
        this.team.created_at = this.team.created_at?this.team.created_at.split('T')[0]: '';
        this.team.updated_at = this.team.updated_at?this.team.updated_at.split('T')[0]: ''
    },
    methods: {
        async addMember(user) {
                try{
                    this.$store.dispatch('uxModule/setLoading');
                    this.showAddMemberModal = false;
                    if(user) {
                        user.team_id = this.team.id;
                        let response = await this.$store.dispatch('teamModule/addTeamMember', user);
                        if(response.success == true){
                            this.$bvToast.toast("Team Member Added successfully!", {
                                title: "Message",
                                variant: 'success',
                                autoHideDelay: 5000,
                            });
                            this.team.users.push(response.user);
                        }else{
                            this.$bvToast.toast(response.error, {
                                title: "Validate",
                                variant: 'danger',
                                autoHideDelay: 5000,
                            });

                        }
                    
                        this.$store.dispatch('uxModule/hideLoader')

                    }
                }catch(e) {
                    this.$store.dispatch('uxModule/hideLoader')
                    console.log('error',e);
                    
                }
            },  
            async deleteMember(user) {
                if(user.pivot){
                    this.showDeleteModal = true;
                    this.delete_member = user.pivot;
                    
                }else{
                    this.$bvToast.toast('team_id not found', {
                        title: "Validate",
                        variant: 'danger',
                        autoHideDelay: 5000,
                    });
                }

                
                
            },

            async modalResponse(response) {
                    this.showDeleteModal = false;
                    if(!response){
                        return ;
                    }
                    try{
                        this.$store.dispatch('uxModule/setLoading');
                        if(this.delete_member.user_id) {
                            let response = await this.$store.dispatch('teamModule/deleteTeamMember', this.delete_member);
                            if(response.success == true){
                                this.$bvToast.toast("Team Member Removed successfully!", {
                                    title: "Message",
                                    variant: 'success',
                                    autoHideDelay: 5000,
                                });

                                let index = this.team?.users.findIndex(x=>x.id == this.delete_member.user_id);
                                this.team.users.splice(index,1);

                                this.delete_member = {
                                    user_id: '',
                                    team_id: '',
                                };
                            }else{
                                this.$bvToast.toast(response.error, {
                                    title: "Validate",
                                    variant: 'danger',
                                    autoHideDelay: 5000,
                                });

                            }
                        
                            this.$store.dispatch('uxModule/hideLoader')

                        }
                        this.$store.dispatch('uxModule/hideLoader')
                    }catch(e) {
                        this.$store.dispatch('uxModule/hideLoader')
                        console.log('error',e);
                        
                    }
            },
            companyName(item) {
                return item?.company?.name;
            },
            editCompany(item) { 
                let company_id = item?.company?.id;
                if(company_id){
                const route = '/company?id=' + company_id;
                let routeData = this.$router.resolve({path: route});
                window.open(routeData.href, '_blank');
            }else{
                this.$bvToast.toast("Company Id not found", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
            }

            },
            editTeamFunction(item) {
                let team_id = item?.id;
                if(team_id){
                    const route = '/teams?id=' + team_id;
                    let routeData = this.$router.resolve({path: route});
                    window.open(routeData.href, '_blank');
                }else{
                    this.$bvToast.toast("Team Id not found", {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                }

            },
            pivot_data_check(user=null,column=null){
                try{
                    if(user.pivot){
                        if(column=='created_at'){
                            return user.pivot.created_at?user.pivot.created_at.split('T')[0]: '';
                        }else if(column=='updated_at'){
                            return user.pivot.updated_at?user.pivot.updated_at.split('T')[0]:'';
                        }else if(column=='role'){
                            return user.pivot.role?this.role_text[user.pivot.role]: '';
                        }
                    }
                    return '';
                }catch (error) {
                    console.log('error',error);
                }
            },
            editMember(user) { 

                if(user?.pivot?.user_id){
                    let user_id = user.pivot.user_id;
                    const route = '/users?id=' + user_id;
                    let routeData = this.$router.resolve({path: route});
                    window.open(routeData.href, '_blank');
                    
                }else{
                    this.$bvToast.toast('user_id not found', {
                        title: "Validate",
                        variant: 'danger',
                        autoHideDelay: 5000,
                    });
                }

            },
            editItem(user) { 

                if(user.id){
                    this.editedItem = user;
                    this.showModal = true;
                    
                }else{
                    this.$bvToast.toast('user_id not found', {
                        title: "Validate",
                        variant: 'danger',
                        autoHideDelay: 5000,
                    });
                }

            },
                
            async updateUser(item) {
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
            async updateTeamName(item){
                try{
                    this.$store.dispatch('uxModule/setLoading');
                    let response = await this.$store.dispatch('teamModule/updateTeamName', {...item})
                    if(response.team){
                        this.team.name = response.team.name;
                        this.$bvToast.toast("Team Updated successfully", {
                            title: "Message",
                            variant: 'success',
                            autoHideDelay: 5000,
                        });
                    }
                    this.showEditModal=false;
                    this.$store.dispatch('uxModule/hideLoader')
                }catch(e) {
                    this.showEditModal=false;
                    this.$store.dispatch('uxModule/hideLoader')
                    console.log('error',e);
                    
                }

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
