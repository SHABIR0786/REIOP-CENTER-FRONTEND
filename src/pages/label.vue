<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <b-row>
     <b-col cols="12" class="d-flex justify-content-end mb-3">
            <b-button variant="primary" class="add-seller" @click="addItem()">
                <b-icon icon="plus" aria-hidden="true"></b-icon> Add Label
            </b-button>
      </b-col>
    </b-row>
        <b-table
                id="email-table"
                small
                striped
                sort-icon-left
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
            </template>
        </b-table>
        <label-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></label-modal>
        <add-label-modal :showModal="showAddModal" @cancel="showAddModal=false"></add-label-modal>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    import { BIcon } from "bootstrap-vue"
    import LabelModal from "../components/label/LabelModal";
    import AddLabelModal from "../components/label/AddLabelModal";

    export default {
        name: "Label",
        components: {
            BIcon,
            LabelModal,
            AddLabelModal
        },
        data () {
            return {
                isBusy: false,
                showModal: false,
                showAddModal: false,
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
                fields: 'labelModule/fields',
                items: 'labelModule/labels'
            })
        },
        async created () {
            this.$store.dispatch('uxModule/setLoading')
            try {
                this.$store.dispatch('labelModule/loadLabels')
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
                this.$store.dispatch('labelModule/editLabel', item)
            },
            addItem() {
                this.showAddModal = true;
            },
            deleteItem(item){
                this.showDeleteModal = true;
                this.itemToDelete = item;
            },
            modalResponse() {
                this.showDeleteModal = false;
            }
        }
    }
</script>
