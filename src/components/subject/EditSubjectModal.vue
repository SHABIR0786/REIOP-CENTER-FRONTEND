<template>
    <b-modal size="huge" v-model="showModal" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Subject
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center text-center d-flex align-items-center p-3">
                    <div>Subject Details</div>
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
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject City" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_city"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject State" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_state"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject Zip" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_zip"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject Address Line 2" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_address_line2"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject County" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_county"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Market" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_market"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject Age" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_age"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Subject Type" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_type"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center" v-for="customfield in customFields" :key="customfield.id">
                            <b-col cols="12" v-if="customfield.visible && subject[customfield.field]">
                                <b-input-group :prepend="customfield.label" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject[customfield.field]"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-row>

            <b-row class="mt-5">
                <b-tabs class="w-100" content-class="mt-3" fill>
                    <b-tab :title="(subjectRelatedList.length)+' Related Lists'" active>
                        <!-- <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" @click="showAssignSellerModal = true" variant="primary">Assign Existing List</b-button>
                            </b-col>
                        </b-row> -->
                        <b-table
                                id="list-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                responsive
                                :busy="isBusy"
                                :fields="listFieldsFiltered"
                                :items="subjectRelatedList"
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
                                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
                            </template>
                            <template #head(actions)="scope">
                                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                            </template>

                            <template #head(list_type)="scope">
                                <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
                            </template>

                            <template #head(list_group)="scope">
                                <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
                            </template>

                            <template #head(list_market)="scope">
                                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                            </template>

                            <template #head(list_total_subject)="scope">
                                <div class="text-nowrap" style="width: 130px;">{{scope.label}}</div>
                            </template>

                            <template #head()="scope">
                                <div class="text-nowrap" style="width: 160px;">{{ scope.label }}</div>
                            </template>

                            <template v-slot:cell(id)="data">
                                <div :title="data.item.id">
                                    <p class="user-email">{{data.item.id}}</p>
                                </div>
                            </template>
                            <template #head(created_at)="scope">
                                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                            </template>
                            <template #head(updated_at)="scope">
                                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
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
                          <template v-slot:cell(actions)="data">
                            <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editListItem(data.item)"></b-icon>
                            <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon> -->
                          </template>
                        </b-table>
                    </b-tab>
                    <b-tab :title="(tabData ? tabData.length : '') + ' Related Running Lists'" >
                    <b-table
                        id="related-table"
                        small
                        striped
                        sort-icon-left
                        hover
                        :busy="isBusy"
                        :fields="relatedTableFields"
                        :items="tabData"
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
                        <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
                      </template>
                      <template #head(actions)="scope">
                        <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                      </template>
                      <template #head()="scope">
                        <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                      </template>
                      <template v-slot:cell(id)="data">
                        <div :title="data.item.id">
                          <p class="related-list-id" @click="editListItem(data.item)">{{data.item.id}}</p>
                        </div>
                      </template>
                    </b-table>
                  </b-tab>
                   <b-tab :title="(exportItems ? exportItems.length : '') + ' Related Exports'" >
                    <b-table
                        id="related-table"
                        small
                        striped
                        sort-icon-left
                        hover
                        :busy="isBusy"
                        :fields="exportTableFields"
                        :items="exportItems"
                        responsive
                        :per-page="0"
                        :sticky-header="true"
                        class="table_height_all_modal">
                      <template #table-busy>
                        <div class="text-center" my-2>
                          <b-spinner class="align-middle"></b-spinner>
                          <strong>Loading...</strong>
                        </div>
                      </template>
                      <template #head(actions)="scope">
                        <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                      </template>
                      <template #head()="scope">
                        <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                      </template>
                      <template v-slot:cell(actions)="data">
                            <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editExportItem(data.item)"></b-icon>
                       </template>
                    </b-table>
                   </b-tab>
                  <b-tab :title="(subject.sellers?subject.sellers.length:'') +' Related Sellers'">
                        <!-- <b-col>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" @click="showAssignSellerModal = true" variant="primary">Assign Existing Seller</b-button>
                            </b-col>
                        </b-col> -->
                        <b-table
                                id="seller-table"
                                small
                                striped
                                hover
                                sort-icon-left
                                :busy="isBusy"
                                :fields="sellerTableFields"
                                :items="subject.sellers"
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
                                <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
                            </template>
                            <template #head(actions)="scope">
                                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                            </template>
                            <template #head()="scope">
                                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                            </template>
                            <template v-slot:cell(actions)="data">
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editSellerItem(data.item)"></b-icon>
                            </template>
                        </b-table>
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
            <edit-seller-details :showModal="showDetailsModal" :propsSeller="editedItem" @cancel="showDetailsModal=false" @save="save"></edit-seller-details>
            <assign-existing-seller :showModal="showAssignSellerModal" :subjectId="subject.id" :propsSeller="subject.sellers" @cancel="showAssignSellerModal = false"></assign-existing-seller>
        </template>
    </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import EditSellerDetails from "./EditSellerDetails";
