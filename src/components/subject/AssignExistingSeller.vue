<template>
    <b-modal v-model="showModal" size="large" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Assign Sellers
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="mb-3">
                <b-col cols="8" class="d-flex align-items-center">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-col>
                <b-col cols="4">
                    <b-form-input v-model="searchSeller" placeholder="Search"></b-form-input>
                </b-col>
            </b-row>
            <b-table
                    id="seller-table"
                    small
                    striped
                    hover
                    :busy="isBusy"
                    :fields="sellerFields"
                    :items="items"
                    responsive
                    :per-page="0"
                    :current-page="currentPage"
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
                <template #head(seller_total_subjects)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_total_phones)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_total_emails)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_first_name)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_middle_name)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_last_name)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_mailing_state)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(seller_mailing_zip)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(created_at)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head(updated_at)="scope">
                    <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
                </template>
                <template #head()="scope">
                    <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
                </template>
                <template v-slot:cell(actions)="data">
<!--                    <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>-->
<!--                    <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>-->
                    <b-btn v-if="isSellerAssigned(data.item.id)" variant="primary" disabled >Assigned</b-btn>
                    <b-btn v-else variant="primary" @click="assignSeller(data.item)">Assign</b-btn>
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
                        <b-form-select
                                id="show-select"
                                v-model="perPage"
                                :options="pageOptions"
                                size="xs"
                                class="ml-3"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col class="d-flex align-items-center justify-content-center">
                    <p class="mb-0">Showing 1 to {{perPage}} of {{total}} entries</p>
                </b-col>
                <b-col class="d-flex justify-content-end">
                    <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
                </b-col>
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
        name: 'AssignExistingSeller',
        props: {
            showModal: {
                type: Boolean
            },
            propsSeller: {},
            subjectId: {},
        },
        methods: {
            assignSeller(item) {
              this.$store.dispatch("sellerModule/attachment", {subject_id: this.subjectId, seller_id: item.id})
            },
            isSellerAssigned(seller_id) {
                if(this.propsSeller.find(element => element.id === seller_id) !== undefined) {
                    return true
                }
            }
        },
        data() {
            return {
                perPage: 9999,
                isBusy: false,
                currentPage: 1,
                pageOptions: [10, 20, 50],
                searchSeller: '',
                sellerFields: [
                    {key:"id", label: "ID", sortable: true},
                    {key: "seller_first_name", label: "First Name", sortable: true},
                    {key: "seller_middle_name", label: "Middle Name", sortable: true},
                    {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},
                    {key: "seller_mailing_address", label: "Mailing Address"},
                    {key: "seller_mailing_state", label: "Mailing State"},
                    {key: "seller_mailing_city", label: "Mailing City"},
                    {key: "seller_mailing_zip", label: "Mailing Zip"},
                    {key: "actions", label: "Select"},
                ]
            }
        },
        computed: {
            ...mapGetters({
                isCollapsed: 'uxModule/isCollapsed',
                fields: 'sellerModule/fields',
                items: 'sellerModule/sellers',
                total: 'sellerModule/total'
            }),
            rows() { return this.total ? this.total : 1 }
        },
        async created () {
            this.$store.dispatch('uxModule/setLoading')
            this.$store.dispatch('sellerModule/getTotal')
            try {
                await this.$store.dispatch("sellerModule/getAllSellers", {page: 1, perPage: this.perPage})
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        watch: {
            showModal() {
                this.seller = {...this.propsSeller}
            },
            currentPage: {
                handler: function() {
                    this.$store.dispatch('sellerModule/getAllSellers', {page: this.currentPage, perPage: this.perPage, search: this.searchSeller})
                }
            },
            perPage: {
                handler: function () {
                    this.$store.dispatch('sellerModule/getAllSellers', {page: 1, perPage: this.perPage, search: this.searchSeller})
                }
            },
            searchSeller: {
                handler: function () {
                    this.$store.dispatch('sellerModule/searchSellers', {page: this.currentPage, perPage: this.perPage, search: this.searchSeller})
                }
            }
        }
    }
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .b-table-sticky-header {
        max-height: 10vh !important;
    }
</style>
