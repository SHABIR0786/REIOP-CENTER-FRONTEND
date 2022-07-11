<template>
<b-modal v-model="showModal" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Add Company
        </div>
    </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input id="name" name="name" :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.company.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Plan" id="plan" class="mb-2">
                          <b-form-select v-model="company.plan" :state="validateState('plan')" required :options="planitems"></b-form-select>
                          <b-form-invalid-feedback id="plan" class="text-center">Plan Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="No. of Users" title="Number Of Users" class="mb-2" id="number_of_users" label="Number Of Users" label-for="number_of_users">
                            <b-form-input id="number_of_users" name="number_of_users" :state="validateState('number_of_users')"  type="text" v-model="company.number_of_users" required></b-form-input>
                            
                            <template #append>
                            <b-button  variant="light" title="Unlimited" size="sm" @click="company.number_of_users='Unlimited'">
                                Unlimited
                            </b-button>
                            </template>
                            
                            <b-form-invalid-feedback id="number_of_users">Number Of Users Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                        
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="No. of Teams" title="Number Of Teams" class="mb-2" id="number_of_teams" label="Number Of Teams" label-for="number_of_users">
                            <b-form-input id="number_of_teams" name="number_of_teams" :state="validateState('number_of_teams')"  type="text" v-model="company.number_of_teams" required></b-form-input>
                            <template #append>
                            <b-button variant="light" title="Unlimited" size="sm" @click="company.number_of_teams='Unlimited'">
                                Unlimited
                            </b-button>
                            </template>

                            <b-form-invalid-feedback id="number_of_users">Number Of Teams Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Add Team" id="team_id" class="mb-2">
                          <b-form-select @change="addTeam" :options="teamitems"></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row>
                
                <b-row class="list-group-row">
                    <b-col cols="12">
                <h4>Teams</h4>
                <b-list-group class="w-100">
                    <b-list-group-item v-for="team in selectedTeams" :key="team.id">{{team.name}} <b-icon icon="trash" class="trash-icon" variant="danger" @click="remove(team)"></b-icon></b-list-group-item>
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
    required
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
            company: {
                name: '',
                plan:null,
                number_of_users: null,
                number_of_teams: null,
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
            
            selectedTeams:[]
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
        addTeam(team) {
            console.log('team', team);
            
            let index = this.teamitems.findIndex(x=>x.value.id == team.id);
            this.teamitems.splice(index,1);
            this.selectedTeams.push(team);
        },
        remove(team) {
            let index = this.selectedTeams.findIndex(x=>x.id == team.id);
            this.selectedTeams.splice(index,1);
            this.teamitems.push({value:team,text:team.name});
        },
        onSubmit() {
            this.$v.company.$touch();
            if (this.$v.company.$anyError) {
                return;
            }
            this.company.teamId = [];
            this.selectedTeams.map((team)=> {
                this.company.teamId.push(team.id);
            });            
           this. $emit('add', this.company);
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
    max-height:200px;
}
.trash-icon{
    float:right;
    cursor:pointer;
}
</style>
