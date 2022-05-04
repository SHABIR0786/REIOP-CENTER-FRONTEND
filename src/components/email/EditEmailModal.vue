<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
                <div>
                    Edit Email Address
                </div>
                <div>
                    <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
                </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Email Details</div>
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
                                <b-input-group prepend="Email Address">
                                    <b-form-input :readonly="isReadOnly" v-model="email.email_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Email Validity" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="email.email_validity"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Skip Source" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="email.email_skip_source"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Name" class="mb-2">
                                    <b-form-input readonly v-model="email.user_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Id" class="mb-2">
                                    <b-form-input readonly v-model="email.seller_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-row>
            <b-row class="mt-5">
                <b-tabs class="w-100" content-class="mt-3" fill>
                    <b-tab title="Related Sellers" active>
                        <b-col>
                            <b-col class="assign-btn">
                                <b-button class="mb-2" @click="showAssignSellerModal = true" variant="primary">Assign Existing Seller</b-button>
                            </b-col>
                        </b-col>
                        <b-table
                                id="seller-table"
                                small
                                striped
                                hover
                                :busy="isBusy"
                                :fields="sellerTableFields"
                                :items="email.sellers"
                                responsive
                                :per-page="10"
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
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editSellerItem(data.item)"></b-icon>
                                <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon> -->
                            </template>
                            <template v-slot:cell(user_name)="">
                                <p class="" >{{email.user_name}}</p>
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
                                :items="email.subjects"
                                responsive
                                :per-page="10"
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
                                <b-icon class="mr-2 cursor-pointer" icon="box-arrow-up-right" variant="primary" @click="editSubject(data.item)"></b-icon>
                                <!-- <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon> -->
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
    name: 'EditEmailModal',
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
            this.$emit('save', this.email);
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
        }
    },
    computed: {
        ...mapGetters({
            sellerFields: 'sellerModule/fields',
        }),
    },
    data() {
        return {
            email: {
                email_address: '',
                email_validity: '',
                email_skip_source: '',
                user_id: '',
                seller_id: '',
                sellers: [],
                subjects: [],

            },
            isBusy: false,
            isReadOnly: true,
            showAssignSellerModal: false,
            sellerTableFields: null,
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
        }
    },
    mounted() {
        this.sellerTableFields = this.sellerFields.filter(s => s.key !== 'seller_total_subjects' &&
            s.key !== 'seller_total_subjects' && s.key !== 'seller_total_phones' && s.key !== 'seller_total_emails' &&
            s.key !== 'seller_mailing_address_line2' && s.key !== 'seller_company_owned' && s.key !== 'created_at' &&
            s.key !== 'updated_at' && s.key !== 'user_id' && s.key !== 'delete');
    },
    watch: {
        showModal() {
            this.email = {...this.propsData}
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
