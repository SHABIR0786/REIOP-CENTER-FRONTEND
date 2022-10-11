<template>
<b-modal v-model="showModal" no-close-on-backdrop>
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
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Select Team" id="team_id" label="Team" label-for="team_id" class="mb-2">
                            <b-form-select v-model="$v.user.team_id.$model" aria-describedby="team_id" :state="validateState('team_id')" :options="teamitems" required>
                            </b-form-select>
                            <b-form-invalid-feedback class="text-center" id="team_id">User Team Field is Required.</b-form-invalid-feedback>
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

                <b-row v-show="user.role!='superadmin'">
                    <b-col cols="12">
                        <b-input-group prepend="Company" id="company_id" class="mb-2">
                          <b-form-select @change="addcompanyitems" :options="companyitems"></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="list-group-row" v-show="user.role!='superadmin' && selectedCompany.length>0">
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
                </b-row>
                <b-row>
                    <b-col cols="12" class="pt-2">
                        <!-- <b-input-group prepend="Select Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                            <b-form-select v-model="$v.user.role.$model" aria-describedby="role-id" :state="validateState('role')" :options="roles" required>
                            </b-form-select>
                            <b-form-invalid-feedback class="text-center" id="role-id">User Role Field is Required.</b-form-invalid-feedback>
                        </b-input-group> -->

                        <b-form-checkbox
                            id="checkbox_role"
                            v-model="user.role"
                            name="checkbox_role"
                            value="superadmin"
                            unchecked-value=""
                            >
                            Make this user a SuperAdmin
                        </b-form-checkbox>

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
            teams: 'teamModule/teams',
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
            teamitems: [],
            companyitems: [],
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
            team_id: {
                required
            },
            // role: {
            //     required
            // },
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
        addcompanyitems(company) {            
            let index = this.companyitems.findIndex(x=>x.value.id == company.id);
            this.companyitems.splice(index,1);
            this.selectedCompany.push(company);
        },
        removecompanyitems(company) {
            let index = this.selectedCompany.findIndex(x=>x.id == company.id);
            this.selectedCompany.splice(index,1);
            this.companyitems.push({value:company,text:company.name});
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
            
            console.log('user', this.user);
            
           this. $emit('add', this.user);
        },
    },
    async created() {
        this.$store.dispatch('uxModule/setLoading')
        // this.$store.dispatch('teamModule/getTotal')
        this.$store.dispatch('companyModule/getTotal')

        try {
            await this.$store.dispatch("teamModule/getAllTeams", {
                page: 1,
                perPage: this.perPage
            })
            this.teams.map((team) => {
                this.teamitems.push({
                    value: team.id,
                    text: team.name
                });
            });
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
    }
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
</style>
