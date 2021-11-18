<template>
    <b-modal v-model="showModal" size="large" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Assign Subject
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
                <div>
                    <b-row class="mb-3">
                        <b-col cols="8" class="d-flex align-items-center">
                            <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                        </b-col>
                        <b-col cols="4">
                            <b-form-input v-model="searchSubject" placeholder="Search"></b-form-input>
                        </b-col>
                    </b-row>
                </div>

                <b-table
                        id="subject-table"
                        small
                        striped
                        hover
                        :busy="isBusy"
                        :fields="fields"
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
                        <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                    </template>
                    <template #head(actions)="scope">
                        <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
                    </template>
                    <template #head(total_sellers)="scope">
                        <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                    </template>
                    <template #head(subject_state)="scope">
                        <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                    </template>
                    <template #head(subject_zip)="scope">
                        <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
                    </template>
                    <template #head(subject_address)="scope">
                        <div class="text-nowrap" style="width: 250px;">{{scope.label}}</div>
                    </template>
                    <template #head(user_id)="scope">
                        <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
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
                        <b-btn v-if="isSubjectAssigned(data.item.id)" variant="primary" disabled >Assigned</b-btn>
                        <b-btn v-else variant="primary" @click="assignSubject(data.item)">Assign</b-btn>
<!--                        <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>-->
<!--                        <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>-->
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
            </div>
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
    import { mapGetters } from "vuex"
    import { BIcon } from "bootstrap-vue"

    export default {
        name: "AssignExistingSubject",
        props: {
            showModal: {
                type: Boolean
            },
            propsSubjects: {},
            sellerId: {},
        },
        components: {
            BIcon,
        },
        data () {
            return {
                isBusy: false,
                // showModal: false,
                perPage: 20,
                currentPage: 1,
                editedItem: {},
                showDeleteModal: false,
                itemToDelete: {},
                pageOptions: [10, 20, 50],
                searchSubject: '',
                showAddModal: false
            }
        },
        computed: {
            ...mapGetters({
                isCollapsed: 'uxModule/isCollapsed',
                fields: 'subjectModule/fields',
                items: 'subjectModule/subjects',
                total: 'subjectModule/total'
            }),
            rows() { return this.total ? this.total : 1}
        },
        async created () {
            this.$store.dispatch('subjectModule/getTotal')
            try {
                this.$store.dispatch('uxModule/setLoading')
                await this.$store.dispatch("subjectModule/getAllSubjects", {page: 1, perPage: this.perPage})
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        methods: {
            // editSubject(item) {
            //     this.showModal = true
            //     this.editedItem = { ...item }
            // },
            save(item) {
                // this.showModal = false
                this.$store.dispatch('subjectModule/editSubject', {...item})
            },
            add(item) {
                this.showAddModal = false
                this.$store.dispatch('subjectModule/addSubject', {...item})
            },
            isSubjectAssigned(subject_id) {
                    if(this.propsSubjects.find(element => element.id === subject_id) !== undefined) {
                        return true
                    }
                },
            modalResponse(response) {
                this.showDeleteModal = false;
                if (response) {
                    this.$store.dispatch('subjectModule/deleteSubject', this.itemToDelete.id)
                }
            },
            assignSubject(item) {
                // console.log('seller_id:', this.sellerId, 'subject_id:', item.id);
                this.$store.dispatch("sellerModule/attachment", {seller_id: this.sellerId, subject_id: item.id})
            },
        },
            // deleteSubject(item){
            //     this.showDeleteModal = true;
            //     this.itemToDelete = item;
            // },

            // addItem() {
            //     this.showAddModal = true;
            // }
        // },
        watch: {
            currentPage: {
                handler: function() {
                    this.$store.dispatch('subjectModule/getAllSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchSubject})
                }
            },
            perPage: {
                handler: function () {
                    this.$store.dispatch('subjectModule/getAllSubjects', {page: 1, perPage: this.perPage, search: this.searchSubject})
                }
            },
            searchSubject: {
                handler: function () {
                    this.$store.dispatch('subjectModule/searchSubjects', {page: this.currentPage, perPage: this.perPage, search: this.searchSubject})
                }
            }
        }
    }
</script>

<style>
    .info {
        border: 1px solid black;
        border-radius: 5px;
        width: 200px;
        height: 38px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .total {
        background-color: #F9CB9C;
    }

    .latest {
        background-color: #B6D7A8;
        margin-left: 20px;
    }
    .add-seller {
        width: 200px;
    }

    .filter-icon {
        font-size: 25px;
    }
    .b-table-sticky-header {
        max-height: calc(100vh - 372px) !important;
    }
</style>
