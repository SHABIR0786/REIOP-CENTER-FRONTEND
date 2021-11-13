<template>
    <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                ADD FILTER
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid class="container-row">
            <b-row>
                <b-row class="w-100">
                    <b-col cols="4">
                        <h5>List</h5>
                        <b-form-radio v-model="selected" name="some-radios" value="true">Included</b-form-radio>
                        <div class="d-flex align-items-center mt-4">
                            <p class="mr-1">List Dept:</p>
                            <b-form-select disabled class="select" v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Group:</p>
                            <b-form-select class="select" @change="detectListSelectChange('list_group')"  v-model="filter.list_group" :options="list_group_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Source:</p>
                            <b-form-select class="select" @change="detectListSelectChange('list_source')"  v-model="filter.list_source" :options="list_source_option"></b-form-select>
                        </div>
                    </b-col>
                    <b-col cols="4" class="d-flex flex-column justify-content-center">
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Type:</p>
                            <b-form-select class="select" @change="detectListSelectChange('list_type')" v-model="filter.list_type" :options="list_type_option"></b-form-select>
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <h5>Running List</h5>
                        <b-form-radio disabled v-model="running_list.included" name="some-radios" value="true">Included</b-form-radio>
                        <b-form-select disabled class="mt-4"  v-model="selected" :options="list_option"></b-form-select>
                        <b-form-radio disabled v-model="running_list.included" class="mt-4" name="some-radios" value="true">Excluded</b-form-radio>
                        <b-form-select disabled class="mt-4"  v-model="selected" :options="list_option"></b-form-select>
                    </b-col>
                </b-row>
                <b-row class="w-100">
                    <b-col cols="4">
                        <b-form-radio v-model="selected" disabled class="mt-4" name="some-radios" value="true">Excluded</b-form-radio>
                        <div class="d-flex align-items-center mt-4">
                            <p class="mr-1">List Dept:</p>
                            <b-form-select disabled class="select" v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Group:</p>
                            <b-form-select disabled class="select" v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Source:</p>
                            <b-form-select disabled class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                    </b-col>
                    <b-col cols="4" class="d-flex flex-column justify-content-center">
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Type:</p>
                            <b-form-select disabled class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="w-100 mt-5">
                    <b-col>
                        <p>Market</p>
                        <b-form-select @change="detectListSelectChange('list_market')" v-model="filter.list_market" :options="list_market_option"></b-form-select>
                    </b-col>
                    <b-col>
                        <p>SubMarket</p>
                        <b-form-select disabled v-model="filter.submarket" :options="submarket_options"></b-form-select>
                    </b-col>
                    <b-col>
                        <p>Subject County</p>
                        <b-form-select disabled v-model="selected" :options="list_option"></b-form-select>
                    </b-col>
                </b-row>
                <b-row class="w-100">
                    <b-col>
                        <div class="mt-4">
                            <div class="d-flex justify-content-end">
                                <b-button class="d-flex align-items-center" v-b-toggle.collapse-1 variant="outline-primary">
                                    <b-icon icon="plus" aria-hidden="true"></b-icon>Add Conditional Filtering</b-button>
                            </div>
                            <b-collapse id="collapse-1"  class="mt-2">
                                <b-row>
                                    <b-col class="d-flex mb-2">
                                        <b-form-radio v-model="selected" class="mr-2" name="some-radios" value="And">And</b-form-radio>
                                        <b-form-radio v-model="selected" name="some-radios" value="Or">Or</b-form-radio>
                                    </b-col>
                                </b-row>

                                <b-card>
                                    <b-row>
                                        <b-col cols="11">
                                            <div v-for="item in conditionalFilter" :key="item.index">
                                                <conditional-filter @deleteConditionalFilter="deleteConditionalFilter" :index="item.index" :is_single="filterCount > 1" class="mb-2"></conditional-filter>
                                            </div>
                                        </b-col>
                                        <b-col class="d-flex align-items-end">
                                            <div class="add-btn d-flex justify-content-center align-items-center" @click="addFilter()">
                                                <b-icon icon="plus"></b-icon>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-collapse>
                        </div>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-row>
                    <b-col cols="12" class="d-flex justify-content-end">
                        <b-button variant="outline-primary" @click="resetFilter()" class="filter d-flex align-items-center mr-2">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Reset</b-button>
                        <b-button variant="primary" @click="$emit('save', filter)" class="filter d-flex align-items-center">
                            <b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
                    </b-col>
                </b-row>
            </div>
        </template>
    </b-modal>
