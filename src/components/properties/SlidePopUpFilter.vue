<template>
  <div class="slidepopup" v-bind:class="{ show: isShowSlidePopUp }">
  <div class="innerslidepopup">
    <span v-if="!isShowSlidePopUp && !isExporting" class="filter-and-export"
      >Filter and Export</span>
      <span v-if="!isShowSlidePopUp && isExporting" class="filter-and-export"> <b-spinner small></b-spinner> Exporting</span>
    <span
      v-if="!isShowSlidePopUp"
      @click="isShowSlidePopUp = !isShowSlidePopUp"
      class="filter-right-icon"
      ><b-icon icon="chevron-double-right"></b-icon
    ></span>
    <span
      v-if="isShowSlidePopUp"
      @click="isShowSlidePopUp = !isShowSlidePopUp"
      class="filter-left-icon"
      ><b-icon icon="chevron-double-left"></b-icon></span>
    <div class="filter-body" v-if="isShowSlidePopUp">
      <div class="card filter-card">
        <div class="card-header p-1 d-flex justify-content-around col-12">
          <b-col cols="2 p-0 m-0">
            <h3>Filter</h3>
          </b-col>
          <b-col cols="7 p-0 m-0">
            <b-form-select
              class="select-template w-100 float-right"
              v-model="selectedFilter"
              @change="changeFilter($event)"
              :options="savedFilters"
            >
            </b-form-select>
          </b-col>
          <b-col cols="3" class="p-0 m-0">
           <b-button
            v-bind:class="{ 'save-filter-btn' : allFilters.Market.length > 0}"
            class="float-right"
            :disabled="allFilters.Market.length == 0"
            @click="showSaveFilterModal = !showSaveFilterModal"
            >Save Filter</b-button>
          </b-col>
        </div>
        <div class="card-body filter-card-body">
          <!-- Show Clear All Filters Button  -->
                <b-button  v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters()" class="filter clear_all_filter">
                <b-icon icon="x" aria-hidden="true"></b-icon> Clear All </b-button>
        <!-- End of Show All Filters Button  -->

        <!-- Show Selected Filters  -->
            <div v-for="(result,title) in allFilters"
                  :key="result.userId">
                <b-card-text>
                <div class="card-body pb-0 pt-2 p-0 m-0" v-if="result.length > 0">
                  <h5 class="card-title">{{title}}</h5>
                  <b-button
                    class="btn btn-light filter align-items-center m-2"
                    v-for="filterName in result"
                    :key="filterName.userId" 
                    @click="resetFilter(title,filterName)">{{filterName}}
                    <b-icon icon="x" aria-hidden="true"></b-icon>
                  </b-button>
                </div>
              </b-card-text>
            </div>
         <!-- End of show Selected Filters  -->
          <div class="filter-type filter_type_bg_color">
            <div v-b-toggle.set-market>
              <p class="number">1</p>
              <p class="filter-name">Set Market</p>
              <span class="float-right"
                ><b-icon icon="chevron-down" aria-hidden="true"></b-icon
              ></span>
            </div>
            <b-collapse
              id="set-market"
              accordion="my-accordion"
              role="tabpanel">                
                <div class="checkbox-select">
                <div class="checkbox-select__trigger custom-select" @click="showMarketDropdown()">
                    <span class="checkbox-select__title">Select Included Market</span>
                </div>
                <div id="dropdown" class="checkbox-select__dropdown" v-show="isShowMarketDropDown">
                  <loading-bars v-if="isListLoading"></loading-bars>
                    <ul v-if="!isListLoading" id="customScroll" class="checkbox-select__filters-wrapp" data-simplebar-auto-hide="false">
                    <li>
                        <b-form-checkbox
                            id="all_channels"
                            name="all_channels"
                            value="accepted"
                            v-model="selectedAll.Market"
                            @change="selectAllMarket('Market',selectedAll.Market)"
                            unchecked-value="not_accepted">
                            All Markets
                            </b-form-checkbox>
                    </li>
                    <li v-for="(market, index) in allData.Market" v-bind:key="index">
                        <b-form-checkbox
                            :id="market.replace(/\s/gm, '')"
                            :name="market.replace(/\s/gm, '')"
                            @change="addFilter('Market',market)"
                            :value="(allFilters.Market.find(x => x === market) != -1)"
                            >
                            {{market}}
                            </b-form-checkbox>
                    </li>
                    </ul>
                </div>
                </div> 
            </b-collapse>
          </div>
          <div class="filter-type" v-bind:class="{filter_type_bg_color : MarketFilterCount }">
            <div v-b-toggle.set-list>
              <p class="number">2</p>
              <p class="filter-name">Set List</p>
              <span class="float-right"
                ><b-icon icon="chevron-down" aria-hidden="true"></b-icon
              ></span>
            </div>
            <b-collapse id="set-list" v-if="allFilters.Market.length > 0"  accordion="my-accordion" role="tabpanel">
              <p class="m-0 mt-2 ml-4">Included Data:</p>
             <!-- Select Group  -->
                <div class="checkbox-select">
                <div class="checkbox-select__trigger custom-select" @click="showGroupDropDown()">
                    <span class="checkbox-select__title">Select Included Group</span>
                </div>
                <div id="dropdown" class="checkbox-select__dropdown" v-show="isGroupDropDown">
                <loading-bars v-if="isListLoading"></loading-bars>
                    <ul v-if="!isListLoading" id="customScroll" class="checkbox-select__filters-wrapp" data-simplebar-auto-hide="false">
                    <li>
                        <b-form-checkbox
                            id="all_group"
                            name="all_group"
                            value="accepted"
                            v-model="selectedAll.Group"
                            @change="selectAllMarket('Group',selectedAll.Group)"
                            unchecked-value="not_accepted">
                            All Group
                            </b-form-checkbox>
                    </li>
                    <li v-for="(group, index) in allData.Group" v-bind:key="index">
                        <b-form-checkbox
                            :id="group.replace(/\s/gm, '')"
                            :name="group.replace(/\s/gm, '')"
                            @change="addFilter('Group',group)"
                            :value="(allFilters.Group.find(x => x === group) != -1)"
                            >
                            {{group}}
                            </b-form-checkbox>
                    </li>
                    </ul>
                </div>
                </div> 
             <!-- End of select Group  -->

            <!-- Select Type  -->
                <div class="checkbox-select mt-2">
                <div class="checkbox-select__trigger custom-select" @click="showTypeDropDown()">
                    <span class="checkbox-select__title">Select Included Type</span>
                </div>
                <div id="dropdown" class="checkbox-select__dropdown" v-show="isTypeDropDown">
                <loading-bars v-if="isListLoading"></loading-bars>
                    <ul v-if="!isListLoading" id="customScroll" class="checkbox-select__filters-wrapp" data-simplebar-auto-hide="false">
                    <li>
                        <b-form-checkbox
                            id="all_type"
                            name="all_type"
                            value="accepted"
                            v-model="selectedAll.Type"
                            @change="selectAllMarket('Type',selectedAll.Type)"
                            unchecked-value="not_accepted">
                            All Type
                            </b-form-checkbox>
                    </li>
                    <li v-for="(type, index) in allData.Type" v-bind:key="index">
                        <b-form-checkbox
                            :id="type.replace(/\s/gm, '')"
                            :name="type.replace(/\s/gm, '')"
                            @change="addFilter('Type',type)"
                            :value="(allFilters.Type.find(x => x === type) != -1)"
                            >
                            {{type}}
                            </b-form-checkbox>
                    </li>
                    </ul>
                </div>
                </div> 
              <!-- End of Select Type  -->
              
              <!-- Select Source  -->
                <div class="checkbox-select mt-2">
                <div class="checkbox-select__trigger custom-select" @click="showSourceDropDown()">
                    <span class="checkbox-select__title">Select Included Souce</span>
                </div>
                <div id="dropdown" class="checkbox-select__dropdown" v-show="isSourceDropDown">
                <loading-bars v-if="isListLoading"></loading-bars>
                    <ul v-if="!isListLoading" id="customScroll" class="checkbox-select__filters-wrapp" data-simplebar-auto-hide="false">
                    <li>
                        <b-form-checkbox
                            id="all_source"
                            name="all_source"
                            value="accepted"
                            v-model="selectedAll.Source"
                            @change="selectAllMarket('Source',selectedAll.Source)"
                            unchecked-value="not_accepted">
                            All Source
                            </b-form-checkbox>
                    </li>
                    <li v-for="(source, index) in allData.Source" v-bind:key="index">
                        <b-form-checkbox
                            :id="source.replace(/\s/gm, '')"
                            :name="source.replace(/\s/gm, '')"
                            @change="addFilter('Source',source)"
                            :value="(allFilters.Source.find(x => x === source) != -1)">
                            {{source}}
                            </b-form-checkbox>
                    </li>
                    </ul>
                </div>
                </div>
              <!-- End of Select Source  -->
            </b-collapse>
          </div>
        </div>
      </div>
      <!-- Export  -->
      <div class="card mt-2 export-card">
        <div class="card-header p-2">
        <h3>Export</h3>
        </div>
        <div class="card-body export-card-body">
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
            </b-form-select>
            </div>
          </div>
          <div @click="BackStep(2)" class="export-number">
            <span>2</span>
            <b v-if="stepNumber > 2 && export_type == 1">Marketing Export Details</b>
            <b v-if="stepNumber > 2 && export_type == 2">SkipTrace Export Details</b>
            <b v-if="stepNumber > 2 && export_type == 3">Miscellaneous Reason Export Details</b>
          </div>
          <div class="step2" >
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
              :options="MarketingLength">
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
              max-rows="6">
            </b-form-textarea>
            <b-form-select
              class="select-template export-amount-select w-100 mt-2 mb-3"
              v-model="export_amount"
              :options="SelectExportAmount">
            </b-form-select>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <b-button class="float-right" v-bind:class="{'save-filter-btn':(export_amount != null)}" @click="exportfile()" :disabled="isExportDisabled"> <span v-if="isExporting"> <b-spinner small></b-spinner> Exporting</span><span v-if="!isExporting">Export</span></b-button>
        </div>
      </div>
    </div>
    <save-filter-modal
      :showModal="showSaveFilterModal"
      @cancel="showSaveFilterModal = false"
      @save="triggerSaveFilter"
      @update="triggerUpdateFilter"
      :filters="filters"
    ></save-filter-modal>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import moment from 'moment'
