<template>
  <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
    <template #modal-header>
      <div class="w-100">Properties Filters</div>
      <div>
        <b-icon @click="closeFilterModal" class="close-icon" icon="x"></b-icon>
      </div>
    </template>
    <!-- New Filter -->
    <b-container fluid>
      <div>
        <div>
          <p v-for="(result, index) in ListFilters" :key="index">
            <span v-if="result.rule != null && result.option != null"
              ><b-icon
                title="Remove"
                @click="removeListFilter(index)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{ result.rule }} {{ result.option }}</span
            >
          </p>
          <p v-for="(result, index) in StackFilters" :key="index">
            <span v-if="result.value != null && result.value != ''"
              ><b-icon
                title="Remove"
                @click="removeStackFilter(result)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{ result.value }}</span
            >
          </p>
          <p v-for="(result, index) in StatementFilters" :key="index">
            <span v-if="result.value != null && result.value != ''"
              ><b-icon
                title="Remove"
                @click="removeStatementFilter(result)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{ result.value }}</span
            >
          </p>
          <p v-for="(result, index) in additionalFilters" :key="index">
            <span v-if="result.value != null && result.value != ''"
              ><b-icon
                title="Remove"
                @click="removeAdditionalFilter(result)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{result.rule}} {{ result.value }}</span
            >
          </p>
        </div>
        <h5 class="font-weight-bold mb-0">List Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">Choose filters related to lists.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="market">Market</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="market"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Market.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="MarketList"
                  v-model="chooseListFilters.Market.option"
                  :disabled="chooseListFilters.Market.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option>
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Market.option == null || chooseListFilters.Market.option == ''" @click="addListFilter(chooseListFilters.Market)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="group">Group</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="group"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Group.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="GroupList"
                  v-model="chooseListFilters.Group.option"
                  :disabled="chooseListFilters.Group.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Group.option == null || chooseListFilters.Group.option == ''" @click="addListFilter(chooseListFilters.Group)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="type">Type</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="type"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Type.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="TypeList"
                  v-model="chooseListFilters.Type.option"
                  :disabled="chooseListFilters.Type.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option
                    >
                  </template></b-form-select
                >
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Type.option == null || chooseListFilters.Type.option == ''" @click="addListFilter(chooseListFilters.Type)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="source">Source</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="source"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Source.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="SourceList"
                  v-model="chooseListFilters.Source.option"
                  :disabled="chooseListFilters.Source.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Source.option == null || chooseListFilters.Source.option == ''" @click="addListFilter(chooseListFilters.Source)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <h5 class="font-weight-bold mb-0">Stack Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">
          Input number statements in the format of a single number (Ex: 1),
          range (Ex: 1-4), or extended range (Ex: 3+ or 3-).
        </p>
        <b-row class="p-0">
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="list_stack"
                  >List Stack</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="list_stack"
                  value="1+"
                  required
                  v-model="StackFilters.ListStack.value"
                  title="List Stack"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_sellers"
                  >Total Sellers</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_sellers"
                  value="1+"
                  required
                  title="Total Sellers"
                  v-model="StackFilters.TotalSellers.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_subjects"
                  >Total Subjects</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_subjects"
                  value="1+"
                  required
                  title="Total Subjects"
                  v-model="StackFilters.TotalSubjects.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_phones"
                  >Total Phones</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_phones"
                  value="1+"
                  required
                  title="Total Phones"
                  v-model="StackFilters.TotalPhones.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_emails"
                  >Total Emails</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_emails"
                  value="1+"
                  required
                  title="Total Emails"
                  v-model="StackFilters.TotalEmails.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_goldens"
                  >Total Goldens</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_goldens"
                  value="1+"
                  required
                  title="Total Goldens"
                  v-model="StackFilters.TotalGoldens.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <h5 class="font-weight-bold mb-0">Statement Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">Choose filters related to statement about the data.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace"
                  >Has Skip Trace Data</label
                >
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="StatementFilters.hasSkipTraceData.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="attempted_skips"
                  >Has Attempted Skips</label
                >
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="attempted_skips"
                  class="w-100"
                  :options="statmentYesNo_Option"
                  v-model="StatementFilters.hasAttemtedSkips.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <h5 class="font-weight-bold mb-0">Additional Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">Add additional filters.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="chooseAdditionalFilters"
              v-model="additionalFilter"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'string'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="stringRules"
              v-model="additionalFilterRule"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'datetime'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="dateTimeRules"
              v-model="additionalFilterRule"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'string'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-input
            class="w-auto"
            v-model="additionalFilterValue"
            ></b-form-input>
          </b-col>
          <b-col v-if="additionalFilter.type == 'datetime'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-datepicker
            class="w-auto"
            v-model="additionalFilterValue"
            ></b-form-datepicker>
          </b-col>
          <b-col cols="12" lg="2" md="12" class="mb-3">
            <b-button  variant="primary"
              @click="addFilter()"
              :disabled="additionalFilterValue == '' || additionalFilterRule == ''"
              class="filter d-flex align-items-center">
              Add</b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <!-- <hr> -->
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-start">
        <b-row class="w-100">
          <b-col cols="6">
            <b-button
              variant="primary"
              @click="showManageFiltersModas()"
              class="filter d-flex align-items-center mr-3">Manage Saved Filters</b-button>
          </b-col>
          <b-col cols="6" class="d-flex justify-content-end">
            <b-button
              :disabled="totalFilters == 0"
              variant="primary"
              @click="saveFilter()"
              class="filter d-flex align-items-center mr-3">Save Filter</b-button>
            <b-button
              variant="primary"
              @click="applyFilters()"
              class="filter d-flex align-items-center"><b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
          </b-col>
        </b-row>
      </div>
    </template>
    <save-filter-modal
      :showModal="showSaveFilterModal"
      @cancel="showSaveFilterModal = false"
      :allFilters="allFilters"
      type="subjects"
    ></save-filter-modal>
    <manage-filter-modal
      :showModal="showManageFilterModal"
      @cancel="showManageFilterModal = false"
      :allFilters="allFilters"
      type="subjects"
    ></manage-filter-modal>
  </b-modal>
