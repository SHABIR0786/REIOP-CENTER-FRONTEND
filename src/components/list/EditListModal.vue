<template>
    <b-modal v-model="showModal" size="huge" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit List
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>List Details</div>
                    <b-button
                            v-if="isReadOnly"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="isReadOnly = false"
                    >
                        Edit
                    </b-button>
                    <b-button
                            v-if="isReadOnly === false"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="edit()"
                    >
                        Save
                    </b-button>
                </b-row>
                <b-row>
                    <b-col>
                        <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="User Name" class="mb-2">
                            <b-form-input readonly v-model="list.user_name"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="List Type" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="list.list_type"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Group" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="list.list_group"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Market" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="list.list_market"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Source" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="list.list_source"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>

                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Unique Subjects " class="mb-2">
                            <b-form-input readonly v-model="list.subjects_unique_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Unique Sellers" class="mb-2">
                            <b-form-input readonly v-model="list.sellers_unique_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Unique Phones" class="mb-2">
                            <b-form-input readonly v-model="list.phones_unique_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Unique Emails" class="mb-2">
                            <b-form-input readonly v-model="list.emails_unique_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Unique Golden Address" class="mb-2">
                            <b-form-input readonly v-model="list.golden_unique_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-col>
                </b-row>
            </b-row>
          <b-row class="mt-5">
            <b-tabs class="w-100" content-class="mt-3" fill>
              <b-tab :title="(tabData.data?tabData.data.length:'') + ' Related Running Lists'" active @click="currentModal()">
                <b-table
                    id="related-table"
                    small
                    striped
                    sort-icon-left
                    hover
                    :busy="isBusy"
                    :fields="relatedTableFields"
                    :items="tabData.data"
                    responsive
                    :per-page="0"
                    :sticky-header="true"
                    class="table_height_all_modal"

                >
                  <template #table-busy>
                    <div class="text-center" my-2>
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template #head(id)="scope">
                    <div class="text-nowrap" style="width: 70px;">{{scope.label}}</div>
                  </template>
                  <template #head(actions)="scope">
                    <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                  </template>
                  <template #head()="scope">
                    <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                  </template>
                  <template #cell(id)="row">
                    <b-button size="sm" @click="showImport(row)" class="mr-2">
                      {{ row.detailsShowing ? 'Hide' : 'Show'}} Imports
                    </b-button>
                  </template>
                  <template #row-details="row">
                    <div class="w-100 mw-100 px-2 mt-3">
                      <b-card class="details-card text-center">
                        <b-table
                            id="related-table"
                            small
                            striped
                            sort-icon-left
                            hover
                            :busy="isBusy"
                            :fields="importFields"
                            :items="row.item.imports"
                            responsive
                            :per-page="0"
                            :sticky-header="true"
                            @row-clicked="openRelatedImports"
                            class="table_height_all_modal"
                        >
                          <template #table-busy>
                            <div class="text-center" my-2>
                              <b-spinner class="align-middle"></b-spinner>
                              <strong>Loading...</strong>
                            </div>
                          </template>
                          <template #head(id)="scope">
                            <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
                          </template>
                          <template #head(actions)="scope">
                            <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                          </template>
                          <template #head()="scope">
                            <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                          </template>
                        </b-table>
                      </b-card>
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
                    <p class="mb-0">Showing 1 to {{perPage}} of {{tabData.total}} entries</p>
                  </b-col>
                  <b-col class="d-flex justify-content-end">
                    <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    name: 'EditListModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        }
    },
    methods: {
      edit() {
          this.isReadOnly = true;
          this.$emit('save', this.list);
      },
      async showImport(row){
        await this.$store.dispatch(`listModule/relatedImports`,{data:row.item.list_hash, runYear:row.item.list_run_year,runMonth:row.item.list_run_month, page: 1, perPage:this.perPage})
        row.toggleDetails();
     },
      currentModal(){
        this.currentPage = 1;
        this.$store.dispatch(`listModule/currentModal`,{data:this.propsData.list_hash, page: 1, perPage:this.perPage})
      },
      editSubject (item) {
        const route = '/subjects?subject_id=' + item.id;
        let routeData = this.$router.resolve({path: route});
        window.open(routeData.href, '_blank');
      },
      deleteSubject(item) {
        this.$store.dispatch('subjectModule/deleteSubject', item.id)
      },
      openRelatedImports(item){
        const route = '/import-v2?batch_id='+item.process_id;
        let routeData = this.$router.resolve({path: route});
        window.open(routeData.href, '_blank');
      }
    },
    data() {
        return {
          perPage: 20,
          currentPage: 1,
          pageOptions: [10, 20, 50],
          isReadOnly: true,
          isBusy: false,
          phoneTableFields: null,
          emailTableFields: null,
          goldenTableFields: null,
          subjectTableFields: null,
          modalName:'sellers',
          tableName:'Seller',
          list: {
            list_type: '',
            list_group: '',
            list_market: '',
            list_source: '',
            list_run_month: '',
            list_run_year: '',
            list_stack: '',
            list_hash: '',
            user_id: '',
            subject_id: '',
            subjects_count:'',
            sellers_count:'',
            phones_count:'',
            emails_count:'',
            golden_addresses_count:'',
          },
          sellerTableSkipFields:["seller_total_subjects","seller_total_phones","seller_total_emails","seller_mailing_address_line2","seller_company_owned","created_at","updated_at","user_id","delete"],
          relatedTableFields: [
            {key:"id",  label: "Imports", sortable: true},
            {key:"list_run_year",  label: "Run Year", sortable: true},
            {key:"list_run_month",   label: "Run Month", sortable: true},
            {key:"subjects_count",  label: "Total Subjects", sortable: true},
            {key:"sellers_count",   label: "Total Sellers", sortable: true},
            {key:"phones_count",    label: "Total Phones", sortable: true},
            {key:"emails_count",    label: "Total Emails", sortable: true},
            {key:"golden_addresses_count", label: "Total Golden Address", sortable: true},
            {key:"error_number",    label: "Total Errors", sortable: true},
          ],
          importFields: [
            {key:"file_name", label: "File Name", sortable: true},
            {key:"import_type", label: "Import Type", sortable: true},
            {key:"created_records", label: "Created Records", sortable: true},
            {key:"error_number", label: "Error Lines", sortable: true},
            {key:"total_row_number", label: "Total Lines", sortable: true},
            {key:"created_at", label: "Created Date", sortable: true},
            {key:"process_id", label: "Process ID", sortable: true},
            {key:"user_name", label: "Uploaded By", sortable: true},
          ],
        }
    },
    computed: {
      ...mapGetters({
        sellerFields: 'sellerModule/fields',
        tabData: 'listModule/tabData',
        total: 'listModule/total'
      }),
      rows() { return this.tabData.total ? this.tabData.total : 1 }
    },
    mounted () {
        this.sellerTableFields = this.sellerFields.filter(s=>this.sellerTableSkipFields.indexOf(s.key) == -1);
    },
    watch: {
        async showModal() {
          let result = await this.$store.dispatch('listModule/currentModal',{data:this.propsData.list_hash, page: 1, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName, list_id: this.propsData.id});
          this.list = {...this.propsData,...result?.uniqueCounts}
        },
      currentPage: {
        handler: function() {
          this.$store.dispatch('listModule/currentModal', {data:this.propsData.id, page:this.currentPage, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName})
        }
      },
      perPage: {
        handler: function () {
          this.$store.dispatch('listModule/currentModal', {data:this.propsData.id, page:1, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName})
        }
      },
    }


}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .details-card, .details-card div {
      width: 100% !important;
      max-width: 100% !important;
    }
</style>
