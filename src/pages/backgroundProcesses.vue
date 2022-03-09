<template>
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
        <h3>Background Processes</h3>
        <div>
            <hr>
            <b-row class="mb-3 d-flex justify-content-end"></b-row>
        </div>
        <b-table
                id="list-table"
                small
                striped
                hover
                responsive
                :busy="isBusy"
                :fields="fields"
                :items="items"
                :per-page="0"
                :current-page="currentPage"
                :sticky-header="true"
        >
            <template #table-busy>
                <div class="text-center" my-2>
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>

            <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
            </template>

            <template v-slot:cell(id)="data">
                <div :title="data.item.id">
                    <p class="user-email">{{data.item.id}}</p>
                </div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editItem(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteItem(data.item)"></b-icon>
            </template>
            <template v-slot:cell(list_type)="data">
                <div :title="data.item.list_type">
                    <p class="user-email">{{data.item.list_type}}</p>
                </div>
            </template>
            <template v-slot:cell(list_group)="data">
                <div :title="data.item.list_group">
                    <p class="user-email">{{data.item.list_group}}</p>
                </div>
            </template>
        </b-table>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    import { BIcon } from "bootstrap-vue"

    export default {
        name: "BackgroundProcesses",
        components: {
            BIcon
        },
        data () {
            return {
                isBusy: false,
                showModal: false,
                perPage: 20,
                currentPage: 1,
                editedItem: {},
                showDeleteModal: false,
                itemToDelete: {},
                pageOptions: [10, 20, 50],
                noCollapse: false
            }
        },
        computed: {
            ...mapGetters({
                isCollapsed: 'uxModule/isCollapsed',
                fields: 'backgroundProcessesModule/fields',
                items: 'backgroundProcessesModule/processes'
            })
        },
        async created () {
            this.$store.dispatch('uxModule/setLoading')
            try {
                await this.$store.dispatch("backgroundProcessesModule/getAllProcesses", {page: 1, perPage: this.perPage})
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
        },
        methods: { }
    }
</script>

<style>
    .info {
        border: 1px solid black;
        border-radius: 5px;
        width: 200px;
        height: 38px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .total {
        background-color: #F9CB9C;
    }

    .latest {
        background-color: #B6D7A8;
        margin-left: 20px;
    }
    .add-seller {
        width: 200px;
        background-color: #45818E !important;
        color: white;
    }

    .filter-icon {
        font-size: 25px;
    }
    .b-table-sticky-header {
        max-height: calc(100vh - 372px) !important;
    }
</style>
