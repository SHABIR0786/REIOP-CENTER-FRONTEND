<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <h3>Subjects</h3>
    <div>
        <b-row>
            <b-col cols="8" class="d-flex">
                <div class="info total">
                    <b-icon class="mr-2 cursor-pointer" icon="graph-up" variant="primary" @click="editItem(data.item)"></b-icon>
                    <div>{{total}}</div>
                    <div>Total</div>
                </div>
                <div class="info latest">
                    <b-icon class="mr-2 cursor-pointer" icon="arrow-up" variant="primary" @click="editItem(data.item)"></b-icon>
                    <div>{{total}}</div>
                    <div>Added This Month</div>
                </div>
            </b-col>
            <b-col cols="4" class="d-flex justify-content-end">
                <b-button variant="primary" class="add-seller" @click="addItem()">
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Add Subject
                </b-button>
            </b-col>
        </b-row>
        <hr>
        <b-row class="mb-3">
            <b-col cols="6" class="d-flex align-items-center">
                <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterPropertiesModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-button>
                <b-button v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters()" class="filter d-flex float-right r-0 align-items-right mr-2">
                    <b-icon icon="x" aria-hidden="true"></b-icon> Clear All
                </b-button>
                <span v-if="totalFilters > 0" class="filter-count filter-top">{{ totalFilters }}</span>
                <b-input-group class="mb-2 save-filter-dropdown">
                    <b-form-select class="select-template w-100" @change="applyFilter" v-model="selectedFilter" :options="savedFilters"></b-form-select>
                </b-input-group>
            </b-col>
            <b-col cols="6">
                <b-input-group class="mt-3">
                    <b-input-group-append v-if="isSearched">
                        <b-button @click="clearsearch" variant="outline-primary">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Clear Search
                        </b-button>
                    </b-input-group-append>
                    <b-form-input v-model="searchSubject" @keyup.enter="search" placeholder="Search"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="search" variant="primary">Search</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <div class="filters-count" v-for="filter in filtersCountTable" :key="filter.name">
                {{filter.count}} items {{filter.filter}} 
                <b-icon @click="RemoveFilter(filter)" class="square-close-icon" icon="x-square"></b-icon>

            </div>
        </b-row>
    </div>
    <div class="d-flex align-items-center mb-4">
        <b-form-checkbox @change="selectAll" v-model='allSelected'></b-form-checkbox>
        <b-button variant="primary" :disabled='!bulkDeleteItems.length' class="filter d-flex align-items-center" @click="bulkDelete">
            <b-icon icon="trash" aria-hidden="true"></b-icon>Delete Selected
        </b-button>
    </div>
    <b-table id="subject-table" small sort-icon-left no-local-sorting striped hover :busy="isBusy" :fields="fields" @sort-changed="sortingChanged" :items="filteredOrAllData" responsive :per-page="0" :current-page="currentPage" :sticky-header="true">
        <template #table-busy>
            <div class="text-center" my-2>
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
        <template #head(delete)="scope">
            <div class="text-nowrap" style="width: 30px;">{{scope.label}}</div>
        </template>
        <template v-slot:cell(delete)="data">
            <b-form-checkbox :value='data.item.id' v-model='bulkDeleteItems'></b-form-checkbox>
        </template>
        <template #head(id)="scope">
            <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(actions)="scope">
            <div class="text-nowrap" style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(total_sellers)="scope">
            <div style="width: 45px;">{{scope.label}}</div>
        </template>
        <template #head(list_stack)="scope">
            <div style="width: 45px;">{{scope.label}}</div>
        </template>
        <template #head(subject_address)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
        </template>
        <template #head(subject_address_line2)="scope">
            <div style="width: 150px;">{{scope.label}}</div>
        </template>
        <template #head(subject_city)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(subject_state)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(subject_zip)="scope">
            <div style="width: 50px;">{{scope.label}}</div>
        </template>
        <template #head(subject_county)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(subject_market)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(subject_type)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(subject_age)="scope">
            <div style="width: 60px;">{{scope.label}}</div>
        </template>
        <template #head(subject_last_marked_date)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(subject_last_exported_date)="scope">
            <div style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(subject_skip_trace_date)="scope">
            <div style="width: 80px;">{{scope.label}}</div>
        </template>
        <template #head(subject_pull_date)="scope">
            <div style="width: 80px;">{{scope.label}}</div>
        </template>
        <template #head(subject_error)="scope">
            <div style="width: 40px;">{{scope.label}}</div>
        </template>
        <template #head(user_id)="scope">
            <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
        </template>
        <template #head(created_at)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head(updated_at)="scope">
            <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
        </template>
        <template #head()="scope">
            <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
        </template>
        <template v-slot:cell(actions)="data">
            <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
            <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
        </template>
        <template v-slot:cell(subject_address)="data">
            <div v-b-tooltip.hover :title="data.item.subject_address">{{ data.item.subject_address }}</div>
        </template>
        <template v-slot:cell(subject_city)="data">
            <div v-b-tooltip.hover :title="data.item.subject_city">{{ data.item.subject_city }}</div>
        </template>
        <template v-slot:cell(subject_zip)="data">
            <div v-b-tooltip.hover :title="data.item.subject_zip">{{ data.item.subject_zip }}</div>
        </template>
        <template v-slot:cell(subject_county)="data">
            <div v-b-tooltip.hover :title="data.item.subject_county">{{ data.item.subject_county }}</div>
        </template>
        <template v-slot:cell(subject_state)="data">
            <div v-b-tooltip.hover :title="data.item.subject_state">{{ data.item.subject_state }}</div>
        </template>
        <template v-slot:cell(subject_market)="data">
            <div v-b-tooltip.hover :title="data.item.subject_market">{{ data.item.subject_market }}</div>
        </template>
        <template v-slot:cell(subject_address_line2)="data">
            <div v-b-tooltip.hover :title="data.item.subject_address_line2">{{ data.item.subject_address_line2 }}</div>
        </template>
        <template v-slot:cell(subject_type)="data">
            <div v-b-tooltip.hover :title="data.item.subject_type">{{ data.item.subject_type }}</div>
        </template>
        <template v-slot:cell(subject_error_type)="data">
            <div v-b-tooltip.hover :title="data.item.subject_error_type">{{ data.item.subject_error_type }}</div>
        </template>
        <template v-slot:cell(user_name)="data">
            <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
        </template>
    </b-table>
    <b-row>
        <b-col class="d-flex align-items-center">
            <b-form-group label="Show" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>itemsCount?itemsCount:(currentPage*perPage)}} of {{itemsCount}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
    <edit-subject-modal :showModal="showModal" :propsData="editedItem" @cancel="showModal=false" @save="save"></edit-subject-modal>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse"></delete-modal>
    <add-subject-modal :showModal="showAddModal" :propsData="editedItem" @cancel="showAddModal=false" @save="add"></add-subject-modal>
    <filter-subjects ref="filtersubjects" :search="searchSubject" @filter="filter" @finish-process="isFinishedFilterSubjects = true" @filtersCount="filtersCount" :propsData="filteredOrAllData" :showModal="showFilterPropertiesModal" @cancel="showFilterPropertiesModal=false"></filter-subjects>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    BIcon
} from "bootstrap-vue"
import DeleteModal from '@/components/deleteModal/DeleteModal'
import EditSubjectModal from "../components/subject/EditSubjectModal";
import AddSubjectModal from "../components/subject/AddSubjectModal";
import FilterSubjects from "@/components/subject/FilterSubjects";

