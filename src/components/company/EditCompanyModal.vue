<template>
<b-modal v-model="showModal" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Edit Company
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
                          <b-form-invalid-feedback id="plan" class="text-center">Plan Field is Required.</b-form-invalid-feedback>
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
                        <b-input-group prepend="Add Team"  title="Add Team" id="new_team" class="mb-2">
                            <b-form-input id="add_new_team" name="add_new_team" @keyup.enter="add_team(new_team)"  type="text" v-model="new_team" ></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text title="Add Team (Press Enter key)" role="button" @click="add_team(new_team)">
                                    Add
                                </b-input-group-text>
                            </b-input-group-append>
                        </b-input-group>
                </b-col>
                <b-col cols="12" class="list-group-row mb-2" v-if="Teams.length>0">
                    <h5 class="text-center my-1 m-0">Team List</h5>
                    <b-list-group class="w-100">
                        <b-list-group-item v-for="team,index in Teams" :key="team.id+index">{{team.name}} <b-icon icon="trash" v-if="team.id=='new'" class="trash-icon" variant="danger" @click="remove_team(team)"></b-icon></b-list-group-item>
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
                    Update
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import {BIcon} from "bootstrap-vue";
import {
    required
} from "vuelidate/lib/validators";
import {
    mapGetters
} from "vuex";
export default {
    mixins: [validationMixin],
    name: 'AddTeamMemberModal',
    components: {
        BIcon,
    },
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
            Teams:[],
            deletedTeams:[],
            newTeams:[],

            showAddModal: false,
            showUserExistModal: false,
        }
    },
    validations: {
        company: {
            name: {
                required
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
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.company[name];
            return $dirty ? !$error : null;
        },
        // addTeam(team) {
        //     let index = this.teamitems.findIndex(x=>x.value.id == team.id);
        //     this.teamitems.splice(index,1);
        //     this.Teams.push(team);
        // },
        // remove(team) {
        //     let index = this.Teams.findIndex(x=>x.id == team.id);
        //     this.Teams.splice(index,1);
        //     this.teamitems.push({value:team,text:team.name});
        // },

        add_team(team) {            
            if (team!='' && team!=null) {
                if(this.validateAddTeam()){
                    var newTeam = {};
                    newTeam['id'] = 'new';
                    newTeam['name'] = team;
                    this.Teams.push(newTeam);
                    this.newTeams.push(team);
                    this.new_team = '';
                }
            }            
        },
        remove_team(team) {
            if(team.id=="new"){
                let index = this.Teams.findIndex(x=>(x.name == team.name && x.id==team.id));
                this.Teams.splice(index,1);
                let index1 = this.newTeams.findIndex(x=>x == team);
                this.newTeams.splice(index1,1);

            }else{
                let index = this.Teams.findIndex(x=>x.id == team.id);
                this.Teams.splice(index,1);
                this.deletedTeams.push(team.id);                
            }

        },

        // async add(item) {
        //     this.showAddModal = false
        //     this.$store.dispatch('uxModule/setLoading')

        //   await this.$store.dispatch('teamModule/addTeam', {...item}).then((response) => {
        //     if (response.team === 'user_exist'){
        //       this.$store.dispatch('teamModule/filledData', {...response.teamData})
        //       this.showUserExistModal = true;
        //     }else{
        //         this.Teams.push(response.team);
        //     }
        //   })
        //   this.$store.dispatch('uxModule/hideLoader')
        // },
        reset() {
            this.company = {
                name: '',
                plan:null,
                number_of_users: 0,
                number_of_teams: 0,

            };
            this.newTeams = [];
            this.deletedTeams = [];
            this.Teams = [];
            this.new_team= '';
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
                if(this.Teams.length>this.company.number_of_teams){
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
                if(this.Teams.length>=this.company.number_of_teams){
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
        onSubmit() {
            this.$v.company.$touch();
            if (this.$v.company.$anyError) {
                return;
            }
            if(!this.validateTeamNumber()){
                return ;
            }
            this.company.deletedTeams = [];
            this.company.newTeams = [];

            this.company.deletedTeams = this.deletedTeams;
            this.company.newTeams = this.newTeams;

            // this.Teams.map((team)=> {
            //     this.company.teamId.push(team.id);
            // });
            console.log('this.company',this.company);
            
           this.$emit('save', this.company);
        },
    },
    async created() {
        // this.$store.dispatch('uxModule/setLoading');
        // this.$store.dispatch('teamModule/getTotal');
        
        // try {
        //     await this.$store.dispatch("teamModule/getAllTeams", {
        //         page: 1,
        //         perPage: this.perPage
        //     });

        //     this.teams.map((team) => {
        //         this.teamitems.push({
        //             value: team,
        //             text: team.name
        //         });
        //     });

        //     this.$store.dispatch('uxModule/hideLoader')
        // } catch (error) {
        //     this.$store.dispatch('uxModule/hideLoader')
        // }
    },
    watch: {
        showModal() {
            this.Teams = [];
            this.deletedTeams = [];
            if(this.showModal) {
                this.company = Object.assign({},{...this.propsData});
                this.Teams = [];
                this.Teams = this.company.teams;
            }
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
    max-height:200px;
}
.trash-icon{
    float:right;
    cursor:pointer;
}
</style>
