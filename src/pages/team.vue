<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
      <div>
        <!-- <b-row>
          <b-col class="d-flex justify-content-end">
            <b-button variant="primary" class="add-seller" @click="showAddModal=true">
              <b-icon icon="plus" aria-hidden="true"></b-icon>Create a New Team</b-button>
          </b-col>
        </b-row> -->
        <!-- <hr> -->
        <b-row class="my-3">
          <b-col cols="6">
                <h3>Teams </h3>
            </b-col>
          <b-col cols="6">
            <b-input-group>
              <b-form-input v-model="search" debounce="1000" @keyup.enter="searchTeam()" placeholder="Search" title="Auto Search when User stop Typing"></b-form-input>
              <b-input-group-append>
                  <b-input-group-text role="button"  @click="searchTeam()" title="Search">
                    <b-spinner v-if="loading" small variant="primary" class="my-auto ml-2"></b-spinner>
                      <b-icon v-else icon="search" variant="primary" ></b-icon> 
                  </b-input-group-text>
              </b-input-group-append>
            </b-input-group>

          </b-col>
        </b-row>
      </div>
      <b-table
          id="list-table"
          small
          striped
          sort-icon-left
          hover
          responsive
          :busy="loading"
          :fields="fields"
          :items="items"
          :per-page="0"
          :sticky-header="true"
      >
        <template #head(actions)="scope">
          <div class="text-nowrap" style="width: 20px;">{{scope.label}}</div>
        </template>
        <template #head(id)="scope">
          <div class="text-nowrap" style="width: 10px;">{{scope.label}}</div>
        </template>
        <template #head(team_name)="scope">
          <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
        </template>
        <template #head(company_name)="scope">
          <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
        </template>
        <template #head(created_at)="scope">
          <div class="text-nowrap" style="width: 40px;">{{ scope.label }}</div>
        </template>
        <template #head(updated_at)="scope">
          <div class="text-nowrap" style="width: 40px;">{{ scope.label }}</div>
        </template>

        <template v-slot:cell(id)="data">
          <div v-b-tooltip.hover :title="data.item.id">
            <p class="user-email">{{data.item.id}}</p>
          </div>
        </template>
        <template v-slot:cell(team_name)="data">
            <div v-b-tooltip.hover :title="data.item.name">
            <!-- <b-icon
              icon="box-arrow-up-right"
              variant="primary"
              class="mr-2"
              role="button"
              title="Team View"
              @click="editTeamLink(data.item)"
            ></b-icon> -->
              {{ data.item.name }}</div>
        </template>
          <template v-slot:cell(company_name)="data">
            <div v-b-tooltip.hover :title="companyName(data.item)">
              <b-icon  icon="box-arrow-up-right" variant="primary" class="mr-1" title="Company Detail" @click="editCompany(data.item)" ></b-icon>{{ companyName(data.item) }}
            </div>
        </template>

        <template v-slot:cell(actions)="data">
          <b-icon class="mr-2 cursor-pointer" icon="person-plus" variant="info" title="Add Member" @click="editItem_Add(data.item)"></b-icon>
          <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" title="Edit Team" @click="editItem(data.item)"></b-icon>
          <b-icon class="mr-2 cursor-pointer" variant="danger" icon="trash" title="Delete Team" @click="deleteItem(data.item)"></b-icon>
          <b-icon class="cursor-pointer" variant="primary" icon="files" title="Copy Settings" @click="copySettingsModal(data.item)"></b-icon>
        </template>
      </b-table>
      <b-row>
        <b-col class="d-flex align-items-center">
          <b-form-group
              label="Show"
              label-for="show-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-size="xs"
              class="mb-0"
          >
            <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
          <p class="mb-0">Showing 1 to {{perPage}} of {{total}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
      </b-row>
    </div>
    <add-team-modal :showModal="showAddModal" @cancel="showAddModal=false" @add="add"></add-team-modal>
    <copy-settings-modal :showModal="showCopySettingsModal" @cancel="showCopySettingsModal=false"></copy-settings-modal>
    <edit-team-modal :showModal="showEditModal" :showEditAddModal="showEdit_AddModal" :propsData="editedItem" @cancel="showEditModal=false;showEdit_AddModal=false" @save="save" @delete="showDeleteModal = true;showEditModal=false"></edit-team-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse" header="Delete Team" title="Are you sure? you want to delete this Team with all of its data"></delete-modal>
    <confirm-modal :showModal="showUserExistModal"   @modalResponse="userExist">
      <template v-slot:userExist>A team already exists with this owner email. Please use a different owner email</template>
    </confirm-modal>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import AddTeamModal from "../components/teams/AddTeamModal";
import CopySettingsModal from "../components/teams/CopySettingsModal";
import EditTeamModal from "../components/teams/EditTeamModal";
import DeleteModal from "../components/deleteModal/DeleteModal";
import ConfirmModal from "@/components/slotModal/SlotModal";

export default {
  name: "Teams",
  components: {
    BIcon,
    AddTeamModal,
    EditTeamModal,
    DeleteModal,
    ConfirmModal,
    CopySettingsModal
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
      search: '',
      showAddModal: false,
      showCopySettingsModal: false,
      showEditModal: false,
      showEdit_AddModal: false,
      loading: false,
      showUserExistModal: false,
    }
  },
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
      fields: 'teamModule/fields',
      items: 'teamModule/teams',
      total: 'teamModule/total',
      editTeam: 'teamModule/team',
    }),
    rows() { return this.total ? this.total : 1 }
  },
  async created () {
    this.$store.dispatch('uxModule/setLoading')
    this.$store.dispatch('teamModule/getTotal')
    try {
      if(this.$route.query.id) {
          await this.$store.dispatch('teamModule/getTeam', this.$route.query.id).then(() => {
              this.editedItem = this.editTeam
              this.showEditModal = true
              this.itemToDelete = this.editTeam;
          })
      }

      await this.$store.dispatch("teamModule/getTeams", {page: 1, perPage: this.perPage})
      this.$store.dispatch('uxModule/hideLoader')
    } catch (error) {
      this.$store.dispatch('uxModule/hideLoader')
    }
  },
  methods: {
    copySettingsModal(item) {
      console.log(item);
      this.showCopySettingsModal = true;
    },
    userExist () {
      this.showUserExistModal = false;
      this.showAddModal = true;
    },

    editItem(item) {
      this.showEditModal = true
      this.editedItem = { ...item };
      this.itemToDelete = item;
    },
    editItem_Add(item) {
      this.showEditModal = true;
      this.editedItem = { ...item };
      this.itemToDelete = item;
      this.showEdit_AddModal = true;
    },
    companyName(item) {
      return item?.company?.name;
    },
    save(item) {
      // this.showModal = false
      this.$store.dispatch('teamModule/editTeam', {...item})
    },
    async add(item) {
      this.showAddModal = false
          await this.$store.dispatch('teamModule/addTeam', {...item}).then((response) => {
            if (response.team === 'user_exist'){
              this.$store.dispatch('teamModule/filledData', {...response.teamData})
              this.showUserExistModal = true;
            }
          })
          this.$store.dispatch("teamModule/getTeams", {page: 1, perPage: this.perPage})
    },
    deleteItem(item){
      // this.$bvToast.toast("Team Delete Functionality is in progress! Because of table relationships", {
      //               title: "In progress",
      //               variant: 'warning',
      //               autoHideDelay: 5000,

      //         });
              // return item;
      this.showDeleteModal = true;
      this.itemToDelete = item;
    },
    async modalResponse(response) {
    this.$store.dispatch('uxModule/setLoading')

      this.showDeleteModal = false;
      if (response) {
        let responseRequest = await this.$store.dispatch('teamModule/deleteTeam', this.itemToDelete.id)
        if(responseRequest.success==true) {

          this.$bvToast.toast(responseRequest.message, {
              title: "Message",
              variant: 'success',
              autoHideDelay: 5000,
          });
          const findIndex = this.items.findIndex(({ id }) => id == this.itemToDelete.id)
          findIndex !== -1 && this.items.splice(findIndex, 1)
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
    editCompany(item) { 
        let company_id = item?.company?.id;
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
    async searchTeam() {
        this.loading = true;
        // this.$store.dispatch('uxModule/setLoading')
        await  this.$store.dispatch('teamModule/searchTeams', {page: this.currentPage, perPage: this.perPage, search: this.search})
        this.loading = false;
        // this.$store.dispatch('uxModule/hideLoader')
    },
    // editTeamLink(item) {
    //     let team_id = item?.id;
    //     if (team_id) {
    //         const route = "/teams?id=" + team_id;
    //         let routeData = this.$router.resolve({ path: route });
    //         window.open(routeData.href, "_blank");
    //     } else {
    //         this.$bvToast.toast("Team Id not found", {
    //         title: "Validate",
    //         variant: "warning",
    //         autoHideDelay: 5000,
    //         });
    //     }
    // },
  },
  mounted() {},
  watch: {
    currentPage: {
      handler: function() {
        this.$store.dispatch('teamModule/getTeams', {page: this.currentPage, perPage: this.perPage, search: this.search})
      }
    },
    perPage: {
      handler: function () {
        this.$store.dispatch('teamModule/getTeams', {page: 1, perPage: this.perPage, search: this.search})
      }
    },
    search() {
            this.searchTeam();
    },

  }
}
</script>

<style scoped>
  .add-seller {
    width: 200px;
  }

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
    max-width: 300px !important;
    cursor:pointer;
}
.table-responsive{
  min-height: 450px !important;
}
</style>
