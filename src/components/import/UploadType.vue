<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 2: New Upload Type</h3>
        </div>
        <div class="info-text">
            <!-- <p>Description of step for user: To be filled out later.</p> -->
        </div>
        <hr>
        <b-row class="text-center">
            <b-col class="d-flex justify-content-end flex-column align-items-center">
                <b-button
                        class="upload-type"
                        @click="upload_type = 'single'"
                        :class="{'active-upload-type': upload_type === 'single'}"
                >
                    Is this a single pull from a provider with Raw Data?
                </b-button>
                or
                <!-- <b-button
                        class="upload-type"
                        @click="upload_type = 'combined'"
                        :class="{'active-upload-type': upload_type === 'combined'}"
                >
                    Is this a combined upload with data from multiple providers and lists?
                </b-button>
                or -->
                <b-button
                        class="upload-type"
                        @click="upload_type = 'appended'"
                        :class="{'active-upload-type': upload_type === 'appended'}"
                >
                    Is this a single pull from a provider with Appended Data?
                </b-button>
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
                      @click="setUploadType()"
                      :disabled="!upload_type.length"
              >
                  Next
              </b-button>
          </b-col>
        </b-row>
    </div>
</template>


<script>
  export default {
    name: "UploadType",
    props: ['importDetails'],
    data () {
      return {
          upload_type: '',
      }
    },
    mounted() {
      if (this.importDetails && this.importDetails.upload_type) {
        this.upload_type = this.importDetails.upload_type;
      }
    },
    methods: {
      setUploadType() {
          this.$emit('uploadResponse', this.upload_type);
      },
      goBack() {
        this.$emit('goBack', 'UploadType');
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
