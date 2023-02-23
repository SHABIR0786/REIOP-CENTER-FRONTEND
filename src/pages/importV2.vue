<template>
    <div :class="`list-page wide-content`">
      <b-row>
                    <b-col class="d-flex justify-content-end">
                        <b-button variant="primary" class="add-seller" @click="step_1 = true, showImportTable = false" v-if="showImportTable">
                            <b-icon icon="plus" aria-hidden="true"></b-icon> Start A New Import</b-button>
                    </b-col>
                </b-row>
      <b-tabs pills class="loading_zone_tabs" v-if="showImportTable">
        <b-tab title="Loading Zone" :active="tab == 'loadingZone'">
          <hr>
        <h3>Loading Zone</h3>
            <div>
                <b-row class="mb-3">
                    <b-col cols="8" class="d-flex align-items-center">
                        <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                    </b-col>
                    <b-col cols="4">
                      <b-input-group class="">
                    <b-form-input v-model="searchPendingImport" placeholder="Search" title="Search Imports" v-b-tooltip.hover @keyup.enter="searchPendingImportFunction()"></b-form-input>

                    <b-input-group-append>
                        <b-input-group-text role="button"  @click="searchPendingImportFunction()" v-b-tooltip.hover title="Search (press Enter key)">
                            <b-spinner v-if="isBusy" small variant="primary" class="my-auto ml-2"></b-spinner>
                            <b-icon  v-else icon="search" variant="primary" ></b-icon> 
                        </b-input-group-text>
                        <b-input-group-text role="button" v-b-tooltip.hover title="Clear Search" v-if="searchPendingImport.length>0">
                            <b-icon   @click="searchPendingImport='';searchPendingImportFunction()" small icon="x-circle" class=""></b-icon>
                        </b-input-group-text>
                    </b-input-group-append>
                </b-input-group>
                  </b-col>
                </b-row>
            </div>
            <b-table
                    id="list-table"
                    small
                    ref="tableloandingzone"
                    striped
                    sort-icon-left
                    hover
                    responsive
                    :busy="isBusy"
                    :fields="fieldsLoadingZone"
                    :items="filteredItemsPending"
                    :per-page="pending_perPage"
                    @sort-changed="sortingChangedPending"
                    no-local-sorting
                    :sticky-header="true">
              <template #head(file_name)="scope">
                    <div class="text-nowrap file_name_full" style="width: 150px;">{{scope.label}}</div>
                </template>
                <template #head(actions)="scope">
                    <div class="text-nowrap" style="width: 70px;">{{scope.label}}</div>
                </template>
                <template #head(error_number)="scope">
                    <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                </template>
                <template #head(total_row_number)="scope">
                    <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                </template>
                <template #head(status)="scope">
                    <div class="text-nowrap" style="width: fit-content;">{{scope.label}}</div>
                </template>
              <template #head(percentage)="scope">
                    <div class="text-nowrap" style="width: 90px;">{{scope.label}}</div>
                </template>
                <template #head()="scope">
                    <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                </template>
                <template v-slot:cell(actions)="data">
                    <b-icon class="mr-2 cursor-pointer" icon="arrow-counterclockwise" variant="primary" @click="rollback(data.item)" v-if="authUser.role == 1 || showPendingStatus(data.item) == 'Completed'"></b-icon>
                    <b-icon class="mr-2 cursor-pointer" icon="play-fill" variant="primary" @click="resumeJob(data.item)" v-if="authUser.role == 1 || showPendingStatus(data.item) == 'Completed'"></b-icon>
                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                    <b-icon class="cursor-pointer" variant="primary" icon="cloud-download-fill" @click="importModal(data.item)"></b-icon>
                </template>
                <template v-slot:cell(status)="data">
                    <div >
                      <p>{{data.item.status?data.item.status:showPendingStatus(data.item)}}</p>
                    </div>
                </template>
                <template v-slot:cell(percentage)="data">
                    <div :title="data.item.id" class="text-center">
                        <p class="user-email">{{data.item.percentage}}%</p>
                    </div>
                </template>
                
                <template v-slot:cell(import_type)="data">
                  <div v-b-tooltip.hover :title="data.item.import_type">{{ data.item.import_type }}</div>
                </template>
                <template v-slot:cell(file_name)="data">
                <div v-b-tooltip.hover :title="data.item.file_name" class="file_name_full">{{ data.item.file_name }}</div>
                </template>
                <template v-slot:cell(created_records)="data">
                  <div v-b-tooltip.hover :title="data.item.created_records">{{ data.item.created_records }}</div>
                </template>
                <template v-slot:cell(id)="data">
                  <div v-b-tooltip.hover :title="data.item.id">{{ data.item.id }}</div>
                </template>

            </b-table>
            <b-row>
                <b-col class="d-flex align-items-center">
                    <b-form-group
                            label="Show"
                            label-for="show-select2"
                            label-cols-sm="6"
                            label-cols-md="4"
                            label-cols-lg="3"
                            label-size="xs"
                            class="mb-0"
                    >
                        <b-form-select id="show-select2" v-model="pending_perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col v-if="pending_total > 0" class="d-flex align-items-center justify-content-center">
                    <p class="mb-0">Showing {{pending_pageFrom}} to {{pending_pageTo}} of {{pending_total}} entries</p>
                </b-col>
                <b-col v-else class="d-flex align-items-center justify-content-center">
                    <p class="mb-0">Showing 0 entries of 0</p>
                </b-col>
                <b-col class="d-flex justify-content-end">
                    <b-pagination class="mb-0" @input="handlePendingPageClick" v-model="pending_currentPage" :total-rows="pending_rows" :per-page="pending_perPage" aria-controls="import-table"></b-pagination>
                </b-col>
            </b-row>
        </b-tab>
        <b-tab title="Previous Imports" :active="tab == 'previousImports'">
          <hr>

          <div>
            <h3>Previous Imports</h3>
            <div>

                <b-row class="mb-3">
                    <b-col cols="8" class="d-flex align-items-center">
                        <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                    </b-col>
                    <b-col cols="4">
                      <b-input-group class="">
                    <b-form-input v-model="searchImport" placeholder="Search" title="Search Imports" v-b-tooltip.hover @keyup.enter="searchImportFunction()"></b-form-input>

                    <b-input-group-append>
                        <b-input-group-text role="button"  @click="searchImportFunction()" v-b-tooltip.hover title="Search (press Enter key)">
                            <b-spinner v-if="isBusy" small variant="primary" class="my-auto ml-2"></b-spinner>
                            <b-icon  v-else icon="search" variant="primary" ></b-icon> 
                        </b-input-group-text>
                        <b-input-group-text role="button" v-b-tooltip.hover title="Clear Search" v-if="searchImport.length>0">
                            <b-icon   @click="searchImport='';searchImportFunction()" small icon="x-circle" class=""></b-icon>
                        </b-input-group-text>
                    </b-input-group-append>
                </b-input-group>
                  </b-col>
                </b-row>
            </div>
            <b-table
                    id="list-table"
                    small
                    ref="table"
                    striped
                    sort-icon-left
                    hover
                    responsive
                    :busy="isBusy"
                    :fields="fields"
                    :items="filteredItems"
                    :per-page="perPage"
                    @sort-changed="sortingChanged"
                    no-local-sorting
                    :sticky-header="true">
              <template #head(file_name)="scope">
                    <div class="text-nowrap file_name_full" style="width: 150px;">{{scope.label}}</div>
                </template>
                <template #head(actions)="scope">
                    <div class="text-nowrap" style="width: 70px;">{{scope.label}}</div>
                </template>
                <template #head(error_number)="scope">
                    <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                </template>
                <template #head(total_row_number)="scope">
                    <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                </template>
                <template #head(status)="scope">
                    <div class="text-nowrap" style="width: fit-content;">{{scope.label}}</div>
                </template>
              <template #head(percentage)="scope">
                    <div class="text-nowrap" style="width: 90px;">{{scope.label}}</div>
                </template>
                <template #head()="scope">
                    <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                </template>
                <template v-slot:cell(actions)="data">
                    <b-icon class="mr-2 cursor-pointer" icon="arrow-counterclockwise" variant="primary" @click="rollback(data.item)" v-if="authUser.role == 1 || showStatus(data.item) == 'Completed'"></b-icon>
                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                    <b-icon class="cursor-pointer" variant="primary" icon="cloud-download-fill" @click="importModal(data.item)"></b-icon>
                </template>
                <template v-slot:cell(status)="data">
                    <div >
                      <p>{{data.item.status?data.item.status:showStatus(data.item)}}</p>
                    </div>
                </template>
                <template v-slot:cell(percentage)="data">
                    <div :title="data.item.id" class="text-center">
                        <p class="user-email">{{data.item.percentage}}%</p>
                    </div>
                </template>
                
                <template v-slot:cell(import_type)="data">
                  <div v-b-tooltip.hover :title="data.item.import_type">{{ data.item.import_type }}</div>
                </template>
                <template v-slot:cell(file_name)="data">
                <div v-b-tooltip.hover :title="data.item.file_name" class="file_name_full">{{ data.item.file_name }}</div>
                </template>
                <template v-slot:cell(created_records)="data">
                  <div v-b-tooltip.hover :title="data.item.created_records">{{ data.item.created_records }}</div>
                </template>
                <template v-slot:cell(id)="data">
                  <div v-b-tooltip.hover :title="data.item.id">{{ data.item.id }}</div>
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
                <b-col v-if="total > 0" class="d-flex align-items-center justify-content-center">
                    <p class="mb-0">Showing {{pageFrom}} to {{pageTo}} of {{total}} entries</p>
                </b-col>
                <b-col v-else class="d-flex align-items-center justify-content-center">
                    <p class="mb-0">Showing 0 entries of 0</p>
                </b-col>
                <b-col class="d-flex justify-content-end">
                    <b-pagination class="mb-0" @input="handlePageClick" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="import-table"></b-pagination>
                </b-col>
            </b-row>
          </div>
        </b-tab>
      </b-tabs>
          <import-downloads :showModal ="showImportModal" :propsData="download_data" @cancel="showImportModal=false" @modalResponse="modalResponse"></import-downloads>
          <edit-import-modal v-if="!isReload" :data="editData" :lists="lists" :showModal="showModal"  @cancel="cancelEdit" @save="save"></edit-import-modal>
          <import-type v-if="step_1" @cancel="showImportTable=true;step_1=false" @importResponse="importTypeResponse" :importDetails="importDetails"></import-type>
          <upload-type v-if="step_2" @uploadResponse="uploadTypeResponse" :importDetails="importDetails" @goBack="goBack"></upload-type>
          <skip-variant v-if="step_2_skip" :importDetails="importDetails" @skipResponse="setSkipOption" @goBack="goBack"></skip-variant>
          <pull-settings v-if="step_3" :lists="lists" :importDetails="importDetails" @pullSettingsResponse="pullSettingsResponse" @goBack="goBack"></pull-settings>
          <select-skip-data-source v-if="step_3_skip" :importDetails="importDetails" :lists="lists" @skipTraceData="setSkipSource" @goBack="goBack"></select-skip-data-source>
          <notes v-if="step_4" :upload_type="importDetails.upload_type" :lists="lists" :importDetails="importDetails" @setNotesResponse="notesResponse" @goBack="goBack"></notes>
          <map-fields v-if="step_5" :upload_type="importDetails.upload_type" :list_settings="importDetails.pull_settings" :importDetails="importDetails"  @goBack="goBack"></map-fields>
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
import Notes from "../components/import/Notes";
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
      Notes,
      MapFields,
      DeleteModal,
      EditImportModal,
      ConfirmModal,
      SkipVariant
    },
    data () {
      return {
        searchImport: '',
        searchPendingImport: '',
        pageOptions: [10, 20, 50],
        perPage: 20,
        pending_perPage: 20,
        isBusy: false,
        showImportModal: false,
        importDetails: {},
        step_1: false,
        step_2: false,
        step_2_skip: false,
        step_3: false,
        step_3_skip:false,
        step_4: false,
        step_5: false,
        currentPage: 1,
        pending_currentPage: 1,
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
        statusBackValidity:false,
        intervalId:null,
        filteredItems: [],
        filteredItemsPending: [],
        previousStepArr: [],
        tab:'previousImports',
      }
    },
    async created () {
      this.$store.dispatch('uxModule/setLoading')
      await this.getList();
      await this.showImports();
      await this.$store.dispatch('labelModule/visibleCustomFields')
      this.$store.dispatch('uxModule/hideLoader')
    },
    computed: {
      ...mapGetters({
          authUser: 'loginModule/getAuthUser',
          isCollapsed: 'uxModule/isCollapsed',
          fields: 'importV2Module/fields',
          items: 'importV2Module/imports',
          pendingJobs: 'importV2Module/pendingJobs',

          pageTo: 'importV2Module/pageTo',
          pageFrom: 'importV2Module/pageFrom',
          pending_pageTo: 'importV2Module/pending_pageTo',
          pending_pageFrom: 'importV2Module/pending_pageFrom',
          pending_total: 'importV2Module/pending_total',
          lists: 'listModule/lists',
          total: 'importV2Module/total',
          editData: 'importV2Module/editData',
          showImportFirstPage: 'importV2Module/showImportFirstPage',
          fieldsLoadingZone: 'importV2Module/fieldsLoadingZone',
      }),
      rows() { return this.total ? this.total : 0 },
      pending_rows() { return this.pending_total ? this.pending_total : 0 },

      getPreviousStep() {
        return this.previousStepArr[this.previousStepArr.length - 1];
      },
    },
    methods: {
     async resumeJob(item) {
         await this.$store.dispatch('listModule/resumePendingJob', {batchId:item.id});
      },
      async getList(){
        this.$store.dispatch('uxModule/setLoading')
        await this.$store.dispatch('listModule/getAllLists', {page: this.currentPage, perPage: this.perPage});
        this.$store.dispatch('uxModule/hideLoader')
      },
      showStatus(item) {
        if(item.pending_jobs == 0 && item.failed_jobs == 0) {
          return "Completed";
        } else if(item.pending_jobs != 0 && item.failed_jobs == 0){
          return "In Progress";
        }else if(item.failed_jobs != 0){
          return "Failed";
        }
      },
      showPendingStatus(item) {
        if(item.pending_jobs == 0 && item.failed_jobs == 0) {
          return "Completed";
        } else if(item.pending_jobs == item.total_jobs) {
          return "Pending";
        } else if(item.pending_jobs != 0 && item.failed_jobs == 0){
          return "In Progress";
        }else if(item.failed_jobs != 0){
          return "Failed";
        }
      },
      async showImports() {
        try {
          this.$store.dispatch('uxModule/setLoading')
          await this.$store.dispatch('importV2Module/getTotal')
          await this.$store.dispatch("importV2Module/getAllProcesses", {page: this.currentPage, perPage: this.perPage,search: this.searchImport})
          await this.$store.dispatch("importV2Module/pendingJobBatches", {page: this.pending_currentPage, perPage: this.pending_perPage,search: ''})

          this.filteredItems = this.items;
          this.filteredItemsPending = this.pendingJobs;
          const Instance = this;
          this.filteredItems.forEach((item) => {
          Instance.calculatePercentage(item);
          });
          this.filteredItemsPending.forEach((item) => {
          Instance.calculatePendingPercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          console.log(error);
            this.$store.dispatch('uxModule/hideLoader')
        }
        if(this.$route.query.batch_id) {
          this.editItem(this.filteredItems.find(el => el.process_id === this.$route.query.batch_id));
        }
      },
      async handlePageClick(){
        try {
          this.$store.dispatch('uxModule/setLoading')
          await this.$store.dispatch("importV2Module/getAllProcesses", {page: this.currentPage, perPage: this.perPage,search: this.searchImport})
          this.filteredItems = this.items;
          const Instance = this;
          this.filteredItems.forEach((item) => {
          Instance.calculatePercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          console.log(error);
          this.$store.dispatch('uxModule/hideLoader')
        }
      },
      async handlePendingPageClick(){
        try {
          this.$store.dispatch('uxModule/setLoading')
          await this.$store.dispatch("importV2Module/pendingJobBatches", {page: this.pending_currentPage, perPage: this.pending_perPage,search: this.searchPendingImport})
          this.filteredItemsPending = this.pendingJobs;
          const Instance = this;
          this.filteredItemsPending.forEach((item) => {
          Instance.calculatePendingPercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          console.log(error);
          this.$store.dispatch('uxModule/hideLoader')
        }
      },
         
      cancelEdit(){
        this.showModal = false;
      },
      calculatePendingPercentage(item) {
      let percentage = Math.round((item.is_processed / (item.is_processed + item.is_processing)) * 100);
      let index = this.filteredItemsPending.findIndex(x=>x.id == item.id);
      this.filteredItemsPending[index].percentage =  percentage;
      },
      calculatePercentage(item) {
      let percentage = Math.round((item.is_processed / (item.is_processed + item.is_processing)) * 100);
      let index = this.filteredItems.findIndex(x=>x.id == item.id);
      this.filteredItems[index].percentage =  percentage;
      },
      async sortingChanged(ctx) {        
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            if(ctx.sortBy=='percentage'){
              this.sortBy = 'percent';
            }
            try {
            this.currentPage = 1;
          this.$store.dispatch('uxModule/setLoading')
          await this.$store.dispatch('importV2Module/getTotal')
          await this.$store.dispatch("importV2Module/getAllProcesses", {page: this.currentPage, perPage: this.perPage,search: this.searchImport,sortBy: this.sortBy,sortDesc: this.sortDesc})
          this.filteredItems = this.items;
          const Instance = this;
          this.filteredItems.forEach((item) => {
          Instance.calculatePercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          console.log(error);
            this.$store.dispatch('uxModule/hideLoader')
        }
        },
        async sortingChangedPending(ctx) {        
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            if(ctx.sortBy=='percentage'){
              this.sortBy = 'percent';
            }
            try {
            this.pending_currentPage = 1;
          this.$store.dispatch('uxModule/setLoading')
          await this.$store.dispatch("importV2Module/pendingJobBatches", {page: this.pending_currentPage, perPage: this.pending_perPage,search: this.searchPendingImport,sortBy: this.sortBy,sortDesc: this.sortDesc})
          this.filteredItemsPending = this.pendingJobs;
          const Instance = this;
          this.filteredItemsPending.forEach((item) => {
          Instance.calculatePendingPercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
          console.log(error);
            this.$store.dispatch('uxModule/hideLoader')
        }
        },
     async editItem(item) {
        this.$store.dispatch('uxModule/setLoading')
        let response = await this.$store.dispatch('importV2Module/showEditModal', {...item})
        this.isReload = false;
        this.showModal = true
        this.$nextTick(() => {
          this.isReload = false;
        })
        if(response.status){
          this.$store.dispatch('uxModule/hideLoader');
        }
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
        this.previousStepArr.push('step_1');
         this.importDetails.import_type = response;
          this.importDetails.skip_variant = ''
         if (response === 'existing') {
             this.step_1 = false;
             this.step_2 = false;
             this.step_2_skip = true;
             this.step_3 = false;
             this.step_3_skip = false;
             this.step_4 = false;
             this.step_5 = false;
         } else {
             this.step_1 = false;
             this.step_2 = true;
             this.step_2_skip = false;
             this.step_3 = false;
             this.step_3_skip = false;
             this.step_4 = false;
             this.step_5 = false;
         }
       }
      },

      uploadTypeResponse (response) {
        this.statusBackSkip = false
        this.previousStepArr.push('step_2');
        if(response === 'combined') {
          this.importDetails.upload_type = response;
          this.step_1 = false;
          this.step_2 = false;
          this.step_3 = false;
          this.step_4 = true;
          this.step_5 = false;
        }else {
          this.importDetails.upload_type = response;
          this.step_1 = false;
          this.step_2 = false;
          this.step_3 = true;
          this.step_4 = false;
          this.step_5 = false;
        }
      },

      pullSettingsResponse (response) {
        if(response) {
          this.previousStepArr.push('step_3');
          this.importDetails.pull_settings = response;
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = true;
          this.step_5 = false;
          this.statusBackSkip = false;
          this.statusBackValidity = false;
        }
      },

    notesResponse (response) {
          this.previousStepArr.push('step_4');
          this.importDetails.notes = response;
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = false;
          this.step_5 = true;
      },
      setSkipOption (response) {
        this.previousStepArr.push('step_2_skip');
        this.importDetails.skip_variant = response;
        this.importDetails.pull_settings = {};
        if (response === 'skip_trace') {
          this.importDetails.upload_type = 'skip_trace'
          this.statusBackSkip =true;
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false;
          this.step_3_skip = true;
          this.step_3 = false;
          this.step_4 = false;
          this.step_5 = false;
        } else {
          this.statusBackValidity =true;
          this.importDetails.upload_type = 'skip_validity'
          this.importDetails.pull_settings = {};
          this.step_1 = false;
          this.step_2 = false;
          this.step_2_skip = false;
          this.step_3_skip = false;
          this.step_3 = false;
          this.step_4 = true;
          this.step_5 = false;
        }
      },

      setSkipSource (response) {
          if(response) {
              this.previousStepArr.push('step_3_skip');
              this.importDetails.skip_options = response;
              this.statusBackSkip = true;
              this.step_1 = false;
              this.step_2 = false;
              this.step_2_skip = false
              this.step_3 = false;
              this.step_3_skip = false;
              this.step_4 = true;
              this.step_5 = false;
          }
      },
      goBack(response) {
        let checkOtherConditions = true;
        if(this.getPreviousStep){
          checkOtherConditions = false;
          const previousStep = this.getPreviousStep;
          if(previousStep == 'step_1') {
            this.step_1 = true;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            // this.statusBackSkip =false
          } else if(previousStep == 'step_2') {
            this.step_1 = false;
            this.step_2 = true;
            this.step_2_skip = false
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          }  else if(previousStep == 'step_2_skip') {
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = true
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            // this.statusBackSkip =false
          } else if(previousStep == 'step_3') {
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = true;
            this.step_4 = false;
            this.step_5 = false;
          } else if(previousStep == 'step_3_skip') {
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = true;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            // this.statusBackSkip =false
          } else if(previousStep == 'step_4'){
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = true;
            this.step_5 = false;
          } else {
            checkOtherConditions = true;
          }
          this.previousStepArr.pop();
        }
        
        
        if(checkOtherConditions){
          if (response === 'UploadType') {
            this.step_1 = true;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          } else if (response === 'PullSettings') {
            this.step_1 = false;
            this.step_2 = true;
            this.step_2_skip = false
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          }
          else if(response === 'Combined'){
            this.step_1 = false;
            this.step_2 = true;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          } 
          else if (response === 'Notes' &&
            !this.importDetails.upload_type &&
            !this.importDetails.upload_type == 'combined') {
            this.step_1 = false;
            this.step_2 = true;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          }
          else if (response === 'Notes' &&
              !this.statusBackSkip &&
              !this.statusBackValidity) {
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = true;
            this.step_4 = false;
            this.step_5 = false;
          } else if(response === 'Notes' &&
              this.statusBackSkip){
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = true;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            this.statusBackSkip =false
          }else if(response === 'Notes' &&
              this.statusBackValidity){
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = true
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            this.statusBackSkip =false
          }
          else if (response === 'MapFields') {
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = true;
            this.step_5 = false;
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
            this.step_5 = false;
          } else if(response === 'MapFields' &&
              this.statusBackSkip){
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = true;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            this.statusBackSkip =false
          }else if(response === 'MapFields' &&
              this.statusBackValidity){
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = true
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
            this.statusBackSkip =false
          }
          else if (response === 'SkipSource') {
            this.step_1 = false;
            this.step_2 = false;
            this.step_2_skip = true
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          }else if (response === 'SkipOption') {
            this.step_1 = true;
            this.step_2 = false;
            this.step_2_skip = false
            this.step_3_skip = false;
            this.step_3 = false;
            this.step_4 = false;
            this.step_5 = false;
          }
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
      async rollbackImport (response) {
        this.showDeleteModal = false;
        if(response) {
           this.$store.dispatch('uxModule/setLoading')
           await this.$store.dispatch('importV2Module/deleteProcess', this.itemToRollback.id);
           await this.$store.dispatch('listModule/getAllLists', {page: this.currentPage, perPage: this.perPage});
           await this.showImports();
           this.$store.dispatch('uxModule/hideLoader');
        }
      },
      async searchImportFunction(){
        try{
        this.$store.dispatch('uxModule/setLoading')
        this.isBusy = true;
        this.currentPage = 1;
        await this.$store.dispatch('importV2Module/searchImpots', {
          page: this.currentPage,
          perPage: this.perPage,
          search: this.searchImport
        });
          this.filteredItems = this.items;
          const Instance = this;
          this.filteredItems.forEach((item) => {
          Instance.calculatePercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
          this.isBusy = false;

        } catch (error) {
          console.log(error);
          this.$store.dispatch('uxModule/hideLoader')
          this.isBusy = false;

        }
      },
      async searchPendingImportFunction(){
        try{
        this.$store.dispatch('uxModule/setLoading')
        this.isBusy = true;
        this.pending_currentPage = 1;
        await this.$store.dispatch('importV2Module/searchPendingJobs', {
          page: this.pending_currentPage,
          perPage: this.pending_perPage,
          search: this.searchPendingImport
        });
        
          this.filteredItemsPending = this.pendingJobs;
          const Instance = this;
          this.filteredItemsPending.forEach((item) => {
          Instance.calculatePendingPercentage(item);
          });
          this.$store.dispatch('uxModule/hideLoader')
          this.isBusy = false;

        } catch (error) {
          console.log(error);
          this.$store.dispatch('uxModule/hideLoader')
          this.isBusy = false;

        }
      }
    },
    beforeDestroy() {
      if(this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    async mounted() {
      setInterval(async () => {
        await this.$store.dispatch('importV2Module/checkallImports');
      }, 1000 * 60 * 10);
          
          const instance = this;
          window.Echo.private(`importprogress.${this.authUser.id}`).listen("UpdateImportProgress", (e) => {
            let is_processing = e.batch.pending_jobs;
            let is_processed = e.batch.total_jobs - e.batch.pending_jobs;
            let progresspercentage = Math.round((is_processed / (is_processed + is_processing)) * 100);
            let index = instance.filteredItemsPending.findIndex(x=>x.process_id == e.batch.process_id);
            if(index != -1) {
            instance.filteredItemsPending[index].percentage =  progresspercentage;
            instance.filteredItemsPending[index].error_number =  e.batch.error_number;
            instance.filteredItemsPending[index].total_row_number =  e.batch.total_row_number;
            if(progresspercentage == 100) {
            instance.filteredItems.unshift(instance.filteredItemsPending[index]);
            instance.filteredItemsPending.splice(index,1); 
            }
            }
             if(instance.$refs.table){
              instance.$refs.table.refresh();
              instance.$refs.tableloandingzone.refresh();
              }
      });
    },
  watch: {
    searchImport: {
      handler: async function () {
        if(this.searchImport==''){
          this.searchImportFunction();
        }
      }
    },
    async showImportFirstPage(v) {
      this.$store.dispatch('uxModule/setLoading')
      if(v) {
        this.showImportTable = true;
        this.step_1 = false;
        this.step_2 = false;
        this.step_2_skip = false;
        this.step_3 = false;
        this.step_3_skip =false;
        this.step_4 = false;
        this.step_5 = false;
        this.importDetails = {};
      }
      await this.$store.dispatch('importV2Module/showImportFirstPage', false)
        this.$store.dispatch('uxModule/hideLoader');
    },
    perPage: {
        handler: function () {
            this.currentPage = 1;
            this.handlePageClick()
        }
    },
    pending_perPage: {
        handler: function () {
            this.pending_currentPage = 1;
            this.handlePendingPageClick()
        }
    },
  }
}
</script>
<style>
    table th {
      vertical-align: inherit !important;
      height: 64px;
    }
    .loading_zone_tabs .nav-pills {
    background:#ffffff !important;
    }
    .loading_zone_tabs .nav-pills li {
      width:20% !important;
      background:#a2c4c9;
    }
    .loading_zone_tabs .nav-pills li a{
      padding: auto !important;
    }
    .add-seller{
      position:absolute;
    }
    .file_name_full{
      max-width: none !important;
    }
</style>