</template>
<script>
import { mapGetters } from "vuex";
import SaveFilterModal from "./../filters/saveFilterModal";
import ManageFilterModal from "./../filters/ManageFilterModal";

export default {
  name: "FilterSubjects",
  components: {
    SaveFilterModal,
    ManageFilterModal,
  },
  props: {
    showModal: {
      type: Boolean,
    },
    propsData: {
      type: Array,
      default: null,
    },
    search: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showSaveFilterModal: false,
      showManageFilterModal: false,
      lists: [],
      allData: {
        Market: [],
        Group: [],
        Type: [],
        Source: [],
      },
      allFilters: {
        Market: [],
        Group: [],
        Type: [],
        Source: [],
        Errors: [],
        Error: [],
        RunDate: [],
        TotalSellers: [],
        ListStack: [],
        list_custom_field_1: [],
        list_custom_field_2: [],
        list_custom_field_3: [],
        list_custom_field_4: [],
        list_custom_field_5: [],
      },
      searchSubject: "",
      activeTab: "allFilters",
      filtered: [],
      perPage: 20,
      appliedFilters: false,
      filtersAlreadyApplied: null,
      additionalFilter: {type:"", value:""},
      additionalFilterRule: "",
      additionalFilterValue: "",
      IncludesExcludes: [
        { value: null, text: "Choose Rule", disabled: true },
        { value: "include", text: "Includes" },
        { value: "exclude", text: "Excludes" },
      ],
      stringRules: [
        { value: null, text: "Choose Rule", disabled: true },
        { value: "Contains", text: "Contains" },
        { value: "=", text: "Equal To" },
      ],
      dateTimeRules: [
        { value: null, text: "Choose Rule", disabled: true },
        { value: "=", text: "Equal" },
        { value: "before", text: "Before" },
        { value: "after", text: "After" }
      ],
      YesNo_Option: [
        { value: null, text: "Choose Option", disabled: true },
        { value: "Yes", text: "Yes" },
        { value: "No", text: "No" },
      ],
      statmentYesNo_Option: [
        { value: null, text: "Choose Option", disabled: true },
        { value: 1, text: "Yes" },
        { value: 0, text: "No" },
      ],
      AndOrStatement: [
        { value: "And", text: "And" },
        { value: "Or", text: "Or" },
      ],
      chooseAdditionalFilters: [
        { value: null, text: "Choose Additional Filters", disabled: true },
        {
          value: { type: "string", text: "Subject Address", column: "subject_address" },
          text: "Subject Address",
        },
        {
          value: { type: "string", text: "Subject City",  column: "subject_city" },
          text: "Subject City",
        },
        {
          value: { type: "string", text: "Subject State", column: "subject_state" },
          text: "Subject State",
        },
        {
          value: { type: "string", text: "Subject Zip", column: "subject_zip" },
          text: "Subject Zip",
        },
        {
          value: { type: "string", text: "Subject Full Address", column: "subject_full_address" },
          text: "Subject Full Address",
        },
        {
          value: { type: "string",  text: "Subject County", column: "subject_county" },
          text: "Subject County",
        },
        {
          value: { type: "string", text: "Subject Market", column: "subject_Market" },
          text: "Subject Market",
        },
        {
          value: { type: "string", text: "Subject Age", column: "subject_age" },
          text: "Subject Age",
        },
        {
          value: { type: "string", text: "Subject Type", column: "subject_type" },
          text: "Subject Type",
        },
        {
          value: { type: "string", text: "Subject Address Line 2", column: "subject_address_line_2" },
          text: "Subject Address Line 2",
        },
        {
          value: {type: "datetime", text: "Subject Pull Date", column: "subject_pull_date"} ,
          text: "Subject Pull Date",
        },
        {
          value: {type: "datetime", text: "Subject Last Marketed Date", column: "subject_last_marketed_date"} ,
          text: "Subject Last Marketed Date",
        },
        {
          value: {type: "datetime", text: "Subject Last Exported Date", column: "subject_last_exported_date"} ,
          text: "Subject Last Exported Date",
        },
        {
          value: {type: "datetime", text: "Subject Subject Skip Trace Date", column: "subject_skip_trace_date"} ,
          text: "Subject Subject Skip Trace Date",
        },
        {
          value: { type: "string", text: "Subject Custom Field 1", column: "subject_custom_field_1" },
          text: "Subject Custom Field 1",
        },
        {
          value: { type: "string", text: "Subject Custom Field 2", column: "subject_custom_field_2" },
          text: "Subject Custom Field 2",
        },
        {
          value: { type: "string", text: "Subject Custom Field 3", column: "subject_custom_field_3" },
          text: "Subject Custom Field 3",
        },
        {
          value: { type: "string", text: "Subject Custom Field 4", column: "subject_custom_field_4" },
          text: "Subject Custom Field 4",
        },
        {
          value: { type: "string", text: "Subject Custom Field 5", column: "subject_custom_field_5" },
          text: "Subject Custom Field 5",
        },
        {
          value: { type: "string", text: "Subject Custom Field 6", column: "subject_custom_field_6" },
          text: "Subject Custom Field 6",
        },
        {
          value: { type: "string", text: "Subject Custom Field 7", column: "subject_custom_field_7" },
          text: "Subject Custom Field 7",
        },
        {
          value: { type: "string", text: "Subject Custom Field 8", column: "subject_custom_field_8" },
          text: "Subject Custom Field 8",
        },
        {
          value: { type: "string", text: "Subject Custom Field 9", column: "subject_custom_field_9" },
          text: "Subject Custom Field 9",
        },
        {
          value: { type: "string", text: "Subject Custom Field 10", column: "subject_custom_field_10" },
          text: "Subject Custom Field 10",
        },
        {
          value: { type: "string", text: "Subject Custom Field 11", column: "subject_custom_field_11" },
          text: "Subject Custom Field 11",
        },
        {
          value: { type: "string", text: "Subject Custom Field 12", column: "subject_custom_field_12" },
          text: "Subject Custom Field 12",
        },
        {
          value: { type: "string", text: "Subject Custom Field 13", column: "subject_custom_field_13" },
          text: "Subject Custom Field 13",
        },
        {
          value: { type: "string", text: "Subject Custom Field 14", column: "subject_custom_field_14" },
          text: "Subject Custom Field 14",
        },
        {
          value: { type: "string", text: "Subject Custom Field 15", column: "subject_custom_field_15" },
          text: "Subject Custom Field 15",
        },
        {
          value: { type: "string", text: "Subject Custom Field 16", column: "subject_custom_field_16" },
          text: "Subject Custom Field 16",
        },
        {
          value: { type: "string", text: "Subject Custom Field 17", column: "subject_custom_field_17" },
          text: "Subject Custom Field 17",
        },
        {
          value: { type: "string", text: "Subject Custom Field 18", column: "subject_custom_field_18" },
          text: "Subject Custom Field 18",
        },
        {
          value: { type: "string", text: "Subject Custom Field 19", column: "subject_custom_field_19" },
          text: "Subject Custom Field 19",
        },
        {
          value: { type: "string", text: "Subject Custom Field 20", column: "subject_custom_field_20" },
          text: "Subject Custom Field 20",
        },
        {
          value: { type: "string", column: "subject_error" },
          text: "Subject Error",
        },
      ],
      additionalFilters:[],
      chooseListFilters: {
        Market: { rule: null, option: null, statement: "And", name: "Market" },
        Group: { rule: null, option: null, statement: "And", name: "Group" },
        Type: { rule: null, option: null, statement: "And", name: "Type" },
        Source: { rule: null, option: null, statement: "And", name: "Source" },
      },
      ListFilters: [],
      StackFilters: {
        ListStack: { statement: "And", value: null, name: "List Stack", key: "ListStack" },
        TotalSubjects: { statement: "And", value: null, name: "Total Subjects", key: "TotalSubjects"},
        TotalSellers: { statement: "And", value: null, name: "Total Sellers", key: "TotalSellers" },
        TotalEmails: { statement: "And", value: null, name: "Total Emails", key: "TotalEmails" },
        TotalPhones: { statement: "And", value: null, name: "Total Phones", key: "TotalPhones" },
        TotalGoldens: { statement: "And", value: null, name: "Total Goldens", key: "TotalGoldens" },
      },
      StatementFilters: {
        hasSkipTraceData: {
          statement: "And",
          value: "",
          name: "has SkipTrace Data",
          key: "hasSkipTraceData"
        },
        hasAttemtedSkips: {
          statement: "And",
          value: "",
          name: "has Attemted Skips",
          key: "hasAttemtedSkips"
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      filterList: "subjectModule/filterList",
      customViewVisibleFields: "importModule/customViewVisibleFields",
    }),
    totalFilters() {
      let total = 0;
      for (let item in this.allFilters) {
        total += this.allFilters[item].length;
      }
      this.$emit("filtersCount", total);
      return total;
    },
    MarketList() {
      return this.allData["Market"];
    },
    GroupList() {
      return this.allData["Group"];
    },
    TypeList() {
      return this.allData["Type"];
    },
    SourceList() {
      return this.allData["Source"];
    },
  },
  async mounted() {
    try {
      this.subject = this.propsData;
      await this.$store.dispatch("importModule/loadVisibleFields");
      let response = await this.$store.dispatch(
        "subjectModule/SubjectfilterList",
        { filter: this.allFilters, search: this.search }
      );
      await this.MapFilters(response);
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    async showModal() {
      if (this.showModal) {
        this.activeTab = "allFilters";
      }
    },
    additionalFilter() {
      this.additionalFilterRule = null;
      this.additionalFilterValue = null;
    },
  },
  methods: {
    addListFilter(filterName) {
      if(this.ListFilters.findIndex(x=>x.name == filterName.name && x.rule == filterName.rule && x.option == filterName.option) == -1){
          this.ListFilters.push(JSON.parse(JSON.stringify(filterName)));
      }
      console.log(this.ListFilters); 
    },
    removeListFilter(index) {
      this.ListFilters.splice(index,1);
    },
    removeStackFilter(result) {
      this.StackFilters[result.key] = {
        value: null,
        name: result.name,
        statement: "And",
        key: result.key,
      };
    },
    removeStatementFilter(result) {
      this.StatementFilters[result.key] = {
        value: null,
        name: result.name,
        statement: "And",
        key: result.key,
      };
    },
    removeAdditionalFilter(result) {
      let index = this.additionalFilters.findIndex(x=>x.name == result.name);
      this.additionalFilters.splice(index,1);
    },
    showManageFiltersModas() {
      this.showManageFilterModal = true;
    },
    saveFilter() {
      this.showSaveFilterModal = true;
    },
    tab(currentTub) {
      this.activeTab = currentTub;
    },
    MapFilters(response) {
      try {
        this.allData = {
          Market: [],
          Group: [],
          Type: [],
          Source: [],
        };

        if (response?.lists?.length > 0) {
          response.lists.forEach((el) => {
            if (
              el.list_market &&
              !this.allData.Market.includes(el.list_market) &&
              !this.allFilters.Market.includes(el.list_market)
            ) {
              this.allData.Market.push(el.list_market);
            }
            if (
              el.list_group &&
              !this.allData.Group.includes(el.list_group) &&
              !this.allFilters.Group.includes(el.list_group)
            ) {
              this.allData.Group.push(el.list_group);
            }
            if (
              el.list_type &&
              !this.allData.Type.includes(el.list_type) &&
              !this.allFilters.Type.includes(el.list_type)
            ) {
              this.allData.Type.push(el.list_type);
            }
            if (
              el.list_source &&
              !this.allData.Source.includes(el.list_source) &&
              !this.allFilters.Source.includes(el.list_source)
            ) {
              this.allData.Source.push(el.list_source);
            }
          });
        }

        if (response?.lists?.length > 0) {
          let AllFilters = Object.keys(this.allData);
          AllFilters.forEach((item) => {
            if (this.allFilters[item].findIndex((x) => x == "Blank") == -1) {
              this.allData[item].unshift("Blank");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    addFilter() {
      this.additionalFilters.push({ rule: this.additionalFilterRule, value: this.additionalFilterValue, statement: "And", name: this.additionalFilter.column });
      this.additionalFilterValue = "";
      this.additionalFilterRule = "";
    },
    applyFilters() {
       /* eslint-disable  no-unused-vars */
      let stackFilters = Object.fromEntries(Object.entries(this.StackFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let statementFilters = Object.fromEntries(Object.entries(this.StatementFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let filterNames = {listFilters:this.ListFilters, stackFilters: stackFilters, statementFilters: statementFilters, additionalFilters: this.additionalFilters};
      this.$emit('filterProperties', JSON.parse(JSON.stringify(filterNames)));
    },
    closeFilterModal() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.filter-count {
  border-radius: 50%;
  background-color: #808080a6;
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  width: 20px;
  height: 20px;
}
.filter-category >>> .nav-pills {
  padding: 0;
}
.filter-category >>> .col-auto {
  width: 20% !important;
}
.filter-category >>> .active {
  border-radius: unset;
}
.filter-category >>> .list-group-item {
  cursor: pointer;
}
</style>
