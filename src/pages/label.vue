<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <!--        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="email-table"></b-pagination>-->
<!--        <div class="mb-4">Total: {{total}}</div>-->
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
<!--                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>-->
            </template>
        </b-table>
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="email-table"></b-pagination>
<!--        <email-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></email-modal>-->
        <label-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></label-modal>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    import { BIcon } from "bootstrap-vue"
    import LabelModal from "../components/label/LabelModal";

    export default {
        name: "Email",
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
                items: 'labelModule/labels',
                // totals: 'homeModule/cards',
                // total: 'emailModule/total'
            }),
            rows() { return this.total ? this.total : 1 }
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
                console.log('esim', item);
                this.showModal = true
                this.editedItem = { ...item }
            },
            save (item) {
                this.showModal = false
                console.log(item);
                this.$store.dispatch('labelModule/editLabel', {...item})
            },
            deleteItem(item){
                this.showDeleteModal = true;
                this.itemToDelete = item;
            },
            modalResponse(response) {
                this.showDeleteModal = false;
                if (response) {
                    // this.$store.dispatch('emailModule/deleteEmail', this.itemToDelete.id)
                }
            }
        },
        watch: {
            currentPage: {
                handler: function() {
                    // this.$store.dispatch('emailModule/getAllEmails', this.currentPage)
                }
            }
        }
    }
</script>
