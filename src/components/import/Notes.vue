<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 4: Add Notes for this import</h3>
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
                <b-form-textarea
                  id="textarea"
                  v-model="importDetails.notes"
                  placeholder="Enter notes here..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
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
            <b-button
                        variant="primary"
                        class="data-type float-right"

                        @click="checkUpdateList()"
                >
                    Next
                </b-button>
          </b-col>
        </b-row>
    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    
    export default {
      name: "Notes",
      components: {
        
      },
      props: ['lists', 'importDetails'],
      data () {
        return {
            notes:''
        }
      },
      mounted() {
        
      },
      computed: {
        ...mapGetters({
            user: 'loginModule/getAuthUser',
            marketList: 'listModule/marketList',
            groupList: 'listModule/groupList',
            typeList: 'listModule/typeList',
            sourceList: 'listModule/sourceList',
            skipSourceList: 'listModule/skipSourceList',
            sameDate: 'listModule/sameDate',
            sameSource: 'listModule/sameSource',

        })
      },
      methods: {
        checkUpdateList() {
          

          // this.list.user_id = this.user.id;
          // this.list.team_id = this.user.team_id;
          // this.list.notes = this.notes;
          //this.$store.dispatch('listModule/addList', this.list)
          this.$emit('setNotesResponse', this.importDetails.notes);
        },
        
        goBack() {
          // this.$emit('setNotesResponse', this.list);
          this.$emit('goBack', 'Notes');
          // if (this.upload_type === 'combined'){
          //   this.$emit('goBack', 'Combined');
          // }else {
          //   this.$emit('goBack', 'MapFields');
          // }
        },
        
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
    .choose-btn{
      padding: 5px 20px;
      background-color: #e9ecef !important;
      color: black;
    }
    .choose-btn:focus, .choose-btn--active{
      background-color: #024847 !important;
      color: white !important;
    }
    .next-btn {
      text-align: left;
    }
    .next-btn {
        text-align: end !important;
    }
</style>
