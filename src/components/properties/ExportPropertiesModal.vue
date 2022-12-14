<template>
    <b-modal size="lg" v-model="showModal" scrollable no-close-on-backdrop>
      <template #modal-header>
        <div class="w-100">
            Export
        </div>
        <div>
          <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
        </div>
      </template>
      <b-container fluid class="container-row p-0 m-0">
          <b-card>
            <b-card-body>
        <!-- Export  -->
          <div class="export-card-body">
            <div @click="BackStep(1)" class="export-number">
              <span>1</span>
              <b>Export Type</b>
            </div>
            <div class="step1">
              <div v-if="stepNumber == 1">
                <b-form-select
                  class="select-template w-100"
                  v-model="export_type"
                  @change="changeExportType($event)"
                  :options="ExportTypes"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Please select an option --</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </div>
            </div>
            <div @click="BackStep(2)" class="export-number">
              <span>2</span>
              <b v-if="stepNumber > 2 && export_type == 1"
                >Marketing Export Details</b
              >
              <b v-if="stepNumber > 2 && export_type == 2"
                >SkipTrace Export Details</b
              >
              <b v-if="stepNumber > 2 && export_type == 3"
                >Miscellaneous Reason Export Details</b
              >
            </div>
            <div class="step2">
              <div v-if="stepNumber == 2">
                <div v-if="export_type == 1">
                  <b-form-select
                    class="select-template w-100 mb-3"
                    v-model="marketing_channel"
                    @change="checkNextStep($event)"
                    :options="savedMarketingChannels"
                  >
                  </b-form-select>
                  <b-form-datepicker
                    class="mb-3"
                    v-model="marketing_start_date"
                    @change="checkNextStep($event)"
                    type="text"
                    placeholder="Select Marketing Date Start"
                    autocomplete="off"
                  ></b-form-datepicker>
                  <b-form-datepicker
                    class="mb-3"
                    v-model="marketing_end_date"
                    @change="checkNextStep($event)"
                    type="text"
                    placeholder="Select Marketing Date End"
                    autocomplete="off"
                  ></b-form-datepicker>
                  <p class="text-center m-0">OR</p>
                  <b-form-select
                    class="select-template w-100 mt-1 mb-3"
                    v-model="marketing_period"
                    @change="checkNextStep($event)"
                    :options="MarketingLength"
                  >
                  </b-form-select>
                </div>
                <div v-if="export_type == 2">
                  <b-form-select
                    class="select-template w-100 mb-3"
                    v-model="skip_source"
                    @change="checkNextStep($event)"
                    :options="skipTraceSources"
                  >
                  </b-form-select>
                  <b-form-datepicker
                    class="mb-3"
                    v-model="skip_date"
                    @change="checkNextStep($event)"
                    type="text"
                    placeholder="Select Skiptrace Attempt Date"
                    autocomplete="off"
                  ></b-form-datepicker>
                </div>
              </div>
            </div>
            <div @click="BackStep(3)" class="export-number">
              <span>3</span>
            </div>
            <div class="step3">
              <div v-if="stepNumber == 3">
                <b-form-textarea
                  id="textarea"
                  v-model="notes"
                  placeholder="Opitonal Export Notes"
                  rows="3"
                  max-rows="6"
                >
                </b-form-textarea>
                <b-form-select
                  class="select-template export-amount-select w-100 mt-2 mb-3"
                  v-model="export_amount"
                  :options="SelectExportAmount"
                >
                </b-form-select>
              </div>
            </div>
          </div>
              
        </b-card-body>
        </b-card>
    </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">Close</b-button>
                <b-button
              class="float-right mx-3" size="sm" variant="primary"
              @click="exportfile()"
              :disabled="isExportDisabled"
            >
            <b-icon class="download mx-2" icon="download" aria-hidden="true"></b-icon> 
              <span v-if="isExporting">
                <b-spinner small></b-spinner> Exporting </span
              ><span v-if="!isExporting">Export</span></b-button
            >
            </div>
        </template>
  </b-modal>

  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import axios from "axios";
  import moment from "moment";
  export default {
    name: "NewFilterProperties",
    props: {
      custom_view: {
        type: [Array, Object],
      },
      fields_type: {
        type: String,
      },
      template_id: {
        type: Number,
      },
      selectedItems: {
        type: Array,
      },
      search: {
        type: String,
      },
      sortBy: {
        type: String,
      },
      sortDesc: {
        type: Boolean,
      },
      totals: {
        type: Number,
      },
      showModal: {
        type: Boolean
      },
    },
    components: {
    },
    data() {
      return {
        perPage: 20,
        export_type: null,
        marketing_channel: null,
        marketing_start_date: null,
        marketing_end_date: null,
        skip_source: null,
        skip_date: null,
        notes: null,
        marketing_period: null,
        export_amount: null,
        skipSourceType: null,
        skipSourceTypes: ["Includes", "Excludes"],
        conditions: ['Equal To','Greater Than','Less Than'],
        listStackCount: null,
        TotalSubjectsCount: null,
        TotalSellersCount: null,
        TotalEmailsCount: null,
        TotalPhonesCount: null,
        TotalGoldenAddressesCount: null,
        ListStack: null,
        SubjectsCondition: null,
        SellersCondition: null,
        PhonesCondition: null,
        EmailsCondition: null,
        GoldenAddressesCondition: null,
        skipSource: null,
        allData: {
          Market:[],
          Group:[],
          Type:[],
          Source:[],
          Errors:[],
          Error:[],
          RunDate:[],
          TotalSellers:[],
          ListStack:[],
          list_custom_field_1:[],
          list_custom_field_2:[],
          list_custom_field_3:[],
          list_custom_field_4:[],
          list_custom_field_5:[],
        },
        allFilters: {
          Market:[],
          Group:[],
          Type:[],
          Source:[],
          Errors:[],
          Error:[],
          RunDate:[],
          TotalSellers:[],
          ListStack:[],
          list_custom_field_1:[],
          list_custom_field_2:[],
          list_custom_field_3:[],
          list_custom_field_4:[],
          list_custom_field_5:[],
        },
        selectedAll: {
          Market: false,
          Group: false,
          Type: false,
          Source: false,
          SkipSource:false,
        },
        savedMarketingChannels: [
          {
            value: null,
            text: "Select Marketing Channel",
          },
        ],
        isShowMarketDropDown: false,
        isSkipSourceDropDown: false,
        isGroupDropDown: false,
        isTypeDropDown: false,
        isSourceDropDown: false,
        stepNumber: 1,
        savedMarkets: [
          {
            value: 1,
            text: "ABC",
          },
        ],
        ExportTypes: [
          {
            value: null,
            text: "Select Export Type",
          },
          {
            value: 1,
            text: "To Market",
          },
          {
            value: 2,
            text: "To SkipTrace",
          },
          {
            value: 3,
            text: "Miscellaneous Reason",
          },
        ],
        skipTraceSources: [
          {
            value: null,
            text: "Select Skiptrace Source",
          },
        ],
        SkipSources:[],
        MarketingLength: [
          {
            value: null,
            text: "Choose Marketing Length",
          },
          {
            value: 1,
            text: "1 week",
          },
          {
            value: 2,
            text: "2 weeks",
          },
          {
            value: 3,
            text: "3 weeks",
          },
          {
            value: 4,
            text: "4 weeks",
          },
          {
            value: 5,
            text: "5 weeks",
          },
          {
            value: 6,
            text: "6 weeks",
          },
        ],
        selectedFilter: null,
        isShowSlidePopUp: false,
        showSaveFilterModal: false,
        SelectExportAmount: [],
        isListLoading: true,
        isExporting: false,
        totalSubjects: 0,
      };
    },
    computed: {
      ...mapGetters({
        marketingChannelsForDropDown: "marketingChannelModule/marketingChannelsForDropDown",
        lists: "listModule/lists",
        filters: "filterModule/filters",
        sourceList: "listModule/skipSourceList",
        skipSourceListFromDB: "listModule/skipSourceListFromDB",
      }),
      totalFilters() {
        let total = 0;
        for (let item in this.allFilters) {
          total += this.allFilters[item].length;
        }
        this.$emit("filtersCount", total);
        return total;
      },
      MarketFilterCount() {
        return this.allFilters.Market.length > 0;
      },
      isExportDisabled() {
        if (this.export_amount == null || this.isExporting) {
          return true;
        } else {
          return false;
        }
      },
    },
    async created() {
      await this.$store.dispatch("marketingChannelModule/marketingChannelsForDropDown", {
        page: 1,
        perPage: 20,
      });
      this.marketingChannelsForDropDown.forEach((e) => {
        const marketingChannel = {
          value: "",
          text: "",
        };
        marketingChannel.value = e.id;
        marketingChannel.text = e.marketing_channel_name;
        this.savedMarketingChannels.push(marketingChannel);
      });
      await this.$store.dispatch("listModule/getAllLists", {
        page: 1,
        perPage: this.perPage,
      });
      this.lists.forEach((el) => {
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
      this.isListLoading = false;
    },
    watch: {
      totals: function() {
        this.totalSubjects = this.totals;
        this.SelectExportAmount = [];
        let exportV_3 = Math.round(this.totalSubjects / 5); //Round the number {(Total in view / 5)}
        exportV_3 = exportV_3 > 0 ? exportV_3 : 1;
  
        let exportV_4 = Math.round(
          this.totalSubjects / 5 + (this.totalSubjects / 5) * 2
        ); //Round the number  {(Total in view / 5) + ((Total in view / 5) * 2)}
        exportV_4 = exportV_4 > 0 ? exportV_4 : 1;
  
        let exportV_5 = Math.round(
          this.totalSubjects / 5 + (this.totalSubjects / 5) * 3
        ); //Round the number {(Total in view / 5) + ((Total in view / 5) * 3)}
        exportV_5 = exportV_5 > 0 ? exportV_5 : 1;
  
        this.SelectExportAmount.push(
          {
            value: null,
            text: "Select Export Amount",
          },
          {
            value: 1,
            text: "Export Selected",
          },
          {
            value: 2,
            text: "Export " + exportV_3,
          },
          {
            value: 3,
            text: "Export " + exportV_4,
          },
          {
            value: 4,
            text: "Export " + exportV_5,
          },
          {
            value: 5,
            text: "Export all " + this.totalSubjects,
          }
        );
      },
      marketing_start_date: function() {
        this.checkNextStep();
      },
      marketing_end_date: function() {
        this.checkNextStep();
      },
      marketing_period: function() {
        this.checkNextStep();
      },
      skip_date: function() {
        this.checkNextStep();
      },
    },
    methods: {
      BackStep(number) {
        if (number == 1) {
          this.stepNumber = number;
        } else if (number == 2 && this.export_type != null) {
          this.stepNumber = number;
        } else if (number == 3) {
          this.checkNextStep();
        }
      },
      async exportfile() {
        if (this.marketing_period) {
          this.marketing_end_date = moment(this.marketing_start_date)
            .add(this.marketing_period * 7, "days")
            .format("YYYY-MM-DD");
        }
        const selectedSubjects = [];
        const selectedSellers = [];
        const selectedEmails = [];
        const selectedGoldenAddresses = [];
        const selectedPhones = [];
        if (this.fields_type == "separatedrows") {
          this.selectedItems.forEach((selectedItem) => {
            let selectedItems = selectedItem.split(",");
            selectedItems.forEach((element, index) => {
              if (element && element != "undefined") {
                if (index == 0) {
                  selectedSubjects.push(element);
                }
                if (index == 1) {
                  selectedSellers.push(element);
                }
                if (index == 2) {
                  selectedPhones.push(element);
                }
                if (index == 3) {
                  selectedEmails.push(element);
                }
                if (index == 3) {
                  selectedGoldenAddresses.push(element);
                }
              }
            });
          });
        }
  
        let custom_view = JSON.parse(JSON.stringify(this.custom_view));
        const exportSubject = {
          selected_subjects: selectedSubjects,
          selected_sellers: selectedSellers,
          selected_phones: selectedPhones,
          selected_emails: selectedEmails,
          selected_golden_addresses: selectedGoldenAddresses,
          export_type: this.export_type,
          marketing_channel: this.marketing_channel,
          marketing_start_date: this.marketing_start_date,
          marketing_end_date: this.marketing_end_date,
          skip_source: this.skip_source,
          skip_date: this.skip_date,
          notes: this.notes,
          selectedItems: this.selectedItems,
          export_amount: this.export_amount,
          custom_view: custom_view,
          template_id: this.template_id,
          filter: this.selectedFilter,
          fileType: "csv",
          filters: this.allFilters,
          search: this.search,
          sortBy: this.sortBy,
          sortDesc: this.sortDesc,
          fields_type: this.fields_type,
        };
  
        this.isExporting = true;
        let response = await this.$store.dispatch(
          "propertyModule/exportProperties",
          exportSubject
        );
        this.$bvToast.toast(`Document Export Started. Please wait!`, {
          title: "Export",
          autoHideDelay: 5000,
          appendToast: true,
        });
  
        this.isExporting = false;
        const instance = this;
        window.Echo.private(`exportcompleted.${response.batch.id}`).listen(
          "NotifyExportCompleted",
          (e) => {
            instance.$bvToast.toast(`Download is Started for the Document.`, {
              title: "Export File Download",
              autoHideDelay: 5000,
              appendToast: true,
            });
  
            axios({
              url: `${process.env.VUE_APP_API_URL}/properties/download/${e.exportId}`, // File URL Goes Here
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              const a = document.createElement("a");
              document.body.appendChild(a);
              const url = window.URL.createObjectURL(new Blob([res.data]));
              a.href = url;
              a.download = "export.csv";
              a.click();
            });
          }
        );
      },
      checkNextStep() {
        if (this.export_type != null) {
          if (
            this.export_type == 1 &&
            this.marketing_channel != null &&
            this.marketing_start_date != null &&
            (this.marketing_end_date != null || this.marketing_period != null)
          ) {
            this.stepNumber = 3;
          }
          if (
            this.export_type == 2 &&
            this.skip_source != null &&
            this.skip_date != null
          ) {
            this.stepNumber = 3;
          }
          if (this.export_type == 3) {
            this.stepNumber = 3;
          }
        }
      },
      changeExportType() {
        if (this.export_type == 3) {
          this.stepNumber = 3;
        } else {
          this.stepNumber = 2;
        }
      },
    },
    async mounted() {
      const Instance = this;
      await this.$store.dispatch("listModule/getSkipSourceListFromDB");
      this.skipSourceListFromDB.forEach(function(item) {
        Instance.skipTraceSources.push(item.list_skip_source);
        Instance.SkipSources.push(item.list_skip_source);
      });
      document.querySelector("body").addEventListener("click", function(e) {
        if (
          !e.target.closest(".checkbox-select__dropdown") &&
          !e.target.closest(".checkbox-select")
        ) {
          if (document.querySelectorAll(".checkbox-select__dropdown")) {
            document
              .querySelectorAll(".checkbox-select__dropdown")
              .forEach(function(elem) {
                elem.style.display = "none";
              });
          }
        }
      });
    }
  };
  </script>
  
  <style>
  .export-amount-select {
    font-size: 14px !important;
  }
  
  .slidepopup {
    position: fixed;
    overflow-y: scroll;
    direction: rtl;
    float: left;
    height: 100%;
    border-radius: 10px;
    background: #024847 !important;
    min-width: 70px;
    border: 2px solid black;
    z-index: 7;
    margin-left: -67px;
    transition: width 2s;
  }
  
  .innerslidepopup {
    direction: ltr;
  }
  
  .filter-and-export {
    color: white;
    margin-top: 40px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    float: right;
  }
  
  .filter-right-icon {
    margin-top: 200px;
    cursor: pointer;
    margin-left: 40px;
    display: block;
    color: white;
    font-size: 23px;
  }
  
  .filter-left-icon {
    position: absolute;
    margin-top: 300px;
    cursor: pointer;
    margin-left: 40px;
    right: 0px;
    float: right;
    color: white;
    font-size: 23px;
  }
  
  .slidepopup.show {
    width: 500px;
    margin-left: -31px !important;
    transition-duration: 2s;
  }
  
  .filter-body {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;
  }
  
  .filter-type {
    border: 1px solid black;
    padding: 10px;
  }
  
  .filter_type_bg_color {
    background: #deefef;
  }
  
  .filter-type .number {
    height: 25px;
    background: white;
    display: inline-block;
    margin: 0px;
    width: 25px;
    border: 1px solid black;
    border-radius: 100%;
    text-align: center;
  }
  
  .filter-type .filter-name {
    display: inline-block;
    margin: 0px;
    margin-left: 10px;
  }
  
  .export-number {
    cursor: pointer;
  }
  
  .export-number span {
    height: 25px;
    background: white;
    display: inline-block;
    margin: 0px;
    width: 25px;
    margin-left: -10px;
    border: 1px solid black;
    border-radius: 100%;
    text-align: center;
  }
  
  .export-number b {
    margin-left: 15px;
  }
  
  .step1,
  .step2,
  .step3 {
    margin-top: 10px;
    min-height: 30px;
    padding-left: 22px;
    border-left: 3px solid black;
    margin-left: 0px;
    margin-bottom: 10px;
  }
  
  .step3 {
    border-left: none !important;
    margin-top: -18px !important;
  }
  
  .checkbox-select__trigger {
    cursor: pointer;
  }
  
  .checkbox-select__dropdown {
    position: absolute;
    width: 364px;
    background: white;
    border-radius: 10px;
    z-index: 10;
    height: 100px;
    overflow-y: scroll;
    border: 1px solid #ced4da;
  }
  
  .checkbox-select__dropdown ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  
  .checkbox-select__dropdown ul li {
    padding-left: 15px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  
  .checkbox-select__dropdown ul li:hover {
    background: #007bff;
    color: white;
  }
  
  .checkbox-select__dropdown ul li label {
    width: 100%;
  }
  
  .checkbox-select_dropdown .custom-checkbox {
    padding-left: 40px;
  }
  
  #set-market {
    margin-top: 8px;
  }
  
  .clear_all_filter {
    width: 115px;
    position: absolute;
    right: 0;
    margin-right: 8px;
  }
  
  .save-filter-btn {
    color: #fff !important;
    background-color: #024847 !important;
    border-color: #024847 !important;
  }
  
  .filter-card .filter-card-body {
    max-height: 40vh;
    overflow-y: scroll;
    position: relative;
  }
  
  .export-card .export-card-body {
    height: 40vh;
    overflow-y: scroll;
    position: relative;
  }
  
  /* width */
  .filter-card .filter-card-body::-webkit-scrollbar,
  .export-card .export-card-body::-webkit-scrollbar,
  .slidepopup::-webkit-scrollbar,
  .checkbox-select__dropdown::-webkit-scrollbar {
    width: 5px;
  }
  
  /* Track */
  .filter-card .filter-card-body::-webkit-scrollbar-track,
  .export-card .export-card-body::-webkit-scrollbar-track,
  .slidepopup::-webkit-scrollbar-track,
  .checkbox-select__dropdown::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  
  /* Handle */
  .filter-card .filter-card-body::-webkit-scrollbar-thumb,
  .export-card .export-card-body::-webkit-scrollbar-thumb,
  .slidepopup::-webkit-scrollbar-thumb,
  .checkbox-select__dropdown::-webkit-scrollbar-thumb {
    background: #888;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  
  /* Handle on hover */
  .filter-card .filter-card-body::-webkit-scrollbar-thumb:hover,
  .export-card .export-card-body::-webkit-scrollbar-thumb:hover,
  .slidepopup::-webkit-scrollbar-thumb:hover,
  .checkbox-select__dropdown::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  .checkbox-select {
    position: relative;
  }
  input[type='checkbox'] {
    cursor: pointer !important;
    }

    label{
    cursor: pointer !important;

    }
    .list-group-item{
    cursor: pointer !important;

    }
  </style>
  