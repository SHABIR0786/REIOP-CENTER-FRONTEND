<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
<!--        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>-->
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
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
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
import  DeleteModal from'@/components/deleteModal/DeleteModal'

export default {
    name: "Properties",
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
            itemToDelete: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'subjectModule/fields',
            items: 'subjectModule/subjects'
        }),
        rows() { return this.items.length}
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("subjectModule/getAllSubjects")
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        
    },
    methods: {
        editItem(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        save (item) {
            this.showModal = false
            this.$store.dispatch('subjectModule/editSubject', {...item})
        },
        deleteItem(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('subjectModule/deleteSubject', this.itemToDelete.id)
            }
        }
    }
}
</script>
