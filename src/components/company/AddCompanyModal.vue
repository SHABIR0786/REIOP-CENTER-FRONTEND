<template>
<b-modal v-model="showModal" size="xl" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Add Company
        </div>
    </template>
        <b-container fluid>
                <b-row class="">
                    <b-col cols="12" lg="6" md="12">
                    <b-col cols="12" class="mb-3">
                        <b-input-group prepend="Company Name" v-b-tooltip.hover title="Company Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input id="name" name="name" :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.company.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">Company Name is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12" class="my-3">
                        <b-input-group prepend="Plan" id="plan" class="mb-2">
                          <b-form-select v-model="company.plan" v-b-tooltip.hover title="Company Plan" :state="validateState('plan')" required :searchable="true" :options="planitems"></b-form-select>
                          <b-form-invalid-feedback id="plan" class="text">Select a Plan.</b-form-invalid-feedback>
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
                            <b-input-group prepend="Team Name" title="Team Name" id="new_team" class="mb-2">
                                <b-form-input id="add_new_team" name="add_new_team" @keyup.enter="addTeam(new_team)"  type="text" v-model="new_team" ></b-form-input>
                                <b-input-group-append>
                                    <b-input-group-text v-b-tooltip.hover title="Add Team (Press Enter key)" role="button" @click="addTeam(new_team)">
                                        Add
                                    </b-input-group-text>
                                </b-input-group-append>
                            </b-input-group>
                    </b-col>
                    <b-col cols="12" class="list-group-row" v-if="newTeams.length>0">
                        <h5 class="text-center">Team List ({{newTeams.length}})</h5>
                        <b-list-group class="w-100">
                            <b-list-group-item v-for="team,index in newTeams" :key="team+index">{{team}} <b-icon icon="trash" class="trash-icon" variant="danger"  title="Remove Team" @click="removeTeam(team)"></b-icon></b-list-group-item>
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
            plansList: 'planModule/plansList',
        }),
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
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.company[name];
            return $dirty ? !$error : null;
        },
        addTeam(team) {
            if (team!='' && team!=null) {
                if(this.validateAddTeam()){
                    this.newTeams.push(team);
                    this.new_team = '';
                }
            }
        },
        removeTeam(team) {
            let index = this.newTeams.findIndex(x=>x == team);
            this.newTeams.splice(index,1);
        },

        onSubmit() {
            this.$v.company.$touch();
            if (this.$v.company.$anyError) {
                return;
            }
            if(this.newTeams.length==0){
                this.$bvToast.toast("Please Add Atleast One Team", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return ;
            }
            if(this.company.plan.number_of_teams!="Unlimited"){
                if(this.newTeams.length>this.company.plan.number_of_teams){
                    this.$bvToast.toast("Please Select Plan according to Team List", {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
    
                    });
                    return false;
                }
            }

            this.company.newTeams = [];  
            this.newTeams.map((team)=> {
                this.company.newTeams.push(team);
            });
            
           this.$emit('add', this.company);
        },
        reset() {
            this.company = {
                name: '',
                plan:{},
            };
            this.new_team ='';
            this.newTeams = [];
            this.$v.company.$reset();
        },
        validateAddTeam() {
            if(!(this.company.plan?.number_of_teams)){
                this.$bvToast.toast("Please Select a Plan", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,

                });
                return false;
            }
            if(this.company.plan.number_of_teams!="Unlimited"){
                if(this.newTeams.length>=this.company.plan.number_of_teams){
                    this.$bvToast.toast("The Plan is Completed.", {
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
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("planModule/getPlansList");
            this.plansList.map((plan) => {
                this.planitems.push({
                    value: plan,
                    text: plan.name
                });
            });
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
        this.$store.dispatch('uxModule/hideLoader')
        }

    },
    watch:{
        async showModal(){
            if(this.showModal){
                this.reset();
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
    max-height:250px;
}
.trash-icon{
    float:right;
    cursor:pointer;
}
</style>
