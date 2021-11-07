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
                            <b-form-select class="select" v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Group:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Source:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                    </b-col>
                    <b-col cols="4" class="d-flex flex-column justify-content-center">
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Type:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Code:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <h5>Running List</h5>
                        <b-form-radio v-model="selected" name="some-radios" value="true">Included</b-form-radio>
                        <b-form-select class="mt-4"  v-model="selected" :options="list_option"></b-form-select>
                        <b-form-radio v-model="selected" class="mt-4" name="some-radios" value="true">Excluded</b-form-radio>
                        <b-form-select class="mt-4"  v-model="selected" :options="list_option"></b-form-select>
                    </b-col>
                </b-row>
                <b-row class="w-100">
                    <b-col cols="4">
                        <b-form-radio v-model="selected" class="mt-4" name="some-radios" value="true">Excluded</b-form-radio>
                        <div class="d-flex align-items-center mt-4">
                            <p class="mr-1">List Dept:</p>
                            <b-form-select class="select" v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Group:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Source:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                    </b-col>
                    <b-col cols="4" class="d-flex flex-column justify-content-center">
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Type:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <p class="mr-1">List Code:</p>
                            <b-form-select class="select"  v-model="selected" :options="list_option"></b-form-select>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="w-100 mt-5">
                    <b-col>
                        <p>Market</p>
                        <b-form-select  v-model="filter.list_market" :options="list_market_option"></b-form-select>
                    </b-col>
                    <b-col>
                        <p>SubMarket</p>
                        <b-form-select  v-model="selected" :options="list_option"></b-form-select>
                    </b-col>
                    <b-col>
                        <p>Subject County</p>
                        <b-form-select  v-model="selected" :options="list_option"></b-form-select>
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
                <b-row class="mt-4">
                    <b-col cols="12" class="d-flex justify-content-end">
                        <b-button variant="outline-primary" class="filter d-flex align-items-center mr-2">
                            <b-icon icon="x" aria-hidden="true"></b-icon> Reset</b-button>
                        <b-button variant="primary" class="filter d-flex align-items-center">
                            <b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="$emit('cancel')"
                >
                    Cancel
                </b-button>
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right mr-2"
                        @click="$emit('save', filter)"
                >
                    Save
                </b-button>
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
        },
        data() {
            return {
                selected: false,
              filter: {
                list_market: '',
                list_group: ''
              },
                list_option: [],
              list_market_option: [
                  'q', 'a', 'Random' // Market Options
              ],
                perPage: 9999,
                condition: '',
                conditionalFilter: [
                    {index: 1}
                ],
                filterCount: 1,
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
    /*.container-row {*/
    /*    height: 100%;*/
    /*    overflow-x: hidden;*/
    /*}*/
</style>
