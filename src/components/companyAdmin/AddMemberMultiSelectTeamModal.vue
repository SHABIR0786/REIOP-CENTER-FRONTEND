<template>
  <b-modal v-model="showModal" size="xl" scrollable no-close-on-backdrop class="my-0">
    <template #modal-header>
      <div class="w-100">Add Company Member</div>
    </template>
    <b-container fluid>
      <b-row v-if="user_exist">
                <b-col cols="6">
                        <b-input-group prepend="Email" class="mb-2" id="email" label="Email" label-for="email" title="Find User">
                            <b-form-input :state="validateUserCheck('email')" @keyup.enter="FindEmail(user_check.email)"  type="email" v-model="$v.user_check.email.$model" aria-describedby="email" required :readonly="show_save_button" placeholder="Enter Email & Find User"></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text role="button"  @click="FindEmail(user_check.email)" title="Find User">
                                    <b-icon  icon="search" variant="primary" ></b-icon> 
                                </b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="email" v-if="$v.user_check.email.email">Email Field is required.</b-form-invalid-feedback>
                            <b-form-invalid-feedback id="email" v-if="$v.user_check.email.required">Enter valid Email.</b-form-invalid-feedback>
                        </b-input-group>
                        <small class="text-primary" v-if="please_wait">Plesae Wait...</small>
                    </b-col>
                    <b-col cols="6" v-if="show_save_button">
                      <b-input-group prepend="Team Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                          <b-form-select v-model="$v.user_check.role.$model" aria-describedby="role-id" :options="team_permission" :state="validateUserCheck('role')" required>
                          </b-form-select>
                          <b-form-invalid-feedback id="role-id">Team Role is Required.</b-form-invalid-feedback>
                      </b-input-group>

                  </b-col>
                    <b-col cols="6" v-if="show_save_button">
                      <b-input-group prepend="Company Role" id="company-role-id" label="Role" label-for="company-role-id" class="mb-2">
                          <b-form-select v-model="user_check.company_role" aria-describedby="company-role-id" :options="company_permission" required>
                          </b-form-select>
                      </b-input-group>
                      <small class="text-primary">Make this user Company Admin (Optional)</small>

                      
                  </b-col>
            </b-row>
      <b-row class="mb-1" v-else>
            <b-col cols="6">
                <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                    <b-form-input :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.user.name.$model" required></b-form-input>
                    <b-form-invalid-feedback id="name">Member Name is Required.</b-form-invalid-feedback>
                </b-input-group>
            </b-col>
            <b-col cols="6">
              <b-input-group prepend="Email" class="mb-2" id="email" label="Email" label-for="email">
                  <b-form-input :state="validateState('email')" type="email" v-model="$v.user.email.$model" aria-describedby="email" required :readonly="show_save_button"></b-form-input>
                  <b-form-invalid-feedback id="email" v-if="$v.user.email.email">Email is required.</b-form-invalid-feedback>
                  <b-form-invalid-feedback id="email" v-if="$v.user.email.required">Enter valid Email.</b-form-invalid-feedback>
              </b-input-group>
            </b-col>
            <b-col cols="6">
                <b-input-group prepend="Password" label="password" label-for="password" class="mb-2">
                    <b-input v-model="$v.user.password.$model" aria-describedby="password" :state="validateState('password')" required></b-input>
                    <b-form-invalid-feedback id="role-id" v-if="$v.user.password.minLength">Password is Required.</b-form-invalid-feedback>
                    <b-form-invalid-feedback id="role-id" v-if="$v.user.password.required">At Least 6 character is Required.</b-form-invalid-feedback>
                </b-input-group>
            </b-col>
            <b-col cols="6">
                <b-input-group prepend="Team Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                    <b-form-select v-model="$v.user.role.$model" aria-describedby="role-id" :options="team_permission" :state="validateState('role')" required>
                    </b-form-select>
                    <b-form-invalid-feedback id="role-id">Team Role is Required.</b-form-invalid-feedback>
                </b-input-group>

            </b-col>
            <b-col cols="6">
                <b-input-group prepend="Company Role" id="company-role-id" label="Role" label-for="company-role-id" class="mb-2">
                    <b-form-select v-model="user.company_role" aria-describedby="company-role-id" :options="company_permission" required>
                    </b-form-select>
                </b-input-group>
                <small class="text-primary">Make this user Company Admin (Optional)</small>

                
            </b-col>
        </b-row>
        <span v-b-tooltip.hover title="Search User by Email. Enter Email press search button or enter key. To change email press Reset button.">
          <b-icon  icon="info-circle" variant="primary cursor-pointer" role="button"></b-icon> 
        </span>
        <hr>
      <b-row class="my-2">
          <b-col cols="6">
            <h5>Access In Teams ({{ModalData.userTeamIds.length}}) <span v-b-tooltip.hover title="Select Teams that you want to give Access to User. Select Atleast 1 Team.">
                <b-icon  icon="info-circle" variant="primary cursor-pointer" role="button"></b-icon> 
              </span>
          </h5>
            
    </b-col>
        <b-col cols="6">
          <b-input-group>
          <b-form-input v-model="search_team" debounce="1000" @keyup.enter="SEARCHTEAM()" placeholder="Search Team" title="Auto Search when User stop Typing"></b-form-input>
          <b-input-group-append>
              <b-input-group-text role="button"  @click="SEARCHTEAM()" title="Search">
                  <b-icon icon="search" variant="primary" ></b-icon> 
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
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
        <template #head(checkbox)="scope">
            <div class="text-nowrap" style="width: 30px;">{{scope.label}}</div>
        </template>
        <template v-slot:cell(checkbox)="data">
            <b-form-checkbox :value='data.item.id' v-model='ModalData.userTeamIds'></b-form-checkbox>
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
        <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2" v-if="show_save_button">
                    Add Memeber with Team Access
                </b-button>
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-left"
                        @click="reset_form()"
                >
                    Reset
                </b-button>
        
      </div>
    </template>
  </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
