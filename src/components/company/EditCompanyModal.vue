<template>
<b-modal v-model="showModal" size="xl" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Edit Company
        </div>
    </template>
        <b-container fluid>
                <b-row class="">
                    <b-col cols="12" lg="6" md="12">

                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input id="name" name="name" :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.company.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">Company Name is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                
                    <b-col cols="12">
                        <b-input-group prepend="Plan" id="plan" class="mb-2">
                          <b-form-select v-model="company.plan_id" @change="SelectPlan" :state="validateState('plan')" required :options="planitems"></b-form-select>
                          <b-form-invalid-feedback id="plan" class="text-center">Select a Plan.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                
                    
                
                    <b-col cols="12" class="my-3">
                        <b-input-group prepend="No. of Users" title="Number Of Users" class="mb-2">
                            <b-form-input  type="text" :value="company.plan.number_of_users" readonly></b-form-input>
                        </b-input-group>
                </b-col>
                <b-col cols="12" class="my-3">
                        <b-input-group prepend="No. of Teams" title="Number Of Teams" class="mb-2" id="number_of_teams">
                            <b-form-input  type="text" :value="company.plan.number_of_teams" readonly></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-col>

                <b-col cols="12" lg="6" md="12">

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
                <b-col cols="12" class="list-group-row mb-2" v-if="company.teams.length>0">
                    <h5 class="text-center my-1 m-0">Team List ({{company.teams.length}})</h5>
                    <b-list-group class="w-100">
                        <b-list-group-item v-for="team,index in company.teams" :key="team.id+index">{{team.name}} <b-icon icon="trash" v-if="team.id=='new'" class="trash-icon" title="Delete" variant="danger" @click="remove_team(team)"></b-icon><b-icon v-if="team.id!='new'" icon="box-arrow-up-right" variant="primary" class="trash-icon mr-2" title="Edit"  @click="editTeam(team)"></b-icon></b-list-group-item>
                    </b-list-group>
                </b-col>
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
            plansList: 'planModule/plansList',
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
                plan:{},

            },
            teamitems: [],
            planitems: [],
            // Teams:[],
            deletedTeams:[],

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
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.company[name];
            return $dirty ? !$error : null;
        },

        add_team(team) {            
            if (team!='' && team!=null) {
                if(this.validateAddTeam()){
                    var newTeam = {};
                    newTeam['id'] = 'new';
                    newTeam['name'] = team;
                    this.company.teams.push(newTeam);
                    this.new_team = '';
                }
            }            
        },
        remove_team(team) {
            if(team.id=="new"){
                let index = this.company.teams.findIndex(x=>(x.name == team.name && x.id==team.id));
                this.company.teams.splice(index,1);

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
                plan_id:null,
                name: '',
                plan:{},
                teams:[]

            };
            this.deletedTeams = [];
            this.new_team= '';
            this.$v.company.$reset();
        },
        validateTeamNumber() {

            if(!this.company.plan.id){
                this.$bvToast.toast("Please select a plan", {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                    return false;
            }

            if(!isNaN(this.company.plan.number_of_teams) && this.company.plan.number_of_teams!="Unlimited"){
                if(this.company.teams.length>this.company.plan.number_of_teams){
                    this.$bvToast.toast("The No. of Teams is maximum "+this.company.plan.number_of_teams, {
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
            if(!this.company.plan.id){
                
                this.$bvToast.toast("Please select a plan", {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                    return false;

            }
            if(!isNaN(this.company.plan.number_of_teams)){
                if(this.company.teams.length>=this.company.plan.number_of_teams){
                    this.$bvToast.toast("The No. of Teams is maximum "+this.company.plan.number_of_teams, {
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


            
           this.$emit('save', this.company);
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
        SelectPlan(plan_id){
            const findIndex = this.plansList.findIndex(({ id }) => id == plan_id);
            let selsectedPlan = this.plansList[findIndex];
            this.company.plan = selsectedPlan;   
        }
    },
    async created() {
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("planModule/getPlansList");
            this.plansList.map((plan) => {
                this.planitems.push({
                    value: plan.id,
                    text: plan.name
                });
            });

            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
        this.$store.dispatch('uxModule/hideLoader')
        }
    },
    watch: {
        showModal() {
        try {
            this.deletedTeams = [];
            if(this.showModal) {                
                this.company = Object.assign({},{...this.propsData});
                this.company.plan_id = this.company.plan?.id;
                this.company.plan = this.company.plan?.id?this.propsData.plan:{};
            }
        } catch (error) {
        console.log(error);
        
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
