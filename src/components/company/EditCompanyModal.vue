<template>
  <b-modal v-model="showModal" size="xl" scrollable no-close-on-backdrop>
    <template #modal-header>
      <div class="w-100">Edit Company</div>
    </template>
    <b-container fluid>
      <b-row class="">
        <b-col cols="6">
          <b-input-group
            prepend="Company Name"
            class="mb-2"
            id="name"
            label="Name"
            label-for="name"
          >
            <b-form-input
              id="name"
              name="name"
              :state="validateState('name')"
              aria-describedby="name"
              type="text"
              v-model="$v.company.name.$model"
              required
            ></b-form-input>
            <b-form-invalid-feedback id="name"
              >Company Name is Required.</b-form-invalid-feedback
            >
          </b-input-group>
        </b-col>
        <b-col cols="6">
          <b-input-group prepend="Plan" id="plan" class="mb-2">
            <b-form-select
              v-model="company.plan_id"
              @change="SelectPlan"
              :state="validateState('plan')"
              required
              :options="planitems"
              :readonly="company.custom_plan==1"
              :disabled="company.custom_plan==1"

            ></b-form-select>
            <b-form-invalid-feedback id="plan" 
              >Select a Plan.</b-form-invalid-feedback
            >
          </b-input-group>
        </b-col>

        <b-col cols="6" class="my-1" v-if="company.custom_plan==0">
          <b-input-group
            prepend="No. of Users"
            title="Number Of Users"
            class="mb-2"
          >
            <b-form-input
              type="text"
              :value="company.plan.number_of_users"
              readonly
            ></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="6" class="my-1" v-if="company.custom_plan==0">
          <b-input-group
            prepend="No. of Teams"
            title="Number Of Teams"
            class="mb-2"
            id="number_of_teams"
          >
            <b-form-input
              type="text"
              :value="company.plan.number_of_teams"
              readonly
            ></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="6" class="my-1" v-if="company.custom_plan==1">
          <b-input-group
            prepend="No. of Users"
            title="Number Of Users"
            class="mb-2"
          >
            <b-form-input
              type="text"
              v-model="company.number_of_users"
            ></b-form-input>
            <b-input-group-append>
                                <b-input-group-text title="Unlimited Users" role="button"  @click="company.number_of_users='Unlimited'" ><span class="text-danger">Unlimited</span></b-input-group-text>
                            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col cols="6" class="my-1" v-if="company.custom_plan==1">
          <b-input-group
            prepend="No. of Teams"
            title="Number Of Teams"
            class="mb-2"
            id="number_of_teams"
          >
            <b-form-input
              type="text"
              v-model="company.number_of_teams"
            ></b-form-input>
            <b-input-group-append>
                                <b-input-group-text title="Unlimited Teams" role="button"  @click="company.number_of_teams='Unlimited'" ><span class="text-danger">Unlimited</span></b-input-group-text>
                            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col cols="12">
          <b-input-group class="my-2">
            <span v-b-tooltip.hover title="Custom Plan overwrite the selected plan." class="mr-4">
              <b-icon  icon="info-circle" variant="primary cursor-pointer" role="button"></b-icon> 
            </span>
            <b-form-radio v-model="company.custom_plan"  value='0'>Select Plan</b-form-radio>
            <b-form-radio v-model="company.custom_plan" class="ml-2" value='1'>Custom Plan</b-form-radio>
            
          </b-input-group>
        </b-col>
          <!-- <b-col cols="6">
            <b-input-group
              prepend="Add Team"
              title="Add Team"
              id="new_team"
              class="mb-2"
            >
              <b-form-input
                id="add_new_team"
                name="add_new_team"
                @keyup.enter="add_team(new_team)"
                type="text"
                v-model="new_team"
              ></b-form-input>
              <b-input-group-append>
                <b-input-group-text
                  title="Add Team (Press Enter key)"
                  role="button"
                  @click="add_team(new_team)"
                >
                  Add
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-col> -->
          <!-- <b-col
            cols="6"
            class="list-group-row mb-2"
            v-if="company.teams.length > 0"
          >
            <h5 class="text-center my-1 m-0">
              Team List ({{ company.teams.length }})
            </h5>
            <b-list-group class="w-100">
              <b-list-group-item
                v-for="(team, index) in company.teams"
                :key="team.id + index"
                >{{ team.name }}
                <b-icon
                  icon="trash"
                  v-if="team.id == 'new'"
                  class="trash-icon"
                  title="Delete"
                  variant="danger"
                  @click="remove_team(team)"
                ></b-icon
                ><b-icon
                  v-if="team.id != 'new'"
                  icon="box-arrow-up-right"
                  variant="primary"
                  class="trash-icon mr-2"
                  title="Edit"
                  @click="editTeam(team)"
                ></b-icon
              ></b-list-group-item>
            </b-list-group>
          </b-col> -->
          <b-col cols="12" >
            
          <b-button
          variant="primary"
          size="sm"
          type="button"
          @click="onSubmit"
          class=" float-right"
        >
          Update
        </b-button>
        <b-button variant="primary" class="cursor-pointer float-left mr-2" size="sm"  @click="addMeberMultiSelectTeam()">
                      <b-icon icon="person-plus" aria-hidden="true"></b-icon> Add Member
                </b-button>
        </b-col>
          
      </b-row>
      <hr>
        <b-tabs pills class="activity-tabs">
          <b-tab title="Teams" :active="tab == 'teams'">
            <b-row class="my-2">
                <b-col cols="6">
            <b-input-group
              prepend="Add Team"
              title="Add Team"
              id="new_team"
              class="mb-2"
            >
              <b-form-input
                id="add_new_team"
                name="add_new_team"
                @keyup.enter="add_team(new_team)"
                type="text"
                v-model="new_team"
              ></b-form-input>
              <b-input-group-append>
                <b-input-group-text
                  title="Add Team (Press Enter key)"
                  role="button"
                  @click="add_team(new_team)"
                >
                  Add
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="search_team"
                  debounce="500"
                  @keyup.enter="SEARCHTEAM()"
                  placeholder="Search Team"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-table
              id="list-table"
              small
              striped
              sort-icon-left
              hover
              responsive
              :busy="isBusy"
              :fields="team_fields"
              :items="teamitems"
              :per-page="0"
              :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>

 

              <template v-slot:cell(id)="data">
                <div v-b-tooltip.hover :title="data.item.id">
                  <p class="user-email">{{ data.item.id }}</p>
                </div>
              </template>
              <template v-slot:cell(team_name)="data">
                <div v-b-tooltip.hover :title="data.item.name">
                  {{ data.item.name }}
                </div>
              </template>

              <template v-slot:cell(actions)="data">
                <b-icon
                  icon="box-arrow-up-right"
                  variant="primary"
                  class="mr-2"
                  role="button"
                  title="Team View"
                  @click="editTeam(data.item)"
                ></b-icon
              >
          <!-- <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" title="Edit Team" @click="editItem(data.item)"></b-icon> -->
          <b-icon class="cursor-pointer" variant="danger" icon="trash" title="Delete Team" @click="deleteTeamItem(data.item)"></b-icon>
        </template>
            </b-table>
            
          </b-tab>
          <b-tab title="Company Members" :active="tab == 'teams_members'">
            <b-row class="my-3">
              <b-col cols="6" class="d-flex align-items-center">
                <h3>Company Members</h3> 
                <b-button variant="outline-primary" size="sm" class="cursor-pointer float-right ml-3" @click="addMeberMultiSelectTeam()">
                      <b-icon icon="person-plus" variant="info"></b-icon> Add Member
                </b-button>
              </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="search_user"
                  debounce="500"
                  @keyup.enter="SEARCHUSER()"
                  placeholder="Search User"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-table
              id="list-table"
              small
              striped
              sort-icon-left
              hover
              responsive
              :busy="isBusy"
              :fields="user_fields"
              :items="useritems"
              :per-page="0"
              :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
             
              <template v-slot:cell(id)="data">
                <div v-b-tooltip.hover :title="data.item.id">
                  <p class="user-email">{{ data.item.id }}</p>
                </div>
              </template>
              <template v-slot:cell(name)="data">
                <div v-b-tooltip.hover :title="data.item.name">
                  {{ data.item.name }}
                </div>
              </template>
              <template v-slot:cell(email)="data">
                <div v-b-tooltip.hover :title="data.item.email">
                  {{ data.item.email }}
                </div>
              </template>
              <template v-slot:cell(company_role)="data">
                <div v-b-tooltip.hover :title="role_text[data.item.company_role]">
                  {{ role_text[data.item.company_role] }}
                </div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon  icon="box-arrow-up-right" class="cursor-pointer mr-2" variant="primary" title="View Member" @click="editMember(data.item)"></b-icon> 
                <b-icon
                  class="mr-2 cursor-pointer"
                  icon="gear"
                  variant="primary"
                  title="Set Company Admin"
                  @click="editCompanyAdmin(data.item)"
                ></b-icon>
                <b-icon
                  class="cursor-pointer"
                  variant="danger"
                  icon="trash"
                  title="Remove Memeber"
                  @click="deleteItem(data.item)"
                ></b-icon>
              </template>
            </b-table>
            </b-tab>
        </b-tabs>

    </b-container>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="$emit('cancel')"
        >
          Cancel
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          class="mr-3 float-left"
          @click="$emit('delete')"
          >
              Delete Company
          </b-button>
        
      </div>
    </template>
    <edit-company-admin-modal :showModal="showCompanyAdminModal" :propsData="edit_company_admin" @cancel="showCompanyAdminModal=false" @updateRole="updateCompanyAdmin"></edit-company-admin-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse" title="Are you sure? you want to remove this member from all of this company teams." header="Remove Member"></delete-modal>
    <delete-modal :showModal="showTeamDeleteModal" @cancel="showTeamDeleteModal=false" @modalResponse="modalResponseTeam" title="Are you sure? you want to delete this Team with all of its data" header="Delete Team"></delete-modal>
    <add-member-multi-select-team-modal :showModal="showAddMutliSeletModal" :propsData="addMemberMutliSeletItem" @cancel="showAddMutliSeletModal=false" @addMemberTeamAccess="addMemberTeamAccess"></add-member-multi-select-team-modal>


  </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import { BIcon } from "bootstrap-vue";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import EditCompanyAdminModal from "./EditCompanyAdminModal.vue";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import AddMemberMultiSelectTeamModal from "../../components/companyAdmin/AddMemberMultiSelectTeamModal";

