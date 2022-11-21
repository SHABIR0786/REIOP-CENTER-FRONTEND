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
                    <div class="info-text" v-if="is_show_custom_fields">
                      <p>Custom Fields <span class="small">(Optional)</span></p>
                  </div>
                    <b-row class="mb-2" v-if="is_show_custom_fields">
                        <b-col cols="9 my-1" class="mx-auto" v-if="this.visibleCustomField['list_custom_field_1']">
                          <b-input-group :prepend="getCustomField('list_custom_field_1')">
                                <b-form-select v-model="list.list_custom_field_1" :options="customField1" @change="addNewField($event)">
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col cols="9 my-1" class="mx-auto" v-if="this.visibleCustomField['list_custom_field_2']">
                          <b-input-group :prepend="getCustomField('list_custom_field_2')">
                                <b-form-select v-model="list.list_custom_field_2" :options="customField2" @change="addNewField($event)">
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col cols="9 my-1" class="mx-auto" v-if="this.visibleCustomField['list_custom_field_3']">
                          <b-input-group :prepend="getCustomField('list_custom_field_3')">
                                <b-form-select v-model="list.list_custom_field_3" :options="customField3" @change="addNewField($event)">
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col cols="9 my-1" class="mx-auto" v-if="this.visibleCustomField['list_custom_field_4']">
                          <b-input-group :prepend="getCustomField('list_custom_field_4')">
                                <b-form-select v-model="list.list_custom_field_4" :options="customField4" @change="addNewField($event)">
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col cols="9 my-1" class="mx-auto" v-if="this.visibleCustomField['list_custom_field_5']">
                          <b-input-group :prepend="getCustomField('list_custom_field_5')">
                                <b-form-select v-model="list.list_custom_field_5" :options="customField5" @change="addNewField($event)">
                                </b-form-select>
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
                //custom fields
                list_custom_field_1:'',
                list_custom_field_2:'',
                list_custom_field_3:'',
                list_custom_field_4:'',
                list_custom_field_5:'',

            },
            list_data_date:'',
            market:[],
            group: [],
            type: [],
            source: [],
            skipSource: [],
            //custom fields
            customField1: [],
            customField2: [],
            customField3: [],
            customField4: [],
            customField5: [],
            pull_date: [],
            showSettingsModal: false,
            settingSection: '',
            selectFieldName: '',
            allFieldsMapped: false,
            isSameDataDateAsPullDate: null,
            errors: [],
            sameDate: null,
            sameSource: null,
            is_show_custom_fields:false,

        }
      },
      async mounted() {
        this.$store.dispatch('uxModule/setLoading')
        await this.$store.dispatch('labelModule/visibleCustomFields')
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
        //custom fields
        if (this.customField1List.length > 0) {
          this.customField1 = this.customField1List
        }
        if (this.customField2List.length > 0) {
          this.customField2 = this.customField2List
        }
        if (this.customField3List.length > 0) {
          this.customField3 = this.customField3List
        }
        if (this.customField4List.length > 0) {
          this.customField4 = this.customField4List
        }
        if (this.customField5List.length > 0) {
          this.customField5 = this.customField5List
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
            //custom fields
            if((this.customField1.indexOf(e.list_custom_field_1)) === -1 && e.list_custom_field_1){
              this.customField1.push(e.list_custom_field_1);
            }
            if((this.customField2.indexOf(e.list_custom_field_2)) === -1 && e.list_custom_field_2){
              this.customField2.push(e.list_custom_field_2);
            }
            if((this.customField3.indexOf(e.list_custom_field_3)) === -1 && e.list_custom_field_3){
              this.customField3.push(e.list_custom_field_3);
            }
            if((this.customField4.indexOf(e.list_custom_field_4)) === -1 && e.list_custom_field_4){
              this.customField4.push(e.list_custom_field_4);
            }
            if((this.customField5.indexOf(e.list_custom_field_5)) === -1 && e.list_custom_field_5){
              this.customField5.push(e.list_custom_field_5);
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
        //custom fields
        if (!this.customField1.includes('Add a new custom Field 1')){
          this.customField1 = this.customField1.sort();
          this.customField1.unshift('Add a new custom Field 1')
        }
        if (!this.customField2.includes('Add a new custom Field 2')){
          this.customField2 = this.customField2.sort();
          this.customField2.unshift('Add a new custom Field 2')
        }
        if (!this.customField3.includes('Add a new custom Field 3')){
          this.customField3 = this.customField3.sort();
          this.customField3.unshift('Add a new custom Field 3')
        }
        if (!this.customField4.includes('Add a new custom Field 4')){
          this.customField4 = this.customField4.sort();
          this.customField4.unshift('Add a new custom Field 4')
        }
        if (!this.customField5.includes('Add a new custom Field 5')){
          this.customField5 = this.customField5.sort();
          this.customField5.unshift('Add a new custom Field 5')
        }
        if (this.importDetails && this.importDetails.pull_settings) {
          this.list = this.importDetails.pull_settings;
          this.isSameDataDateAsPullDate = this.list.list_data_date == null?true:false;
          this.sameDate = this.list.list_skip_date == null?true:false;
          this.sameSource = this.list.list_skip_source == null?true:false;
        }
        this.is_show_custom_fields = Object.values(this.visibleCustomField).includes(true);
        this.$store.dispatch('uxModule/hideLoader');
      },
      computed: {
        ...mapGetters({
            user: 'loginModule/getAuthUser',
            marketList: 'listModule/marketList',
            groupList: 'listModule/groupList',
            typeList: 'listModule/typeList',
            sourceList: 'listModule/sourceList',
            skipSourceList: 'listModule/skipSourceList',
            //custom fields
            customField1List: 'listModule/customField1List',
            customField2List: 'listModule/customField2List',
            customField3List: 'listModule/customField3List',
            customField4List: 'listModule/customField4List',
            customField5List: 'listModule/customField5List',
            visibleCustomField: 'labelModule/visibleCustomFields',
            customFieldsArray: 'labelModule/customFieldsArray',

        })
      },
      methods: {
        getCustomField(field) {
          let index = this.customFieldsArray.findIndex(x=>x.field == field);
          if(index != -1) {
            if(this.customFieldsArray[index].label) {
              return this.customFieldsArray[index].label;
            } else {
            return field;
            }
          } else {
            return field;
          }
        },
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
          let listHash = '';
          if(this.list.list_custom_field_1) {
            listHash+='_'+this.list.list_custom_field_1;
          }
          if(this.list.list_custom_field_2) {
            listHash+='_'+this.list.list_custom_field_2;
          }
          if(this.list.list_custom_field_3) {
            listHash+='_'+this.list.list_custom_field_3;
          }
          if(this.list.list_custom_field_4) {
            listHash+='_'+this.list.list_custom_field_4;
          }
          if(this.list.list_custom_field_5) {
            listHash+='_'+this.list.list_custom_field_5;
          }
          this.list.list_hash = this.list.list_market + '_' + this.list.list_type + '_' +  this.list.list_group + '_' + this.list.list_source+listHash;
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
          console.log(event);
             switch (event) {
                case 'Add a new Market':
                    this.settingSection = 'Market';
                    this.selectFieldName =  'Market';
                    this.showSettingsModal = true;
                    this.list.list_market = '';
                    break
                case 'Add a new Group':
                    this.settingSection = 'Group';
                    this.selectFieldName =  'Group';
                    this.showSettingsModal = true;
                    this.list.list_group = '';
                    break
                case 'Add a new Type':
                    this.settingSection = 'Type';
                    this.selectFieldName =  'Type';
                    this.showSettingsModal = true;
                    this.list.list_type = '';
                    break
                case 'Add a new Source':
                    this.settingSection = 'Source';
                    this.selectFieldName =  'Source';
                    this.showSettingsModal = true;
                    this.list.list_source = '';
                    break
                 case 'Add a new Skip Source':
                   this.settingSection = 'Skip Source';
                   this.selectFieldName =  'Skip Source';
                   this.showSettingsModal = true;
                   this.list.list_skip_source = '';
                   break
                  case 'Add a new custom Field 1':
                   this.settingSection = this.getCustomField('list_custom_field_1');
                   this.selectFieldName =  'Custom Field 1';
                   this.showSettingsModal = true;
                   this.list.list_custom_field_1 = '';
                   break
                  case 'Add a new custom Field 2':
                   this.settingSection = this.getCustomField('list_custom_field_2');
                   this.selectFieldName =  'Custom Field 2';
                   this.showSettingsModal = true;
                   this.list.list_custom_field_2 = '';
                   break
                  case 'Add a new custom Field 3':
                   this.settingSection = this.getCustomField('list_custom_field_3');
                   this.selectFieldName =  'Custom Field 3';
                   this.showSettingsModal = true;
                   this.list.list_custom_field_3 = '';
                   break
                  case 'Add a new custom Field 4':
                   this.settingSection = this.getCustomField('list_custom_field_4');
                   this.selectFieldName =  'Custom Field 4';
                   this.showSettingsModal = true;
                   this.list.list_custom_field_4 = '';
                   break
                  case 'Add a new custom Field 5':
                   this.settingSection = this.getCustomField('list_custom_field_5');
                   this.selectFieldName =  'Custom Field 5';
                   this.showSettingsModal = true;
                   this.list.list_custom_field_5 = '';
                   break

                   
            }
        },
        add (response) {          
          try{
          switch (this.selectFieldName) {
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
              break;
              case "Custom Field 1":
              if(this.customField1.indexOf(response) === -1){
                this.customField1.splice(this.customField1.length -1, 0, response);
                this.$store.dispatch('listModule/saveCustomField1List', this.customField1)
              }
              this.list.list_custom_field_1 = response;
              break;
              case "Custom Field 2":
              if(this.customField2.indexOf(response) === -1){
                this.customField2.splice(this.customField2.length -1, 0, response);
                this.$store.dispatch('listModule/saveCustomField2List', this.customField2)
              }
              this.list.list_custom_field_2 = response;
              break;
              case "Custom Field 3":
              if(this.customField3.indexOf(response) === -1){
                this.customField3.splice(this.customField3.length -1, 0, response);
                this.$store.dispatch('listModule/saveCustomField3List', this.customField3)
              }
              this.list.list_custom_field_3 = response;
              break;
              case "Custom Field 4":
              if(this.customField4.indexOf(response) === -1){
                this.customField4.splice(this.customField4.length -1, 0, response);
                this.$store.dispatch('listModule/saveCustomField4List', this.customField4)
              }
              this.list.list_custom_field_4 = response;
              break;
              case "Custom Field 5":
              if(this.customField5.indexOf(response) === -1){
                this.customField5.splice(this.customField5.length -1, 0, response);
                this.$store.dispatch('listModule/saveCustomField5List', this.customField5)
              }
              this.list.list_custom_field_5 = response;
              break;
          }
        }catch(e){
          console.log('error',e);
          this.showSettingsModal = false;
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
