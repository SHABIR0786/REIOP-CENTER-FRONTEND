<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-table
                id="email-table"
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
            </template>
        </b-table>
        <label-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></label-modal>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    import { BIcon } from "bootstrap-vue"
    import LabelModal from "../components/label/LabelModal";

    export default {
        name: "Label",
        components: {
            BIcon,
            LabelModal
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