export default {
  mixins: [validationMixin],
  name: "AddTeamMemberModal",
  components: {
    BIcon,
    EditCompanyAdminModal,
    DeleteModal,
    AddMemberMultiSelectTeamModal
  },
  props: {
    showModal: {
      type: Boolean,
    },
    propsData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      isCollapsed: "uxModule/isCollapsed",
      plansList: "planModule/plansList",
      editCompany: 'companyModule/company',

    }),
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
  data() {
    return {
      perPage: 20,
      new_team: "",
      company: {
        name: "",
        number_of_users: '',
        number_of_teams: '',

        plan: {},
      },
      teamitems: [],
      useritems: [],

      planitems: [],
      // Teams:[],
      deletedTeams: [],
      pageOptions: [10, 20, 50],
      currentPage: 1,
      showAddModal: false,
      showUserExistModal: false,
      search_team: "",
      search_user: "",
      tab: "teams",
      isBusy: false,
      itemToDelete: {},
      itemToDeleteTeam: {},
      showDeleteModal: false,
      showTeamDeleteModal: false,

      temp_company: {
        plan: {},
      },
      team_fields: [
        {key:"id", label: "Id", sortable: true},
        // {key: "actions", label: "Actions"},
        {key: "team_name", label: "Team Name", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"actions", label: "Actions"},
    ],
    user_fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "name", label: "Name", sortable: true},
        {key: "email", label: "Email", sortable: true},
        {key: "number_of_teams", label: "# of Teams", sortable: true},
        {key: "company_role", label: "Company Role", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"actions", label: "Actions"},
    ],
    showCompanyAdminModal: false,
    edit_company_admin:{},
    role_text : ['','SuperAdmin','Company Admin','User'],
    showAddMutliSeletModal:false,
    addMemberMutliSeletItem:{},
    };
  },
  validations: {
    company: {
      name: {
        required,
      },
      plan: {
        required,
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.company[name];
      return $dirty ? !$error : null;
    },
    editCompanyAdmin (item) {
          item['company_id'] = this.company.id;
          this.edit_company_admin = item;
          this.showCompanyAdminModal = true;
          console.log('item',item);
  
    },
    async updateCompanyAdmin (user) {
          this.showCompanyAdminModal = false;
          if(user) {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('companyModule/setCompanyAdmin', {...user}).then((response) => {
                if(response.success) {
                    this.$bvToast.toast("Role Updated successfully", {
                    title: "Message",
                    variant: "success",
                    autoHideDelay: 5000,
                    });

                    const newArrMap = this.company.users.map(obj => {
                    if (obj.id === response.user.id) {
                        return {...obj, company_role: response.user.company_role};
                    }

                    return obj;
                    });
                    this.company.users = newArrMap;
                    this.useritems = this.company?.users?this.company.users:[];

                }else{
                    this.$bvToast.toast(response.error, {
                    title: "Validate",
                    variant: "warning",
                    autoHideDelay: 5000,
                    });
                }
            })
            this.$store.dispatch('uxModule/hideLoader')
          }
    },
    async add_team(team) {
      if (team != "" && team != null) {
        if (this.validateAddTeam()) {
            this.$store.dispatch('uxModule/setLoading')
            let Addteam = {'name':team,'company_id':this.company.id};

            await this.$store.dispatch('companyModule/addTeam', {...Addteam}).then((response) => {
                if(response.success) {
                    this.$bvToast.toast("Team Added successfully", {
                    title: "Message",
                    variant: "success",
                    autoHideDelay: 5000,
                    });
                    let response_team = response.team;
                    if(response_team.created_at) {
                        response_team.created_at = response_team.created_at.split('T')[0];
                    }
                    if(response_team.updated_at) {
                        response_team.updated_at = response_team.updated_at.split('T')[0];
                    }
                    this.company.teams.push(response_team);
                    this.teamitems = this.company.teams;
                }else{
                    this.$bvToast.toast(response.error, {
                    title: "Validate",
                    variant: "warning",
                    autoHideDelay: 5000,
                    });
                }
            })
            this.$store.dispatch('uxModule/hideLoader')
        
          this.new_team = "";
        }
      }
    },
    deleteItem(item) {
      if(item.company_role == 2){
        this.$bvToast.toast("You Can't remove to this Company Admin.", {
          title: "Warning",
          variant: 'warning',
          autoHideDelay: 5000,
      });
      return 
      }
      this.showDeleteModal = true;
      this.itemToDelete = item;


      
    },
    async modalResponse(response) {
        this.$store.dispatch('uxModule/setLoading')

      this.showDeleteModal = false;
        if (response) {
            let responseRequest = await this.$store.dispatch('companyAdminModule/removeMember', {'user_id':this.itemToDelete.id,'company_id':this.company.id})
            if(responseRequest.success==true) {

            this.$bvToast.toast(responseRequest.message, {
                title: "Message",
                variant: 'success',
                autoHideDelay: 5000,
            });

            const findIndex = this.company.users.findIndex(({ id }) => id == this.itemToDelete.id)
            findIndex !== -1 && this.company.users.splice(findIndex, 1)
            this.useritems = this.company?.users?this.company.users:[];


            }else{
            this.$bvToast.toast(responseRequest.error, {
                title: "Error",
                variant: 'danger',
                autoHideDelay: 5000,
            });
            }

        }
        this.$store.dispatch('uxModule/hideLoader');
    },
    deleteTeamItem(item) {
      this.showTeamDeleteModal = true;
      this.itemToDeleteTeam = item;

    },
    async modalResponseTeam(response) {
      this.$store.dispatch('uxModule/setLoading')
try{
      this.showTeamDeleteModal = false;
      if (response) {
        let responseRequest = await this.$store.dispatch('teamModule/deleteTeam', this.itemToDeleteTeam.id)
        if(responseRequest.success==true) {

          this.$bvToast.toast(responseRequest.message, {
              title: "Message",
              variant: 'success',
              autoHideDelay: 5000,
          });

          const findIndex = this.company.teams.findIndex(({ id }) => id == this.itemToDeleteTeam.id)
            findIndex !== -1 && this.company.teams.splice(findIndex, 1)
            this.teamitems = this.company?.teams?this.company.teams:[];
            this.$store.dispatch('uxModule/hideLoader');

        }else{
          this.$bvToast.toast(responseRequest.error, {
              title: "Error",
              variant: 'danger',
              autoHideDelay: 5000,
          });
        this.$store.dispatch('uxModule/hideLoader');
        }

      }
    }catch(e){
      console.log('error',e);
      this.$store.dispatch('uxModule/hideLoader');
      
    }
      this.$store.dispatch('uxModule/hideLoader');
    },
    reset() {
      this.company = {
        plan_id: null,
        name: "",
        plan: {},
        teams: [],
      };
      this.deletedTeams = [];
      this.new_team = "";
      this.$v.company.$reset();
    },

    validateAddTeam() {
      if (!this.company.plan.id) {
        this.$bvToast.toast("Please select a plan", {
          title: "Validate",
          variant: "warning",
          autoHideDelay: 5000,
        });
        return false;
      }

      return true;
    },
    onSubmit() {
      this.$v.company.$touch();
      if (this.$v.company.$anyError) {
        return;
      }
      if (!this.validateAddTeam()) {
        return;
      }


      if(this.company.custom_plan == 1){
        if((isNaN(this.company.number_of_users) && this.company.number_of_users!="Unlimited") || this.company.number_of_users==''){
          this.$bvToast.toast("The No. of Users should be Number or Unlimited", {
              title: "Validate",
              variant: 'warning',
              autoHideDelay: 5000,
          });
          return ;
      }
      if((isNaN(this.company.number_of_teams) && this.company.number_of_teams!="Unlimited") || this.company.number_of_teams==''){
          this.$bvToast.toast("The No. of Teams should be Number or Unlimited", {
              title: "Validate",
              variant: 'warning',
              autoHideDelay: 5000,
          });
          return ;
      }

      }



      this.$emit("save", this.company);
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
    SelectPlan(plan_id) {
      const findIndex = this.plansList.findIndex(({ id }) => id == plan_id);
      let selsectedPlan = this.plansList[findIndex];
      this.company.plan = selsectedPlan;
    },
    editMember(user) { 

    if(user?.id){
        let user_id = user.id;
        const route = '/users?id=' + user_id;
        let routeData = this.$router.resolve({path: route});
        window.open(routeData.href, '_blank');
        
    }else{
        this.$bvToast.toast('user id not found', {
            title: "Validate",
            variant: 'danger',
            autoHideDelay: 5000,
        });
    }

    },
    SEARCHTEAM(){
        if (this.search_team != '' && this.search_team) {
        this.teamitems = this.company.teams.filter((item) => {
            return item.name
                .toUpperCase()
                .includes(this.search_team.toUpperCase())
            })
            return this.teamitems
        }
        this.teamitems = this.company.teams;

        
    },
    SEARCHUSER(){
        if (this.search_user != '' && this.search_user) {
            try{
        this.useritems = this.company.users.filter((item) => {
            return (item.name.toUpperCase().includes(this.search_user.toUpperCase()) || item.email.toUpperCase().includes(this.search_user.toUpperCase()))
            })
        }catch (error) {
            console.log('ERROR',error);
            
        }
            return this.useritems
        }
        this.useritems = this.company.users;

        
    },
    async addMeberMultiSelectTeam() {

      this.addMemberMutliSeletItem['company_id'] = this.company?.id;
      this.addMemberMutliSeletItem['teams'] = this.company?.teams?this.company.teams:[];
      this.addMemberMutliSeletItem['userTeamIds'] = [];      

      this.showAddMutliSeletModal = true;

    },
    async addMemberTeamAccess(user) {
      if(user) {
        
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('companyAdminModule/addMemberTeamAccess', {...user}).then((response) => {
                if(response.success) {
                    this.$bvToast.toast("Member Added Successfully with Team Access", {
                    title: "Message",
                    variant: "success",
                    autoHideDelay: 5000,
                    });

                    // const newArrMap = this.company.users.map(obj => {
                    // if (obj.id === response.user.id) {
                    //     return {...obj, userTeamIds: response.user.userTeamIds,number_of_teams: response.user.number_of_teams};
                    // }

                    // return obj;
                    // });
                    response.user.created_at = response.user.created_at.split('T')[0];
                    response.user.updated_at = response.user.updated_at.split('T')[0];
                    this.company.users.push(response.user);
                    // this.company.users = newArrMap;
                    this.useritems = this.company?.users?this.company.users:[];
                    this.showAddMutliSeletModal = false;

                }else{
                    this.$bvToast.toast(response.error, {
                    title: "Error",
                    variant: "danger",
                    autoHideDelay: 5000,
                    });

                }
            })
            this.$store.dispatch('uxModule/hideLoader')
          }
      
    },

  },

  watch: {
    async showModal() {
      try {
        this.deletedTeams = [];
        if (this.showModal) {
          this.temp_company = Object.assign({}, { ...this.propsData });


          this.$store.dispatch("uxModule/setLoading");

          await this.$store.dispatch('companyModule/getCompany', this.temp_company.id).then(() => {
                this.company = this.editCompany ? this.editCompany : {};
                this.teamitems = this.company?.teams?this.company.teams:[];
                this.useritems = this.company?.users?this.company.users:[];
                })

            this.$store.dispatch("uxModule/hideLoader");

        }
      } catch (error) {
        this.$store.dispatch("uxModule/hideLoader");

        console.log(error);
      }
    },
    search_team() {
        this.SEARCHTEAM();
    },
    search_user() {
        this.SEARCHUSER();
    },
    

  },
};
</script>

<style scoped>
.input-helper {
  text-align: start;
}
.list-group-row .list-group {
  overflow-y: scroll;
  max-height: 200px;
}
.trash-icon {
  float: right;
  cursor: pointer;
}
table td div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px !important;
    cursor:pointer;
}
</style>
