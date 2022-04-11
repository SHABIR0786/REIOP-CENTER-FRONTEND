<template>
    <div>
        <h3>New Import</h3>
        <hr>
        <div class="type-container">
            <h3>Step 3: Single Pull List Settings</h3>
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
                        class="data-type"

                        @click="checkUpdateList()"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
        <AddListSettingsModal :showModal="showSettingsModal" :propsData="settingSection" @cancel="showSettingsModal=false" @save="add"></AddListSettingsModal>
        <confirm-modal :showModal="allFieldsMapped" @modalResponse="allFieldsMapped=false">
          <template v-slot:requiredMappingFields> <h4>All these fields are required</h4></template>
        </confirm-modal>
    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    import AddListSettingsModal from "../list/AddListSettingsModal";
    import ConfirmModal from "@/components/slotModal/SlotModal";
    export default {
      name: "PullSettings",
      components: {
        AddListSettingsModal,
        ConfirmModal,
      },
      props: ['lists', 'importDetails'],
      data () {
        return {
            list: {
                list_market: '',
                list_group: '',
                list_type: '',
                list_source: '',
                list_pull_date: '',
                list_hash: '',
                user_id: '',
                team_id: '',
            },
            market:[],
            group: [],
            type: [],
            source: [],
            pull_date: [],
            showSettingsModal: false,
            settingSection: '',
            allFieldsMapped: false,
        }
      },
      mounted() {
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
        this.lists.forEach(e => {
            if((this.market.indexOf(e.list_market)) === -1){
              this.market.push(e.list_market)
            }
            if((this.group.indexOf(e.list_group)) === -1){
              this.group.push(e.list_group);
            }
            if((this.type.indexOf(e.list_type)) === -1){
              this.type.push(e.list_type);
            }
            if((this.source.indexOf(e.list_source)) === -1){
              this.source.push(e.list_source);
            }
            if((this.pull_date.indexOf(e.list_pull_date)) === -1){
              this.pull_date.push(e.list_pull_date);
            }
        });
        if (!this.market.includes('Add a new Market')){
          this.market.push('Add a new Market')
        }
        if (!this.group.includes('Add a new Group')){
          this.group.push('Add a new Group')
        }
        if (!this.type.includes('Add a new Type')){
          this.type.push('Add a new Type')
        }
        if (!this.source.includes('Add a new Source')){
          this.source.push('Add a new Source')
        }

        if (this.importDetails && this.importDetails.pull_settings) {
          this.list = this.importDetails.pull_settings;
        }
      },
      computed: {
        ...mapGetters({
            user: 'loginModule/getAuthUser',
            marketList: 'listModule/marketList',
            groupList: 'listModule/groupList',
            typeList: 'listModule/typeList',
            sourceList: 'listModule/sourceList',
        })
      },
      methods: {
        checkUpdateList() {
          if (this.list.list_market.length === 0 ||
              this.list.list_group.length === 0 ||
              this.list.list_type.length === 0 ||
              this.list.list_source.length === 0 ||
              this.list.list_pull_date.length === 0){
           this.allFieldsMapped = true;
           return
          }

          this.list.user_id = this.user.id;
          this.list.team_id = this.user.team_id;
          this.list.list_hash = this.list.list_market + '_' + this.list.list_type + '_' +  this.list.list_group + '_' + this.list.list_source
          //this.$store.dispatch('listModule/addList', this.list)
          this.$emit('pullSettingsResponse', this.list);
        },
        goBack() {
          this.$emit('pullSettingsResponse', this.list);
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
    .next-btn {
      text-align: left;
    }
    .next-btn {
        text-align: end !important;
    }
</style>
