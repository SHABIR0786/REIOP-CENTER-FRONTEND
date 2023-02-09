<template>
  <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
    <template #modal-header>
      <div class="w-100">
        List Filters
      </div>
      <div>
        <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
      </div>
    </template>
    <b-container fluid>
      <div>
        <h5 class="font-weight-bold mb-0">List Filters</h5><hr class="m-0 border border-dark"><p class="small">Choose filters related to lists.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="market">Market</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="market"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="marketRule"
                ></b-form-select>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  class="w-100"
                  :options="ChooseOption"
                  :value="null"
                  :disabled="marketRule==null"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="group">Group</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="group"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="groupRule"
                ></b-form-select>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  class="w-100"
                  :options="ChooseOption"
                  :value="null"
                  :disabled="groupRule==null"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="type">Type</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="type"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="typeRule"
                ></b-form-select>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  class="w-100"
                  :options="ChooseOption"
                  :value="null"
                  :disabled="typeRule==null"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="source">Source</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="source"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="sourcepRule"
                ></b-form-select>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  class="w-100"
                  :options="ChooseOption"
                  :value="null"
                  :disabled="sourcepRule==null"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
                      

        </b-row>
        <br>
        <h5 class="font-weight-bold mb-0">Stack Filters</h5><hr class="m-0 border border-dark"><p class="small">Input number statements in the format of a single number (Ex: 1), range (Ex: 1-4), or extended range (Ex: 3+ or 3-).</p>
        <b-row class="p-0">
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="list_stack">List Stack</label>
              </b-col>
              <b-col cols="7">
                <b-form-input id="list_stack" value="1+" required title="List Stack" v-b-tooltip.hover></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_sellers">Total Sellers</label>
              </b-col>
              <b-col cols="7">
                <b-form-input id="total_sellers" value="1+" required title="Total Sellers" v-b-tooltip.hover></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_subjects">Total Subjects</label>
              </b-col>
              <b-col cols="7">
                <b-form-input id="total_subjects" value="1+" required title="Total Subjects" v-b-tooltip.hover></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_phones">Total Phones</label>
              </b-col>
              <b-col cols="7">
                <b-form-input id="total_phones" value="1+" required title="Total Phones" v-b-tooltip.hover></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_emails">Total Emails</label>
              </b-col>
              <b-col cols="7">
                <b-form-input id="total_emails" value="1+" required title="Total Emails" v-b-tooltip.hover></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_goldens">Total Goldens</label>
              </b-col>
              <b-col cols="7">
                <b-form-input id="total_goldens" value="1+" required title="Total Goldens" v-b-tooltip.hover></b-form-input>
              </b-col>
            </b-row>
          </b-col>

                      

        </b-row>
        <br>
        <h5 class="font-weight-bold mb-0">Statement Filters</h5><hr class="m-0 border border-dark"><p class="small">Choose filters related to statement about the data.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace">Has Skip Trace Data</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="hasSkipTraceData"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="attempted_skips">Has Attempted Skips</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="attempted_skips"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="hasAttemtedSkips"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>

        </b-row>
        <br>
        <h5 class="font-weight-bold mb-0">Additional Filters</h5><hr class="m-0 border border-dark"><p class="small">Add additional filters.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
                <b-form-select
                  class="w-auto"
                  :options="chooseAdditionalFilters"
                  v-model="additionalFilters"
                ></b-form-select>
          </b-col>

        </b-row>
      </div>
    </b-container>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-start">
        <b-row class="w-100">
          <b-col cols="6">
          <b-button variant="primary" @click="''" class="filter d-flex align-items-center mr-3">
            Manage Saved Filters</b-button>
          </b-col>
          <b-col cols="6" class="d-flex justify-content-end">
          <b-button  variant="primary" @click="''" class="filter d-flex align-items-center mr-3">
            Save Filter</b-button>
            <b-button variant="primary" @click="''" class="filter d-flex align-items-center">
              <b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
          </b-col>
        </b-row>
      </div>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'ListFilter',
    components: {
    },
  props: {
    showModal: {
      type: Boolean
    },
    // propsData: {
    //   type: Array,
    //   default: null,
    // },
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchSubject: '',
      perPage: 20,
      appliedFilters: false,
      filtersAlreadyApplied: null,
      marketRule:null,
      groupRule:null,
      typeRule:null,
      sourcepRule:null,
      hasSkipTraceData:null,
      hasAttemtedSkips:null,
      additionalFilters:null,
      IncludesExcludes: [
          { value: null, text: 'Choose Rule' },
          { value: 'Includes', text: 'Includes' },
          { value: 'Excludes', text: 'Excludes' },
        ],
        ChooseOption: [
          { value: null, text: 'Choose Option' },
          { value: 'XYZ', text: 'XYZ' },
        ],
        YesNo_Option: [
          { value: null, text: 'Choose Option' },
          { value: 'Yes', text: 'Yes' },
          { value: 'No', text: 'No' },

        ],
        chooseAdditionalFilters: [
          { value: null, text: 'Choose Additional Filters' },
          { value: 'XYZ', text: 'XYZ' },

        ]
    }
  },
  computed: {

  },
  async mounted() {
    // try{
    //   this.$store.dispatch('uxModule/setLoading')

    //   this.$store.dispatch('uxModule/hideLoader')
    // } catch(error){
    //   console.log(error);
    //   this.$store.dispatch('uxModule/hideLoader')
    // }
  },
  watch: {
    // async showModal() {
    //   if (this.showModal) {
    //   }
    // },
    // propsData: {
    //   handler: function() {
    //   }
    // },
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
