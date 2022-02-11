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
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Run Month" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="list.list_run_month"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Run Year" class="mb-2">
                            <b-form-input :readonly="isReadOnly" v-model="list.list_run_year"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Stack" class="mb-2">
                            <b-form-input :readonly="isReadOnly" v-model="list.list_stack"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-col>
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
                                <b-input-group prepend="Subject Id" class="mb-2">
                                    <b-form-input readonly v-model="list.subject_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Subjects Count" class="mb-2">
                            <b-form-input readonly v-model="list.subjects_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Sellers Count" class="mb-2">
                            <b-form-input readonly v-model="list.sellers_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Phones Count" class="mb-2">
                            <b-form-input readonly v-model="list.phones_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Emails Count" class="mb-2">
                            <b-form-input readonly v-model="list.emails_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Golden Address Count" class="mb-2">
                            <b-form-input readonly v-model="list.golden_addresses_count"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-col>
                </b-row>
            </b-row>
          <b-row class="mt-5">
            <b-tabs class="w-100" content-class="mt-3" fill>
              <b-tab title="Related Sellers" active @click="currentModal('sellers','Seller')">
                <!--                <b-row>-->
                <!--                  <b-col class="assign-btn">-->
                <!--                    <b-button class="mb-2" variant="primary" @click="showAddPhoneModal = true">Add New Phone Number</b-button>-->
                <!--                  </b-col>-->
                <!--                </b-row>-->
                <b-table
                    id="sellers-table"
                    small
                    striped
                    hover
                    :busy="isBusy"
                    :fields="sellerTableFields"
                    :items="tabData.data"
                    responsive
                    :per-page="0"
                    :sticky-header="true"
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
<!--                  <template v-slot:cell(actions)="data">-->
<!--                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editPhone(data.item)"></b-icon>-->
<!--                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deletePhone(data.item)"></b-icon>-->
<!--                  </template>-->
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
              <b-tab title="Related Phones" @click="currentModal('phones','Phone')">
<!--                <b-row>-->
<!--                  <b-col class="assign-btn">-->
<!--                    <b-button class="mb-2" variant="primary" @click="showAddPhoneModal = true">Add New Phone Number</b-button>-->
<!--                  </b-col>-->
<!--                </b-row>-->
                <b-table
                    id="phone-number-table"
                    small
                    striped
                    hover
                    :busy="isBusy"
                    :fields="phoneFields"
                    :items="tabData.data"
                    responsive
                    :per-page="0"
                    :sticky-header="true"
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
                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editPhone(data.item)"></b-icon>
                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deletePhone(data.item)"></b-icon>
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
              <b-tab title="Related Emails" @click="currentModal('emails','Email')">
<!--                <b-row>-->
<!--                  <b-col class="assign-btn">-->
<!--                    <b-button class="mb-2" variant="primary" @click="showAddEmailModal = true">Add New Email Address</b-button>-->
<!--                  </b-col>-->
<!--                </b-row>-->
                <b-table
                    id="email-table"
                    small
                    striped
                    hover
                    :busy="isBusy"
                    :fields="emailFields"
                    :items="tabData.data"
                    responsive
                    :per-page="0"
                    :sticky-header="true"
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
                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editEmail(data.item)"></b-icon>
                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteEmail(data.item)"></b-icon>
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
              <b-tab title="Related Golden Addresses" @click="currentModal('golden_addresses','GoldenAddress')">
<!--                <b-row>-->
<!--                  <b-col class="assign-btn">-->
<!--                    <b-button class="mb-2" variant="primary" @click="showAddAddressModal = true">Add New Golden Address</b-button>-->
<!--                  </b-col>-->
<!--                </b-row>-->
                <b-table
                    id="phone-number-table"
                    small
                    striped
                    hover
                    :busy="isBusy"
                    :fields="goldenFields"
                    :items="tabData.data"
                    responsive
                    :per-page="0"
                    :sticky-header="true"
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
                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editGoldenAddress(data.item)"></b-icon>
                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteGoldenAddress(data.item)"></b-icon>
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
              <b-tab title="Related Subjects"  @click="currentModal('subjects', 'Subject')">