import AssignExistingSeller from "./AssignExistingSeller";

export default {
    name: 'EditSubjectModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        },
        customFields: {
            type: Array
        }
    },
    data() {
    return {
      subject: {
        subject_address: '',
        subject_city: '',
        subject_state: '',
        subject_zip: '',
        subject_full_address: '',
        subject_county: '',
        subject_market: '',
        subject_age: '',
        subject_type: '',
        subject_address_line2: '',
        user_id: '',
      },
      isReadOnly: true,
      buttonState: 'Edit',
      isBusy: false,
      sellerTableFields: null,
      listFieldsFiltered: null,
      exportTableFields: null,
      editedItem: {},
      showDetailsModal: false,
      showAssignSellerModal: false,
      sellerTableSkipFields:["seller_total_subjects","seller_total_phones","seller_total_emails","seller_mailing_address_line2","seller_company_owned","created_at","updated_at","user_id","delete"],
      relatedTableFields: [
        {key:"id",  label: "ID", sortable: true},
        {key:"list_run_year",  label: "Run Year", sortable: true},
        {key:"list_run_month",   label: "Run Month", sortable: true},
        {key:"subjects_count",  label: "Total Subjects", sortable: true},
        {key:"sellers_count",   label: "Total Sellers", sortable: true},
        {key:"phones_count",    label: "Total Phones", sortable: true},
        {key:"emails_count",    label: "Total Emails", sortable: true},
        {key:"golden_addresses_count", label: "Total Golden Address", sortable: true},
        {key:"error_number",    label: "Total Errors", sortable: true},
      ]
    }
  },
    components: {
        EditSellerDetails,
        AssignExistingSeller
    },
    methods: {
        edit() {
            this.subject.subject_full_address = ((this.subject.subject_address??"") +" "+ (this.subject.subject_address_line2?this.subject.subject_address_line2+", ":" ") + (this.subject.subject_city ? this.subject.subject_city+", ":" ") + (this.subject.subject_state??"") +" "+ (this.subject.subject_zip??"")).trim();
            this.isReadOnly = true;
            this.$emit('save', this.subject);
        },
        async currentModal() {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch(`listModule/getSubjectRunningList`, {id:this.propsData.id});
            await this.$store.dispatch(`listModule/getSubjectRelatedList`, {id:this.propsData.id});
            this.$store.dispatch('uxModule/hideLoader')
        },
        editSellerItem(item) {
            const route = '/sellers?seller_id=' + item.id;
            this.editedItem = { ...item }
            let routeData = this.$router.resolve({path: route});
            window.open(routeData.href, '_blank');
        },
        editListItem(item) {
          const route = '/list?id=' + item.id;
          this.editedItem = { ...item }
          let routeData = this.$router.resolve({path: route});
          window.open(routeData.href, '_blank');
        },
        editExportItem(item) {
          const route = '/activity?export_id=' + item.id;
          this.editedItem = { ...item }
          let routeData = this.$router.resolve({path: route});
          window.open(routeData.href, '_blank');
        },
        save(item) {
            this.$store.dispatch('sellerModule/editSeller', {...item})
        },
    },
    computed: {
        ...mapGetters({
            sellerFields: 'sellerModule/fields',
            exportFields: 'exportModule/fields',
            exportItems: 'exportModule/exports',
            listFields: 'listModule/fields',
            tabData: 'listModule/subjectRunningList',
            subjectRelatedList: 'listModule/subjectRelatedList',
        }),
        rows() { return this.total ? this.total : 1 }
    },
    mounted () {
        this.sellerTableFields = this.sellerFields.filter(s=>this.sellerTableSkipFields.indexOf(s.key) == -1);
        this.listFieldsFiltered = this.listFields.filter(s => s.key !== 'list_total_subject' && s.key !== 'total_running_lists' && s.key !== 'list_total_individual_list' && s.key !== 'subjects_unique_count');
        this.exportTableFields = this.exportFields.filter(s => s.key !== 'status');
    },
    watch: {

         async showModal() {
            if(this.showModal){
                this.subject = {...this.propsData}
                this.$store.dispatch('uxModule/setLoading');
                await this.$store.dispatch(`exportModule/getExports`, {'module': 'subjects', id: this.propsData.id});
                await this.currentModal();
                this.$store.dispatch('uxModule/hideLoader');

            }
        }
    }
}
</script>
<style scoped>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .assign-btn {
        text-align: end;
    }
    .related-list-id{
      color: #024847;
      cursor: pointer;
      font-weight: bold;
    }
</style>
