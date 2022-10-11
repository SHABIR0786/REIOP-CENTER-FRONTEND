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
import axios from "axios";
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
            sortDesc: true,
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
    async created() {
        if (this.$route.query.export_id) {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('exportModule/getSelectedExport', this.$route.query.export_id).then(() => {
            this.exportItem = this.selectedItem
            this.showModal = true
          })
          this.$store.dispatch('uxModule/hideLoader')
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
    getLivePercentage(item) {
        let percentage = Math.round((item.is_processed / (item.is_processed + item.is_processing)) * 100);
        let index = this.filteredItems.findIndex(x=>x.id == item.id);
        this.filteredItems[index].percentage =  percentage;
        if(percentage != 100) {
            // const Instance = this;
        this.intervalId = setInterval(async () => {
                var progress = await this.$store.dispatch("importV2Module/showBatch", item.id);
                if(progress.batch) {
                progress = progress.batch;
                let is_processed =  progress.total_jobs - progress.pending_jobs;
                let is_processing = progress.pending_jobs;
                let progresspercentage = Math.round((is_processed / (is_processed + is_processing)) * 100);
                let index = this.filteredItems.findIndex(x=>x.id == item.id);
                this.filteredItems[index].percentage = progresspercentage;
                if(this.$refs.table){
                this.$refs.table.refresh();
                }
                if(progresspercentage == 100) {
                clearInterval(this.intervalId);
                }
                }
            }, 25000);
        }
      },
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
        downloadFile(item) {
            this.$store.dispatch('uxModule/setLoading')
                axios({
                    url: `${process.env.VUE_APP_API_URL}/properties/download/${item.id}`, // File URL Goes Here
                    method: 'GET',
                    responseType: 'blob',
                }).then((res) => {
                    const a = document.createElement('a');
                    document.body.appendChild(a);
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    a.href = url;
                    a.download = 'export.csv';
                    a.click();
                    this.$store.dispatch('uxModule/hideLoader');
                });

        }
    },
    watch: {
        currentPage: {
            handler: async function () {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("exportModule/exports", {
                page: this.currentPage,
                perPage: this.perPage,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.$store.dispatch('uxModule/hideLoader');
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
