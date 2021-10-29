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
<!--                    <b-row class="mb-2">-->
<!--                        <b-col cols="9" class="mx-auto">-->
<!--                            <b-input-group prepend="Market">-->
<!--                                <b-form-input v-model="list.market"></b-form-input>-->
<!--                                <b-form-select v-model="list.market" :options="market"></b-form-select>-->
<!--                            </b-input-group>-->
<!--                        </b-col>-->
<!--                    </b-row>-->
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Group">
                                <b-form-input v-model="list.list_group"></b-form-input>
                                <b-form-select v-model="list.list_group" :options="group"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Type">
                                <b-form-input v-model="list.list_type"></b-form-input>
                                <b-form-select v-model="list.list_type" :options="type"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col cols="9" class="mx-auto">
                            <b-input-group prepend="Source">
                                <b-form-input v-model="list.list_source"></b-form-input>
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
    </div>
</template>


<script>
    export default {
        name: "PullSettings",
        props: ['lists'],
        data () {
            return {
                list: {
                    // market: '',
                    list_group: '',
                    list_type: '',
                    list_source: '',
                    list_pull_date: ''
                },
                // market: [],
                group: [],
                type: [],
                source: [],
                pull_date: [],
            }
        },
        mounted() {
            this.lists.forEach(e => {
                // this.market.push(e.)
                this.group.push(e.list_group);
                this.type.push(e.list_type);
                this.source.push(e.list_source);
                this.pull_date.push(e.list_pull_date);
            });
        },
        methods: {
            checkUpdateList() {
                let obj = this.lists.find(e =>
                    e.list_group === this.list.list_group &&
                    e.list_type === this.list.list_type &&
                    e.list_source === this.list.list_source &&
                    e.list_pull_date === this.list.list_pull_date
                );

                if(!obj) {
                    this.$store.dispatch('listModule/addList', this.list)
                }

                this.$emit('pullSettingsResponse', this.list);
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
        text-align: end !important;
    }
</style>
