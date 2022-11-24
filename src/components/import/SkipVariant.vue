<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 2: Existing Records Update Import</h3>
        </div>
        <div class="info-text">
            <!-- <p>Description of step for user: To be filled out later.</p> -->
        </div>
        <hr>
        <b-row class="text-center">
          <b-col class="d-flex justify-content-end flex-column align-items-center">
            <b-button
                class="data-type-btn"
                @click="skip_option='skip_trace'"
                :class="{'active-skip-option': skip_option === 'skip_trace'}"
            >
              Are you uploading skip trace data?
            </b-button>
            <!-- or
            <b-button
                class="data-type-btn"
                @click="skip_option = 'validate'"
                :class="{'active-skip-option': skip_option === 'validate'}"
            >
              Are you updating phone or email validity?
            </b-button> -->
          </b-col>
        </b-row>

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
                        @click="setSkipOption()"
                        :disabled="!skip_option.length"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    export default {
        name: "SkipVariant",
        props: ['importDetails'],
        data () {
            return {
              skip_option: '',
            }
        },
      mounted() {
        if (this.importDetails && this.importDetails.skip_variant) {
          this.skip_option = this.importDetails.skip_variant;
        }
      },
        methods: {
          setSkipOption() {
                this.$emit('skipResponse', this.skip_option);
            },
            goBack() {
                this.$emit('goBack', 'SkipOption');
            }
        }
    }
</script>

<style scoped>
    /*.upload-type {*/
    /*    background-color: #808080;*/
    /*    color: white;*/
    /*}*/

    /*.active-upload-type {*/
    /*    background-color: #45818E !important;*/
    /*}*/
    .active-skip-option {
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
