<template>
    <b-modal v-model="showModal" size="huge" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Seller
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Seller Details</div>
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
                                <b-input-group prepend="First Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_first_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Last Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_last_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Middle Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_middle_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing City" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_city"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Has Skip Trace Data" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.has_skip_trace_data"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Mailing State" class="mb-2">
                            <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_state"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing Zip" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_zip"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Mailing Address Line 2" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_mailing_address_line2"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                         <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Name" class="mb-2">
                                    <b-form-input readonly v-model="seller.user_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Attempted Export Skip Trace Source" class="mb-2">
                                    <b-form-input readonly v-model="seller.attempted_skip_trace_sources"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Exported Skip Trace Attempts" class="mb-2">
                                    <b-form-input readonly v-model="seller.attempted_skip_traces"></b-form-input>
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
                  <b-tab :title="(exportItems ? exportItems.length : '') + ' Related Exports'"  @click="currentModal()">
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
                  <b-tab :title="(seller.subjects?seller.subjects.length:'') + ' Related Subjects'">
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
                                :items="seller.subjects"
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
                            <template v-slot:cell(actions)="data">
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editSubject(data.item)"></b-icon>
                            </template>
                            <template #head(actions)="scope">
                                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                            </template>
                            <template #head()="scope">
                                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                            </template>
                        </b-table>
                    </b-tab>
                    <b-tab :title="(seller.phones?seller.phones.length:'') + ' Related Phones'">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAddPhoneModal = true">Add New Phone Number</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="phone-number-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                :busy="isBusy"
                                :fields="phoneFields"
                                :items="seller.phones"
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
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editPhone(data.item)"></b-icon>
                                <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deletePhone(data.item)"></b-icon> -->
                            </template>
                        </b-table>
                    </b-tab>
                    <b-tab :title="(seller.emails?seller.emails.length:'') + ' Related Emails'">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAddEmailModal = true">Add New Email Address</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="email-table"
                                small
                                striped
                                sort-icon-left
                                hover
                                :busy="isBusy"
                                :fields="emailFields"
                                :items="seller.emails"
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
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editEmail(data.item)"></b-icon>
                                <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteEmail(data.item)"></b-icon> -->
                            </template>
                        </b-table>
                    </b-tab>
                    <b-tab :title="(seller.golden_addresses?seller.golden_addresses.length:'') + ' Related Golden Addresses'">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAddAddressModal = true">Add New Golden Address</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="phone-number-table"
                                small
                                striped
                                hover
                                sort-icon-left
                                :busy="isBusy"
                                :fields="goldenFields"
                                :items="seller.golden_addresses"
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
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editGoldenAddress(data.item)"></b-icon>
                                <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteGoldenAddress(data.item)"></b-icon> -->
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
        <edit-email-modal :showModal="showEditEmailModal" :propsData="editedItem" @cancel="showEditEmailModal = false" @save="editEmailSave"></edit-email-modal>
        <edit-golden-address-modal :showModal="showGoldenAddressModal" :propsData="editedItem" @cancel="showGoldenAddressModal= false" @save="editAddressSave"></edit-golden-address-modal>
<!--        <assign-existing-subject :showModal="showAssignSubjectModal" :sellerId="seller.id" :propsSubjects="seller.subjects" @cancel="showAssignSubjectModal = false"></assign-existing-subject>-->
        <add-phone-number-modal :showModal="showAddPhoneModal" @cancel="showAddPhoneModal = false" @save="addPhone"></add-phone-number-modal>
        <add-email-modal :showModal="showAddEmailModal" @cancel="showAddEmailModal = false" @save="addEmail"></add-email-modal>
        <add-golden-address-modal :showModal="showAddAddressModal" @cancel="showAddAddressModal = false" @save="addAddress"></add-golden-address-modal>
    </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import EditEmailModal from "../email/EditEmailModal";
import EditGoldenAddressModal from "../goldenAddress/EditGoldenAddressModal";
// import AssignExistingSubject from "./AssignExistingSubject";
import AddPhoneNumberModal from "../phoneNumber/AddPhoneNumberModal";
import AddEmailModal from "../email/AddEmailModal";
import AddGoldenAddressModal from "../goldenAddress/AddGoldenAddressModal";

