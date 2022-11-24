<template>
  <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
    <template #modal-header>
      <div class="w-100">
        ADD FILTER
      </div>
      <div>
        <b-icon @click="closeFilterModal" class="close-icon" icon="x"></b-icon>
      </div>
    </template>
    <b-container fluid class="container-row">
      <div>
        <b-card  no-body>
          <b-tabs class="filter-category" pills card vertical>
            <b-tab class="h-100" @click="tab('allFilters')">
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Applied Filters</span>
                  <span v-if="totalFilters > 0" class="filter-count">{{ totalFilters }}</span>
                </div>
              </template>
              <b-button  v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters(allFilters)" class="filter d-flex float-right r-0 align-items-right mr-2">
                <b-icon icon="x" aria-hidden="true"></b-icon> Clear All </b-button>
              <div v-else class="d-flex flex-column justify-content-center text-center h-100" >
                <h3>No filters applied</h3>
                <span>Choose some filters on the left to narrow down the results in your view.</span>
              </div>
              <b-card-text
                  v-for="(result,title) in allFilters"
                  :key="result.userId">
                <div class="card-body pb-0 pt-2" v-if="result.length > 0">
                  <h5 class="card-title">{{getCustomField(title)}}</h5>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="filterName in result"
                      :key="filterName.userId"  @click="resetFilter(filterName,title)">{{filterName}}
                    <b-icon icon="x" aria-hidden="true"></b-icon>
                  </b-button>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Market')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Market</span>
                  <span v-if="allFilters.Market.length > 0" class="filter-count">{{ allFilters.Market.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Market"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body :header=this.activeTab>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Group')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Group</span>
                  <span v-if="allFilters.Group.length > 0" class="filter-count">{{ allFilters.Group.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Group"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body :header=this.activeTab>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Type')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Type</span>
                  <span v-if="allFilters.Type.length > 0" class="filter-count">{{ allFilters.Type.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Type"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body :header=this.activeTab>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Source')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">List Source</span>
                  <span v-if="allFilters.Source.length > 0" class="filter-count">{{ allFilters.Source.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Source"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body :header=this.activeTab>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab(field.field)" v-for="field in relatedCustomField('list_custom_field_')" :key="field.id">
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">{{checkCustomFieldLabel(field)}}</span>
                  <span v-if="allFilters[field.field].length > 0" class="filter-count">{{ allFilters[field.field].length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters[field.field]"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body :header=checkCustomFieldLabel(field)>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Error')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Errors </span>
                  <span v-if="allFilters.Error.length > 0" class="filter-count">{{ allFilters.Error.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Error"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-card no-body>
                  <template #header>
                    <span v-if="activeTab == 'Error'">Errors</span>
                  </template>
                  
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Errors')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Error Type</span>
                  <span v-if="allFilters.Errors.length > 0" class="filter-count">{{ allFilters.Errors.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Errors"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body >
                    <template #header>
                      <span v-if="activeTab =='Errors'">Error Type</span>
                    </template>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('RunDate')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Run Month / Year</span>
                  <span v-if="allFilters.RunDate.length > 0" class="filter-count">{{ allFilters.RunDate.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.RunDate"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body header="Run Month / Year">
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light "
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('SkipSource')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Skip Source</span>
                  <span v-if="allFilters.SkipSource.length > 0" class="filter-count">{{ allFilters.SkipSource.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.SkipSource"
                      :key="result.userId"  @click="resetFilter(result,index)">{{result}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchGoldenAddress" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body header="Skip Source">
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light "
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.userId" @click="addFilter(result,index)">{{result}}</b-list-group-item>
                    </b-list-group>
                  </b-card>
                </div>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </b-container>
        <template #modal-footer>
        <div class="w-100 d-flex justify-content-start">
            <b-row class="w-100">
                <b-col cols="6">
                    <b-button variant="primary" @click="showManageFiltersModas()" class="filter d-flex align-items-center mr-3">
                        Manage Saved Filters</b-button>
                </b-col>
                <b-col cols="6" class="d-flex justify-content-end">
                    <b-button :disabled="totalFilters == 0" variant="primary" @click="saveFilter()" class="filter d-flex align-items-center mr-3">
                        Save Filter</b-button>
                    <b-button variant="primary" @click="applyFilters(allFilters)" class="filter d-flex align-items-center">
                      <b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
                </b-col>
            </b-row>
        </div>
    </template>
        <save-filter-modal
      :showModal="showSaveFilterModal"
      @cancel="showSaveFilterModal = false"
      :allFilters="allFilters"
      type="goldens"
    ></save-filter-modal>
      <manage-filter-modal
      :showModal="showManageFilterModal"
      @cancel="showManageFilterModal = false"
      :allFilters="allFilters"
      type="goldens"
    ></manage-filter-modal>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import SaveFilterModal from "./../filters/saveFilterModal";
import ManageFilterModal from "./../filters/ManageFilterModal";
export default {
  name: 'FilterGoldenAddresses',
  components: {
      SaveFilterModal,
      ManageFilterModal
    },
  props: {
    showModal: {
      type: Boolean
    },
    propsData: {
      type: Array,
      default: null,
    },
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSaveFilterModal: false,
      showManageFilterModal: false,
      allData: {
        Market:[],
        Group:[],
        Type:[],
        Source:[],
        Errors:[],
        Error:[],
        RunDate:[],
        SkipSource:[],
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
        SkipSource:[],
        list_custom_field_1:[],
        list_custom_field_2:[],
        list_custom_field_3:[],
        list_custom_field_4:[],
        list_custom_field_5:[],
      },
      incomingList: {
        Market:[],
        Group:[],
        Type:[],
        Source:[],
        Errors:[],
        Error:[],
        RunDate:[],
        SkipSource:[],
        list_custom_field_1:[],
        list_custom_field_2:[],
        list_custom_field_3:[],
        list_custom_field_4:[],
        list_custom_field_5:[],
      },
      searchGoldenAddress: '',
      activeTab: 'allFilters',
      filtered:[],
      perPage: 20,
      appliedFilters: false,
      filtersAlreadyApplied: null,
    }
  },
  computed: {
    ...mapGetters({
      lists: 'listModule/lists',
      filterList: 'goldenAddressModule/filterList',
      customViewVisibleFields: 'importModule/customViewVisibleFields',
    }),
    totalFilters(){
      let total = 0
      for (let item in this.allFilters) {
        total += this.allFilters[item].length
      }
      this.$emit('filtersCount', total)
      return total;
    },
    filteredOrAllData(){
      if (this.searchGoldenAddress){
        return this.filtered
      }else{
        return  this.allData[this.activeTab]
      }
    }
  },
  watch: {
   async showModal() {
      if (this.showModal){
        try{
          this.$store.dispatch('uxModule/setLoading')
          this.goldenAddress = this.propsData;
          await this.$store.dispatch('importModule/loadVisibleFields')
          let response = await this.$store.dispatch("goldenAddressModule/goldenFilterList", {filter: this.allFilters, search: this.search});
          this.MapFilters(response);
         this.$store.dispatch('uxModule/hideLoader')
        } catch(error){
          console.log(error);
         this.$store.dispatch('uxModule/hideLoader')
        }
      }
    },
    searchGoldenAddress: {
      handler: function () {
        var categoryTab = this.activeTab
        this.filtered = this.allData[categoryTab].filter(name => name.toLowerCase().includes(this.searchGoldenAddress.toLowerCase()));
      }
    },
    propsData: {
      handler: function() {
          this.updateDataChanges()
      }
    },
  },
  methods: {
    showManageFiltersModas() {
      this.showManageFilterModal = true;
    },
    saveFilter() {
      this.showSaveFilterModal = true;
    },
    tab(currentTub){
      this.activeTab = currentTub;
    },
    MapFilters(response) {
      try{

        this.allData = {
         Market:[],
        Group:[],
        Type:[],
        Source:[],
        Errors:[],
        Error:[],
        RunDate:[],
        SkipSource:[],
        list_custom_field_1:[],
        list_custom_field_2:[],
        list_custom_field_3:[],
        list_custom_field_4:[],
        list_custom_field_5:[],
          };
      if(response?.golden_error_type?.length > 0) {
        response.golden_error_type.forEach(el=>{
          if (el && !this.allData.Errors.includes(el)  && !this.allFilters.Errors.includes(el)) {
          this.allData.Errors.push(el);
        }
        });
      }
      if(response?.golden_error?.length > 0) {
        response.golden_error.forEach(el=>{
          // console.log(el);
          if (el && !this.allData.Error.includes(el)  && !this.allFilters.Error.includes(el)) {
          this.allData.Error.push(el);
        }
        });
      }
      if(response?.golden_skip_source?.length > 0){
        response.golden_skip_source.forEach(el=>{
        if (el && !this.allData.SkipSource.includes(el) && !this.allFilters.SkipSource.includes(el)){
              this.allData.SkipSource.push(el)
        }
        });
      }

      if(response?.lists?.length > 0) {
      response.lists.forEach(el => {
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
            if (el.list_skip_source && !this.allData.SkipSource.includes(el.list_skip_source) && !this.allFilters.SkipSource.includes(el.list_skip_source)){
              this.allData.SkipSource.push(el.list_skip_source)
            }
            if (el.list_run_year &&  el.list_run_month){
              let runYear = el.list_run_year.split(",")
              let runMonth = el.list_run_month.split(",")
              for(let i = 0; i < runYear.length; i++){
               let  run_date = runMonth[i]+'/'+runYear[i];
                if (!this.allData.RunDate.includes(run_date) && !this.allFilters.RunDate.includes(run_date)){
                  this.allData.RunDate.push(run_date)
                }
              }
            }
            Object.keys(el).forEach((item)=>{
              if(item.includes('list_custom_field_')){
                if(!this.allData[item]){
                  this.allData[item]= [];
                }
                if(!this.allFilters[item]){
                  this.allFilters[item]= [];
                }
                if (el[item] && !this.allData[item].includes(el[item]) && !this.allFilters[item].includes(el[item])){
                  this.allData[item].push(el[item])
                }
              }
            })
          });
        for(let category in this.allData){
          this.allData[category].sort((a, b) => a.localeCompare(b))
        }
      }
      if(response?.lists?.length > 0) {
        let AllFilters = Object.keys(this.allData);
          AllFilters.forEach(item=> {
          if(this.allFilters[item].findIndex(x=>x == 'Blank') == -1) {
            this.allData[item].unshift("Blank");
          }
          });
      }
        this.allData.Error.shift();
      } catch(error){
          console.log(error);
      }
    },
    async addFilter (item, index) {
    this.$store.dispatch('uxModule/setLoading')
      if (this.searchGoldenAddress){
        this.allFilters[this.activeTab].push(item);
        this.filtered = this.filtered.filter(e => e !== item);
        this.allData[this.activeTab] = this.allData[this.activeTab].filter(e => e !== item)
      }else{
        this.allFilters[this.activeTab].push(item);
        this.allData[this.activeTab].splice(index, 1)
      }
      let response = await this.$store.dispatch("goldenAddressModule/goldenFilterList", {filter: this.allFilters, search: this.search});
      this.MapFilters(response);
      this.$store.dispatch('uxModule/hideLoader')
    },
   async resetFilter (item,index) {
      if (this.activeTab === 'allFilters'){
        this.allData[index].push(item);
        this.allFilters[index] = this.allFilters[index].filter(e => e !== item);
      }else{
        if (this.searchGoldenAddress){
          this.allData[this.activeTab].push(item);
          this.filtered.push(item);
          this.filtered = this.filtered.filter(name => name.toLowerCase().includes(this.searchGoldenAddress.toLowerCase()));
          this.allFilters[this.activeTab].splice(index, 1);
        }else{
          this.allData[this.activeTab].push(item);
          this.allFilters[this.activeTab].splice(index, 1);
        }
      }
      for(let category in this.allData){
        this.allData[category].sort((a, b) => a.localeCompare(b))
      }
      let response = await this.$store.dispatch("goldenAddressModule/goldenFilterList", {filter: this.allFilters, search: this.search});
      this.MapFilters(response);
    },
    async clearAllFilters(allFilters = this.allFilters) {
      if (typeof allFilters === 'object'){
        allFilters.Market.forEach(e => {this.allData.Market.push(e)});
        allFilters.Group.forEach(e => {this.allData.Group.push(e)});
        allFilters.Type.forEach(e => {this.allData.Type.push(e)});
        allFilters.Source.forEach(e => {this.allData.Source.push(e)});
        allFilters.SkipSource.forEach(e => {this.allData.SkipSource.push(e)});
        allFilters.Errors.forEach(e => {this.allData.Errors.push(e)});
        allFilters.Error.forEach(e => {this.allData.Error.push(e)});
        allFilters.RunDate.forEach(e => {this.allData.RunDate.push(e)});
        this.allFilters= {
          Market:[],
          Group:[],
          Type:[],
          Source:[],
          Errors:[],
          Error:[],
          RunDate:[],
          SkipSource:[],
          list_custom_field_1:[],
          list_custom_field_2:[],
          list_custom_field_3:[],
          list_custom_field_4:[],
          list_custom_field_5:[],
        }
      }
      for(let category in this.allData){
        this.allData[category].sort((a, b) => a.localeCompare(b))
      }
        let response = await this.$store.dispatch("goldenAddressModule/goldenFilterList", {filter: this.allFilters, search: this.search});
        this.MapFilters(response);
    },
    applyFilters(filters) {
      this.filtersAlreadyApplied = JSON.parse(JSON.stringify(filters));
      let filterValue = 0;
      for (let i in filters){
        filterValue += filters[i].length
      }
      if (filterValue){
        this.appliedFilters = true;
        this.activeTab = 'allFilters';
      }
      this.$emit('filter', filters, filterValue)
    },
    closeFilterModal(){
      if(!this.appliedFilters){
        this.allData = {
          Market:[],
          Group:[],
          Type:[],
          Source:[],
          Errors:[],
          Error:[],
          RunDate:[],
          SkipSource:[],
          list_custom_field_1:[],
          list_custom_field_2:[],
          list_custom_field_3:[],
          list_custom_field_4:[],
          list_custom_field_5:[],
        }
        this.allFilters = {
          Market:[],
          Group:[],
          Type:[],
          Source:[],
          Errors:[],
          Error:[],
          RunDate:[],
          SkipSource:[],
          list_custom_field_1:[],
          list_custom_field_2:[],
          list_custom_field_3:[],
          list_custom_field_4:[],
          list_custom_field_5:[],
        // }
      } 
    } 
     else {
        if(this.filtersAlreadyApplied) {
          this.allFilters = JSON.parse(JSON.stringify(this.filtersAlreadyApplied));
        }
      }
      this.$emit('cancel')
    },
    async updateDataChanges() {
      // await this.$store.dispatch("listModule/getAllLists", {page: 1 , perPage: this.perPage});
      // this.lists.forEach(e => {
      //   this.incomingList.Market.push(e.list_market)
      //   this.incomingList.Group.push(e.list_group)
      //   this.incomingList.Type.push(e.list_type)
      //   this.incomingList.Source.push(e.list_source)
      //   this.incomingList.SkipSource.push(e.list_skip_source)
      //   let runYear = e.run_year?.split(",")
      //   let runMonth = e.run_month?.split(",")
      //   for(let i = 0; i < runYear?.length; i++){
      //     this.incomingList.RunDate.push(runMonth[i]+'/'+runYear[i])
      //   }
      // });
      // this.goldenData = this.propsData
      // this.goldenData.forEach(el => {
      //     this.incomingList.Errors.push(el.golden_error_type)
      // })

      this.$emit('finish-process')
    },
    relatedCustomField(tempField){
      return this.customViewVisibleFields.filter(({field,visible})=>field.includes(tempField)&&visible==1);            
    },
    checkCustomFieldLabel(field) {
      if(field.label) {
        return field.label;
      } else {
      return field.field;
      }
    },
    getCustomField(field) {
      let index = this.customViewVisibleFields.findIndex(x=>x.field == field);
      if(index != -1) {
        if(this.customViewVisibleFields[index].label) {
          return this.customViewVisibleFields[index].label;
        } else {
        return field;
        }
      } else {
        if(field == 'Errors'){
          return "Error Type";
        }else if(field == 'Error'){
          return "Errors";
        }
        return field;
      }
    },
  },
}
</script>

<style scoped>
  .filter-count{
    border-radius: 50%;
    background-color: #808080a6;
    color: #ffffff;
    font-size: 13px;
    text-align: center;
    width: 20px;
    height: 20px;
  }
  .filter-category >>> .nav-pills{
    padding: 0;
  }
  .filter-category >>> .col-auto{
    width: 20%!important;
  }
  .filter-category >>> .active{
    border-radius: unset;
  }
  .filter-category >>> .list-group-item{
    cursor: pointer;
  }
</style>
