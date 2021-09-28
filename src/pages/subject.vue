<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
<!--        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>-->
        <h3>Subjects</h3>
        <div>
            <b-row>
                <b-col cols="8" class="d-flex">
                    <div class="info total">
                        <b-icon class="mr-2 cursor-pointer" icon="graph-up" variant="primary" @click="editItem(data.item)"></b-icon>
                        <div>{{total}}</div>
                        <div>Total</div>
                    </div>
                    <div class="info latest">
                        <b-icon class="mr-2 cursor-pointer" icon="arrow-up" variant="primary" @click="editItem(data.item)"></b-icon>
                        <div>{{total}}</div>
                        <div>Added This Month</div>
                    </div>
                </b-col>
                <b-col cols="4" class="d-flex justify-content-end">
                    <b-button variant="primary" class="add-seller">
                        <b-icon icon="plus" aria-hidden="true"></b-icon> Add Subject</b-button>
                </b-col>
            </b-row>
            <hr>
            <b-row class="mb-3">
                <b-col cols="8" class="d-flex align-items-center">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-col>
                <b-col cols="4">
                    <b-form-input v-model="text" placeholder="Search"></b-form-input>
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
            responsive="md"
            :per-page="0"
            :current-page="currentPage"
        >
            <template #table-busy>
                <div class="text-center" my-2>
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
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
                <p class="mb-0">Showing 1 to 20 of XXXXX entries</p>
            </b-col>
            <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
            </b-col>
        </b-row>        <subject-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></subject-modal>
        <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import SubjectModal from '@/components/subject/SubjectModal'
import  DeleteModal from'@/components/deleteModal/DeleteModal'

export default {
    name: "Subject",
    components: {
        BIcon,
        SubjectModal,
        DeleteModal
    },
    data () {
        return {
            isBusy: false,
            showModal: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [5, 10, 20]
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
            await this.$store.dispatch("subjectModule/getAllSubjects")
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        editSubject(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        save (item) {
            this.showModal = false
            this.$store.dispatch('subjectModule/editSubject', {...item})
        },
        deleteSubject(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('subjectModule/deleteSubject', this.itemToDelete.id)
            }
        }
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('subjectModule/getAllSubjects', this.currentPage)
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
        background-color: #FEB97D;
    }

    .latest {
        background-color: #669966;
        margin-left: 20px;
    }
    .add-seller {
        width: 200px;
    }

    .filter-icon {
        font-size: 25px;
    }
</style>
