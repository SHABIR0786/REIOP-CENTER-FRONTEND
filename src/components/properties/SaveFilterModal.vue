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
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group class="mb-2">
                                    <b-form-input placeholder="Enter Filter Name" v-model="filterName"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                               <b>Or Replace Existing Filter</b>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group class="mb-2">
                                    <b-form-select
                                        class="select-template w-100 mt-3 mb-3"
                                        v-model="selectedFilter"
                                        :options="savedFilters"></b-form-select>
                                </b-input-group>
                            </b-col>
                        </b-row>
        </b-container>
          <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right" @click="saveFilter()">
            Save Filter
          </b-button>
        </div>
      </template>
</b-modal>
</template>
<script>
export default {
  name: "SaveFilterModal",
  props: {
    showModal: {
      type: Boolean,
    },
    filters: {
      type: Array
    }
  },
  data() {
    return {
        selectedFilter:null,
        filterName:null,
        savedFilters:[
            {value:"",text:"Choose Existing Filter"}
        ]
    };
  },
  methods: {
    closeFilterModal() {
      this.$emit("cancel");
    },
    saveFilter() {
      if(this.selectedFilter != null){
          this.$emit("update",this.selectedFilter);
      }else {
      this.$emit("save",this.filterName);
      }
    }
  },
  mounted() {
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