export default {
    name: 'EditSellerModal',
    components: {
        EditEmailModal,
        EditGoldenAddressModal,
        // AssignExistingSubject,
        AddPhoneNumberModal,
        AddEmailModal,
        AddGoldenAddressModal
    },
    props: {
        showModal: {
            type: Boolean
        },
        propsSeller: {
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
            this.seller.seller_full_mailing_address = ((this.seller.seller_mailing_address??"") +" "+ (this.seller.seller_mailing_address_line2?this.seller.seller_mailing_address_line2+", ":" ") + (this.seller.seller_mailing_city ? this.seller.seller_mailing_city+", ":" ") + (this.seller.seller_mailing_state??"") +" "+ (this.seller.seller_mailing_zip??"")).trim();
            this.isReadOnly = true;
            this.$emit('save', this.seller);
        },
        async currentModal() {
          this.$store.dispatch('uxModule/setLoading')
          await this.$store.dispatch(`listModule/getSellerRunningList`, {id:this.propsSeller.id})
          await this.$store.dispatch(`listModule/getSellerRelatedList`, {id:this.propsSeller.id})
          this.$store.dispatch('uxModule/hideLoader')
        },
        editEmailSave (item) {
            this.$store.dispatch('emailModule/editEmail', {...item})
        },
        editAddressSave (item) {
            this.$store.dispatch('goldenAddressModule/editGoldenAddress', {...item})
        },
        deletePhone(item) {
            this.$store.dispatch('phoneNumberModule/deletePhoneNumber', item.id)
        },
        editEmail(item) {
            this.editedItem = { ...item }
            this.showEditEmailModal = true;
        },
        deleteEmail(item) {
            this.$store.dispatch('emailModule/deleteEmail', item.id);
        },
        editGoldenAddress(item) {
            this.editedItem = { ...item }
            this.showGoldenAddressModal = true;
        },
        deleteGoldenAddress(item) {
            this.$store.dispatch('goldenAddressModule/deleteGoldenAddress', item.id)
        },
        addPhone (item) {
            this.showAddPhoneModal = false
            item.seller_id = this.seller.id
            this.$store.dispatch('phoneNumberModule/addPhoneNumber', {...item})
        },
        addEmail(item) {
            this.showAddEmailModal = false
            item.seller_id = this.seller.id
            this.$store.dispatch('emailModule/addEmail', {...item})

        },
        addAddress(item) {
            this.showAddAddressModal = false
            item.seller_id = this.seller.id
            this.$store.dispatch('goldenAddressModule/addGoldenAddress', {...item})
        },
        editPhone(item) {
            const route = '/phones?phone_id=' + item.id;
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
            seller: {
                seller_full_name: '',
                seller_first_name: '',
                seller_last_name: '',
                seller_middle_name: '',
                seller_mailing_address: '',
                seller_mailing_state: '',
                seller_mailing_city: '',
                seller_mailing_zip: '',
                seller_company_owned: '',
                seller_full_mailing_address: '',
                seller_mailing_address_line2: '',
                user_id: '',
                subject_id: '',
            },
            isReadOnly: true,
            listFieldsFiltered: null,
            isBusy: false,
            phoneTableFields: null,
            emailTableFields: null,
            goldenTableFields: null,
            subjectTableFields: null,
            phoneFields: [
                {key:"id", label: "ID", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},
                {key: "phone_number", label: "Phone Number", sortable: true},
                {key: "phone_type", label: "Phone Type", sortable: true},
                {key: "phone_validity", label: "Phone Validity", sortable: true},
                {key: "phone_skip_source", label: "Phone Skip Source"},
                {key:"created_at", label: "Created Date", sortable: true},

            ],
            emailFields: [
                {key:"id", label: "ID", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},
                {key: "email_address", label: "Email Address", sortable: true},
                {key: "email_validity", label: "Email Validity", sortable: true},
                {key: "email_skip_source", label: "Skip Source", sortable: true},
                {key:"created_at", label: "Created Date", sortable: true},
            ],
            goldenFields: [
                {key:"id", label: "ID", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},
                {key: "golden_address_address", label: "Golden Address", sortable: true},
                {key: "golden_address_city", label: "Golden City", sortable: true},
                {key: "golden_address_state", label: "Golden State", sortable: true},
                {key: "golden_address_zip", label: "Golden Zip", sortable: true},
                {key:"created_at", label: "Created Date", sortable: true},
            ],
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
            showEditEmailModal: false,
            showGoldenAddressModal: false,
            editedItem: {},
            showAssignSubjectModal: false,
            showAddPhoneModal: false,
            showAddEmailModal: false,
            showAddAddressModal: false,
        }
    },
    computed: {
            ...mapGetters({
            tabData: 'listModule/sellerRunningList',
            sellerRelatedList: 'listModule/sellerRelatedList',
            exportFields: 'exportModule/fields',
            exportItems: 'exportModule/exports',
            listFields: 'listModule/fields',
        }),
    },
    mounted () {
        this.listFieldsFiltered = this.listFields.filter(s => s.key !== 'list_total_subject' && s.key !== 'total_running_lists' && s.key !== 'list_total_individual_list' )
    },
    watch: {
        async showModal() {
            if(this.showModal){
                this.$store.dispatch('uxModule/setLoading');
                this.seller = {...this.propsSeller}
                await this.$store.dispatch(`exportModule/getExports`, {'module': 'sellers', id: this.propsSeller.id});
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
    .b-table-sticky-header {
        max-height: 10vh !important;
    }
    .assign-btn {
        text-align: end;
    }
</style>
