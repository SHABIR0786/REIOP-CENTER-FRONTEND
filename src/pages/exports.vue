<template>
<div :class="`list-page wide-content`">
    <h3>Exports</h3>
    <div>
        <hr>
    </div>
    <b-table id="user-table" lg sort-icon-left no-local-sorting striped hover :busy="isBusy" :fields="fields" @sort-changed="sortingChanged" :items="items" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
        <template v-slot:cell(actions)="data">
            <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="showRawData(data.item)"></b-icon>
            <b-icon class="mr-2 cursor-pointer" icon="download" variant="primary" @click="downloadFile(data.item)"></b-icon>
        </template>
    </b-table>
    <b-row>
        <b-col class="d-flex align-items-center">
            <b-form-group label="Show" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>total?total:(currentPage*perPage)}} of {{total}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="total" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
    <edit-export-modal ref="exportModal" :exportItem="exportItem" :showModal="showModal"  @cancel="showModal=false" ></edit-export-modal>
</div>
</template>

<script>
import EditExportModal from "../components/export/EditExportModal";
import {
    mapGetters
} from "vuex";
import {
    BIcon
} from "bootstrap-vue"


export default {
    name: "Companies",
    components: {
        BIcon,
        EditExportModal
    },
    data() {
        return {
            isBusy: false,
            perPage: 20,
            currentPage: 1,
            pageOptions: [10, 20, 50],
            itemsCount: 0,
            sortBy: 'created_at',
            sortDesc: false,
            exportItem: {},
            showModal: false,
        }
    },
    computed: {
        ...mapGetters({
            fields: 'exportModule/fields',
            items: 'exportModule/items',
            total: 'exportModule/totalItems',
            selectedItem: 'exportModule/selectedItem',
        }),
        rows() {
            return this.items ? this.items : 1
        },
    },
    created() {
        if (this.$route.query.export_id) {
            console.log(this.$route.query.export_id);
          this.$store.dispatch('exportModule/getSelectedExport', this.$route.query.export_id).then(() => {
            this.exportItem = this.selectedItem
            this.showModal = true
          })
        }
    },
    async mounted() {
        try {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("exportModule/exports", {
                page: 1,
                perPage: this.perPage,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        async sortingChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            await this.$store.dispatch("exportModule/exports", {
                page: this.currentPage,
                perPage: this.perPage,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
        },
        showRawData(data) {
            this.exportItem = data;
            this.showModal = true;
        },
        downloadFile(data) {
            console.log(data);
        }
    },
    watch: {
        currentPage: {
            handler: async function () {
            await this.$store.dispatch("exportModule/exports", {
                page: this.currentPage,
                perPage: this.perPage,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            }
        },
        perPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                await this.$store.dispatch("exportModule/exports", {
                page: this.currentPage,
                perPage: this.perPage,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
                this.$store.dispatch('uxModule/hideLoader')
            }
        }
    }
}
</script>
