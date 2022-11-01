<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
      <div>
        <b-row class="my-2">
            <b-col cols="6">
                <h3>Plans </h3>
            </b-col>
            <b-col cols="6" class="text-right">
              <b-button variant="primary" class="add-member" @click="showAddPlanModal = true">
              <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add New Plan</b-button>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="8" class="text-right">
            <!-- <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon> -->
            <b-spinner v-if="loading" variant="primary"></b-spinner>
          </b-col>
          <b-col cols="4">
            <b-form-input v-model="search" debounce="500" placeholder="Search"></b-form-input>
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
        <template v-slot:cell(id)="data">
          <div v-b-tooltip.hover :title="data.item.id">
            <p class="user-email">{{data.item.id}}</p>
          </div>
        </template>
        <template v-slot:cell(name)="data">
            <div v-b-tooltip.hover :title="data.item.name">{{ data.item.name }}</div>
        </template>
        <template v-slot:cell(actions)="data">
          <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" title="Edit Team" @click="editItem(data.item)"></b-icon>
          <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" title="Delete Team" @click="deleteItem(data.item)"></b-icon> -->
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
    <add-plan-modal :showModal="showAddPlanModal" @cancel="showAddPlanModal=false" @add="addPlan"></add-plan-modal>
    <edit-plan-modal :showModal="showEditModal" :propsData="editedItem" @cancel="showEditModal=false" @save="save"></edit-plan-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import EditPlanModal from "../components/plans/EditPlanModal";
import DeleteModal from "../components/deleteModal/DeleteModal";
import AddPlanModal from "../components/plans/AddPlanModal.vue";


export default {
  name: "Teams",
  components: {
    BIcon,
    EditPlanModal,
    DeleteModal,
    AddPlanModal
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
      loading: false,
      showAddPlanModal: false,
      showEditModal: false,
      fields: [
          {key:"id", label: "Id", sortable: true},
          {key: "name", label: "Name", sortable: true},
          {key: "number_of_users", label: "Number Of Users", sortable: true},
          {key: "number_of_teams", label: "Number Of Teams", sortable: true},
          // {key:"created_at", label: "Created Date", sortable: true},
          // {key:"updated_at", label: "Updated Date", sortable: true},
          {key: "actions", label: "Actions"},
      ],
    }
  },
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
      items: 'planModule/plans',
      total: 'planModule/total',
      editPlan: 'planModule/plan',
    }),
    rows() { return this.total ? this.total : 1 }
  },
  async created () {
    this.$store.dispatch('uxModule/setLoading')
    try {
      if(this.$route.query.id) {
          await this.$store.dispatch('planModule/getPlan', this.$route.query.id).then(() => {
              this.editedItem = {...this.editPlan};              
              this.showEditModal = true
          })
      }
      await this.$store.dispatch('planModule/getTotal')
      await this.$store.dispatch("planModule/getAllPlans", {page: 1, perPage: this.perPage})
      this.$store.dispatch('uxModule/hideLoader')
    } catch (error) {
      this.$store.dispatch('uxModule/hideLoader')
    }
  },
  methods: {

    editItem(item) {
      this.showEditModal = true
      this.editedItem = { ...item }
    },
    async save(item) {

      try{
            this.$store.dispatch('uxModule/setLoading');
            if(item) {
                let response = await this.$store.dispatch('planModule/editPlan', {...item});
                if(response.success == true){
                    this.$bvToast.toast("Plan Updated successfully!", {
                        title: "Message",
                        variant: 'success',
                        autoHideDelay: 5000,
                    });
                }else{
                    this.$bvToast.toast(response.error, {
                        title: "Validate",
                        variant: 'danger',
                        autoHideDelay: 5000,
                    });
                }
                this.showEditModal = false;
                this.$store.dispatch('uxModule/hideLoader')
            }
        }catch(e) {
            this.showEditModal = false;
            this.$store.dispatch('uxModule/hideLoader')
            console.log('error',e);
            
        }

    },
    async addPlan(plan) {
        try{
            this.$store.dispatch('uxModule/setLoading');
            if(plan) {
                let response = await this.$store.dispatch('planModule/addPlan', plan);
                if(response.success == true){
                    this.$bvToast.toast("Plan Added successfully!", {
                        title: "Message",
                        variant: 'success',
                        autoHideDelay: 5000,
                    });
                }else{
                    this.$bvToast.toast(response.error, {
                        title: "Validate",
                        variant: 'danger',
                        autoHideDelay: 5000,
                    });
                }
                this.showAddPlanModal = false;
                this.$store.dispatch('uxModule/hideLoader')
            }
        }catch(e) {
            this.showAddPlanModal = false;
            this.$store.dispatch('uxModule/hideLoader')
            console.log('error',e);
            
        }
    },  
    deleteItem(item){
      this.$bvToast.toast("Delete Functionality is in progress", {
                    title: "In progress",
                    variant: 'warning',
                    autoHideDelay: 5000,
              });
              return item;
      // this.showDeleteModal = true;
      // this.itemToDelete = item;
    },
    modalResponse(response) {
      this.showDeleteModal = false;
      if (response) {
        this.$store.dispatch('planModule/deletePlan', this.itemToDelete.id)
      }
    },
  },
  mounted() {},
  watch: {
    async currentPage() {
      this.$store.dispatch('uxModule/setLoading');
        await this.$store.dispatch('planModule/getAllPlans', {page: this.currentPage, perPage: this.perPage, search: this.search})
        this.$store.dispatch('uxModule/hideLoader');
    },
    async perPage() {
      this.$store.dispatch('uxModule/setLoading');
      await this.$store.dispatch('planModule/getAllPlans', {page: 1, perPage: this.perPage, search: this.search})
      this.$store.dispatch('uxModule/hideLoader');
    },
    async search() {
      this.loading = true;
      await this.$store.dispatch('planModule/searchPlans', {page: this.currentPage, perPage: this.perPage, search: this.search})
      this.loading = false;
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
