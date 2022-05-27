<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 3: Skip Trace Data</h3>
        </div>
        <div class="info-text">
            <p>Description of step for user: To be filled out later.</p>
        </div>
        <hr>
        <b-container fluid>
            <b-row class="d-flex justify-content-center">
                <b-col class="d-flex justify-content-end flex-column">
                  <b-row class="mb-2">
                    <b-col cols="9" class="mx-auto">
                      <b-input-group prepend="Skip Source">
                        <b-form-select v-model.trim="skipOptions.skip_source" :options="source" @change="addNewField($event)"></b-form-select>
                      </b-input-group>
                    </b-col>
                  </b-row>
                  <b-row class="mb-2">
                    <b-col cols="9" class="mx-auto">
                      <b-input-group prepend="Skip Date">
                        <b-input  v-model="skipOptions.skip_date" type="date"></b-input>
                      </b-input-group>
                    </b-col>
                  </b-row>
                </b-col>
            </b-row>
        </b-container>

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

            <b-col cols="12" class="next-btn">
                <b-button
                        variant="primary"
                        @click="setSkipSource()"
                        :disabled="!skipOptions.skip_source.length || !skipOptions.skip_date.length"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
      <AddListSettingsModal :showModal="showSettingsModal" :propsData="settingSection" @cancel="showSettingsModal=false" @save="add"></AddListSettingsModal>
    </div>
</template>


<script>
    import AddListSettingsModal from "@/components/list/AddListSettingsModal";
    import {mapGetters} from "vuex";
    export default {
        name: "SelectSkipDataSource",
        components: {
          AddListSettingsModal,
        },
        computed: {
          ...mapGetters({
            sourceList: 'listModule/skipSourceList',
            sourceListFromDB: 'listModule/sourceListFromDB',
          })
        },
        props: ['importDetails','lists'],
        data () {
            return {
              skipOptions: {
                skip_source: '',
                skip_date: '',
              },
              showSettingsModal: false,
              source: [],
              settingSection: '',
            }
        },
      async mounted() {
        await this.$store.dispatch('listModule/getSourceListFromDB')
        if (this.importDetails && this.importDetails.skip_options) {
          this.skipOptions = this.importDetails.skip_options;
          //this.source = this.importDetails.skip_options
        }
        if (this.sourceList.length > 0) {
          this.source = this.sourceList
        }else {
         if (this.sourceListFromDB){
           this.sourceListFromDB.forEach(e => {
           if (e.list_skip_source ){
             this.source.push(e.list_skip_source)
           }
         })
         }
        }

        if (!this.source.includes('Add a new Skip Source')){
          this.source.push('Add a new Skip Source')
        }
      },
        methods: {
            addNewField(event) {
              if (event === 'Add a new Skip Source'){
                this.settingSection = 'Skip Source';
                this.showSettingsModal = true;
                this.skipOptions.skip_source = '';
              }
            },
            add (response) {
              let index = this.source.findIndex(item => response.toLowerCase() === item.toLowerCase())
                if(index){
                  this.source.splice(this.source.length -1, 0, response);

                  this.$store.dispatch('listModule/saveSkipSourceList', this.source)
                } else {
                  this.source.splice(index, 1, response)
                }
                this.skipOptions.skip_source = response;
                this.showSettingsModal = false;
          },
            setSkipSource() {
                this.$emit('skipTraceData', this.skipOptions);
            },
            goBack() {
                this.$emit('goBack', 'SkipSource');
            }
        },
    }
</script>

<style scoped>
    .upload-type {
        background-color: #808080;
        color: white;
    }

    .active-upload-type {
        background-color: #45818E !important;
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
    .next-btn {
        text-align: left;
    }
    .next-btn {
        text-align: right;
    }
</style>
