<template>
    <div
        :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-pagination
            class="float-right"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="golden-address-table"
        ></b-pagination>
        <b-table
            id="golden-address-table"
            small
            striped
            hover
            :busy="isBusy"
            :fields="fields"
            :items="items"
            responsive="md"
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template #table-busy>
                <div class="text-center" my-2>
                    <b-spinner
                        class="align-middle"
                    ></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-icon
                    class="mr-2"
                    icon="pencil"
                    variant="primary"
                    @click="editItem(data.item)"
                ></b-icon>
                <b-icon
                    variant="primary"
                    icon="trash"
                    @click="deleteItem(data.item)"
                ></b-icon>
            </template>
        </b-table>
        <b-pagination
            class="float-right"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="golden-address-table"
        ></b-pagination>
        <golden-address-modal
            :showModal="showModal"
            :propsData="editedItem"
            @cancel="showModal=false"
            @save="save"
        ></golden-address-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import GoldenAddressModal from '@/components/goldenAddress/GoldenAddressModal'
export default {
    name: "Email",
    components: {
        BIcon,
        GoldenAddressModal
    },
    data () {
        return {
            isBusy: false,
            showModal: false,
            perPage: 20,
            currentPage: 1,
            editedItem: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'goldenAddressModule/goldenHeaders',
            items: 'goldenAddressModule/goldenAddresses'
        }),
        rows() { return this.items.length}
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("goldenAddressModule/getAllGoldenAddresses")
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
            this.$store.dispatch('goldenAddressModule/editGoldenAddress', {...item})
        },
        deleteItem(item){
            this.$store.dispatch('goldenAddressModule/deleteGoldenAddress', item.id)
        }
    }
}
</script>