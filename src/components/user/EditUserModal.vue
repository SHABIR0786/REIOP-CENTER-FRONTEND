<template>
<b-modal v-model="showModal" size="huge" no-close-on-backdrop scrollable class="my-0 p-0">
    <template #modal-header>
        <div class="w-100">
            Edit User
        </div>
    </template>
        <b-container fluid>
            <b-row class="mb-1">
                    <b-col cols="6">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.user.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">User Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="6">
                        <b-input-group prepend="Email" class="mb-2" >
                            <b-form-input type="email" :value="user.email" disabled></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="6">
                        <b-input-group prepend="Password" class="mb-2">
                            <b-input v-model="user.password" ></b-input>
                        </b-input-group>
                        <small class="text-primary">If Empty, By Default set Previous Password.</small>

                    </b-col>
                </b-row>
                <hr>
                <b-row>
      <h5>User has Access in Companies/Teams</h5>


                                <b-table
                                id="list-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                responsive
                                :fields="company_fields"
                                :items="companyitems"
                                :sticky-header="true"

                                >

            <template #head(show_details)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
            </template>
            <template #head(name)="scope">
                <div class="text-nowrap" style="width: 250px;">{{scope.label}}</div>
            </template>

              <template v-slot:cell(id)="data">
                <div v-b-tooltip.hover :title="data.item.id">
                  <p class="user-email">{{ data.item.id }}</p>
                </div>
              </template>
              <template v-slot:cell(name)="data">
                  <div v-b-tooltip.hover :title="data.item.name">
                    <b-icon  icon="box-arrow-up-right" variant="primary" class="mr-2 cursor-pointer" role="button" title="Company View" @click="editCompany(data.item)" ></b-icon>
                  {{ data.item.name }}
                </div>
              </template>

              <template #cell(show_details)="row">
        
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                            {{ row.detailsShowing ? 'Hide' : 'Show'}} Teams
                </b-button>

                <!-- <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Teams
        </b-form-checkbox> -->
      </template>

      <template #row-details="row">
        <div class="w-100 mw-100 p-0 m-0"  v-if="row.item.teams.length>0">
                      <b-card class="details-card text-center">
            <b-table
                                id="list-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                responsive
                                :fields="team_fields"
                                :items="row.item.teams"
                                :sticky-header="true"
                                :bordered="true"
                                head-variant="light"
                                class="border border-primary m-0 p-0"
                                >

 
            <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 20px;">{{scope.label}}</div>
            </template>
              <template v-slot:cell(id)="data">
                <div v-b-tooltip.hover :title="data.item.id">
                  <p class="user-email">{{ data.item.id }}</p>
                </div>
              </template>
              <template v-slot:cell(name)="data">
                <div v-b-tooltip.hover :title="data.item.name">
                    <b-icon
                  icon="box-arrow-up-right"
                  variant="primary"
                  class="mr-2"
                  role="button"
                  title="Team View"
                  @click="editTeam(data.item)"
                ></b-icon>
                  {{ data.item.name }}
                </div>
              </template>
            </b-table>
        </b-card>
                    </div>

      </template>


              <template v-slot:cell(actions)="data">
                <b-icon  icon="box-arrow-up-right" variant="primary" class="mr-1 cursor-pointer" role="button" title="Company View" @click="editCompany(data.item)" ></b-icon>
              </template>
            </b-table>

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
                <b-button
                    variant="transparent"
                    size="sm"
                    class="mr-3 float-left"
                    @click="$emit('status_modal')"
                    v-b-tooltip.hover title="User Status"
                    >
                    <b-icon class="cursor-pointer" variant="danger" icon="gear" ></b-icon> Status
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required,
    // minLength,
    // email
} from "vuelidate/lib/validators";
import {
    mapGetters
} from "vuex";
export default {
    mixins: [validationMixin],
    name: 'EditUserModal',
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

        }),
    },
    data() {
        return {
            perPage: 20,
            user: {
                name: '',
                email: '',
                password: '',

            },
        team_fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "name", label: "Team Name", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        

    ],
    company_fields: [
        {key:"id", label: "Id", sortable: true},
        {key:"show_details", label: "Teams"},
        {key: "name", label: "Company Name", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        

    ],
    companyitems: [],


        }
    },
    validations: {
        user: {
            name: {
                required
            },
            // password: {
            //     required,
            //     minLength: minLength(6)
            // }
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

        onSubmit() {
            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                console.log('validation error');
                
                return;
            }
            if(this.user.password.length > 0 && this.user.password.length < 6) {

                this.$bvToast.toast("Password Field should be minimum 6 character", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return;

            }
            // console.log('this.user', this.user);
            
           this. $emit('save', this.user);
        },
        editCompany(item) { 
            let company_id = item?.id;
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
        if (team_id) {
            const route = "/teams?id=" + team_id;
            let routeData = this.$router.resolve({ path: route });
            window.open(routeData.href, "_blank");
        } else {
            this.$bvToast.toast("Team Id not found", {
            title: "Validate",
            variant: "warning",
            autoHideDelay: 5000,
            });
        }
    },
    },
    async created() {

    },
            watch: {
            showModal() {
                if(this.showModal){
                    this.user= {...this.propsData};
                    this.user.password = '';
                    let temp_companies = [];
                    temp_companies = this.propsData?.companies?this.propsData.companies:[];
                    temp_companies.forEach(e => {
                        e.created_at = e.created_at.split('T')[0];
                        e.updated_at = e.updated_at.split('T')[0];
                        let teams = e?.teams?e.teams:[];
                            teams.forEach(ee => {
                            ee.created_at = ee.created_at.split('T')[0];
                            ee.updated_at = ee.updated_at.split('T')[0];
                        })
                        e['teams'] = teams;
                    })
                    this.companyitems = [...temp_companies]

                    

                }
            }
        }

    
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
table td div.w_100{
    width: 100% !important;
}
</style>
