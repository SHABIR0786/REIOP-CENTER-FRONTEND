<template>
    <div
        :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-table
            small
            striped
            hover
            :busy="isBusy"
            :fields="headers"
            :items="items"
            responsive="md"
        >
            <template #table-busy>
                <div class="text-center" my-2>
                    <b-spinner
                        class="align-middle"
                    ></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(actions)>
                <b-icon
                    class="mr-2"
                    icon="pencil"
                    variant="primary"
                ></b-icon>
                <b-icon
                    variant="primary"
                    icon="trash"
                ></b-icon>
            </template>
        </b-table>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
export default {
    name: "Seller",
    components: {
        BIcon
    },
    data () {
        return {
            isBusy: false
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            headers: 'sellerModule/headers',
            items: 'sellerModule/sellers'
        })
    },
    async created () {
        await this.$store.dispatch("sellerModule/getAllSellers")
    }
}
</script>