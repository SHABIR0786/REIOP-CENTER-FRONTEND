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
    <!--            :current-page="currentPage"-->
                <template #table-busy>
                    <div class="text-center" my-2>
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>

    <!--            <template #head(id)="scope">-->
    <!--                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>-->
    <!--            </template>-->
                <template #head(actions)="scope">
                    <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
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
                    <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
                </b-col>
            </b-row>
            <import-downloads :showModal ="showImportModal" :propsData="download_data" @cancel="showImportModal=false" @modalResponse="modalResponse"></import-downloads>
        </div>
<!--        <div v-if="importDetails.file">-->
<!--            <import_step1 />-->
<!--        </div>-->
<!--        <component is="import_step1"></component>-->
        <import-type v-if="step_1" @importResponse="importTypeResponse"></import-type>
        <upload-type v-if="step_2" @uploadResponse="uploadTypeResponse"></upload-type>
        <pull-settings v-if="step_3" :lists="lists" @pullSettingsResponse="pullSettingsResponse"></pull-settings>
        <map-fields :upload_type="importDetails.upload_type" v-if="step_4"></map-fields>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ImportDownloads from "../components/import/ImportDownloads";
import ImportType from "../components/import/ImportType";
import UploadType from "../components/import/UploadType";
import PullSettings from "../components/import/PullSettings";
import MapFields from "../components/import/MapFields";

export default {
    name: "importV2",
    components: {
        ImportType,
        ImportDownloads,
        UploadType,
        PullSettings,
        MapFields
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
            step_3: false,
            step_4: false,
            currentPage: 2,
            download_type: '',
            showImportTable: true,
            download_data: {},
            pull_list: {},
        }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        this.$store.dispatch('listModule/getAllLists', {page: 1, perPage: 10000})
        this.$store.dispatch("importV2Module/getAllProcesses", {page: 1, perPage: 10000})
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
            total: 'listModule/total'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    methods: {
        modalResponse(response) {
            this.showImportModal = false;
            if (response) {
                this.download_type = response;
                // this.step_1 = true;
                // this.step_2 = false;
                // this.step_3 = false;
                // this.step_4 = false;
                //
            }
        },
        importTypeResponse(response) {
           if(response) {
               this.importDetails.import_type = response;

               this.step_1 = false;
               this.step_2 = true;
               this.step_3 = false;
               this.step_4 = false;

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
                this.step_3 = false;
                this.step_4 = true;

            }
        },
        importModal(item) {
            this.showImportModal = true;
            this.download_data = {...item}
        }
    }
}
</script>