<!--                <b-row>-->
<!--                  <b-col class="assign-btn">-->
<!--                    <b-button class="mb-2" variant="primary" @click="showAssignSubjectModal = true">Assign Existing Subject</b-button>-->
<!--                  </b-col>-->
<!--                </b-row>-->
                <b-table
                    id="subject-table"
                    small
                    striped
                    hover
                    :busy="isBusy"
                    :fields="subjectFields"
                    :items="tabData.data"
                    responsive
                    :per-page="0"
                    :sticky-header="true"
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
<!--                  <template v-slot:cell(actions)="data">-->
<!--                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>-->
<!--                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>-->
<!--                  </template>-->
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
      currentModal(modalName,tableName){
        this.modalName  = modalName;
        this.tableName  = tableName;
        this.currentPage = 1;
        this.$store.dispatch(`listModule/currentModal`,{data:this.propsData.id, page: 1, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName})
      },
      editSubject (item) {
        const route = '/subjects?subject_id=' + item.id;
        let routeData = this.$router.resolve({path: route});
        window.open(routeData.href, '_blank');
      },
      deleteSubject(item) {
        this.$store.dispatch('subjectModule/deleteSubject', item.id)
      },
    },
    data() {
        return {
          perPage: 20,
          currentPage: 1,
          pageOptions: [10, 20, 50],
            list: {
                list_type: '',
                list_group: '',
                list_market: '',
                list_source: '',
                list_run_month: '',
                list_run_year: '',
                list_stack: '',
                user_id: '',
                subject_id: '',
                subjects_count:'',
                sellers_count:'',
                phones_count:'',
                emails_count:'',
                golden_addresses_count:'',
            },
          isReadOnly: true,
          isBusy: false,
          phoneTableFields: null,
          emailTableFields: null,
          goldenTableFields: null,
          subjectTableFields: null,
          sellerTableFields: null,
          modalName:'sellers',
          tableName:'Seller',
          phoneFields: [
            {key:"id", label: "ID", sortable: true},
            {key: "phone_number", label: "Phone Number", sortable: true},
            {key: "phone_type", label: "Phone Type", sortable: true},
            {key: "phone_validity", label: "Phone Validity", sortable: true},
            {key: "phone_skip_source", label: "Phone Skip Source"},
            {key:"created_at", label: "Created Date", sortable: true},
           // {key: "actions", stickyColumn: true, label: "Actions"},

          ],
          emailFields: [
            {key:"id", label: "ID", sortable: true},
            {key: "email_address", label: "Email Address", sortable: true},
            {key: "email_validity", label: "Email Validity", sortable: true},
            {key: "email_skip_source", label: "Skip Source", sortable: true},
            {key:"created_at", label: "Created Date", sortable: true},
            // {key: "actions", stickyColumn: true, label: "Actions"},
          ],
          goldenFields: [
            {key:"id", label: "ID", sortable: true},
            {key: "golden_address_address", label: "Golden Address", sortable: true},
            {key: "golden_address_city", label: "Golden City", sortable: true},
            {key: "golden_address_state", label: "Golden State", sortable: true},
            {key: "golden_address_zip", label: "Golden Zip", sortable: true},
            {key:"created_at", label: "Created Date", sortable: true},
            {key:"user_name", label: "Uploaded By", sortable: true},
            // {key: "actions", stickyColumn: true, label: "Actions"},
          ],
          subjectFields: [
            {key:"id", label: "Id", sortable: true},
            {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true},
            {key: "subject_city", label: "Subject City", sortable: true},
            {key: "subject_state", label: "Subject State", sortable: true},
            {key: "subject_zip", label: "Subject Zip", sortable: true},
            {key: "subject_country", label: "Subject County", sortable: true},
            {key: "subject_market", label: "Market", sortable: true},
            {key: "subject_age", label: "Subject Age", sortable: true},
            {key: "subject_type", label: "Subject Type", sortable: true},
            // {key: "actions", stickyColumn: true, label: "Actions"},
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
      this.sellerTableFields = this.sellerFields.filter(s => s.key !== 'seller_total_subjects' &&
          s.key !== 'seller_total_subjects' && s.key !== 'seller_total_phones' && s.key !== 'seller_total_emails' &&
          s.key !== 'seller_mailing_address_line2' && s.key !== 'seller_company_owned' && s.key !== 'created_at' &&
          s.key !== 'updated_at' && s.key !== 'user_id' && s.key !== 'actions' && s.key !== 'delete')
    },
    watch: {
        showModal() {
          this.$store.dispatch('listModule/currentModal',{data:this.propsData.id, page: 1, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName})
          this.list= {...this.propsData}
        },
      currentPage: {
        handler: function() {
          this.$store.dispatch('listModule/currentModal', {data:this.propsData.id, page:this.currentPage, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName})
        }
      },
      perPage: {
        handler: function () {
          this.$store.dispatch('listModule/currentModal', {data:this.propsData.id, page:this.currentPage, perPage:this.perPage, modalName:this.modalName, tableName:this.tableName})
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
</style>
