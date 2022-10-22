<template>
<b-modal v-model="showModal" size="md" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Add Company
        </div>
    </template>
        <b-container fluid>
                <b-row class="">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input id="name" name="name" :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.company.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                
                    <b-col cols="12">
                        <b-input-group prepend="Plan" id="plan" class="mb-2">
                          <b-form-select v-model="company.plan" :state="validateState('plan')" required :options="planitems"></b-form-select>
                          <b-form-invalid-feedback id="plan" class="text">Plan Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                
                    <b-col cols="12">
                        <b-input-group prepend="No. of Users" title="Number Of Users" class="mb-2" id="number_of_users" label="Number Of Users" label-for="number_of_users">
                            <b-form-input id="number_of_users" name="number_of_users" :state="validateState('number_of_users')"  type="text" v-model="company.number_of_users" required></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text title="Unlimited Users" role="button"  @click="company.number_of_users='Unlimited'" ><span class="text-danger">Unlimited</span></b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="number_of_users">Number Of Users Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                        
                    </b-col>
                
                    <b-col cols="12">
                        <b-input-group prepend="No. of Teams" title="Number Of Teams" class="mb-2" id="number_of_teams" label="Number Of Teams" label-for="number_of_teams">
                            <b-form-input id="number_of_teams" name="number_of_teams" :state="validateState('number_of_teams')"  type="text" v-model="company.number_of_teams" required></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text title="Unlimited Teams" role="button"  @click="company.number_of_teams='Unlimited'" ><span class="text-danger">Unlimited</span></b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="number_of_teams">Number Of Teams Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Owner Email" class="mb-2" id="email" label="email" label-for="email">
                            <b-form-input :state="validateState('owner')" type="email" v-model="$v.company.owner.$model" required></b-form-input>
                            <b-form-invalid-feedback id="email">Valid Email is required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>

                   
                    <b-col cols="12">
                        <b-input-group prepend="Owner Password" class="mb-2" id="owner_password" label="owner_password" label-for="owner_password">
                            <b-form-input id="owner_password" name="owner_password" :state="validateState('owner_password')" aria-describedby="owner_password" type="text" v-model="$v.company.owner_password.$model" required></b-form-input>
                            <b-form-invalid-feedback id="owner_password">At Least 6 Characters.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                
                    <b-col cols="12">
                        <b-input-group prepend="Add Team"  title="Add Team" id="new_team" class="mb-2">
                            <b-form-input id="add_new_team" name="add_new_team" @keyup.enter="add_team(new_team)"  type="text" v-model="new_team" ></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text title="Add Team (Press Enter key)" role="button" @click="add_team(new_team)">
                                    Add
                                </b-input-group-text>
                            </b-input-group-append>
                        </b-input-group>
                </b-col>
                <b-col cols="12" class="list-group-row" v-if="newTeams.length>0">
                    <h5 class="text-center">Team List</h5>
                    <b-list-group class="w-100">
                        <b-list-group-item v-for="team,index in newTeams" :key="team+index">{{team}} <b-icon icon="trash" class="trash-icon" variant="danger"  title="Remove Team" @click="remove_team(team)"></b-icon></b-list-group-item>
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
    required,email,minLength
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
        }),
        rows() {
            return this.total ? this.total : 1
        }
    },
    data() {
        return {
            perPage: 20,
            new_team: '',
            company: {
                name: '',
                owner:'',
                owner_password:'',
                plan:null,
                number_of_users: 0,
                number_of_teams: 0,
            },
            teamitems: [],
            planitems: [
                {
                    value: 'Basic',
                    text: 'Basic'
                },
                {
                    value: 'Pro',
                    text: 'Pro'
                },
                {
                    value: 'Premium',
                    text: 'Premium'
                },
                {
                    value: 'Alpha Team',
                    text: 'Alpha Team'
                },
            ],
            
            selectedTeams:[],
            newTeams:[],

        }
    },
    validations: {
        company: {
            name: {
                required,
            },
            plan: {
                required
            },
            number_of_users: {
                required
            },
            number_of_teams: {
                required
            },
            owner: {
                required,email
            },
            owner_password: {
                required,minLength: minLength(6)
            },

        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.company[name];
            return $dirty ? !$error : null;
        },
        // addTeam(team) {
        //     // console.log('team', team);
            
        //     let index = this.teamitems.findIndex(x=>x.value.id == team.id);
        //     this.teamitems.splice(index,1);
        //     this.selectedTeams.push(team);
        // },
        // remove(team) {
        //     let index = this.selectedTeams.findIndex(x=>x.id == team.id);
        //     this.selectedTeams.splice(index,1);
        //     this.teamitems.push({value:team,text:team.name});
        // },
        add_team(team) {
            if (team!='' && team!=null) {
                
                if(this.validateAddTeam()){
                    this.newTeams.push(team);
                    this.new_team = '';
                }

            }
            
        },
        remove_team(team) {
            let index = this.newTeams.findIndex(x=>x == team);
            this.newTeams.splice(index,1);
        },

     onSubmit() {
            this.$v.company.$touch();
            if (this.$v.company.$anyError) {
                return;
            }

            if(!this.validateTeamNumber()){
                return ;
            }
            if(this.newTeams.length==0){
                this.$bvToast.toast("Please Add Atleast One Team", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return ;
            }

            // this.company.teamId = [];
            this.company.newTeams = [];

            // this.selectedTeams.map((team)=> {
            //     this.company.teamId.push(team.id);
            // });   
            this.newTeams.map((team)=> {
                this.company.newTeams.push(team);
            });
            
           this.$emit('add', this.company);
        },
        reset() {
            this.company = {
                name: '',
                owner:'',
                owner_password:'',
                plan:null,
                number_of_users: 0,
                number_of_teams: 0,
            };
            this.newTeams = [];
            this.$v.company.$reset();
        },
        validateTeamNumber() {
            if(isNaN(this.company.number_of_users) && this.company.number_of_users!="Unlimited"){
                this.$bvToast.toast("The No. of Users should be Number or Unlimited", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return false;
            }
            if(isNaN(this.company.number_of_teams) && this.company.number_of_teams!="Unlimited"){
                this.$bvToast.toast("The No. of Teams should be Number or Unlimited", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,

                });
                return false;
            }
            if(!isNaN(this.company.number_of_teams) && this.company.number_of_teams!="Unlimited"){
                if(this.newTeams.length>this.company.number_of_teams){
                    this.$bvToast.toast("The No. of Teams is maximum "+this.company.number_of_teams, {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                    return false;
                }
            }
            return true;
        },
        validateAddTeam() {
            if(isNaN(this.company.number_of_teams) && this.company.number_of_teams!="Unlimited"){
                this.$bvToast.toast("The No. of Teams should be Number or Unlimited", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,

                });
                return false;
            }
            if(!isNaN(this.company.number_of_teams) && this.company.number_of_teams!="Unlimited"){
                if(this.newTeams.length>=this.company.number_of_teams){
                    this.$bvToast.toast("The No. of Teams is maximum "+this.company.number_of_teams, {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                    return false;
                }
            }
            return true;
        },
    },
    async created() {
        this.$store.dispatch('uxModule/setLoading');
        this.$store.dispatch('teamModule/getTotal');

        try {
            await this.$store.dispatch("teamModule/getAllTeams", {
                page: 1,
                perPage: this.perPage
            });

            this.teams.map((team) => {
                this.teamitems.push({
                    value: team,
                    text: team.name
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
.list-group-row .list-group{
    overflow-y: scroll;
    max-height:300px;
}
.trash-icon{
    float:right;
    cursor:pointer;
}
</style>