// import { BIcon } from "bootstrap-vue";
import { 
  required, email ,minLength,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";


export default {
  mixins: [validationMixin],
  name: "AddMemberMultiSelectTeamModal",
  components: {
    // BIcon,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    propsData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      isCollapsed: "uxModule/isCollapsed",

    }),
  },
  async created() {

  },
  data() {
    return {
      company: {
      },
      user: {
                company_role:null,
                name: '',
                email: '',
                password: '',
                role:2


            },
            user_check: {
                    email: '',
                    role:2,
                company_role:null,
                },
            user_exist:true,

      teamitems: [],
      company_permission: [
                // {
                //     value: 3,
                //     text: "User"
                // },
                {
                    value: null,
                    text: "Select Role"
                },
                {
                    value: 2,
                    text: "Company Admin"
                },
                
            ],
            team_permission: [
                // {
                //     value: 3,
                //     text: "User"
                // },
                {
                    value: 2,
                    text: "Team Admin"
                }
            ],

      // Teams:[],
      search_team: "",
      isBusy: false,
      ModalData: {
      },
      team_fields: [
      {key:"checkbox", label: "Select"},
        {key:"id", label: "Id", sortable: true},
        // {key: "actions", label: "Actions"},
        {key: "team_name", label: "Team Name", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    role_text : ['','SuperAdmin','Company Admin','User'],
    show_save_button:false,
    please_wait:false,

    };
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
          password: {
              required,
              minLength: minLength(6)
          },
          role: {
              required
          },
      },
      user_check: {
                    email: {
                        required,
                        email
                    },
                    role: {
                        required
                    },
                },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    validateUserCheck(name) {
            const { $dirty, $error } = this.$v.user_check[name];
            return $dirty ? !$error : null;
        },
    reset() {
      this.user ={
        company_role:null,
        name: '',
        email: '',
        password: '',
        role:2,
      };
      this.ModalData = {};
      this.teamitems = [];
      this.$v.user.$reset();
      this.user_check = {
                role: 2,
                email:'',
        company_role:null,
            };
            this.$v.user_check.$reset();
            this.user_exist=true;
            this.show_save_button = false;
            this.please_wait = false;

    },
    reset_form() {
      this.user ={
        company_role:null,
        name: '',
        email: '',
        password: '',
        role:2,
      };
      this.$v.user.$reset();
      this.user_check = {
        role: 2,
        email:'',
        company_role:null,
      };
      this.$v.user_check.$reset();
      this.user_exist=true;
      this.show_save_button = false;
      this.please_wait = false;
      this.ModalData.userTeamIds = [];


    },

    async FindEmail(email){
            try{
                this.$v.user_check.$touch();
                if (this.$v.user_check.$anyError) {
                    return;
                }
                this.please_wait = true;
                let response = await this.$store.dispatch('userModule/userExist', email);
                if(response.success){
                    this.$bvToast.toast("User Found", {
                        title: "Message",
                        variant: 'success',
                        autoHideDelay: 5000,
                    });
                    this.user_exist = true;
                }else{
                    this.$bvToast.toast(response.message, {
                        title: "Warning",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                    this.user_exist = false;
                    this.user.email = this.user_check.email;
                    this.user.role = this.user_check.role;
                   
                }
                this.show_save_button = true;
                this.please_wait = false;

            }catch(e) {
                this.$store.dispatch('uxModule/hideLoader')
                console.log('error',e);
            }
            

        },
    async onSubmit() {



      if(this.user_exist){
          this.$v.user_check.$touch();
          if (this.$v.user_check.$anyError) {
              return;
          }
          if(this.ModalData.userTeamIds.length<1){
                this.$bvToast.toast("Please Select atleast one Team", {
                  title: "Validate",
                  variant: "warning",
                  autoHideDelay: 5000,
                });
              this.$store.dispatch('uxModule/hideLoader')
                return ;
          }
          this.user_check['company_id'] = this.ModalData.company_id;
          this.user_check['userTeamIds'] = this.ModalData.userTeamIds;
          this.$emit("addMemberTeamAccess", this.user_check);

            
        }else{

          this.$v.user.$touch();
          if (this.$v.user.$anyError) {
            return;
          }
          if(this.ModalData.userTeamIds.length<1){
            this.$bvToast.toast("Please Select atleast one Team", {
              title: "Validate",
              variant: "warning",
              autoHideDelay: 5000,
            });
            return ;
          }
          this.user['company_id'] = this.ModalData.company_id;
          this.user['userTeamIds'] = this.ModalData.userTeamIds;

          
          this.$emit("addMemberTeamAccess", this.user);
        }

    },
    SEARCHTEAM(){
      try{
        if (this.search_team != '' && this.search_team) {
        this.teamitems = this.ModalData.teams.filter((item) => {
            return item.name
                .toUpperCase()
                .includes(this.search_team.toUpperCase())
            })
            return this.teamitems
        }
        this.teamitems = this.ModalData.teams;
      }catch(error){
        console.log('error',error);
        
      }

        
    },
    

  },

  watch: {
    async showModal() {
      try {
        if (this.showModal) {
          this.reset();
          this.ModalData = Object.assign({}, { ...this.propsData });
          this.teamitems = this.ModalData?.teams?this.ModalData.teams:[];

          this.ModalData['userTeamIds'] = [];

        }
      } catch (error) {

        console.log(error);
      }
    },
    search_team() {
        this.SEARCHTEAM();
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
</style>