import SaveFilterModal from "./SaveFilterModal";
import loadingBars from "../loader/loadingBars";
export default {
  name: "SlidePopUpFilter",
  props: {
    custom_view: {
      type: [Array, Object]
    },
    fields_type: {
      type: String
    },
    template_id: {
      type: Number
    },
    selectedItems: {
      type: Array
    },
    search: {
      type: String
    },
    sortBy: {
      type: String
    },
    sortDesc: {
      type: Boolean
    },
    totals: {
      type: Object
    }
  },
  components: {
    SaveFilterModal,
    loadingBars
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
        export_amount:null,
      allData:{
        Market:[],
        Group:[],
        Type:[],
        Source:[],
      },
       allFilters: {
        Market:[],
        Group:[],
        Type:[],
        Source:[]
      },
      selectedAll: {
        Market:false,
        Group:false,
        Type:false,
        Source:false 
      },
      savedMarketingChannels: [
        {value:null, text:'Select Marketing Channel'}
      ],
      isShowMarketDropDown: false,
      isGroupDropDown: false,
      isTypeDropDown: false,
      isSourceDropDown: false,
      stepNumber: 1,
      savedFilters: [
        { value:null, text:"Select Filter" }
      ],
      savedMarkets: [
          { value: 1, text: "ABC" },
          ],
      ExportTypes: [
        { value: null, text: "Select Export Type" },
        { value: 1, text: "To Market" },
        { value: 2, text: "To SkipTrace" },
        { value: 3, text: "Miscellaneous Reason" },
      ],
      skipTraceSources: [
        {value: null, text:"Select Skiptrace Source"}
      ],
      MarketingLength: [
        { value: null, text: "Choose Marketing Length" },
        { value: 1, text: "1 week" },
        { value: 2, text: "2 weeks" },
        { value: 3, text: "3 weeks" },
        { value: 4, text: "4 weeks" },
        { value: 5, text: "5 weeks" },
        { value: 6, text: "6 weeks" },
      ],
      filter:{
      
            Market: [],
            List: [],
            Type: [],
            Source: []
      },
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
      MarketingChannels: 'marketingChannelModule/marketingChannels',
      lists: 'listModule/lists',
      filters: 'filterModule/filters',
      sourceList: 'listModule/skipSourceList',
      skipSourceListFromDB: 'listModule/skipSourceListFromDB',
    }),
    totalFilters() {
      let total = 0
      for (let item in this.allFilters) {
        total += this.allFilters[item].length
      }
      this.$emit('filtersCount', total)
      return total;
    },
    MarketFilterCount() {
        return this.allFilters.Market.length > 0;
    },
    isExportDisabled() {
      if(this.export_amount == null || this.isExporting){
        return true;
      } else {
        return false;
      }
    }
  },
 async created() {
      await this.$store.dispatch("filterModule/getAllFilters","properties")
      this.filters.forEach(e => {
        const filter = {
              value: '',
              text: '',
        }
        filter.value = e.id;
        filter.text = e.name;
        this.savedFilters.push(filter);
      });
      await this.$store.dispatch("marketingChannelModule/getAllMarketChannels", {page: 1, perPage: 20});
        this.MarketingChannels.forEach(e => {
        const marketingChannel = {
              value: '',
              text: '',
        }
        marketingChannel.value = e.id;
        marketingChannel.text = e.marketing_channel_name;
        this.savedMarketingChannels.push(marketingChannel); 
      });
      await this.$store.dispatch("listModule/getAllLists", {page: 1, perPage: this.perPage});
        this.lists.forEach(el =>{
            if (el.list_market && !this.allData.Market.includes(el.list_market) && !this.allFilters.Market.includes(el.list_market)){
              this.allData.Market.push(el.list_market)
            }
            if (el.list_group && !this.allData.Group.includes(el.list_group) && !this.allFilters.Group.includes(el.list_group)){
              this.allData.Group.push(el.list_group)
            }
            if (el.list_type && !this.allData.Type.includes(el.list_type) && !this.allFilters.Type.includes(el.list_type)){
              this.allData.Type.push(el.list_type)
            }
            if (el.list_source && !this.allData.Source.includes(el.list_source) && !this.allFilters.Source.includes(el.list_source)){
              this.allData.Source.push(el.list_source)
            }
          });
      this.isListLoading = false;
  },   
  watch:{
    totals:function(){
      this.totalSubjects = this.totals.subjectsCount;
      this.SelectExportAmount = [];
      let exportV_3 = Math.round(this.totalSubjects/5);  //Round the number {(Total in view / 5)}
          exportV_3 = exportV_3 > 0 ? exportV_3 : 1;

      let exportV_4 = Math.round((this.totalSubjects/5)+((this.totalSubjects/5)*2)); //Round the number  {(Total in view / 5) + ((Total in view / 5) * 2)}
          exportV_4 = exportV_4 > 0 ? exportV_4 : 1;

      let exportV_5 = Math.round((this.totalSubjects/5)+((this.totalSubjects/5)*3)); //Round the number {(Total in view / 5) + ((Total in view / 5) * 3)}
          exportV_5 = exportV_5 > 0 ? exportV_5 : 1;

      this.SelectExportAmount.push(
        { value: null, text: "Select Export Amount" },
        { value: 1, text: "Export Selected" },
        { value: 2, text: 'Export '+exportV_3},
        { value: 3, text: 'Export '+exportV_4},
        { value: 4, text: 'Export '+exportV_5},
        { value: 5, text: "Export all "+this.totalSubjects },
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
    
    isShowSlidePopUp: function() {
      if(this.isShowSlidePopUp){
        setTimeout(() => {
          document.querySelector('.slidepopup.show').style.height =  (document.querySelector('.side-menu').clientHeight - 100 - document.querySelector('.properties-header').clientHeight) + 'px';  
        }, 1000);

      }
    },
  },
  methods: {
    BackStep(number) {
      if(number == 1) {
        this.stepNumber = number;
      } else if(number == 2 && this.export_type != null) {
        this.stepNumber = number;
      } else if(number == 3) {
        this.checkNextStep();
      }
    },
   async exportfile() {
      if(this.marketing_period) {
            this.marketing_end_date = moment(this.marketing_start_date).add(this.marketing_period * 7 ,'days').format('YYYY-MM-DD');
      }
      let custom_view = JSON.parse(JSON.stringify(this.custom_view));
      const exportSubject = {
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
        fileType: 'csv',
        filters: this.allFilters,
        search: this.search,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        fields_type: this.fields_type
      }
      this.isExporting = true;
      await this.$store.dispatch('propertyModule/exportProperties', exportSubject);
      this.$bvToast.toast(`Document Export Started. Please wait!`, {
          title: 'Export',
          autoHideDelay: 5000,
          appendToast: true
        });
      this.isExporting = false;
    },
    checkNextStep() {
      if(this.export_type != null) {

      if(this.export_type == 1 && this.marketing_channel != null && this.marketing_start_date != null && (this.marketing_end_date != null || this.marketing_period != null)) {
        this.stepNumber = 3;
      }
      if(this.export_type == 2 && this.skip_source != null && this.skip_date != null) {
        this.stepNumber = 3;
      }
      if(this.export_type == 3) {
        this.stepNumber = 3;
      }

     }
    },
    showMarketDropdown() {
          this.isShowMarketDropDown = !this.isShowMarketDropDown;
    },
    changeExportType() {
      if(this.export_type == 3) {
      this.stepNumber = 3;
      } else {
      this.stepNumber = 2;
      }
    },
    changeFilter() {
       var filter = this.filters.find(x=>x.id == this.selectedFilter);
        this.allFilters = JSON.parse(filter.configuration);
        this.$emit('filterProperties', JSON.parse(JSON.stringify(this.allFilters)));
    },
    triggerSaveFilter(filterName) {
      this.showSaveFilterModal = false;
        const data = {
            name: filterName || 'Filter',
            type: 'properties',
            configuration: JSON.stringify(this.allFilters)
        }
      this.$store.dispatch('filterModule/createFilter', data);
    },
    triggerUpdateFilter(id) {
      this.showSaveFilterModal = false;
        const data = {
            id: id,
            configuration: JSON.stringify(this.allFilters)
        }
      this.$store.dispatch('filterModule/editFilter', data);
    },
     showGroupDropDown() {
      this.isGroupDropDown = !this.isGroupDropDown;
      this.isTypeDropDown = false;
      this.isSourceDropDown = false;
      },
    showTypeDropDown() {
      this.isTypeDropDown = !this.isTypeDropDown;
      this.isGroupDropDown = false;
      this.isSourceDropDown = false;
      },
     showSourceDropDown() {
      this.isSourceDropDown = !this.isSourceDropDown;
      this.isGroupDropDown = false;
      this.isTypeDropDown = false;
      },
    resetFilter(filtertype,param) {
        this.allFilters[filtertype].splice(this.allFilters[filtertype].findIndex(x=>x == param),1);
        if(document.querySelector('#'+(param.replace(/\s/gm, '')))) {
           document.querySelector('#'+(param.replace(/\s/gm, ''))).checked = false;
        }
        if(this.allFilters[filtertype].length == this.allData[filtertype].length) {
            this.selectedAll[filtertype] = 'accepted';
        } else {
            this.selectedAll[filtertype] = 'not_accepted';
        }
        this.$emit('filterProperties', JSON.parse(JSON.stringify(this.allFilters)));

    },
    addFilter(FilterType,param) {
        if(this.allFilters[FilterType].findIndex(x=>x == param) == -1) {
           this.allFilters[FilterType].push(param);
        } else {
           this.allFilters[FilterType].splice(this.allFilters[FilterType].findIndex(x=>x == param),1);
        }

        if(this.allFilters[FilterType].length == this.allData[FilterType].length){
           this.selectedAll[FilterType] = 'accepted';
        } else {
           this.selectedAll[FilterType] = 'not_accepted';
        }
        this.$emit('filterProperties', JSON.parse(JSON.stringify(this.allFilters)));
    },
    selectAllMarket(FilterType,isAccepted) {
        if(isAccepted == 'accepted') {
            this.allFilters[FilterType] = [...this.allData[FilterType]];
           this.allData[FilterType].forEach(function(elem){
               if(document.querySelector('#'+(elem.replace(/\s/gm, '')))){
                  document.querySelector('#'+(elem.replace(/\s/gm, ''))).checked = true;
               }
           });
        } else {
            this.allFilters[FilterType] = [];
            this.allData[FilterType].forEach(function(elem){
            if(document.querySelector('#'+(elem.replace(/\s/gm, '')))){
               document.querySelector('#'+(elem.replace(/\s/gm, ''))).checked = false;
            }
           });
        }
        this.$emit('filterProperties', JSON.parse(JSON.stringify(this.allFilters)));
    },
    clearAllFilters() {
    // Unselect all the filters checkboxes.
    const Instance = this;
        Object.keys(this.allFilters).forEach(function(key){
            Instance.allFilters[key].forEach(function(param){
                if(document.querySelector('#'+(param.replace(/\s/gm, '')))){
                   document.querySelector('#'+(param.replace(/\s/gm, ''))).checked = false;
                }
            });
        // Set false to selectedAll
        Instance.selectedAll[key] = false;
        });

    // Set the filters to initial state
        this.allFilters = {
          Market:[],
          Group:[],
          Type:[],
          Source:[],
          Errors:[],
          RunDate:[],
        }
    this.$emit('filterProperties', JSON.parse(JSON.stringify(this.allFilters)));
    },

  },
  async mounted(){
    const Instance = this;
     await this.$store.dispatch('listModule/getSkipSourceListFromDB');
    this.skipSourceListFromDB.forEach(function(item) {
      Instance.skipTraceSources.push(item.list_skip_source)
    });
document.querySelector('body').addEventListener('click',function(e) {
      if(!e.target.closest('.checkbox-select__dropdown') && !e.target.closest('.checkbox-select')) {
        if(document.querySelectorAll('.checkbox-select__dropdown')) {
        document.querySelectorAll('.checkbox-select__dropdown').forEach(function(elem){
          elem.style.display = 'none';
        });
        }
      }
    })
  }
};
</script>
<style>
.export-amount-select{
  font-size:14px !important;
}
.slidepopup {
  position: fixed;
  overflow-y:scroll;
  direction: rtl;
  float: left;
  height: 100%;
  border-radius:10px;
  background: #024847 !important;
  min-width: 70px;
  border: 2px solid black;
  z-index: 7;
  margin-left: -67px;
  transition: width 2s;
}
.innerslidepopup{
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
  cursor:pointer;
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
    border-left:none !important;
    margin-top:-18px !important;
}
.checkbox-select__trigger{
    cursor:pointer;
}
.checkbox-select__dropdown{
    position:absolute;
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
    padding-bottom:4px;
}
.checkbox-select__dropdown ul li:hover {
    background:#007bff;
    color:white;
}
.checkbox-select__dropdown ul li label{
    width:100%;
}
.checkbox-select_dropdown .custom-checkbox{
    padding-left:40px;
}
#set-market{
    margin-top:8px;
}
.clear_all_filter{
    width: 115px;
    position: absolute;
    right: 0;
    margin-right: 8px;
}
.save-filter-btn{
  color: #fff !important;
    background-color: #024847 !important;
    border-color: #024847 !important;
}
.filter-card .filter-card-body {
  max-height: 40vh;
  overflow-y:scroll;
  position:relative;
}
.export-card .export-card-body {
  height: 40vh;
  overflow-y:scroll;
  position:relative;
}
/* width */
.filter-card .filter-card-body::-webkit-scrollbar ,.export-card .export-card-body::-webkit-scrollbar,.slidepopup::-webkit-scrollbar,.checkbox-select__dropdown::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.filter-card .filter-card-body::-webkit-scrollbar-track, .export-card .export-card-body::-webkit-scrollbar-track,.slidepopup::-webkit-scrollbar-track,.checkbox-select__dropdown::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-top:4px;
  margin-bottom:4px;

}
 
/* Handle */
.filter-card .filter-card-body::-webkit-scrollbar-thumb, .export-card .export-card-body::-webkit-scrollbar-thumb,.slidepopup::-webkit-scrollbar-thumb,.checkbox-select__dropdown::-webkit-scrollbar-thumb {
  background: #888; 
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

/* Handle on hover */
.filter-card .filter-card-body::-webkit-scrollbar-thumb:hover,.export-card .export-card-body::-webkit-scrollbar-thumb:hover ,.slidepopup::-webkit-scrollbar-thumb:hover,.checkbox-select__dropdown::-webkit-scrollbar-thumb:hover{
  background: #555; 
}
.checkbox-select {
  position: relative;
}
</style>