</template>
<script>
    import {mapGetters} from "vuex";
    import ConditionalFilter from "./ConditionalFilter";

    export default {
        name: 'FilterProperties',
        components: {
            ConditionalFilter
        },
        props: {
            showModal: {
                type: Boolean
            },
        },
        mounted() {
            this.$store.dispatch("listModule/getAllLists", {page: 1, perPage: this.perPage});
            if (this.lists) {
                this.lists.forEach(e => {
                    this.list_group_option.push({ value: e.list_group, text: e.list_group });
                    this.list_source_option.push({ value: e.list_source, text: e.list_source });
                    this.list_type_option.push({ value: e.list_type, text: e.list_type });
                    this.list_market_option.push({ value: e.list_market, text: e.list_market });
                });
            }        },
        data() {
            return {
                selected: false,
                firstSelectedFilter: '',
                firstSelectedFilterValue: '',
                filter: {
                    list_market: null,
                    list_group: null,
                    list_source: null,
                    list_type: null,
                    submarket: [],
                },
                running_list: {
                    included: false,
                    excluded: false,
                },
                list_option: [],
                list_dept_option: [],
                list_group_option: [{ value: null, text: 'Leave Unassigned' }],
                list_source_option: [{ value: null, text: 'Leave Unassigned' }],
                list_type_option: [{ value: null, text: 'Leave Unassigned' }],
                list_market_option: [{ value: null, text: 'Leave Unassigned' }],
                submarket_options: [],
                perPage: 9999,
                condition: '',
                conditionalFilter: [
                    {index: 1}
                ],
                filterCount: 1,
                optionsArray: ['list_group', 'list_source', 'list_type', 'list_market']
            }
        },
        computed: {
            ...mapGetters({
                lists: 'listModule/lists',
            }),
        },
        watch: {
            showModal() {
                this.subject = {...this.propsData}
            }
        },
        methods: {
            addFilter () {
                this.filterCount++;
                const filter = {
                    index: 0,
                }
                filter.index = this.filterCount;
                this.conditionalFilter.push(filter);
            },
            deleteConditionalFilter(response) {
                const indexOfFilter = this.conditionalFilter.findIndex(elemennt => elemennt.index === response);
                this.conditionalFilter.splice(indexOfFilter, 1);
                this.filterCount--;
            },
            resetFilter () {
                this.filter.list_market = null;
                this.filter.list_group = null;
                this.filter.list_source = null;
                this.filter.list_type = null;
                this.running_list.included = false;
                this.running_list.excluded = false;
            },
            detectListSelectChange(filter) {
                if (this.firstSelectedFilter === '' || (this.firstSelectedFilter === filter && this.firstSelectedFilterValue !== this.filter[filter])) {
                    const filteredList = this.lists.filter(list => list[filter] === this.filter[filter]);
                    this.optionsArray.forEach(item => {
                        if(item !== filter) {
                            this[item + '_option'].length = [];
                        }
                    })
                    filteredList.forEach(e => {
                           this.optionsArray.forEach(item => {
                               if(item !== filter) {
                                   this[item + '_option'].push({ value: e[item], text: e[item] })
                               }
                           })
                    });
                    this.firstSelectedFilter = filter;
                    this.firstSelectedFilterValue = this.filter[filter];
                }
            }
        }
    }
</script>

<style scoped>
    p {
        margin-bottom: 0;
    }

    .select {
        width: 70% !important;
    }
    .add-btn {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background-color: #008583;
        color: white;
        cursor: pointer;
        margin-bottom: 18px;
    }
</style>
