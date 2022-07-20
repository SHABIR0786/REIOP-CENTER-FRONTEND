<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
      <h3>Skip Source Lists</h3>
      <div>
        <b-row>
         <b-col class="d-flex justify-content-end">
           <b-button variant="primary" class="add-seller" @click="showAddModal=true">
             <b-icon icon="plus" aria-hidden="true"></b-icon>Create a New Skip Source</b-button>
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

        <template #head(action)="scope">
          <div class="text-nowrap" style="width: 40px;">{{scope.label}}</div>
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

        <!-- <template v-slot:cell(id)="data">
          <div :title="data.item.id">
            <p class="user-email">{{data.item.id}}</p>
          </div>
        </template> -->
        <template v-slot:cell(id)="data">
          <div :title="`List ID: ${data.item.id}`">
            <p class="user-email">{{data.index + 1}}</p>
          </div>
        </template>
        <template v-slot:cell(action)="data">
          <b-icon title="Edit" class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
          <b-icon title="Merge with other source" class="mr-2 cursor-pointer" icon="arrow-left-right" variant="info" @click="mergeSourceFunction(data.item)"></b-icon>
          <b-icon title="Delete" class="cursor-pointer" variant="danger" icon="trash" disabled @click="checkListForDeleteItem(data.item)"></b-icon>

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
          <p class="mb-0">Showing 1 to {{perPage}} of {{items.length}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
      </b-row>
    </div>
    <add-source-modal :showModal="showAddModal" :modalTitle="sourceTitle" :sourceType="sourceType" @cancel="showAddModal=false" @add="addListSource"></add-source-modal>

    <edit-source-modal :showModal="showEditModal" :propsData="editedItem" :modalTitle="sourceTitle" :sourceType="sourceType" @cancel="showEditModal=false" @save="save"></edit-source-modal>
    <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    <update-delete-source-list-modal :showModal="showUpdateDeleteModal" :propsData="items" :modalTitle="sourceDeleteTitle" :itemToDelete="itemToDelete" @cancel="showUpdateDeleteModal=false" @update_source_delete="update_before_delete_list"></update-delete-source-list-modal>
    <merge-with-other-source-modal :showModal="mergeSourceModal" :propsData="items" :modalTitle="mergeSourceTitle" :itemToMerge="itemToMerge" @cancel="mergeSourceModal=false" @merge_source_other="merge_source_with_other"></merge-with-other-source-modal>

  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import EditSourceModal from "../components/sourceListsModal/EditSourceModal";
import AddSourceModal from "../components/sourceListsModal/AddSourceModal";

import DeleteModal from "../components/deleteModal/DeleteModal";
import UpdateDeleteSourceListModal from "../components/sourceListsModal/UpdateDeleteSourceListModal";
import MergeWithOtherSourceModal from "../components/sourceListsModal/MergeWithOtherSourceModal";


export default {
  name: "skipSourceLists",
  components: {
    BIcon,
    EditSourceModal,
    AddSourceModal,
    DeleteModal,
    UpdateDeleteSourceListModal,
    MergeWithOtherSourceModal


  },
  data () {
    return {
      isBusy: false,
      showModal: false,
      perPage: 20,
      currentPage: 1,
      showDeleteModal: false,
      itemToDelete: {},
      pageOptions: [10, 20, 50],
      search: '',
      editedItem: {},
      showEditModal: false,
      showAddModal: false,
      showUpdateDeleteModal: false,
      sourceTitle: 'Skip Source',
      sourceDeleteTitle: 'Skip Source',
      sourceType : 'list_skip_source',
      mergeSourceTitle : 'List Skip Source',
      itemToMerge: {},
      mergeSourceModal: false,




      fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "action", label: "Action"},
        {key: "list_skip_source", label: "Skip Source Lists", sortable: true},
        {key: "user_name", label: "Uploaded By"},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
      ],
    }
  },
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
      items: 'listModule/skipSourceListFromDB',
    }),
    rows() { return this.total ? this.total : 1 }
  },
  async created () {
    this.$store.dispatch('uxModule/setLoading')
    try {
      await this.$store.dispatch("listModule/getSkipSourceListFromDB", {page: 1, perPage: this.perPage})
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
    save(source) {
      this.showModal = false
      this.$store.dispatch('listModule/editSource', {...source})
    },
    addListSource(source) {
      this.showAddModal = false
      this.$store.dispatch('listModule/addListSource', {...source})
    },
    deleteItem(item){
      this.showDeleteModal = true;
      this.itemToDelete = item;
    },
    update_before_deleteItem(item){
      this.itemToDelete = item;
      this.showUpdateDeleteModal = true;
    },
    async checkListForDeleteItem(item){

      this.$store.dispatch('uxModule/setLoading');

      let response = await this.$store.dispatch('listModule/checkListForDeleteItem', item.id)

      this.$store.dispatch('uxModule/hideLoader');

      if(response.exist == false){

        this.deleteItem(item);

      }else if(response.exist == true){

        item.table_name = response.table;
        item.delete_list_type = "list_skip_source";

        this.update_before_deleteItem(item);

      }

    },
    modalResponse(response) {
      this.showDeleteModal = false;
      if (response) {
        this.$store.dispatch('listModule/deleteListSource', this.itemToDelete.id)
      }
    },
    update_before_delete_list(data){
      this.showUpdateDeleteModal = false;
      this.$store.dispatch('listModule/UpdateBeforeDeleteList', data)

    },
    async mergeSourceFunction(item){
      this.$store.dispatch('uxModule/setLoading');
      let response = await this.$store.dispatch('listModule/checkListForDeleteItem', item.id)
      this.$store.dispatch('uxModule/hideLoader');
      item.table_name = response.table;
      item.merge_list_type = "list_skip_source";
      this.itemToMerge = item;
      this.mergeSourceModal = true;
    },
    async merge_source_with_other(data){
      this.mergeSourceModal = false;
      let response = await this.$store.dispatch('listModule/MergeListSource', data)
      
      if(response.success == true){
          this.$bvToast.toast('Source Merge Successfully.', {
            title: 'Success!',
            solid: true,
            variant: 'success',
            autoHideDelay: 3000,
        })

      }
    },

  },
  watch: {
    currentPage: {
      handler: function() {
        this.$store.dispatch('listModule/getSkipSourceListFromDB', {page: this.currentPage, perPage: this.perPage, search: this.search})
      }
    },
    perPage: {
      handler: function () {
        this.$store.dispatch('listModule/getSkipSourceListFromDB', {page: 1, perPage: this.perPage, search: this.search})
      }
    },
    search: {
      handler: function () {
        this.$store.dispatch('listModule/getSkipSourceListFromDB', {page: this.currentPage, perPage: this.perPage, search: this.search})
      }
    }
  }
}
</script>

<style scoped>
  .filter-icon {
    font-size: 25px;
  }
    .add-seller {
    width: 250px;
  }
</style>
