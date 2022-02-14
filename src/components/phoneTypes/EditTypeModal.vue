<template>
    <b-modal v-model="showModal" size="md" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Type
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Type</div>
                    <b-button
                            v-if="isReadOnly"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="isReadOnly = false"
                    >
                        Edit
                    </b-button>
                    <b-button
                            v-if="isReadOnly === false"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="edit()"
                    >
                        Save
                    </b-button>
                </b-row>
                <b-row>
                    <b-col>
                        <b-row>
                          <b-col cols="12">
                            <b-input-group prepend="Type In File" class="mb-2">
                              <b-form-input :readonly="isReadOnly" v-model="types.type_in_file"></b-form-input>
                            </b-input-group>
                          </b-col>
                        </b-row>
                      <b-row class="mb-1 text-center">
                        <b-col cols="12">
                          <b-input-group prepend="Type In Web" class="mb-2">
                            <b-form-input :readonly="isReadOnly" v-model="types.type_in_web"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
            </div>
        </template>

    </b-modal>
</template>
<script>


    export default {
        name: 'EditTypeModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        methods: {
            edit() {
                this.isReadOnly = true;
                this.$emit('save', this.types);
            },

        },
        data() {
            return {
                types: {
                    name: ''
                },
                isReadOnly: true,
                // showAddMemberModal: false,
            }
        },
        watch: {
            showModal() {
                this.types= {...this.propsData}
            }
        }

    }
</script>
<style scoped>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .add-member {
        width: 250px;
    }
</style>
