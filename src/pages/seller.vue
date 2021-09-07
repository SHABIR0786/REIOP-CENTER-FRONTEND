<template>
    <div :class="`list-page seller main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
        <b-table
            id="seller-table"
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
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
        <seller-modal :showModal="showModal" :propsSeller="editedItem" @cancel="showModal=false" @save="save"></seller-modal>
        <delete-modal :showModal ="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import SellerModal from '@/components/seller/SellerModal'
import { CARDS_ENUM } from '../utils/enum/cards';
import  DeleteModal from'@/components/deleteModal/DeleteModal'

export default {
    name: "Seller",
    components: {
        BIcon,
        SellerModal,
        DeleteModal
    },
    data () {
        return {
            isBusy: false,
            showModal: false,
            perPage: 20, // server-side connection!
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'sellerModule/fields',
            items: 'sellerModule/sellers',
            totals: 'homeModule/cards'
        }),
        rows() { return this.totals && this.totals[CARDS_ENUM.SELLERS] ? this.totals[CARDS_ENUM.SELLERS].counter: 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("sellerModule/getAllSellers")
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            console.log(error)
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    methods: {
        editItem(item) {
            this.showModal = true
            this.editedItem = { ...item }
        },
        save(item) {
            this.showModal = false
            this.$store.dispatch('sellerModule/editSeller', {...item})
        },
        deleteItem(item){
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('sellerModule/deleteSeller', this.itemToDelete.id)
            }
        }
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('sellerModule/getAllSellers', this.currentPage)
            }
        }
    }
}
</script>
