<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
      <h3>Teams</h3>
      <div>
        <b-row>
          <b-col class="d-flex justify-content-end">
            <b-button variant="primary" class="add-seller" @click="showAddModal=true">
              <b-icon icon="plus" aria-hidden="true"></b-icon>Create a New Team</b-button>
          </b-col>
        </b-row>
        <hr>
        <b-row class="mb-3">
          <b-col cols="8" class="d-flex align-items-center">
            <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="search" placeholder="Search"></b-form-input>
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
          :busy="isBusy"
          :fields="fields"
          :items="items"
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
          <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
        </template>

        <template #head(id)="scope">
          <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
        </template>

        <template #head(users)="scope">
          <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
        </template>

        <template #head()="scope">
          <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
        </template>
        <template #head(team_name)="scope">
          <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
        </template>
        <template #head(company_name)="scope">
          <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
        </template>

        <template v-slot:cell(id)="data">
          <div :title="data.item.id">
            <p class="user-email">{{data.item.id}}</p>
          </div>
        </template>
        <template v-slot:cell(team_name)="data">
            <div v-b-tooltip.hover :title="data.item.name">{{ data.item.name }}</div>
        </template>
          <template v-slot:cell(company_name)="data">
            <div v-b-tooltip.hover :title="companyName(data.item)">{{ companyName(data.item) }}</div>
        </template>

        <template v-slot:cell(actions)="data">
          <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
          <b-icon class="cursor-pointer" variant="danger" icon="trash" disabled @click="deleteItem(data.item)"></b-icon>
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
    <edit-team-modal :showModal="showEditModal" :propsData="editedItem" @cancel="showEditModal=false" @save="save"></edit-team-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    <confirm-modal :showModal="showUserExistModal"   @modalResponse="userExist">
      <template v-slot:userExist>A team already exists with this owner email. Please use a different owner email</template>
    </confirm-modal>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import AddTeamModal from "../components/teams/AddTeamModal";
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
      showEditModal: false,
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
          })
      }

      await this.$store.dispatch("teamModule/getAllTeams", {page: 1, perPage: this.perPage})
      this.$store.dispatch('uxModule/hideLoader')
    } catch (error) {
      this.$store.dispatch('uxModule/hideLoader')
    }
  },
  methods: {
    userExist () {
      this.showUserExistModal = false;
      this.showAddModal = true;
    },

    editItem(item) {
      this.showEditModal = true
      this.editedItem = { ...item }
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
          this.$store.dispatch("teamModule/getAllTeams", {page: 1, perPage: this.perPage})
    },
    deleteItem(item){
      this.showDeleteModal = true;
      this.itemToDelete = item;
    },
    modalResponse(response) {
      this.showDeleteModal = false;
      if (response) {
        this.$store.dispatch('teamModule/deleteTeam', this.itemToDelete.id)
      }
    },
  },
  mounted() {},
  watch: {
    currentPage: {
      handler: function() {
        this.$store.dispatch('teamModule/getAllTeams', {page: this.currentPage, perPage: this.perPage, search: this.search})
      }
    },
    perPage: {
      handler: function () {
        this.$store.dispatch('teamModule/getAllTeams', {page: 1, perPage: this.perPage, search: this.search})
      }
    },
    search: {
      handler: function () {
        this.$store.dispatch('teamModule/searchTeams', {page: this.currentPage, perPage: this.perPage, search: this.search})
      }
    }
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
</style>
