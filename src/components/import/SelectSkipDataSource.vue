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
                            <b-input-group  prepend="Skip Source">
                                <b-input  v-model="skipOptions.skip_source"></b-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                  <b-row class="mb-2">
                    <b-col cols="9" class="mx-auto">
                      <b-input-group prepend="Skip Date">
                        <b-input  v-model="skipOptions.skip_date"></b-input>
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
    </div>
</template>


<script>
    export default {
        name: "SelectSkipDataSource",
        props: ['importDetails'],
        data () {
            return {
              skipOptions: {
                skip_source: '',
                skip_date: '',
              },

            }
        },
      mounted() {
        if (this.importDetails && this.importDetails.skip_options) {
          this.skipOptions = this.importDetails.skip_options;
        }
      },
        methods: {
            setSkipSource() {
                this.$emit('skipTraceData', this.skipOptions);
            },
            goBack() {
                this.$emit('goBack', 'SkipSource');
            }
        }
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
