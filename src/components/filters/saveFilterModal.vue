<template>
<b-modal size="md" v-model="showModal" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Save Filter
        </div>
        <div>
            <b-icon @click="closeFilterModal" class="close-icon" icon="x"></b-icon>
        </div>
    </template>
    <b-container fluid class="container-row">
        <div v-if="saveFilterStep == 1">
            <b-row class="mb-1 text-center">
                <b-col cols="12">
                    <b-button class="save-filter-btn" variant="primary" size="sm" @click="saveFilterStep = 2">
                        Overwrite Existing Filter
                    </b-button>
                </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
                <b-col cols="12">
                    <b>Or</b>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12 text-center">
                    <b-button class="save-filter-btn" variant="primary" size="sm" @click="saveFilterStep = 3">
                        Create new Filter
                    </b-button>
                </b-col>
            </b-row>
        </div>
        <div v-if="saveFilterStep == 2">
            <b-col cols="12">
            <p v-if="invalidUpdateForm" class="save-filter-invalid-feedback">Please Select Filter to Update.</p>
                <b-input-group class="mb-2">
                    <b-form-select class="select-template w-100 mt-3 mb-3" v-model="selectedFilter" :options="savedFilters"></b-form-select>
                </b-input-group>
            </b-col>
        </div>
        <div v-if="saveFilterStep == 3">
            <b-row class="mb-1 text-center">
            <p v-if="invalidSaveForm" class="save-filter-invalid-feedback">Filter Name and Filter Permission is Required.</p>
                <b-col cols="12">
                    <b-input-group class="mb-2">
                        <b-form-input placeholder="Enter Filter Name" v-model="filter.name"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="text-center">
                <b-col cols="12">
                    <b-input-group class="mb-2">
                        <b-form-select class="select-template w-100 mt-3 mb-3" v-model="filter.permission" :options="permissions"></b-form-select>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
                <b-col cols="12">
                    <b-form-checkbox class="text-left" v-model="filterType" @change="filterTypeChange()" name="filter_type" value="accepted">
                        Show on table
                    </b-form-checkbox>
                </b-col>
            </b-row>
        </div>
    </b-container>
    <template #modal-footer>
        <div class="w-100">
            <b-icon class="backstep-arrow" v-if="saveFilterStep > 1" icon="arrow-left" @click="saveFilterStep = 1"></b-icon>
            <b-button variant="primary" size="sm" class="float-right" @click="saveFilter()">
                Save Filter
            </b-button>
        </div>
    </template>
</b-modal>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    name: "SaveFilterModal",
    props: {
        showModal: {
            type: Boolean,
        },
        allFilters: {
            type: Object
        },
        type: {
            type: String
        }
    },
    computed: {
        ...mapGetters({
            filters: 'filterModule/filters',
        }),
    },
    data() {
        return {
            invalidSaveForm: false,
            invalidUpdateForm: false,
            saveFilterStep: 1,
            selectedFilter: null,
            filter: {
            name: null,
            permission: null,
            filter_type: 1,
            },
            filterType: false,
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
            savedFilters: [{
                value: null,
                text: "Choose Existing Filter"
            }]
        };
    },
    methods: {
        closeFilterModal() {
            this.$emit("cancel");
        },
        filterTypeChange() {
            if(this.filterType == "accepted") {
                this.filter.filter_type = 2;
            } else {
                this.filter.filter_type = 1;
            }
        },
       async saveFilter() {
            if (this.saveFilterStep == 3) {
                if(this.filter.name == "" || this.filter.permission == null) {
                    this.invalidSaveForm = true;
                    return;
                }
                this.$store.dispatch('uxModule/setLoading');
                const data = {
                    name: this.filter.name || 'Filter',
                    permission: this.filter.permission,
                    filter_type: this.filter.filter_type,
                    type: this.type,
                    configuration: JSON.stringify(this.allFilters)
                }
                this.$store.dispatch('filterModule/createFilter', data);
                this.$emit("cancel");
                this.saveFilterStep = 1;
                this.filter.name = "";
                if(this.type == "subjects") {
                await this.$store.dispatch("subjectModule/filtersOnTable", this.type);
                } else if(this.type == "sellers") {
                await this.$store.dispatch("sellerModule/filtersOnTable", this.type);
                } else if(this.type == "phonenumbers") {
                await this.$store.dispatch("phoneNumberModule/filtersOnTable", this.type);
                } else if(this.type == "emails") {
                await this.$store.dispatch("emailModule/filtersOnTable", this.type);
                } else if(this.type == "goldens") {
                await this.$store.dispatch("goldenAddressModule/filtersOnTable", this.type);
                }
            }
            if (this.saveFilterStep == 2) {
                if(this.selectedFilter == null) {
                    this.invalidUpdateForm = true;
                    return;
                }
                this.$store.dispatch('uxModule/setLoading');
                const data = {
                    id: this.selectedFilter,
                    configuration: JSON.stringify(this.allFilters)
                }
                this.$store.dispatch('filterModule/editFilter', data);
                this.$emit("cancel");
                this.saveFilterStep = 1;
            }
            await this.$store.dispatch("filterModule/getAllFilters", this.type);
            this.$store.dispatch('uxModule/hideLoader');
        }
    },
    async mounted() {
        await this.$store.dispatch("filterModule/getAllFilters", this.type)
        this.filters.forEach(e => {
            const filter = {
                value: '',
                text: '',
            }
            filter.value = e.id;
            filter.text = e.name;
            this.savedFilters.push(filter);
        });
    },
};
</script>

<style>
.backstep-arrow {
    float: left;
    cursor: pointer;
    margin-top: 11px;
}
.save-filter-btn {
    width: 200px;
    height: 35px;
}
.save-filter-invalid-feedback {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
}
</style>
