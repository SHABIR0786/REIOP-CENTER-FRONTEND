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
                                <b-form-input :state="list.list_market.length > 0" v-model="list.list_market"></b-form-input>
                                <b-form-select v-model="list.list_market" :options="market"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Group">
                                <b-form-input :state="list.list_group.length > 0" v-model="list.list_group"></b-form-input>
                                <b-form-select v-model="list.list_group" :options="group"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Type">
                                <b-form-input :state="list.list_type.length > 0" v-model="list.list_type"></b-form-input>
                                <b-form-select v-model="list.list_type" :options="type"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Source">
                                <b-form-input :state="list.list_source.length > 0" v-model="list.list_source"></b-form-input>
                                <b-form-select v-model="list.list_source" :options="source"></b-form-select>
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
    </div>
</template>


<script>
    import {mapGetters} from "vuex";

    export default {
      name: "PullSettings",
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
