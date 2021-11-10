<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
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
                                <b-input-group prepend="Subject Full Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="subject.subject_full_address"></b-form-input>
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
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Id" class="mb-2">
                                    <b-form-input readonly v-model="subject.user_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-row>

            <b-row class="mt-5">
                    <b-tabs class="w-100" content-class="mt-3" fill>
                        <b-tab title="Assigned Sellers" active>
                            <b-row>
                                <b-col class="assign-btn">
                                    <b-button class="mb-2" @click="showAssignSellerModal = true" variant="primary">Assign Existing Seller</b-button>
                                </b-col>
                            </b-row>
                            <b-table
                                    id="seller-table"
                                    small
                                    striped
                                    hover
                                    :busy="isBusy"
                                    :fields="sellerTableFields"
                                    :items="subject.sellers"
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
                                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
                                </template>
                            </b-table>
                        </b-tab>
                        <b-tab title="Related Lists">

                        </b-tab>
                        <b-tab title="Related Running Lists">
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
            <assign-existing-seller :showModal="showAssignSellerModal" @cancel="showAssignSellerModal = false"></assign-existing-seller>
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
        }
    },
    components: {
        EditSellerDetails,
        AssignExistingSeller
    },
    methods: {
        edit() {
            this.isReadOnly = true;
            this.$emit('save', this.subject);
        },
        editItem(item) {
            this.showDetailsModal = true
            this.editedItem = { ...item }
        },
        save(item) {
            this.$store.dispatch('sellerModule/editSeller', {...item})
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
            editedItem: {},
            showDetailsModal: false,
            showAssignSellerModal: false,
        }
    },
    computed: {
        ...mapGetters({
            sellerFields: 'sellerModule/fields',
        }),
        rows() { return this.total ? this.total : 1 }
    },
    mounted () {
        this.sellerTableFields = this.sellerFields.filter(s => s.key !== 'seller_total_subjects' &&
            s.key !== 'seller_total_subjects' && s.key !== 'seller_total_phones' && s.key !== 'seller_total_emails' &&
            s.key !== 'seller_mailing_address_line2' && s.key !== 'seller_company_owned' && s.key !== 'created_at' &&
            s.key !== 'updated_at' && s.key !== 'user_id')
    },
    watch: {
        showModal() {
            this.subject = {...this.propsData}
        }
    }

}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .assign-btn {
        text-align: end;
    }
</style>
