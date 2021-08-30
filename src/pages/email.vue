<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="email-table"></b-pagination>
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
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
            </template>
        </b-table>
        <b-pagination class="float-right" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="email-table"></b-pagination>
        <email-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></email-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import EmailModal from '@/components/email/EmailModal'
import {CARDS_ENUM} from "../utils/enum/cards";

export default {
    name: "Email",
    components: {
        BIcon,
        EmailModal
    },
    data () {
        return {
            isBusy: false,
            showModal: false,
            perPage: 10,
            currentPage: 1,
            editedItem: {}
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'emailModule/fields',
            items: 'emailModule/emails',
            totals: 'homeModule/cards'
        }),
        rows() { return this.totals && this.totals[CARDS_ENUM.EMAILS] ? this.totals[CARDS_ENUM.EMAILS].counter: 1 }
    },
    async created () {
        this.$store.dispatch('uxModule/setLoading')
        try {
            await this.$store.dispatch("emailModule/getAllEmails")
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
            this.$store.dispatch('emailModule/editEmail', {...item})
        },
        deleteItem(item){
            this.$store.dispatch('emailModule/deleteEmail', item.id)
        }
    },
    watch: {
        currentPage: {
            handler: function() {
                this.$store.dispatch('emailModule/getAllEmails', this.currentPage)
            }
        }
    }
}
</script>
