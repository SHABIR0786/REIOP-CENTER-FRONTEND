<template>
    <div>
      <h3>New Import</h3>
      <hr>
      <div class="type-container">
          <h3>Step {{importDetails.import_type === 'existing' ? 3 : 4}}: Map Fields</h3>
      </div>
      <div class="info-text">
          <p>Description of step for user: To be filled out later.</p>
      </div>
      <hr>
      <import :upload_type="upload_type" :list_settings="list_settings" :skip_source="this.skip_source" class="w-100 import-map"></import>

      <b-row>
        <b-col cols="12" class="prev-btn">
          <b-button
              class="data-type"
              variant="primary"
              @click="goBack()"
          >
            Prev
          </b-button>
        </b-col>
      </b-row>
    </div>
</template>


<script>
    import Import from '../../pages/import'
    export default {
      name: "MapFields",
      props: ['upload_type', 'list_settings', 'importDetails'],
      components: {
          Import
      },
      data () {
          return {
              skip_source: '',
          }
      },
      mounted() {
          if (this.importDetails) {
              if (this.importDetails.list_settings) {
                  this.list_settings = this.importDetails.pull_settings;
              }

              if(this.importDetails.upload_type) {
                  this.upload_type = this.importDetails.upload_type;
              }

              if(this.importDetails.skip_source) {
                  this.skip_source = this.importDetails.skip_source;
                  this.list_settings = 'update_existing';
              }
          }
      },
      methods: {
        goBack() {
          this.$emit('goBack', 'MapFields');
        }
      }
    }
</script>

<style scoped>
    .data-type {
        background-color: #45818E !important;
        color: white;
    }
    .type-container {
        background-color: #45818E;
        color: white;
        padding: 15px 15px;
        border-top: 0.5px solid black;
        border-bottom: 0.5px solid black;
    }
    h3 {
        margin: 0 !important;
    }
    .info-text {
        padding: 20px 10px 0 10px;
    }
    p {
        margin-bottom: 0 !important;
        font-weight: bold;
    }
    .map-text {
        margin-top: 100px;
        padding: 20px 100px 0 100px;
    }
    .next-btn {
        margin-top: 60px;
    }
    .import-map {
        width: 100% !important;
    }
</style>
