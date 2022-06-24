<template>
  <b-modal
    v-model="showModal"
    @close="$emit('modalClose')"
    :no-close-on-backdrop="true"
  >
    <template #modal-header>
      <div style="font-size: 20px; color: white">Save Mapping Template</div>
    </template>
    <b-container fluid>
      <b-row>
        <b-col> Replace existing mapping template </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-form-select
            v-model="selectedMappingTemplate"
            :options="mappingTemplates"
            class="mt-3"
            @change="updateMappingTemplate"
          ></b-form-select>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col> Or Create a new mapping template: </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-form-input
            class="mt-2"
            v-model="mapping.name"
            placeholder="Template Name"
          ></b-form-input>
          <!-- </b-col> -->
          <!-- <b-col class="mt-2" cols="12" md="12"> -->
          <b-form-textarea
            id="textarea"
            class="mt-2"
            v-model="mapping.description"
            placeholder="Template Description"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>

    <template #modal-footer>
      <div>
        <b-button
          :disabled="isDisable"
          variant="primary"
          @click="$emit('modalResponse', selectedMappingTemplate, mapping)"
          >Save Mapping Template and Import</b-button
        >
        <b-button @click="$emit('modalClose')">Cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: "MappingModal",
  props: {
    showModal: {
      type: Boolean,
    },
    selectedMappingTemplate: {
      type: [Number, String],
    },
    mappingTemplates: {
      type: Array,
    },
    mapping: {
      type: Object,
    },
  },
  computed: {
    isDisable() {
      return (((this.mapping.name == null || this.mapping.description == null) || (this.mapping.name == "" || this.mapping.description == "" )));
    },
  },
  methods: {
    updateMappingTemplate(id){
      if(!id || id == ''){
        this.mapping.name = null;
        this.mapping.description = null;
      }
    }
  }
};
</script>
<style scoped>
>>> .modal-content {
  background: #45818e !important;
}
</style>
