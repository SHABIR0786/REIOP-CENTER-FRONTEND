<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
      <h3>Source Lists</h3>
      <div>
<!--        <b-row>-->
<!--          <b-col class="d-flex justify-content-end">-->
<!--            <b-button variant="primary" class="add-seller" @click="showAddModal=true">-->
<!--              <b-icon icon="plus" aria-hidden="true"></b-icon>Create a New Type</b-button>-->
<!--          </b-col>-->
<!--        </b-row>-->
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

        <template v-slot:cell(id)="data">
          <div :title="`List ID: ${data.item.id}`">
            <p class="user-email">{{data.index + 1}}</p>
          </div>
        </template>
        <template v-slot:cell(action)="data">
          <b-icon class="cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
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
    <edit-source-modal :showModal="showEditModal" :propsData="editedItem" :modalTitle="sourceTitle" :sourceType="sourceType" @cancel="showEditModal=false" @save="save"></edit-source-modal>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import {mapGetters} from "vuex";
import EditSourceModal from "../components/sourceListsModal/EditSourceModal";

export default {
  name: "sourceLists",
  components: {
    BIcon,
    EditSourceModal,
  },
  data () {
    return {
      isBusy: false,
      perPage: 20,
      currentPage: 1,
      pageOptions: [10, 20, 50],
      search: '',
      editedItem: {},
      showEditModal: false,
      sourceTitle : 'Source',
      sourceType : 'list_source',


      fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "action", label: "Action"},
        {key: "list_source", label: "Source Lists", sortable: true},
        {key: "user_name", label: "Uploaded By"},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
      ],
    }
  },
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
      items: 'listModule/sourceListFromDB',
    }),
    rows() { return this.total ? this.total : 1 }
  },
  async created () {
    this.$store.dispatch('uxModule/setLoading')
    try {
      await this.$store.dispatch("listModule/getSourceListFromDB", {page: 1, perPage: this.perPage})
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

  },
  watch: {
    currentPage: {
      handler: function() {
        this.$store.dispatch('listModule/getSourceListFromDB', {page: this.currentPage, perPage: this.perPage, search: this.search})
      }
    },
    perPage: {
      handler: function () {
        this.$store.dispatch('listModule/getSourceListFromDB', {page: 1, perPage: this.perPage, search: this.search})
      }
    },
    search: {
      handler: function () {
        this.$store.dispatch('listModule/getSourceListFromDB', {page: this.currentPage, perPage: this.perPage, search: this.search})
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
</style>
