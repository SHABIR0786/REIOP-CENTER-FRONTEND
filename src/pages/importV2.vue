<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <div v-if="showImportTable">
            <h3>Previous Imports</h3>
            <div>
                <b-row>
                    <b-col class="d-flex justify-content-end">
                        <b-button variant="primary" class="add-seller" @click="step_1 = true, showImportTable = false">
                            <b-icon icon="plus" aria-hidden="true"></b-icon> Start A New Import</b-button>
                    </b-col>
                </b-row>
                <hr>
                <b-row class="mb-3">
                    <b-col cols="8" class="d-flex align-items-center">
                        <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                    </b-col>
                    <b-col cols="4">
                        <b-form-input v-model="searchImport" placeholder="Search"></b-form-input>
                    </b-col>
                </b-row>
            </div>
            <b-table
                    id="list-table"
                    small
                    striped
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
                    <div class="text-nowrap" style="width: 70px;">{{scope.label}}</div>
                </template>

                <template #head(is_processing)="scope">
                    <div class="text-nowrap" style="width: 90px;">{{scope.label}}</div>
                </template>

                <template #head(is_processed)="scope">
                    <div class="text-nowrap" style="width: 90px;">{{scope.label}}</div>
                </template>

                <template #head()="scope">
                    <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                </template>

                <template v-slot:cell(id)="data">
                    <div :title="data.item.id">
                        <p class="user-email">{{data.item.id}}</p>
                    </div>
                </template>
                <template v-slot:cell(actions)="data">
                    <b-icon class="mr-2 cursor-pointer" icon="arrow-counterclockwise" variant="primary" @click="rollback(data.item)"></b-icon>
                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                    <b-icon class="cursor-pointer" variant="primary" icon="cloud-download-fill" @click="importModal(data.item)"></b-icon>
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
                    <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="import-table"></b-pagination>
                </b-col>
            </b-row>
            <import-downloads :showModal ="showImportModal" :propsData="download_data" @cancel="showImportModal=false" @modalResponse="modalResponse"></import-downloads>
        </div>

          <edit-import-modal v-if="!isReload" :data="editData" :showModal="showModal"  @cancel="showModal=false" @save="save"></edit-import-modal>
          <import-type v-if="step_1" @importResponse="importTypeResponse" :importDetails="importDetails"></import-type>
          <upload-type v-if="step_2" @uploadResponse="uploadTypeResponse" :importDetails="importDetails" @goBack="goBack"></upload-type>
          <skip-variant v-if="step_2_skip" :importDetails="importDetails" @skipResponse="setSkipOption" @goBack="goBack"></skip-variant>
          <pull-settings v-if="step_3" :lists="lists" :importDetails="importDetails" @pullSettingsResponse="pullSettingsResponse" @goBack="goBack"></pull-settings>
          <select-skip-data-source v-if="step_3_skip" :importDetails="importDetails" @skipTraceData="setSkipSource" @goBack="goBack"></select-skip-data-source>
          <map-fields v-if="step_4" :upload_type="importDetails.upload_type" :list_settings="importDetails.pull_settings" :importDetails="importDetails"  @goBack="goBack"></map-fields>
          <delete-modal :showModal="showDeleteModal" @modalResponse="rollbackImport"></delete-modal>
          <confirm-modal :showModal="showNoErrorsModal"  @modalResponse="showNoErrorsModal=false">
            <template v-slot:noError> <h4>No errors in this file</h4></template>
          </confirm-modal>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ImportDownloads from "../components/import/ImportDownloads";
import ImportType from "../components/import/ImportType";
import UploadType from "../components/import/UploadType";
import PullSettings from "../components/import/PullSettings";
import MapFields from "../components/import/MapFields";
import DeleteModal from "../components/deleteModal/DeleteModal";
import SkipVariant from "@/components/import/SkipVariant";
import SelectSkipDataSource from "../components/import/SelectSkipDataSource";
import EditImportModal from "@/components/import/EditImportModal";
import ConfirmModal from "@/components/slotModal/SlotModal";

