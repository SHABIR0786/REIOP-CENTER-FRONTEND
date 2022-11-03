<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 3: {{importDetails.upload_type === 'appended' ? 'Single Pull With Appended Data' : 'Single Pull List Settings'}}</h3>
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
                            <b-input-group prepend="Market">
<!--                                <b-form-input :state="list.list_market.length > 0" v-model="list.list_market"></b-form-input>-->
                                <b-form-select  v-model="list.list_market" :options="market" @change="addNewField($event) " ></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Group">
<!--                                <b-form-input :state="list.list_group.length > 0" v-model="list.list_group"></b-form-input>-->
                                <b-form-select v-model="list.list_group" :options="group" @change="addNewField($event)"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Type">
<!--                                <b-form-input :state="list.list_type.length > 0" v-model="list.list_type"></b-form-input>-->
                                <b-form-select v-model="list.list_type" :options="type" @change="addNewField($event)"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Source">
<!--                                <b-form-input :state="list.list_source.length > 0" v-model="list.list_source"></b-form-input>-->
                                <b-form-select v-model="list.list_source" :options="source" @change="addNewField($event)"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Pull Date">
                                <b-form-input v-model="list.list_pull_date" type="date"></b-form-input>
<!--                                <b-form-select v-model="list.list_pull_date" :options="pull_date"></b-form-select>-->
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2" v-if="list.list_pull_date">
                      <b-col cols="9" class="mx-auto">
                      <div class="text-center text-info m-4">
                          <p>Based off the pull date you have selected the run month and year will be {{dateFormat(list.list_pull_date)}}. Is this the correct run month and year for this data?</p>
                          <b-col cols="12" class=" mt-1">
                            <b-button class="choose-btn" :class="{'choose-btn--active': isSameDataDateAsPullDate === true}" variant="primary mr-4" @click="isSameDataDateAsPullDate = true"> Yes </b-button>
                            or
                            <b-button class="choose-btn" :class="{'choose-btn--active': isSameDataDateAsPullDate === false}" variant="primary ml-4" @click="isSameDataDateAsPullDate = false"> No  </b-button>
                          </b-col>
                         
                        </div>
                      
                       <div fluid v-if="isSameDataDateAsPullDate === false">
                        <p class="text-warning">Please select a different date to generate the run month and year</p>
                        <b-input-group prepend="Data Date">
                        <b-form-input
                          id="list-pull-data-date"
                          v-model="list.list_data_date"
                          type="date"
                          placeholder="dd-mm-yyyy"
                        ></b-form-input>
                        
                          <!-- <b-form-datepicker
                            :date-format-options="{ day: '2-digit' , month: '2-digit', year: 'numeric' }"
                            v-model="list_data_date"
                            button-only
                            right
                            locale="en-US"
                            aria-controls="list-pull-data-date"
                            format="DD-MM-YYYY"
                            @context="onContext"
                            :date-disabled-fn="dateDisabled"
                          ></b-form-datepicker> -->
                        </b-input-group>
                            
                            <!-- <b-input-group prepend="Data Date">
                              <b-form-input v-model="list.list_data_date" type="date" :disabled-date="(date) => date >= new Date()"></b-form-input>
                              <b-form-datepicker   @context="onContext" locale="en"></b-form-datepicker>
                            </b-input-group> -->
                       </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
          <div v-if="importDetails.upload_type === 'appended'">
            <div class="text-center text-info m-4">
              <p>Is the skip source the same provider as the data source?*</p>
              <b-col cols="12" class=" mt-1">
                <b-button class="choose-btn" :class="{'choose-btn--active': sameSource === false}" variant="primary mr-4" @click="sourceCheckbox(false)"> Yes </b-button>
                or
                <b-button class="choose-btn" :class="{'choose-btn--active': sameSource}" variant="primary ml-4" @click="sourceCheckbox(true)"> No  </b-button>
              </b-col>
              <b-container fluid v-if="sameSource">
                <b-row class="d-flex justify-content-center">
                  <b-col class="d-flex justify-content-end flex-column">
                    <b-row class="m-3">
                      <b-col cols="5" class="mx-auto">
                        <b-input-group prepend="Skip Source">
                          <b-form-select  v-model="list.list_skip_source" :options="skipSource" @change="addNewField($event)"></b-form-select>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
            </div>


            <div class="text-center text-info">
              <p>Is the skip date the same date as the pull date?*</p>
              <b-col cols="12" class=" mt-1">
                <b-button class="choose-btn" :class="{'choose-btn--active': sameDate === false}" variant="primary mr-4"  @click="dateCheckbox(false)"> Yes </b-button>
                or
                <b-button class="choose-btn" :class="{'choose-btn--active': sameDate}" variant="primary ml-4"  @click="dateCheckbox(true)"> No  </b-button>
              </b-col>
              <b-container fluid v-if="sameDate">
                <b-row class="d-flex justify-content-center">
                  <b-col class="d-flex justify-content-end flex-column">
                    <b-row class="m-3">
                      <b-col cols="5" class="mx-auto">
                        <b-input-group prepend="Skip Date">
                          <b-input v-model="list.list_skip_date" type="date" ></b-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>


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
                        class="data-type"

                        @click="checkUpdateList()"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
        <AddListSettingsModal :showModal="showSettingsModal" :propsData="settingSection" @cancel="showSettingsModal=false" @save="add"></AddListSettingsModal>
        <confirm-modal :showModal="allFieldsMapped" @modalResponse="allFieldsMapped=false">
          <template v-slot:requiredMappingFields> 
            <h4 class="text-center">All these fields are required</h4>
            <div v-if="errors.length > 0">
              <ul >
                <li class="text-danger" v-for="(error, index) in errors" :key="index">{{error}}</li>
              </ul>

            </div>
          </template>
        </confirm-modal>
    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    import AddListSettingsModal from "../list/AddListSettingsModal";
    import ConfirmModal from "@/components/slotModal/SlotModal";
    import moment from 'moment';
    export default {
      name: "PullSettings",
      components: {
        AddListSettingsModal,
        ConfirmModal,
      },
      props: ['importDetails'],
      data () {
        return {
          currentPage: 1,
          lists: [],
          perPage: 20,
            list: {
                list_market: '',
                list_group: '',
                list_type: '',
                list_source: '',
                list_skip_source: '',
                list_skip_date: '',
                list_pull_date: '',
                list_data_date: '',
                list_hash: '',
                user_id: '',
                team_id: '',
            },
            list_data_date:'',
            market:[],
            group: [],
            type: [],
            source: [],
            skipSource: [],
            pull_date: [],
            showSettingsModal: false,
            settingSection: '',
            allFieldsMapped: false,
            isSameDataDateAsPullDate: null,
            errors: [],
            sameDate: null,
            sameSource: null
        }
      },
      async mounted() {
       let response = await this.$store.dispatch('listModule/getImportPullLists', {page: this.currentPage, perPage: this.perPage});
       this.lists = response?.lists?.data;
      if (this.marketList.length > 0) {
          this.market = this.marketList
        }
        if (this.groupList.length > 0) {
          this.group = this.groupList
        }
        if (this.typeList.length > 0) {
          this.type = this.typeList
        }
        if (this.sourceList.length > 0) {
          this.source = this.sourceList
        }
        if (this.skipSourceList.length > 0) {
          this.skipSource = this.skipSourceList
        }
        this.lists.forEach(e => {
            if((this.market.indexOf(e.list_market)) === -1 && e.list_market){
              this.market.push(e.list_market)
            }
            if((this.group.indexOf(e.list_group)) === -1 && e.list_group){
              this.group.push(e.list_group);
            }
            if((this.type.indexOf(e.list_type)) === -1 && e.list_type){
              this.type.push(e.list_type);
            }
            if((this.source.indexOf(e.list_source)) === -1 && e.list_source){
              this.source.push(e.list_source);
            }
            if((this.skipSource.indexOf(e.list_skip_source)) === -1 && e.list_skip_source){
              this.skipSource.push(e.list_skip_source);
            }
            if((this.pull_date.indexOf(e.list_pull_date)) === -1){
              this.pull_date.push(e.list_pull_date);
            }
        });
        if (!this.market.includes('Add a new Market')){
          this.market = this.market.sort();
          this.market.unshift('Add a new Market')
        }
        if (!this.group.includes('Add a new Group')){
          this.group = this.group.sort();
          this.group.unshift('Add a new Group')
        }
        if (!this.type.includes('Add a new Type')){
          this.type = this.type.sort();
          this.type.unshift('Add a new Type')
        }
        if (!this.source.includes('Add a new Source')){
          this.source = this.source.sort();
          this.source.unshift('Add a new Source')
        }
        if (!this.skipSource.includes('Add a new Skip Source')){
          this.skipSource = this.skipSource.sort();
          this.skipSource.unshift('Add a new Skip Source')
        }
        if (this.importDetails && this.importDetails.pull_settings) {
          this.list = this.importDetails.pull_settings;
          this.isSameDataDateAsPullDate = this.list.list_data_date == null?true:false;
          this.sameDate = this.list.list_skip_date == null?true:false;
          this.sameSource = this.list.list_skip_source == null?true:false;
        }
      },
      computed: {
        ...mapGetters({
            user: 'loginModule/getAuthUser',
            marketList: 'listModule/marketList',
            groupList: 'listModule/groupList',
            typeList: 'listModule/typeList',
            sourceList: 'listModule/sourceList',
            skipSourceList: 'listModule/skipSourceList',
        })
      },
      methods: {
        dateFormat(date) {
          return moment(date).format("MM/Y");
        },
        dateDisabled(ymd) {
          // Return `true` if the date should be disabled
          let ymdm = moment(ymd);
          return ymdm.isAfter();
        },
        onContext(ctx) {
          if(ctx.selectedFormatted && ctx.selectedFormatted != 'No date selected' ){
            this.list.list_data_date = moment(ctx.selectedFormatted).format('DD-MM-Y');
          }
        },
     
        checkUpdateList() {
          this.errors = [];
          if (this.list.list_market.length === 0 ||
              this.list.list_group.length === 0 ||
              this.list.list_type.length === 0 ||
              this.list.list_source.length === 0 ||
              this.list.list_pull_date.length === 0 ||
              this.isSameDataDateAsPullDate === null ||
              (this.isSameDataDateAsPullDate === false && this.list.list_data_date.length  === 0) ||
              (this.importDetails.upload_type === 'appended' && (this.list.list_skip_date.length === 0 || this.list.list_skip_source.length === 0))
              ) {
           this.allFieldsMapped = true;
           return
          }
          if(this.list.list_data_date?.length  != 0 && this.isSameDataDateAsPullDate === false && this.list.list_pull_date){
            let list_pull_date = moment(this.list.list_pull_date);
            let list_data_date = moment(this.list.list_data_date);
            if(!list_pull_date.isValid()){
              this.allFieldsMapped = true;
              this.errors.push('The pull date is not valid');
              return;
            }
            if(!list_pull_date.isValid()){
              this.allFieldsMapped = true;
              this.errors.push('The pull data date is not valid');
              return;
            }
            if(list_pull_date.isSame(list_data_date)){
              this.allFieldsMapped = true;
              this.errors.push('The pull date and run date should not be same');
              return;
            }
            if(list_pull_date.format('MM/Y') == list_data_date.format('MM/Y')){
              this.allFieldsMapped = true;
              this.errors.push('The pull date month year and run date month year should not be same');
              return;
            }
          }
          if(this.isSameDataDateAsPullDate){
            this.list.list_data_date = null;
          }

          this.list.user_id = this.user.id;
          this.list.team_id = this.user.team_id;
          this.list.list_hash = this.list.list_market + '_' + this.list.list_type + '_' +  this.list.list_group + '_' + this.list.list_source
          //this.$store.dispatch('listModule/addList', this.list)
          this.$emit('pullSettingsResponse', this.list);
        },
        dateCheckbox($event){
          this.sameDate = $event;
          if(!$event) {this.list.list_skip_date = this.list.list_pull_date}
          else {
            this.list.list_skip_date = ''
          }
        },
        sourceCheckbox($event){
          this.sameSource = $event;
          if(!$event) {this.list.list_skip_source = this.list.list_source}
          else {
            this.list.list_skip_source = ''
          }
        },
        goBack() {
          // this.$emit('pullSettingsResponse', this.list);
          this.$emit('goBack', 'PullSettings');
        },
        addNewField(event) {
             switch (event) {
                case 'Add a new Market':
                    this.settingSection = 'Market';
                    this.showSettingsModal = true;
                    this.list.list_market = '';
                    break
                case 'Add a new Group':
                    this.settingSection = 'Group';
                    this.showSettingsModal = true;
                    this.list.list_group = '';
                    break
                case 'Add a new Type':
                    this.settingSection = 'Type';
                    this.showSettingsModal = true;
                    this.list.list_type = '';
                    break
                case 'Add a new Source':
                    this.settingSection = 'Source';
                    this.showSettingsModal = true;
                    this.list.list_source = '';
                    break
                 case 'Add a new Skip Source':
                   this.settingSection = 'Skip Source';
                   this.showSettingsModal = true;
                   this.list.list_skip_source = '';
                   break
            }
        },
        add (response) {
          switch (this.settingSection) {
            case "Market":
              if((this.market.indexOf(response)) === -1){
                this.market.splice(this.market.length -1, 0, response);
                this.$store.dispatch('listModule/saveMarketList', this.market)
              }
              this.list.list_market = response;
              break
            case "Group":
              if(this.group.indexOf(response) === -1){
                this.group.splice(this.group.length -1, 0, response);
                this.$store.dispatch('listModule/saveGroupList', this.group)
              }
              this.list.list_group = response;
              break
            case "Type":
              if(this.type.indexOf(response) === -1){
                this.type.splice(this.type.length -1, 0, response);
                this.$store.dispatch('listModule/saveTypeList', this.type)
              }
              this.list.list_type = response;
              break
            case "Source":
              if(this.source.indexOf(response) === -1){
                this.source.splice(this.source.length -1, 0, response);
                this.$store.dispatch('listModule/saveSourceList', this.source)
              }
              this.list.list_source = response;
              break
            case "Skip Source":
              if(this.skipSource.indexOf(response) === -1){
                this.skipSource.splice(this.skipSource.length -1, 0, response);
                this.$store.dispatch('listModule/saveSkipSourceList', this.skipSource)
              }
              this.list.list_skip_source = response;
              break
          }
          this.showSettingsModal = false;
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
