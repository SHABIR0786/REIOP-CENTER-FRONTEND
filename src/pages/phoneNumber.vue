<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
<!--        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="phone-number-table"></b-pagination>-->
        <div class="mb-4">Total: {{total}}</div>
        <b-table
            id="phone-number-table"
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
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="phone-number-table"></b-pagination>
        <phone-number-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></phone-number-modal>
        <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import PhoneNumberModal from '@/components/phoneNumber/PhoneNumberModal'
import  DeleteModal from'@/components/deleteModal/DeleteModal'

export default {
    name: "phoneNumber",
    components: {
        BIcon,
        PhoneNumberModal,
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
            fields: 'phoneNumberModule/fields',
            items: 'phoneNumberModule/phoneNumbers',
            total: 'phoneNumberModule/total'
        }),
        rows() { return this.total ? this.total : 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        this.$store.dispatch('phoneNumberModule/getTotal')
        try {
            await this.$store.dispatch("phoneNumberModule/getAllPhoneNumbers")
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
            this.$store.dispatch('phoneNumberModule/editPhoneNumber', {...item})
        },
        deleteItem(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('phoneNumberModule/deletePhoneNumber', this.itemToDelete.id)
            }
        }
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('phoneNumberModule/getAllPhoneNumbers', this.currentPage)
            }
        }
    }
}
</script>