export default {
    name: "importV2",
    components: {
      SelectSkipDataSource,
      ImportType,
      ImportDownloads,
      UploadType,
      PullSettings,
      MapFields,
      DeleteModal,
      EditImportModal,
      ConfirmModal,
      SkipVariant
    },
    data () {
      return {
        searchImport: '',
        pageOptions: [10, 20, 50],
        perPage: 20,
        isBusy: false,
        showImportModal: false,
        importDetails: {},
        step_1: false,
        step_2: false,
        step_2_skip: false,
        step_3: false,
        step_3_skip:false,
        step_4: false,
        currentPage: 2,
        download_type: '',
        showImportTable: true,
        download_data: {},
        pull_list: {},
        itemToRollback: {},
        showDeleteModal: false,
        showModal: false,
        editedItem:{},
        isReload: false,
        showNoErrorsModal: false,
        currentItemErrorLines: null,
        statusBackSkip:false,
        statusBackValidity:false

      }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        this.$store.dispatch('listModule/getAllLists', {page: 1, perPage: 50})
        this.$store.dispatch("importV2Module/getAllProcesses", {page: 1, perPage: 50})
        try {
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    computed: {
      ...mapGetters({
          isCollapsed: 'uxModule/isCollapsed',
          fields: 'importV2Module/fields',
          items: 'importV2Module/imports',
          lists: 'listModule/lists',
          total: 'listModule/total',
          editData: 'importV2Module/editData',
      }),
      rows() { return this.total ? this.total : 1 },
    },
    methods: {
      editItem(item) {
        this.$store.dispatch('importV2Module/showEditModal', {...item})
        this.isReload = true
        this.showModal = true
        this.$nextTick(() => {
          this.isReload = false
        })
      },
      save(item) {
        this.$store.dispatch('importV2Module/editImport', {...item})
      },
     async modalResponse(response) {
        this.showImportModal = false;
       if(response === 'error' && this.currentItemErrorLines === 0) {
         this.showNoErrorsModal = true;
         return;
       }
       this.$store.dispatch('uxModule/setLoading')
       this.download_type = response;
        try {
          await this.$store.dispatch("importV2Module/exportFile", {type: response, file: this.download_data})
          this.$store.dispatch('uxModule/hideLoader');
        }catch (error){
          this.$store.dispatch('uxModule/hideLoader');
        }
      },

      importTypeResponse(response) {
       if(response) {
         this.importDetails.import_type = response;
          this.importDetails.skip_variant = ''
         if (response === 'existing') {
             this.step_1 = false;
             this.step_2 = false;
             this.step_2_skip = true;
             this.step_3 = false;
             this.step_3_skip = false;
             this.step_4 = false;
         } else {
             this.step_1 = false;
             this.step_2 = true;
             this.step_2_skip = false;
             this.step_3 = false;
             this.step_3_skip = false;
             this.step_4 = false;
         }
       }
      },

      uploadTypeResponse (response) {
        if(response) {
          this.importDetails.upload_type = response;
          this.step_1 = false;
          this.step_2 = false;
          this.step_3 = true;
          this.step_4 = false;
        }
      },

      pullSettingsResponse (response) {
        if(response) {
          this.importDetails.pull_settings = response;
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = true;
          this.statusBackSkip = false;
          this.statusBackValidity = false;
        }
      },

      setSkipOption (response) {
        this.importDetails.skip_variant = response;
        if (response === 'skip_trace') {
          this.statusBackSkip =true;
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false;
          this.step_3_skip = true;
          this.step_3 = false;
          this.step_4 = false;
        } else {
          this.statusBackValidity =true;
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false;
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = true;
        }
      },

      setSkipSource (response) {
          if(response) {
              this.importDetails.skip_options = response;
              this.statusBackSkip = true;
              this.step_1 = false;
              this.step_2 = false;
              this.step_2_skip = false
              this.step_3 = false;
              this.step_3_skip = false;
              this.step_4 = true;
          }
      },
      goBack(response) {
        if (response === 'UploadType') {
          this.step_1 = true;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3 = false;
          this.step_4 = false;
        } else if (response === 'PullSettings') {
          this.step_1 = false;
          this.step_2 = true;
          this.step_2_skip = false
          this.step_3 = false;
          this.step_4 = false;
        }
        else if (response === 'MapFields' &&
            !this.statusBackSkip &&
            !this.statusBackValidity) {
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3_skip = false;
          this.step_3 = true;
          this.step_4 = false;
        } else if(response === 'MapFields' &&
            this.statusBackSkip){
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3_skip = true;
          this.step_3 = false;
          this.step_4 = false;
          this.statusBackSkip =false
        }else if(response === 'MapFields' &&
            this.statusBackValidity){
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = true
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = false;
          this.statusBackSkip =false
        }
        else if (response === 'SkipSource') {
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = true
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = false;
        }else if (response === 'SkipOption') {
          this.step_1 = true;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = false;
        }
      },

      importModal(item) {
        this.currentItemErrorLines = +item.error_number
        this.showImportModal = true;
        this.download_data = {...item}
      },
      rollback(item) {
        this.showDeleteModal = true;
        this.itemToRollback = {...item}
      },
      rollbackImport (response) {
        this.showDeleteModal = false;
        if(response) {
            this.$store.dispatch('importV2Module/deleteProcess', this.itemToRollback.id);
        }
      },
    },
  watch: {
    searchImport: {
      handler: function () {
        this.$store.dispatch('importV2Module/searchImpots', {
          page: this.currentPage,
          perPage: this.perPage,
          search: this.searchImport
        })
      }
    }
  }
}
</script>