export default {
    name: "Subject",
    components: {
        BIcon,
        EditSubjectModal,
        DeleteModal,
        AddSubjectModal,
        FilterSubjects
    },
    data() {
        return {
            isBusy: false,
            selectedFilter: null,
            showModal: false,
            showFiltersOnTable: [],
            perPage: 20,
            isFinishedFilterSubjects: false,
            currentPage: 1,
            editedItem: {},
            showDeleteModal: false,
            itemToDelete: {},
            pageOptions: [10, 20, 50],
            searchSubject: '',
            showAddModal: false,
            bulkDeleteItems: [],
            allSelected: false,
            showFilterPropertiesModal: false,
            filteredOrAllData: [],
            itemsCount: 0,
            totalFilters: 0,
            filtersName: {
                Market: [],
                Group: [],
                Type: [],
                Source: [],
                Errors: [],
                Error: [],
                RunDate: [],
            },
            searchInFiltered: {},
            sortBy: 'id',
            sortDesc: false,
            isSearched: false,
            savedFilters: [{
                value: null,
                text: "Save Filters"
            }]
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            fields: 'subjectModule/fields',
            items: 'subjectModule/subjects',
            filters: 'filterModule/filters',
            filteredItems: 'subjectModule/filteredSubject',
            filteredSubjectsCount: 'subjectModule/filteredSubjectsCount',
            filtersCountTable: 'subjectModule/filtersCountTable',
            total: 'subjectModule/total',
            selectedSubject: 'subjectModule/subject'
        }),
        rows() {
            return this.itemsCount ? this.itemsCount : 1
        },

    },
    async created() {
        // this.$store.dispatch('subjectModule/getTotal')
        try {
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch("subjectModule/getAllSubjects", {
                page: 1,
                perPage: this.perPage,
                search: this.searchSubject,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            })
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
        }
        if (this.$route.query.subject_id) {
            this.$store.dispatch('subjectModule/getSubject', this.$route.query.subject_id).then(() => {
                this.editedItem = this.selectedSubject
                this.showModal = true
            });
        }
        this.filteredOrAllData = this.items;
        this.itemsCount = this.total;

        await this.$store.dispatch("filterModule/getAllFilters", 'subjects');
        await this.$store.dispatch("subjectModule/filtersOnTable", 'subjects');
    },
    methods: {
      async  RemoveFilter(filter) {
        await this.$store.dispatch("subjectModule/deleteFilter", filter.id);
        },
        applyFilter() {
            let filter = this.filters.find(x => x.id == this.selectedFilter);
            if (filter.configuration) {
                let allFilters = JSON.parse(filter.configuration);
                let total = 0
                for (let item in allFilters) {
                    total += allFilters[item].length
                }
                this.totalFilters = total;
                this.filter(allFilters, total);
            }
        },
        async clearAllFilters() {
            this.selectedFilter = null;
            this.$refs.filtersubjects.clearAllFilters();
            this.$refs.filtersubjects.filtersAlreadyApplied = null;
            this.filtersName = {
                    Market: [],
                    Group: [],
                    Type: [],
                    Source: [],
                    Errors: [],
                    Error:[],
                    RunDate: [],
                };
                await this.search();
        },
        async clearsearch() {
            this.searchSubject = '';
            await this.search();
            this.isSearched = false;
        },
        async search() {
            this.$store.dispatch('uxModule/setLoading');
            try {
                if (!this.totalFilters) {
                    await this.$store.dispatch('subjectModule/searchSubjects', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchSubject,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.itemsCount = this.total;
                    this.filteredOrAllData = this.items;
                } else {
                    await this.$store.dispatch("subjectModule/filterSubject", {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchSubject,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.filteredOrAllData = this.filteredItems
                    this.itemsCount = this.filteredSubjectsCount
                }
                if (this.searchSubject.length == 0) {
                    this.isSearched = false;
                } else {
                    this.isSearched = true;
                }
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        async sortingChanged(ctx) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.sortBy = ctx.sortBy;
                this.sortDesc = ctx.sortDesc;
                if (!this.totalFilters) {
                    await this.$store.dispatch("subjectModule/getAllSubjects", {
                        page: 1,
                        perPage: this.perPage,
                        search: this.searchSubject,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    });
                    this.filteredOrAllData = this.items;
                } else {
                    await this.$store.dispatch("subjectModule/filterSubject", {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchSubject,
                        filter: this.filtersName,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                    this.filteredOrAllData = this.filteredItems
                }
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        async filter(data, filterValue) {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.filtersName = data
                await this.$store.dispatch("subjectModule/filterSubject", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchSubject,
                    filter: data,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                if (!filterValue) {
                    if (!this.items.length) {
                        await this.$store.dispatch("subjectModule/getAllSubjects", {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSubject,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                    }
                    this.filteredOrAllData = this.items
                    this.itemsCount = this.total
                } else {
                    this.filteredOrAllData = this.filteredItems
                    this.itemsCount = this.filteredSubjectsCount
                }
                this.showFilterPropertiesModal = false;
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        editSubject(item) {
            this.showModal = true
            this.editedItem = {
                ...item
            }
        },
        save(item) {
            delete item.lists
            delete item.list_stack
            this.$store.dispatch('subjectModule/editSubject', {
                ...item
            })
        },

        add(item) {
            this.showAddModal = false
            this.$store.dispatch('subjectModule/addSubject', {
                ...item
            })
        },
        deleteSubject(item) {
            this.showDeleteModal = true;
            this.itemToDelete = item;
        },
        modalResponse(response) {
            this.showDeleteModal = false;
            if (response) {
                this.$store.dispatch('uxModule/setLoading');
                try {
                    this.$store.dispatch('subjectModule/deleteSubject', this.itemToDelete.id)
                    this.$store.dispatch('uxModule/hideLoader');
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader');
                }
            }
        },
        addItem() {
            this.showAddModal = true;
        },
        bulkDelete() {
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.$store.dispatch('subjectModule/deleteMultipleSubjects', this.bulkDeleteItems).then(() => {
                    this.$store.dispatch('subjectModule/getAllSubjects', {
                        page: this.currentPage,
                        perPage: this.perPage,
                        search: this.searchSubject,
                        sortBy: this.sortBy,
                        sortDesc: this.sortDesc
                    })
                })
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
        selectAll() {
            this.bulkDeleteItems = [];
            if (this.allSelected) {
                this.items.forEach(e => {
                    this.bulkDeleteItems.push(e.id);
                });
            }
        },
        filtersCount(total) {
            this.totalFilters = total
            return total
        },
        async doCreatedOperation() {
            try {
                await this.$store.dispatch("subjectModule/getAllSubjects", {
                    page: 1,
                    perPage: this.perPage,
                    search: this.searchSubject,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                })
                this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
            if (this.$route.query.subject_id) {
                this.$store.dispatch('subjectModule/getSubject', this.$route.query.subject_id).then(() => {
                    this.editedItem = this.selectedSubject
                    this.showModal = true
                });
            }
            this.filteredOrAllData = this.items;
            this.itemsCount = this.total;
        }
    },
    watch: {
        filters: {
            handler: function() {
                this.savedFilters = [{
                value: null,
                text: "Save Filters"
            }];
                this.filters.forEach(e => {
                    const filter = {
                        value: '',
                        text: '',
                    }
                    filter.value = e.id;
                    filter.text = e.name;
                    this.savedFilters.push(filter);
                });
            }
        },
        currentPage: {
            handler: async function () {
                this.$store.dispatch('uxModule/setLoading')
                try {
                    if (!this.totalFilters) {
                        await this.$store.dispatch('subjectModule/getAllSubjects', {
                            page: this.currentPage,
                            perPage: this.perPage,
                            search: this.searchSubject,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.items
                    } else {
                        await this.$store.dispatch("subjectModule/filterSubject", {
                            page: this.currentPage,
                            perPage: this.perPage,
                            search: this.searchSubject,
                            filter: this.filtersName,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.filteredItems
                    }
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
                    if (!this.totalFilters) {
                        await this.$store.dispatch('subjectModule/getAllSubjects', {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSubject,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.items
                    } else {
                        await this.$store.dispatch("subjectModule/filterSubject", {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSubject,
                            filter: this.filtersName,
                            sortBy: this.sortBy,
                            sortDesc: this.sortDesc
                        })
                        this.filteredOrAllData = this.filteredItems
                    }
                    this.$store.dispatch('uxModule/hideLoader')
                } catch (error) {
                    this.$store.dispatch('uxModule/hideLoader')
                }
            }
        },
        isFinishedFilterSubjects() {
            if (this.isFinishedFilterSubjects) {
                this.doCreatedOperation()
            }
        },
    }
}
</script>

<style>
.filter-count {
    border-radius: 50%;
    background-color: #808080a6;
    color: #ffffff;
    font-size: 13px;
    text-align: center;
    width: 20px;
    height: 20px;
}

.filters-count {
    color: white;
    padding: 6px;
    margin-left: 13px;
    margin-bottom: 10px;
    border: 1px solid #024847;
    background-color: #45818E !important;
    height: 38px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
}

.filter-top {
    margin-left: -5px;
    margin-top: -30px;
}

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
}

.filter-icon {
    font-size: 25px;
}

.b-table-sticky-header {
    max-height: calc(100vh - 372px) !important;
}

table th {
    vertical-align: inherit !important;
    height: 64px;
}

.save-filter-dropdown {
    width: 30% !important;
    margin-top: 10px;
}
</style>
