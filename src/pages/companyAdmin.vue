<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
        <b-row>                 
          <b-col cols="4">
            <h3>Company Admin</h3>
            
          </b-col>
          <b-col cols="8">
              
              <b-input-group prepend="Company Name" class="mb-2">
                  <b-form-input :readonly="true" :value="company.name" ></b-form-input>
                  <b-button variant="primary" class="cursor-pointer" @click="showSwitchCompanyModal=true">
                  <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon> Switch Company
                </b-button>
              </b-input-group>
              
              
          </b-col>
          </b-row>
        <hr>
        <b-tabs pills class="activity-tabs">
          <b-tab title="Teams" :active="tab == 'teams'">
            <b-row class="my-2">
                <b-col cols="6">
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
            </b-table>
       
          </b-tab>
          <b-tab title="Company Members" :active="tab == 'teams_members'">
            <b-row class="my-3">
              <b-col cols="6" class="d-flex align-items-center">
                <h3>Company Members</h3>
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
                <div v-b-tooltip.hover :title="data.item.company_role">
                  {{ role_text[data.item.company_role] }}
                </div>
              </template>
              <template v-slot:cell(actions)="data">
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
                  title="Delete Team"
                  @click="deleteItem(data.item)"
                ></b-icon>
              </template>
            </b-table>
            
          </b-tab>
        </b-tabs>


        <switch-company-modal :showModal="showSwitchCompanyModal"  @cancel="showSwitchCompanyModal=false" :company_id="company_id" @switchCompany="switchCompanyAdmin"></switch-company-modal>

    </div>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import SwitchCompanyModal from "../components/company/SwitchCompanyModal.vue";

export default {
  name: "CompanyAdmin",
  components: {
    BIcon,
    SwitchCompanyModal
  },
  data () {
    return {
      isBusy: false,
      showModal: false,
      perPage: 20,
      currentPage: 1,
      editedItem: {},
      showDeleteModal: false,
      itemToDelete: {},
      pageOptions: [10, 20, 50],
      search_team: '',
      search_user:'',
      showAddModal: false,
      showEditModal: false,
      showUserExistModal: false,
      company: {},
      tab : "teams",
      role_text : ['','SuperAdmin','Company Admin','User'],
      showSwitchCompanyModal:true,
      teamitems: [],
      useritems: [],
      company_id:'',
      team_fields: [
        {key:"id", label: "Id", sortable: true},
        // {key: "actions", label: "Actions"},
        {key: "team_name", label: "Team Name", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
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
      
    }
  },
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
      authUser: 'loginModule/getAuthUser',
      // team_fields:'companyAdminModule/team_fields',
      // user_fields:'companyAdminModule/user_fields',
      editCompany: 'companyAdminModule/company',



    }),
  },
  async created () {
    this.switchCompanyAdmin();
  },
  methods: {

    editItem(item) {
      console.log('item',item);
      
    },
    deleteItem(item) {
      this.$bvToast.toast("Some Functionality is in progress", {
          title: "in progress",
          variant: 'success',
          autoHideDelay: 5000,
      });
      console.log('item',item);
      
    },editCompanyAdmin(item) {
      this.$bvToast.toast("Some Functionality is in progress", {
          title: "in progress",
          variant: 'success',
          autoHideDelay: 5000,
      });
      console.log('item',item);
      
    },
    save(item) {
      // this.showModal = false
      this.$store.dispatch('companyAdminModule/editTeam', {...item})
    },
    async add(item) {
      this.showAddModal = false
          await this.$store.dispatch('companyAdminModule/addTeam', {...item}).then((response) => {
            if (response.team === 'user_exist'){
              this.$store.dispatch('companyAdminModule/filledData', {...response.teamData})
              this.showUserExistModal = true;
            }
          })
          this.$store.dispatch("companyAdminModule/getAllTeams", {page: 1, perPage: this.perPage})
    },
    async switchCompanyAdmin(company=null){
      try {
      this.$store.dispatch("uxModule/setLoading");
        if(company){
          this.company_id = company.id;
        }
        let data = {'company_id':this.company_id,'user_id':this.authUser.id}
      await this.$store.dispatch('companyAdminModule/getCompany', data).then((response) => {
        if(response.success){
          this.company = this.editCompany ? this.editCompany : {};
          this.teamitems = this.company?.teams?this.company.teams:[];
          this.useritems = this.company?.users?this.company.users:[];
          this.company_id = this.company.id
        }else{
          this.$bvToast.toast(response.error, {
              title: "Validate",
              variant: 'danger',
              autoHideDelay: 5000,
          });
        }

      })

        this.$store.dispatch('uxModule/hideLoader')
      } catch (error) {
        this.$store.dispatch('uxModule/hideLoader')
        console.log('error',error);
        
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

        
    }

  },
  mounted() {},
  watch: {
    search_team() {
        this.SEARCHTEAM();
    },
    search_user() {
        this.SEARCHUSER();
    },
  }
}
</script>

<style scoped>
  .filter-icon {
    font-size: 25px;
  }
  table th {
    vertical-align: inherit !important;
    height: 64px;
  }
</style>
