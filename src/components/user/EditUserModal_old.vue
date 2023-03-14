<template>
<b-modal v-model="showModal" size="xl" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            User Detail
        </div>
    </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="6">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input id="name" name="name" :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.user.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">User Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="6">
                        <b-input-group prepend="Email" class="mb-2" id="email" label="Email">
                            <b-form-input type="email" :value="user.email" disabled></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <!-- <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Select Team" id="team_id" label="Team" label-for="team_id" class="mb-2">
                            <b-form-select v-model="$v.user.team_id.$model" aria-describedby="team_id" :state="validateState('team_id')" :options="teamitems" required>
                            </b-form-select>
                            <b-form-invalid-feedback class="text-center" id="team_id">User Team Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row> -->
                <!-- <b-row v-show="user.role!='superadmin'">
                    <b-col cols="12">
                        <b-input-group prepend="Company" id="company_id" class="mb-2">
                          <b-form-select @change="addcompanyitems" :options="companyitems_new"></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row> -->
                <!-- <b-row class="list-group-row" v-show="user.role!='superadmin' && selectedCompany.length>0">
                    <b-col cols="12">
                        <h5>Companies Permission</h5>
                        <b-list-group class="w-100">
                            <b-list-group-item v-for="company in selectedCompany" :key="company.id">
                            Company : {{company.name}}
                            <b-input-group>
                                <b-input-group-prepend class="pr-2">
                                    Role : 
                                </b-input-group-prepend>
                                <b-form-radio-group v-model="company.role" :options="company_permission"  :name="'company_role'+company.id" />
                                <b-input-group-append>
                                    <b-icon icon="trash" class="trash-icon btn" variant="danger" @click="removecompanyitems(company)"></b-icon>
                                </b-input-group-append>

                            </b-input-group>

                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row> -->
                <!-- <b-row>
                    <b-col cols="12 pt-2">
                        <b-input-group prepend="Select Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                            <b-form-select v-model="$v.user.role.$model" aria-describedby="role-id" :state="validateState('role')" :options="roles" required>
                            </b-form-select>
                            <b-form-invalid-feedback class="text-center" id="role-id">User Role Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                        <b-form-checkbox
                            id="checkbox_role"
                            v-model="user.role"
                            name="checkbox_role"
                            value="superadmin"
                            unchecked-value=""
                            >
                            Make this user a superadmin
                        </b-form-checkbox>
                    </b-col>
                </b-row> -->
                <b-row class="my-2">
                        <b-col cols="12">
                            <h4 class="text-center">User Exist in Companies/Teams</h4>
                            <b-table
                                id="team-member-list-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                responsive
                                :fields="modal_fields"
                                :items="user.teams"
                                :sticky-header="true"
                                >
                                <template v-slot:cell(company)="data">
                                    <span class="text-nowrap" v-b-tooltip.hover :title="pivot_data_check(data.item,'compnay_name')" ><b-icon  icon="box-arrow-up-right" variant="primary" class="mr-1" title="Company Detail" @click="editCompany(data.item)" ></b-icon> {{ pivot_data_check(data.item,'compnay_name') }}</span>
                                </template>
                                <template v-slot:cell(team)="data"> 
                                    <span class="text-nowrap"  v-b-tooltip.hover :title="data.item.name"><b-icon icon="box-arrow-up-right" variant="primary" class="mr-1" title="Team Detail"  @click="editTeam(data.item)"></b-icon> {{ data.item.name }}</span>
                                </template>
                                <template v-slot:cell(role)="data">
                                    <span class="text-nowrap" >{{ pivot_data_check(data.item,'role') }}</span>
                                </template>
                                <template v-slot:cell(created_at)="data">
                                    <span class="text-nowrap" >{{ pivot_data_check(data.item,'created_at') }}</span>
                                </template>
                                <template v-slot:cell(updated_at)="data">
                                    <span class="text-nowrap" >{{ pivot_data_check(data.item,'updated_at') }}</span>
                                </template>
                                   
                            </b-table>
                        </b-col>
                        </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Update
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required,
    // email
} from "vuelidate/lib/validators";
import {
    mapGetters
} from "vuex";
export default {
    mixins: [validationMixin],
    name: 'AddTeamMemberModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        },
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            // teams: 'teamModule/teams',
            items: 'companyModule/companies',

        }),
        rows() {
            return this.total ? this.total : 1
        }
    },
    data() {
        return {
            perPage: 20,
            user: {
                name: '',
                email: '',
                permissions: [],
            },
            // teamitems: [],
            companyitems: [],
            companyitems_new: [],

            selectedCompany:[],
            roles: [{
                    value: "user",
                    text: "User"
                },
                {
                    value: "admin",
                    text: "Admin"
                },
                {
                    value: "superadmin",
                    text: "Superadmin"
                }
            ],
            company_permission: [{
                    value: "user",
                    text: "User"
                },
                {
                    value: "admin",
                    text: "Admin"
                }
            ],
            modal_fields: [
                    {key: "company", label: "Company Name", sortable: true},
                    {key: "team", label: "Team Name", sortable: true},
                    {key: "role", label: "Role", sortable: true},
                ],
                role_text : ['','SuperAdmin','Admin','User'],
        }
    },
    validations: {
        user: {
            name: {
                required
            },
            // email: {
            //     required,
            //     email
            // },
            // team_id: {
            //     required
            // },
            // role: {
            //     required
            // }
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.user[name];
            return $dirty ? !$error : null;
        },
        addcompanyitems(company) {            
            // let index = this.companyitems_new.findIndex(x=>x.value.id == company.id);
            // this.companyitems_new.splice(index,1);
            //     this.selectedCompany.push(company);


            var index_ = this.selectedCompany.findIndex(x => x.id ==company.id); 

            if(index_ === -1 ){
                this.selectedCompany.push(company);

            }
        },
        removecompanyitems(company) {
            let index = this.selectedCompany.findIndex(x=>x.id == company.id);
            this.selectedCompany.splice(index,1);
            // this.companyitems_new.push({value:company,text:company.name});
        },
        onSubmit() {
            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                return;
            }
            this.user.permissions = [];
            if(this.user.role != 'superadmin'){
                this.selectedCompany.map((company)=> {
                this.user.permissions.push({
                    company_id: company.id,
                    role: company.role
                });
            });
            }
            // console.log('this.user', this.user);
            
           this. $emit('save', this.user);
        },
        pivot_data_check(team=null,column=null){
            try{
                if(team){
                    if(column=='created_at'){
                        return team.created_at?team.created_at.split('T')[0]: '';
                    }else if(column=='updated_at'){
                        return team.updated_at?team.updated_at.split('T')[0]:'';
                    }else if(column=='role'){
                        return team?.pivot?.role?this.role_text[team.pivot.role]: '';
                    }else if(column=='compnay_name'){
                        return team?.company?.name?team.company.name:'';
                    }
                }
                return '';
            }catch (error) {
                console.log('error',error);
            }
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
        editTeam(item) {
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
    },
    async created() {
        this.$store.dispatch('uxModule/setLoading')
        // this.$store.dispatch('teamModule/getTotal')
        this.$store.dispatch('companyModule/getTotal')

        try {
        //     await this.$store.dispatch("teamModule/getTeams", {
        //         page: 1,
        //         perPage: this.perPage
        //     })
        //     this.teams.map((team) => {
        //         this.teamitems.push({
        //             value: team.id,
        //             text: team.name
        //         });
        //     });

            await this.$store.dispatch("companyModule/getAllCompanies", {
                page: 1,
                perPage: this.perPage
            })
            this.items.map((company) => {
                company.role = 'user';
                this.companyitems.push({
                    value: company,
                    text: company.name
                });
            });

            
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
            watch: {
            showModal() {
                this.selectedCompany = [];
                this.companyitems_new = [];

                if(this.showModal){
                    this.user= {...this.propsData};
                    // this.companyitems_new = this.companyitems;
                    // this.user.permissions.map((permission)=> {
                    // this.selectedCompany.push({
                    //     company_id: permission.company_id,
                    //     role: permission.role,
                    //     name:permission.company.name,
                    //     id: permission.company_id,

                    //     });
                    // });
                    

                }
            }
        }

    
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
</style>
