<template>
<b-modal v-model="showModal" no-close-on-backdrop scrollable>
    <template #modal-header>
        <div class="w-100">
            Add User
        </div>
    </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.user.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">User Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2" id="email" label="Email" label-for="email">
                            <b-form-input :state="validateState('email')" type="email" v-model="$v.user.email.$model" aria-describedby="email" required></b-form-input>
                            <b-form-invalid-feedback id="email" v-if="$v.user.email.email">User Email Field is required.</b-form-invalid-feedback>
                            <b-form-invalid-feedback id="email" v-if="$v.user.email.required">Enter valid Email.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Password" label="password" label-for="password" class="mb-2">
                            <b-input v-model="$v.user.password.$model" aria-describedby="password" :state="validateState('password')" required></b-input>
                            <b-form-invalid-feedback class="text-center" id="role-id" v-if="$v.user.password.minLength">Password Field is Required.</b-form-invalid-feedback>
                            <b-form-invalid-feedback class="text-center" id="role-id" v-if="$v.user.password.required">At Least 6 character is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Company" id="company_id" class="mb-2">
                          <b-form-select @change="addcompanyitems" :options="companyitems" v-model="tempCompany.company" ></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Team" id="team_id" label="Team" label-for="team_id" class="mb-2">
                            <b-form-select v-model="tempCompany.team" aria-describedby="team_id" :options="teamitems" >
                            </b-form-select>
                            <b-form-invalid-feedback class="text-center" id="team_id">User Team Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                
                
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                            <b-form-select v-model="tempCompany.role" aria-describedby="role-id" :options="company_permission" >
                            </b-form-select>
                            <b-form-invalid-feedback class="text-center" id="role-id">User Role Field is Required.</b-form-invalid-feedback>
                        </b-input-group>

                        <!-- <b-form-checkbox
                            id="checkbox_role"
                            v-model="user.role"
                            name="checkbox_role"
                            value="1"
                            unchecked-value="">
                            Make this user a SuperAdmin
                        </b-form-checkbox> -->

                    </b-col>
                    <b-col cols="12" class="text-center">

                    <b-button variant="primary" v-b-tooltip.hover title="Add Company/Team" size="sm" type="button" @click="addCompanyTeam" class="text-center">
                    + Add
                </b-button>
                    </b-col>

                </b-row>
                <b-row class="list-group-row">
                    <b-col cols="12">
                        <h5 class="text-center mt-3" v-if="selectedCompany.length>0">List</h5>
                        <b-list-group class="w-100">
                            <b-list-group-item v-for="item in selectedCompany" :key="item.company.id+item.team.id">
                            <b-input-group>
                                <b-input-group-prepend >
                                    <span class="px-1" v-b-tooltip.hover title="Company Name">{{item.company.name}} </span> - <span class="px-1" v-b-tooltip.hover title="Team Name"> {{item.team.name}} </span> - <span class="px-1" v-b-tooltip.hover title="Role"> {{company_permission_text[item.role]}} </span>
                                </b-input-group-prepend>
                                <b-input-group-append v-b-tooltip.hover title="Remove From List">
                                    <b-icon icon="trash" class="trash-icon btn" variant="danger" @click="removecompanyitems(item)"></b-icon>
                                </b-input-group-append>
                            </b-input-group>
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Add
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required,
    minLength,
    email
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
            // companyTeams: 'teamModule/companyTeams',
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
                password: '',
                team_id: '',
                role: '',
                permissions: [],
            },
            tempCompany: {
                company: {},
                team: {},
                role: '',
            },
            // tempCompany: null,
            teamitems: [],
            companyitems: [],
            selectedCompany:[],


            roles: [
                {
                    value: 3,
                    text: "User"
                },
                {
                    value: 2,
                    text: "Admin"
                },
                {
                    value: 1,
                    text: "SuperAdmin"
                }
            ],
            company_permission: [
                // {
                //     value: 3,
                //     text: "User"
                // },
                {
                    value: 2,
                    text: "Admin"
                }
            ],
            company_permission_text : ['','SuperAdmin','Admin','User'],
        }
    },
    validations: {
        user: {
            name: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.user[name];
            return $dirty ? !$error : null;
        },
        async addcompanyitems(company) { 
            this.$store.dispatch('uxModule/setLoading')
            try{  
                var response = await this.$store.dispatch("teamModule/getCompanyTeams", {
                    companyid: company.id
                });
                var companyTeams = response.teams;
                this.teamitems = [];
                companyTeams.map((company) => {
                    
                    this.teamitems.push({
                        value: company,
                        text: company.name
                    });
                });
                this.$store.dispatch('uxModule/hideLoader')
            }catch(e){
                console.log(e);
                this.$store.dispatch('uxModule/hideLoader')
            }     
            // let index = this.companyitems.findIndex(x=>x.value.id == company.id);
            // this.companyitems.splice(index,1);
            // this.selectedCompany.push(company);
        },
        removecompanyitems(item) {
            let index = this.selectedCompany.findIndex(x=>((x.company.id == item.company.id )&&( x.team.id == item.team.id)&&( x.role == item.role)));
            this.selectedCompany.splice(index,1);
            // this.companyitems.push({value:company,text:company.name});
        },
        addCompanyTeam(){
            if(!this.tempCompany.company?.id || !this.tempCompany.team?.id || this.tempCompany.role == ''){
                this.$bvToast.toast("Please Select Company - Team - Role", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return ;
            }
            this.selectedCompany.push(this.tempCompany);
            this.tempCompany={
                company: {},
                team: {},
                role: '',
            };

        },
        onSubmit() {
            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                return;
            }
            if(this.selectedCompany.length==0){
                this.$bvToast.toast("Please Add Atleast One Company/Team", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return ;
            }
            this.user.permissions = [];
            if(this.user.role != 1){
                this.selectedCompany.map((item)=> {
                this.user.permissions.push({
                    company_id: item.company.id,
                    team_id: item.team.id,
                    role: item.role
                });
            });
            }
            this.user.team_id = this.user.permissions[0].team_id;
            this.user.role = 2;            
           this.$emit('add', this.user);
        },
    },
    async created() {
        this.$store.dispatch('uxModule/setLoading')
        // this.$store.dispatch('teamModule/getTotal')
        this.$store.dispatch('companyModule/getTotal')

        try {
            // await this.$store.dispatch("teamModule/getTeams", {
            //     page: 1,
            //     perPage: this.perPage
            // })
            // this.teams.map((team) => {
            //     this.teamitems.push({
            //         value: team.id,
            //         text: team.name
            //     });
            // });
            await this.$store.dispatch("companyModule/getAllCompanies", {
                page: 1,
                perPage: this.perPage
            })
            this.items.map((company) => {
                    // company.role = 'user';
                this.companyitems.push({
                    value: company,
                    text: company.name
                });
            });
            
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    }
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
</style>
