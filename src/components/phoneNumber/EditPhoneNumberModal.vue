<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Phone Number
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Phone Details</div>
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
                                <b-input-group prepend="Phone Number" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.phone_number"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Phone Type" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.phone_type"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Phone Validity" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.phone_validity"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Skip Source" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phone_skip_sources"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Name" class="mb-2">
                                    <b-form-input readonly v-model="phoneNumber.user_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Id" class="mb-2">
                                    <b-form-input readonly v-model="phoneNumber.seller_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-row>
            <b-row class="mt-5">
                <b-tabs class="w-100" content-class="mt-3" fill>
                    <b-tab :title="(sellerRelatedList.length)+' Related Lists'" active>
                    <b-table
                        id="list-table"
                        small
                        striped
                        sort-icon-left
                        hover
                        responsive
                        :busy="isBusy"
                        :fields="listFieldsFiltered"
                        :items="sellerRelatedList"
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
                        <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
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
                            <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editListItem(data.item)"></b-icon>
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
                    </b-table>
                  </b-tab>
                    <b-tab :title="(tabData?tabData.length:'') + ' Related Running Lists'">
                    <b-table
                        id="related-table"
                        small
                        sort-icon-left
                        striped
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
                  <b-tab :title="(relatedSkipSources?relatedSkipSources.length:'') + ' Related Skip Sources'">
                    <b-table
                        id="related-table"
                        small
                        sort-icon-left
                        striped
                        hover
                        :busy="isBusy"
                        :fields="relatedSkipSourcesFields"
                        :items="relatedSkipSources"
                        responsive
                        :per-page="0"
                        :sticky-header="true"
                        class="table_height_all_modal"
                    >
                    </b-table>
                  </b-tab>
                  <b-tab :title="(exportItems ? exportItems.length : '') + ' Related Exports'">
                    <b-table
                        id="related-table"
                        small
                        striped
                        sort-icon-left
                        hover
                        :busy="isBusy"
                        :fields="exportFields"
                        :items="exportItems"
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
                    <b-tab :title="(phoneNumber.sellers?phoneNumber.sellers.length:'') + ' Related Sellers'">
                        <b-col>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" @click="showAssignSellerModal = true" variant="primary">Assign Existing Seller</b-button>
                            </b-col>
                        </b-col>
                        <b-table
                                id="seller-table"
                                small
                                sort-icon-left
                                striped
                                hover
                                :busy="isBusy"
                                :fields="sellerTableFields"
                                :items="phoneNumber.sellers"
                                responsive
                                :per-page="10"
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
                            <template v-slot:cell(user_name)="">
                                <p class="" >{{phoneNumber.user_name}}</p>
                            </template>
                        </b-table>
                    </b-tab>
                    <b-tab :title="(phoneNumber.subjects?phoneNumber.subjects.length:'') + ' Related Subjects'">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAssignSubjectModal = true">Assign Existing Subject</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="subject-table"
                                small
                                sort-icon-left
                                striped
                                hover
                                :busy="isBusy"
                                :fields="subjectFields"
                                :items="phoneNumber.subjects"
                                responsive
                                :per-page="10"
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
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editSubject(data.item)"></b-icon>
                            </template>
                        </b-table>
                    </b-tab>
                </b-tabs>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="$emit('cancel')"
                >
                    Cancel
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
export default {
    name: 'PhoneNumberModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        }
    },
    methods: {
        editListItem(item) {
          const route = '/list?id=' + item.id;
          this.editedItem = { ...item }
          let routeData = this.$router.resolve({path: route});
          window.open(routeData.href, '_blank');
        },
        edit() {
            this.isReadOnly = true;
            this.$emit('save', this.phoneNumber);
        },
        async currentModal(){
            this.$store.dispatch('uxModule/setLoading')
            let seller = this.phoneNumber?.sellers?.[0];
            if(seller) {
            await this.$store.dispatch(`listModule/getSellerRunningList`, {id:seller.id})
            await this.$store.dispatch(`listModule/getSellerRelatedList`, {id:seller.id})
            }
            this.$store.dispatch('uxModule/hideLoader')

        },
        editSellerItem(item) {
            const route = '/sellers?seller_id=' + item.id;
            let routeData = this.$router.resolve({path: route});
            window.open(routeData.href, '_blank');
        },
        editSubject (item) {
            const route = '/subjects?subject_id=' + item.id;
            let routeData = this.$router.resolve({path: route});
            window.open(routeData.href, '_blank');
        },
        editExportItem(item) {
          const route = '/activity?export_id=' + item.id;
          this.editedItem = { ...item }
          let routeData = this.$router.resolve({path: route});
          window.open(routeData.href, '_blank');
        },
    },
    data() {
        return {
            phoneNumber: {
                phone_number: '',
                phone_type: '',
                phone_validity: '',
                phone_skip_source: '',
                user_id: '',
                seller_id: '',
                sellers: [],
                subjects: []
            },
            phone_skip_sources: '',
            listFieldsFiltered: null,
            relatedList:null,
            isBusy: false,
            isReadOnly: true,
            showAssignSellerModal: false,
            sellerTableFields: null,
            sellerTableSkipFields:["seller_total_subjects","seller_total_phones","seller_total_emails","seller_mailing_address_line2","seller_company_owned","created_at","updated_at","user_id","delete"],
            subjectFields: [
                {key:"id", label: "Id", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},
                {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true},
                {key: "subject_city", label: "Subject City", sortable: true},
                {key: "subject_state", label: "Subject State", sortable: true},
                {key: "subject_zip", label: "Subject Zip", sortable: true},
                {key: "subject_country", label: "Subject County", sortable: true},
                {key: "subject_market", label: "Market", sortable: true},
                {key: "subject_age", label: "Subject Age", sortable: true},
                {key: "subject_type", label: "Subject Type", sortable: true},
            ],
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
        ],
        relatedSkipSourcesFields: [
                {key:"id", label: "Id", sortable: true},
                {key:"phone_skip_source", label: "Skip Source", sortable: true},
                {key:"phone_skip_date", label: "Skip Date", sortable: true}
            ],
        }
    },
    computed: {
        ...mapGetters({
            sellerFields: 'sellerModule/fields',
            tabData: 'listModule/sellerRunningList',
            sellerRelatedList: 'listModule/sellerRelatedList',
            exportFields: 'exportModule/fields',
            exportItems: 'exportModule/exports',
            listFields: 'listModule/fields',
            relatedSkipSources: 'phoneNumberModule/relatedSkipSources'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    mounted() {
        this.sellerTableFields = this.sellerFields.filter(s=>this.sellerTableSkipFields.indexOf(s.key) == -1);
        this.listFieldsFiltered = this.listFields.filter(s => s.key !== 'list_total_subject' && s.key !== 'total_running_lists' && s.key !== 'list_total_individual_list')
    },
    watch: {
       async showModal() {
        try {
                if(this.showModal){
                    this.$store.dispatch('uxModule/setLoading')
                    this.phoneNumber = {...this.propsData}                    
                    let response = await this.$store.dispatch('listModule/getSelectedList', this.phoneNumber.list_id);
                    this.relatedList = [response.list];
                    this.$store.dispatch(`exportModule/getExports`, {'module': 'phones', id: this.propsData.id});
                    await this.$store.dispatch(`phoneNumberModule/relatedSkipSources`, this.propsData.id);
                    await this.currentModal();
                    this.$store.dispatch('uxModule/hideLoader')
                }
            } catch (error) {
                console.log(error);
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        relatedSkipSources() {
            this.phone_skip_sources = this.relatedSkipSources.map(i=>i['phone_skip_source']).join();
        }
    }

}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
</style>
