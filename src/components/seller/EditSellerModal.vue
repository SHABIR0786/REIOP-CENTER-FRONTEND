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
                                <b-input-group prepend="Seller Full Mailing Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="seller.seller_full_mailing_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Mailing Address 2" class="mb-2">
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
                    </b-col>
                </b-row>
            </b-row>

            <b-row class="mt-5">
                <b-tabs class="w-100" content-class="mt-3" fill>
                    <b-tab title="Related Lists" active>
<!--                    <b-row>-->
<!--                      <b-col class="assign-btn">-->
<!--                        <b-button class="mb-2" @click="showAssignSellerModal = true" variant="primary">Assign Existing List</b-button>-->
<!--                      </b-col>-->
<!--                    </b-row>-->
                    <b-table
                        id="list-table"
                        small
                        striped
                        hover
                        responsive
                        :busy="isBusy"
                        :fields="listFields"
                        :items="seller.lists"
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

                      <template #head(list_type)="scope">
                        <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
                      </template>

                      <template #head(list_group)="scope">
                        <div class="text-nowrap" style="width: 150px;">{{scope.label}}</div>
                      </template>

                      <template #head(list_marjet)="scope">
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
                    <b-tab title="Related Phones">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAddPhoneModal = true">Add New Phone Number</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="phone-number-table"
                                small
                                striped
                                hover
                                :busy="isBusy"
                                :fields="phoneFields"
                                :items="seller.phones"
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
                    </b-tab>
                    <b-tab title="Related Emails">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAddEmailModal = true">Add New Email Address</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="email-table"
                                small
                                striped
                                hover
                                :busy="isBusy"
                                :fields="emailFields"
                                :items="seller.emails"
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
                    </b-tab>
                    <b-tab title="Related Golden Addresses">
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
                                :busy="isBusy"
                                :fields="goldenFields"
                                :items="seller.golden_addresses"
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
                    </b-tab>
                    <b-tab title="Related Subjects">
                        <b-row>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" variant="primary" @click="showAssignSubjectModal = true">Assign Existing Subject</b-button>
                            </b-col>
                        </b-row>
                        <b-table
                                id="subject-table"
                                small
                                striped
                                hover
                                :busy="isBusy"
                                :fields="subjectFields"
                                :items="seller.subjects"
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
                                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
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
        <edit-phone-number-modal :showModal="showEditPhoneModal" :propsData="editedItem" @cancel="showEditPhoneModal = false" @save="editPhoneSave"></edit-phone-number-modal>
        <edit-email-modal :showModal="showEditEmailModal" :propsData="editedItem" @cancel="showEditEmailModal = false" @save="editEmailSave"></edit-email-modal>
        <edit-golden-address-modal :showModal="showGoldenAddressModal" :propsData="editedItem" @cancel="showGoldenAddressModal= false" @save="editAddressSave"></edit-golden-address-modal>
<!--        <assign-existing-subject :showModal="showAssignSubjectModal" :sellerId="seller.id" :propsSubjects="seller.subjects" @cancel="showAssignSubjectModal = false"></assign-existing-subject>-->
        <add-phone-number-modal :showModal="showAddPhoneModal" @cancel="showAddPhoneModal = false" @save="addPhone"></add-phone-number-modal>
        <add-email-modal :showModal="showAddEmailModal" @cancel="showAddEmailModal = false" @save="addEmail"></add-email-modal>
        <add-golden-address-modal :showModal="showAddAddressModal" @cancel="showAddAddressModal = false" @save="addAddress"></add-golden-address-modal>
    </b-modal>
</template>
<script>
import EditPhoneNumberModal from "../phoneNumber/EditPhoneNumberModal";
import EditEmailModal from "../email/EditEmailModal";
import EditGoldenAddressModal from "../goldenAddress/EditGoldenAddressModal";
// import AssignExistingSubject from "./AssignExistingSubject";
import AddPhoneNumberModal from "../phoneNumber/AddPhoneNumberModal";
import AddEmailModal from "../email/AddEmailModal";
import AddGoldenAddressModal from "../goldenAddress/AddGoldenAddressModal";

export default {
    name: 'EditSellerModal',
    components: {
        EditPhoneNumberModal,
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
        edit() {
            this.isReadOnly = true;
            this.$emit('save', this.seller);
        },
        editPhone(item) {
            this.editedItem = { ...item }
            this.showEditPhoneModal = true;
        },
        editPhoneSave (item) {
            this.$store.dispatch('phoneNumberModule/editPhoneNumber', {...item})
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
        editSubject (item) {
            const route = '/subjects?subject_id=' + item.id;
            let routeData = this.$router.resolve({path: route});
            window.open(routeData.href, '_blank');
        }
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
            isBusy: false,
            phoneTableFields: null,
            emailTableFields: null,
            goldenTableFields: null,
            subjectTableFields: null,
            phoneFields: [
                {key:"id", label: "ID", sortable: true},
                {key: "phone_number", label: "Phone Number", sortable: true},
                {key: "phone_type", label: "Phone Type", sortable: true},
                {key: "phone_validity", label: "Phone Validity", sortable: true},
                {key: "phone_skip_source", label: "Phone Skip Source"},
                {key:"created_at", label: "Created Date", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},

            ],
            emailFields: [
                {key:"id", label: "ID", sortable: true},
                {key: "email_address", label: "Email Address", sortable: true},
                {key: "email_validity", label: "Email Validity", sortable: true},
                {key: "email_skip_source", label: "Skip Source", sortable: true},
                {key:"created_at", label: "Created Date", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},
            ],
            goldenFields: [
                {key:"id", label: "ID", sortable: true},
                {key: "golden_address_address", label: "Golden Address", sortable: true},
                {key: "golden_address_city", label: "Golden City", sortable: true},
                {key: "golden_address_state", label: "Golden State", sortable: true},
                {key: "golden_address_zip", label: "Golden Zip", sortable: true},
                {key:"created_at", label: "Created Date", sortable: true},
                {key: "actions", stickyColumn: true, label: "Actions"},
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
                {key: "actions", stickyColumn: true, label: "Actions"},
            ],
            listFields: [
                {key:"id", label: "ID", sortable: true},
                //{key:"actions", stickyColumn: true, label: "Actions"},

                // {key:"list_total_subject", label: "Total Subjects", sortable: true},
                // {key:"list_total_individual_list", label: "Total Individual Lists", sortable: true},
                {key:"list_market", label: "Markets", sortable: true},

                {key:"list_group", label: "Group", sortable: true},
                {key:"list_type", label: "Type", sortable: true},
                {key:"list_source", label: "Source", sortable: true},

                // Custom fields
                {key:"list_pull_date", label: "Last Pull Date", sortable: true},
                {key:"created_at", label: "Upload Date", sortable: true},
                {key:"updated_at", label: "Last Edit Date", sortable: true},
            ],
            showEditPhoneModal: false,
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
    },
    mounted () {

    },
    watch: {
        showModal() {
            this.seller = {...this.propsSeller}
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
