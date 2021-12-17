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
                                <b-form-select v-model="list.list_market" :options="market" @change="addNewField($event)"></b-form-select>
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
                        :disabled='list.list_market.length === 0 || list.list_group.length === 0 || list.list_type.length === 0 || list.list_source.length === 0'
                        @click="checkUpdateList()"
                >
                    Next
                </b-button>
            </b-col>
        </b-row>
        <AddListSettingsModal :showModal="showSettingsModal" :propsData="settingSection" @cancel="showSettingsModal=false" @save="add"></AddListSettingsModal>
    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    import AddListSettingsModal from "../list/AddListSettingsModal";

    export default {
      name: "PullSettings",
      components: {AddListSettingsModal},
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
            // market: [],
            market:[],
            group: [],
            type: [],
            source: [],
            pull_date: [],
            showSettingsModal: false,
            settingSection: '',
        }
      },
      mounted() {
        this.lists.forEach(e => {
            this.market.push(e.list_market)
            this.group.push(e.list_group);
            this.type.push(e.list_type);
            this.source.push(e.list_source);
            this.pull_date.push(e.list_pull_date);
        });

        this.market.push('Add a new Market')
        this.group.push('Add a new Group')
        this.type.push('Add a new Type')
        this.source.push('Add a new Source')

        if (this.importDetails && this.importDetails.pull_settings) {
          this.list = this.importDetails.pull_settings;
        }
      },
      computed: {
        ...mapGetters({
            user: 'loginModule/getAuthUser'
        })
      },
      methods: {
        checkUpdateList() {
          this.list.user_id = this.user.id;
          this.list.team_id = this.user.team_id;
          this.list.list_hash = this.list.list_market + '_' + this.list.list_type + '_' +  this.list.list_group + '_' + this.list.list_source
          // this.$store.dispatch('listModule/addList', this.list)

          this.$emit('pullSettingsResponse', this.list);
        },
        goBack() {
          this.$emit('goBack', 'PullSettings');
        },
        addNewField(event) {
            switch (event) {
                case 'Add a new Market':
                    this.settingSection = 'Market';
                    this.showSettingsModal = true;
                    break
                case 'Add a new Group':
                    this.settingSection = 'Group';
                    this.showSettingsModal = true;
                    break
                case 'Add a new Type':
                    this.settingSection = 'Type';
                    this.showSettingsModal = true;
                    break
                case 'Add a new Source':
                    this.settingSection = 'Source';
                    this.showSettingsModal = true;
                    break
            }
        },
        add (response) {
            switch (this.settingSection) {
                case "Market":
                    this.market.push(response);
                    this.list.list_market = response;
                    break
                case "Group":
                    this.group.push(response)
                    this.list.list_group = response;
                    break
                case "Type":
                    this.type.push(response)
                    this.list.list_type = response;
                    break
                case "Source":
                    this.source.push(response);
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
