<template>
  <b-modal v-model="showModal" size="xl" scrollable no-close-on-backdrop class="my-0">
    <template #modal-header>
      <div class="w-100">Manage Teams Access</div>
    </template>
    <b-container fluid>
      <b-row class="mb-1">
            <b-col cols="6">
                <b-input-group prepend="User Name" class="mb-2" id="name" label="Name" label-for="name">
                    <b-form-input type="text" :value="ModalData.name" readonly></b-form-input>
                    <b-form-invalid-feedback id="name">User Name Field is Required.</b-form-invalid-feedback>
                </b-input-group>
            </b-col>
            <b-col cols="6">
                <b-input-group prepend="Email" class="mb-2" >
                    <b-form-input type="email" :value="ModalData.email" disabled readonly></b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="6">
                <b-input-group prepend="Company Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                    <b-form-select v-model="ModalData.company_role" aria-describedby="role-id" :options="company_permission" required>
                    </b-form-select>
                </b-input-group>
                <small class="text-primary">Make this user Company Admin (Optional)</small>
                <span v-b-tooltip.hover class="ml-3" title="A Company Admin can't remove the Access of another Admin. (Once it set). Email support@reiopcenter.com for more information.">
          <b-icon  icon="info-circle" variant="primary cursor-pointer" role="button"></b-icon> 
        </span>

                
            </b-col>
            <b-col cols="6">
                
                <b-button variant="primary" type="button" @click="UpdateRole">
                    Update Role
                </b-button>
            </b-col>
        </b-row>
        <hr>
      <b-row class="my-2">
          <b-col cols="6">
            <h5>Access In Teams ({{ModalData.userTeamIds.length}})</h5>
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
        <template #head(checkbox)="scope">
            <div class="text-nowrap" style="width: 30px;">{{scope.label}}</div>
        </template>
        <!-- :checked="ModalData.userTeamIds.includes(data.item.id)" -->
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
        <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Update Team Access
                </b-button>
        
      </div>
    </template>
  </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
// import { BIcon } from "bootstrap-vue";
// import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";


export default {
  mixins: [validationMixin],
  name: "MultiSelectTeamModal",
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
                id:null,
                company_id:null,
                company_role:null,
            },
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
    bulkSelectItems:[],
    };
  },
  // validations: {
  //   company: {
  //     name: {
  //       required,
  //     },
  //     plan: {
  //       required,
  //     },
  //   },
  // },
  methods: {
    // validateState(name) {
    //   const { $dirty, $error } = this.$v.company[name];
    //   return $dirty ? !$error : null;
    // },



    

    reset() {
      this.ModalData = {};
      this.teamitems = [];
    },
    onSubmit() {
      // this.$v.company.$touch();
      // if (this.$v.company.$anyError) {
      //   return;
      // }
      
      this.$emit("updateTeamAccess", this.ModalData);
    },
    UpdateRole() {
            if(!(this.ModalData?.id && this.ModalData?.company_id && this.ModalData?.company_role)){

              this.$bvToast.toast("Please Select Role", {
                  title: "Validate",
                  variant: "warning",
                  autoHideDelay: 5000,
              });
              return ;
            }
            console.log('this.user', this.ModalData);
            
           this. $emit('updateRole', this.ModalData);
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
          this.$store.dispatch("uxModule/setLoading");
          this.ModalData = Object.assign({}, { ...this.propsData });
          this.teamitems = this.ModalData?.teams?this.ModalData.teams:[];
          this.bulkSelectItems = this.ModalData.teamIds;
          // await this.$store.dispatch('companyModule/getCompany', this.temp_company.id).then(() => {
          //       this.teamitems = this.ModalData?.teams?this.ModalData.teams:[];
          // })

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
