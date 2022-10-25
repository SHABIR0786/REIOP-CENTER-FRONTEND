<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop scrollable>
        <template #modal-header>
            <div class="w-100">
                Edit Team
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Team Details</div>
                    <b-button
                            v-if="isReadOnly"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="isReadOnly = false"
                    >
                        Edit
                    </b-button>
                    <b-button
                            v-if="isReadOnly === false"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="edit()"
                    >
                        Save
                    </b-button>
                </b-row>
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col cols="6">
                                <b-input-group prepend="Team Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="team.name"></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col cols="6">
                                <b-input-group prepend="Company Name" class="mb-2">
                                    <b-form-input :readonly="true" :value="companyName(team)" ></b-form-input>
                                    <b-input-group-append>
                                <b-input-group-text title="Edit Company" role="button"  @click="editCompany(team)" >
                                    <b-icon  icon="pencil" variant="primary" class="pr-1" ></b-icon> Edit
                                </b-input-group-text>
                            </b-input-group-append>
                                </b-input-group>
                            </b-col>
                            <b-col cols="6">
                                <b-input-group prepend="Created Date" class="mb-2">
                                    <b-form-input :readonly="true" v-model="team.created_at"></b-form-input>
                                </b-input-group>
                            </b-col><b-col cols="6">
                                <b-input-group prepend="Updated Date" class="mb-2">
                                    <b-form-input :readonly="true" v-model="team.updated_at"></b-form-input>
                                </b-input-group>
                            </b-col>
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
                            <b-icon icon="plus" aria-hidden="true"></b-icon>Add New Team Member</b-button>
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
                                <template v-slot:cell(role)="data">
                                    <div >{{ pivot_data_check(data.item,'role') }}</div>
                                </template>
                                <template v-slot:cell(created_at)="data">
                                    <div >{{ pivot_data_check(data.item,'created_at') }}</div>
                                </template>
                                <template v-slot:cell(updated_at)="data">
                                    <div >{{ pivot_data_check(data.item,'updated_at') }}</div>
                                </template>
                                    <template v-slot:cell(actions)="data">
                                    <!-- <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon> -->
                                    <b-icon class="cursor-pointer" variant="danger" icon="trash" disabled @click="deleteMember(data.item)"></b-icon>
                                    </template>
                            </b-table>
                        </b-col>
                        </b-row>
                        
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
            </div>
        </template>
        <add-team-member-modal :showModal="showAddMemberModal" @cancel="showAddMemberModal=false" @add="addMember"></add-team-member-modal>
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>

    </b-modal>
</template>
<script>
    import AddTeamMemberModal from "./AddTeamMemberModal";
    import  DeleteModal from'@/components/deleteModal/DeleteModal'

    export default {
        name: 'EditTeamModal',
        components: {AddTeamMemberModal,DeleteModal},
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        methods: {
            edit() {
                this.isReadOnly = true;
                this.$emit('save', this.team);
            },
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
            }
        },
        data() {
            return {
                team: {
                    name: ''
                },
                delete_member: {
                    user_id: '',
                    team_id: '',
                },
                showDeleteModal: false,
                isReadOnly: true,
                showAddMemberModal: false,
                fields: [
                    {key:"id", label: "Id", sortable: true},
                    {key: "name", label: "Name", sortable: true},
                    {key: "email", label: "Email", sortable: true},
                    {key: "role", label: "Role", sortable: true},
                    {key:"created_at", label: "Created Date", sortable: true},
                    {key:"updated_at", label: "Updated Date", sortable: true},
                    {key: "actions", label: "Actions"},
                ],
                role_text : ['','SuperAdmin','Admin','User'],
            }
        },
        watch: {
            showModal() {
                this.team= {...this.propsData}
            }
        }

    }
</script>
<style scoped>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .add-member {
        width: 250px;
    }
</style>
