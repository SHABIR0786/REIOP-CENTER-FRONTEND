<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
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
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        <subject-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></subject-modal>
        <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import SubjectModal from '@/components/subject/SubjectModal'
import {CARDS_ENUM} from "../utils/enum/cards";
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
            perPage: 10,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'subjectModule/fields',
            items: 'subjectModule/subjects',
            totals: 'homeModule/cards'
        }),
        rows() { return this.totals && this.totals[CARDS_ENUM.SUBJECTS] ? this.totals[CARDS_ENUM.SUBJECTS].counter: 1}
    },
    async created () {
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
