<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Type
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center col-12">
                    <b-col cols="12">
                        <b-input-group prepend="Type In File" class="mb-2">
                            <b-form-input v-model="types.type_in_file"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
              <b-row class="mb-1 text-center col-12">
                <b-col  cols="12">
                  <b-input-group  prepend="Type In Web">
                    <b-form-input v-model="types.type_in_web"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="$emit('cancel')"
                >
                    Cancel
                </b-button>
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right mr-2"
                        @click="$emit('add', types)"
                >
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'AddTypeModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        data() {
            return {
                types: {
                    type_in_file: '',
                    type_in_web: '',
                },
            }
        },
        watch: {
            showModal() {
                this.types.type_in_file = '';
                this.types.type_in_web = '';
            }
        }
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
