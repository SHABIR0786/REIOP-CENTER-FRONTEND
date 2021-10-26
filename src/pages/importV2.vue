<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <div v-if="!importDetails.file">
            <h3>Previous Imports</h3>
            <div>
                <b-row>
                    <b-col class="d-flex justify-content-end">
                        <b-button variant="primary" class="add-seller" @click="showImportModal = true">
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
                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
                </template>
                <template v-slot:cell(list_type)="data">
                    <div :title="data.item.list_type">
                        <p class="user-email">{{data.item.list_type}}</p>
                    </div>
                </template>
                <template v-slot:cell(list_group)="data">
                    <div :title="data.item.list_group">
                        <p class="user-email">{{data.item.list_group}}</p>
                    </div>
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
                    <p class="mb-0">Showing 1 to 20 of100 entries</p>
                </b-col>
    <!--            <b-col class="d-flex justify-content-end">-->
    <!--                <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>-->
    <!--            </b-col>-->
            </b-row>
            <import-downloads :showModal ="showImportModal" @cancel="showImportModal=false" @modalResponse="modalResponse"></import-downloads>
        </div>
        <div v-if="importDetails.file">
            <step1></step1>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ImportDownloads from "../components/import/ImportDownloads";
import Step1 from "../components/import/Step1";

export default {
    name: "importV2",
    components: {
        ImportDownloads,
        Step1
    },
    data () {
        return {
            searchImport: '',
            pageOptions: [10, 20, 50],
            perPage: 20,
            isBusy: false,
            showImportModal: false,
            importDetails: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'importV2Module/fields',
            items: 'importV2Module/imports',
            // total: 'listModule/total'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    methods: {
        modalResponse(response) {
            this.showImportModal = false;
            if (response) {
                this.importDetails.file = response;
                console.log('response', response);
            }
        },
    }
}
</script>
