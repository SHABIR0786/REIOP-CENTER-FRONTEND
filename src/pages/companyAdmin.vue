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
                  <b-button variant="primary" class="cursor-pointer mx-1" @click="addMeberMultiSelectTeam()">
                      <b-icon icon="person-plus" aria-hidden="true"></b-icon> Add Member
                </b-button>
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
                  debounce="1000"
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
                  class="mr-2 cursor-pointer"
                  icon="pencil"
                  variant="primary"
                  title="Edit Team Name"
                  @click="editSelectedTeam(data.item)"
                ></b-icon>
                
                <!-- <b-icon
                  class="cursor-pointer"
                  variant="danger"
                  icon="trash"
                  title="Delete Team"
                  @click="xyz(data.item)"
                ></b-icon> -->
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
                  debounce="1000"
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
              <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 20px;">{{scope.label}}</div>
              </template>
              <template #head(id)="scope">
                <div class="text-nowrap" style="width: 10px;">{{scope.label}}</div>
              </template>
              <template #head(name)="scope">
                <div class="text-nowrap" style="width: 100px;">{{ scope.label }}</div>
              </template>
              <template #head(email)="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template #head(number_of_teams)="scope">
                <div style="width: 40px;">{{scope.label}}</div>
              </template>
              <template #head(company_role)="scope">
                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
              </template>
              
              <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 20px;">{{ scope.label }}</div>
              </template>
              <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 20px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(id)="data">
                <div v-b-tooltip.hover :title="data.item.id">
                  <p >{{ data.item.id }}</p>
                </div>
              </template>
              <template v-slot:cell(name)="data">
                <p v-b-tooltip.hover :title="data.item.name">
                  {{ data.item.name }}
                </p>
              </template>
              <template v-slot:cell(email)="data">
                <p class="text-nowrap" v-b-tooltip.hover :title="data.item.email">
                  {{ data.item.email }}
                </p>
              </template>
              <template v-slot:cell(company_role)="data">
                <p v-b-tooltip.hover :title="role_text[data.item.company_role]">
                  {{ role_text[data.item.company_role] }}
                </p>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon
                  class="mr-2 cursor-pointer"
                  icon="pencil"
                  variant="primary"
                  title="Select Teams , Edit Role"
                  @click="editMultiSelectTeam(data.item)"
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
        <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse" title="Are you sure? you want to remove this member from all of this company teams." header="Remove Member"></delete-modal>
        <multi-select-team-modal :showModal="showMutliSeletModal" :propsData="editMutliSeletItem" @cancel="showMutliSeletModal=false" @updateTeamAccess="updateTeamAccess" @updateRole="updateCompanyAdmin"></multi-select-team-modal>
        <edit-team-admin-modal :showModal="showEditTeamModal" :propsData="editTeam" @cancel="showEditTeamModal=false" @save="updateTeamName"></edit-team-admin-modal>
        <add-member-multi-select-team-modal :showModal="showAddMutliSeletModal" :propsData="addMemberMutliSeletItem" @cancel="showAddMutliSeletModal=false" @addMemberTeamAccess="addMemberTeamAccess"></add-member-multi-select-team-modal>

    </div>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import SwitchCompanyModal from "../components/company/SwitchCompanyModal.vue";
import DeleteModal from "../components/deleteModal/DeleteModal";
import MultiSelectTeamModal from "../components/companyAdmin/MultiSelectTeamModal";
import EditTeamAdminModal from "../components/teamAdmin/EditTeamAdminModal";
import AddMemberMultiSelectTeamModal from "../components/companyAdmin/AddMemberMultiSelectTeamModal";


export default {
  name: "CompanyAdmin",
  components: {
    BIcon,
    SwitchCompanyModal,
    DeleteModal,
    MultiSelectTeamModal,
    EditTeamAdminModal,
    AddMemberMultiSelectTeamModal
  },
  data () {
    return {
      isBusy: false,
      showModal: false,
      perPage: 20,
      currentPage: 1,
      editMutliSeletItem: {},
      showDeleteModal: false,
      itemToDelete: {},
      pageOptions: [10, 20, 50],
      search_team: '',
      search_user:'',
      showAddModal: false,
      showEditTeamModal: false,
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
    bulkSelectItems:[],
    allTeamIds:[],
    showMutliSeletModal:false,
    editTeam:{},
    showAddMutliSeletModal:false,
    addMemberMutliSeletItem:{},

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
    editMultiSelectTeam(item) {
      // console.log('this.company',this.company);
  
      item['company_id'] = this.company?.id;
      item['teams'] = this.company?.teams?this.company.teams:[];
      item['teamIds'] = this.company?.teamIds?this.company.teamIds:[];

      // console.log('item',item);
        this.editMutliSeletItem = item;
        this.showMutliSeletModal = true;

      
    },
    async addMeberMultiSelectTeam() {

      this.addMemberMutliSeletItem['company_id'] = this.company?.id;
      this.addMemberMutliSeletItem['teams'] = this.company?.teams?this.company.teams:[];
      this.addMemberMutliSeletItem['userTeamIds'] = [];      

        this.showAddMutliSeletModal = true;
      
    },
    editSelectedTeam(item) {
      
      item['company_id'] = this.company?.id;

      // console.log('item',item);
        this.editTeam = item;
        this.showEditTeamModal = true;

      
    },
    async updateTeamName(item){
      try{
          this.$store.dispatch('uxModule/setLoading');
          let response = await this.$store.dispatch('teamModule/updateTeamName', {...item})
          if(response.team){
              this.$bvToast.toast("Team Updated successfully", {
                  title: "Message",
                  variant: 'success',
                  autoHideDelay: 5000,
              });

              const newArrMap = this.company.teams.map(obj => {
              if (obj.id === response.team.id) {
                  return {...obj, name: response.team.name};
              }

              return obj;
              });
              this.company.teams = newArrMap;
              this.teamitems = this.company?.teams?this.company.teams:[];
              
          }
          this.showEditTeamModal=false;
          this.$store.dispatch('uxModule/hideLoader')
      }catch(e) {
          this.showEditTeamModal=false;
          this.$store.dispatch('uxModule/hideLoader')
          console.log('error',e);
          
      }

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
    async updateTeamAccess(user) {
      this.showMutliSeletModal = false;
      if(user) {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('companyAdminModule/updateTeamAccess', {...user}).then((response) => {
                if(response.success) {
                    this.$bvToast.toast("Team Access Updated Successfully", {
                    title: "Message",
                    variant: "success",
                    autoHideDelay: 5000,
                    });

                    const newArrMap = this.company.users.map(obj => {
                    if (obj.id === response.user.id) {
                        return {...obj, userTeamIds: response.user.userTeamIds,number_of_teams: response.user.number_of_teams};
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
          this.company_id = this.company.id;
          this.allTeamIds = this.company?.teamIds?this.company.teamIds:[];
          this.bulkSelectItems = this.allTeamIds;

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
    async updateCompanyAdmin (user) {
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
  table td div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px !important;
    cursor:pointer;
}
.table-responsive{
  min-height: 450px !important;
}
</style>
