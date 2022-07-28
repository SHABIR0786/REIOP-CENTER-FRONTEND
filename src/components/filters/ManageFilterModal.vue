<template>
<b-modal size="xl" id="manage-save-filter" v-model="showModal" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Manage Save Filters
        </div>
        <div>
            <b-icon @click="closeFilterModal" class="close-icon" icon="x"></b-icon>
        </div>
    </template>
    <b-row>
        <b-col offset="6" cols="6">
            <b-input-group class="mt-3 mb-3">
                <b-input-group-append v-if="isSearched">
                    <b-button @click="clearsearch" variant="outline-primary">
                        <b-icon icon="x" aria-hidden="true"></b-icon> Clear Search
                    </b-button>
                </b-input-group-append>
                <b-form-input v-model="searchFilter" @keyup.enter="search" placeholder="Search"></b-form-input>
                <b-input-group-append>
                    <b-button @click="search" variant="primary">Search</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-col>
    </b-row>
    <b-table small striped sort-icon-left no-local-sorting @sort-changed="sortingChanged" hover :busy="isBusy" :fields="fields" :items="items" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
        <template #table-busy>
            <div class="text-center" my-2>
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
        <template v-slot:cell(filter_type)="data">
            <b-input-group class="mb-2">
                <b-form-select class="select-template w-100 mt-3 mb-3" @change="changeFilterType(data.item)" v-model="data.item.filter_type" :options="filterTypes"></b-form-select>
            </b-input-group>
        </template>
        <template v-slot:cell(permission)="data">
            <b-input-group class="mb-2">
                <b-form-select class="select-template w-100 mt-3 mb-3" @change="changeFilterPermission(data.item)" v-model="data.item.permission" :options="permissions"></b-form-select>
            </b-input-group>
        </template>
        <template v-slot:cell(remove)="data" class="text-center">
            <b-icon @click="RemoveFilter(data.item.id)" class="trash-icon" icon="trash"></b-icon>
        </template>
    </b-table>
    <b-row>
        <b-col class="d-flex align-items-center">
            <b-form-group label="Show" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>totalItems?totalItems:(currentPage*perPage)}} of {{totalItems}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="totalItems" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
</b-modal>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    name: 'ManageSaveFilterModal',
    props: {
        showModal: {
            type: Boolean
        },
        type: {
            type: String
        }
    },
    computed: {
        ...mapGetters({
            fields: 'filterModule/fields',
            items: 'filterModule/items',
            totalItems: 'filterModule/totalItems',
        }),
        rows() {
            return this.itemsCount ? this.itemsCount : 1
        },
    },
    data() {
        return {
            isBusy: false,
            currentPage: 1,
            pageOptions: [10, 20, 50],
            perPage: 20,
            itemsCount: 0,
            searchFilter: '',
            sortBy: 'id',
            sortDesc: false,
            isSearched: false,
            permissions: [{
                    value: null,
                    text: "Choose who can see filter"
                },
                {
                    value: 1,
                    text: "Everyone"
                },
                {

                    value: 2,
                    text: "Only Me"
                }
            ],
            filterTypes: [{
                    value: 1,
                    text: "Dropdown Filter"
                },
                {
                    value: 2,
                    text: "Table Filter"
                }
            ],
        }
    },
    methods: {
        async clearsearch() {
            this.searchFilter = '';
            await this.search();
            this.isSearched = false;
        },
        async search() {
            this.isSearched = true;
            this.$store.dispatch('uxModule/setLoading');
            try {
            await this.$store.dispatch("filterModule/getFilters", {
                    type: this.type,
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchFilter,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                });

                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        async changeFilterPermission(item) {
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch("filterModule/changePermission", {
                id: item.id,
                permission: item.permission
            });
            await this.$store.dispatch("subjectModule/filtersOnTable", this.type);
            this.$store.dispatch('uxModule/hideLoader');
        },
        async changeFilterType(item) {
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch("filterModule/changeFilterType", {
                id: item.id,
                filter_type: item.filter_type
            });
            await this.$store.dispatch("subjectModule/filtersOnTable",  this.type);
            this.$store.dispatch('uxModule/hideLoader');
        },
        closeFilterModal() {
            this.$emit("cancel");
        },
        async RemoveFilter(id) {
            await this.$store.dispatch("filterModule/deleteFilter", id);
            await this.$store.dispatch("subjectModule/filtersOnTable", this.type);
        },
        async sortingChanged(ctx) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.sortBy = ctx.sortBy;
                this.sortDesc = ctx.sortDesc;
                await this.$store.dispatch("filterModule/getFilters", {
                    type: this.type,
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchFilter,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                });
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
    },
    async created() {
        await this.$store.dispatch('filterModule/getFilters', {
            type: this.type,
            page: this.currentPage,
            perPage: this.perPage,
            search: this.searchFilter,
            sortBy: this.sortBy,
            sortDesc: this.sortDesc
        });
    },
    watch: {
        currentPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                try {
                    await this.$store.dispatch('filterModule/getFilters', {
                        type: this.type,
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchFilter,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.$store.dispatch('uxModule/hideLoader')
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader')
                }
            }
        },
        perPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                try {
                    await this.$store.dispatch('filterModule/getFilters', {
                        type: this.type,
                        page: 1,
                        perPage: this.perPage,
                        search: this.searchFilter,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.$store.dispatch('uxModule/hideLoader')
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader')
                }
            }
        }
    }
}
</script>

<style>
.trash-icon {
    display: inline-block;
    cursor: pointer;
    text-align: center;
}
#manage-save-filter td {
    text-align: center;
    vertical-align: inherit;
}
#manage-save-filter .select-template {
    font-size:14px;
}

/* width */
.b-table-sticky-header::-webkit-scrollbar {
    width: 10px;
}

/* Track */
.b-table-sticky-header::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.b-table-sticky-header::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
.b-table-sticky-header::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
