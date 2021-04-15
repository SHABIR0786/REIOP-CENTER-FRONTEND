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
    name: "Subject",
    components: {
        BIcon
    },
    data () {
        return {
            isBusy: false,
            items: [
                {
                    
                    listId: 1,
                    dept: "ACQ",
                    type: "home",
                    group: "A",
                    code: "DF21D",
                    source: "Linked",
                    totalSubjects: "Sub",
                    totalIndividualList: "List",
                    createDate: "2021-01-21",
                    actions: "",
                    markets: "Add"
                },
                {
                    
                    listId: 2,
                    dept: "ACQ",
                    type: "home",
                    group: "A",
                    code: "DF21D",
                    source: "Linked",
                    totalSubjects: "Sub",
                    totalIndividualList: "List",
                    createDate: "2021-01-21",
                    actions: "",
                    markets: "Add"
                },
            ]
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            headers: 'listModule/headers',
        })
    }
}
</script>