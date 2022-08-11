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
                  <h5 class="card-title" v-if="title == 'Errors'">Error Type</h5>
                  <h5 class="card-title" v-else-if="title=='Error'">Errors</h5>
                  <h5 class="card-title" v-else>{{title}}</h5>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="filterName in result"
                      :key="filterName.id"  @click="resetFilter(filterName,title)">{{filterName.file_name}}
                    <b-icon icon="x" aria-hidden="true"></b-icon>
                  </b-button>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab @click="tab('Import')" >
              <template  v-slot:title>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="">Import</span>
                  <span v-if="allFilters.Import.length > 0" class="filter-count">{{ allFilters.Import.length }}</span>
                </div>
              </template>
              <b-card-text>
                <div>
                  <b-button
                      class="btn btn-light filter align-items-center m-2"
                      v-for="(result,index) in allFilters.Import"
                      :key="result.id"  @click="resetFilter(result,index)">{{result.file_name}}
                    <b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                  <b-row class="m-2 mb-3">
                    <b-form-input v-model="searchImports" placeholder="Search"></b-form-input>
                  </b-row>
                  <b-card no-body :header=this.activeTab>
                    <b-list-group flush>
                      <b-list-group-item
                          class="flex-column align-items-start list-group-item-light"
                          v-for="(result,index) in filteredOrAllData"
                          :key="result.id" @click="addFilter(result,index)">{{result.file_name}}</b-list-group-item>
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
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="primary" @click="applyFilters(allFilters)" class="filter d-flex align-items-center">
                      <b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
                </b-col>
            </b-row>
        </div>
    </template>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  name: 'FilterErrors',
  props: {
    showModal: {
      type: Boolean
    },
    propsData: {
      type: Array,
      default: null,
    },
    queryFilter: {
      type: String,
      default: null
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
        Import:[]
      },
      allFilters: {
        Import:[]
      },
      incomingList: {
        Import:[]
      },
      searchImports: '',
      activeTab: 'allFilters',
      filtered:[],
      perPage: 20,
      appliedFilters: false,
      filtersAlreadyApplied: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'importV2Module/imports',
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
      if (this.searchImports){
        return this.filtered
      }else{
        return  this.allData[this.activeTab]
      }
    }
  },
  watch: {
   async showModal() {
      if (this.showModal) {
            this.$store.dispatch('uxModule/setLoading')
          let response = await this.$store.dispatch("importV2Module/getAllProcesses", {page: this.currentPage, perPage: this.perPage});
          this.MapFilters(response);
          if(this.queryFilter) {
            let index = response?.batch?.data?.findIndex(x=>x.id == this.queryFilter);
            if(index != -1) {
            let item = response?.batch?.data[index];
            if (this.searchImports){
              this.allFilters.Import.push(item);
              this.filtered = this.filtered.filter(e => e !== item);
              this.allData.Import = this.allData.Import.filter(e => e !== item)
            }else{
              this.allFilters.Import.push(item);
              this.allData.Import.splice(index, 1)
            }
          }
        }
        this.$store.dispatch('uxModule/hideLoader')
      }
    },
    searchImports: {
      handler: function () {
        var categoryTab = this.activeTab
        this.filtered = this.allData[categoryTab].filter(name => name.file_name.toLowerCase().includes(this.searchImports.toLowerCase()));
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
        this.allData = {
        Import:[]
          };
      if(response?.batch?.data?.length > 0) {
        response?.batch?.data.forEach(el=>{
          if (el && (this.allData.Import.findIndex(x=>x.id == el.id) == -1)  && (this.allFilters.Import.findIndex(x=>x.id == el.id) == -1)) {
          this.allData.Import.push(el);
        }
        });
      }
    },
    async addFilter (item, index) {
      if (this.searchImports){
        this.allFilters[this.activeTab].push(item);
        this.filtered = this.filtered.filter(e => e !== item);
        this.allData[this.activeTab] = this.allData[this.activeTab].filter(e => e !== item)
      }else{
        this.allFilters[this.activeTab].push(item);
        this.allData[this.activeTab].splice(index, 1)
      }
    },
   async resetFilter (item,index) {
      if (this.activeTab === 'allFilters'){
        this.allData[index].push(item);
        this.allFilters[index] = this.allFilters[index].filter(e => e !== item);
      }else{
        if (this.searchImports){
          this.allData[this.activeTab].push(item);
          this.filtered.push(item);
          this.filtered = this.filtered.filter(name => name.toLowerCase().includes(this.searchImports.toLowerCase()));
          this.allFilters[this.activeTab].splice(index, 1);
        }else{
          this.allData[this.activeTab].push(item);
          this.allFilters[this.activeTab].splice(index, 1);
        }
      }
      for(let category in this.allData){
        this.allData[category].sort((a, b) => a.file_name.localeCompare(b.file_name))
      }
    },
    async clearAllFilters(allFilters = this.allFilters) {
      if (typeof allFilters === 'object'){
        allFilters.Import.forEach(e => {this.allData.Import.push(e)});
        this.allFilters= {
          Import:[]
        }
      }
      for(let category in this.allData){
        this.allData[category].sort((a, b) => a.file_name.localeCompare(b.file_name))
      }
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
          Import:[]
        }
        this.allFilters = {
          Import:[]
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
      this.$emit('finish-process')
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
