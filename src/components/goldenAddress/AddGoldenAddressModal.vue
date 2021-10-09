<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Golden Address
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Golden Address" class="mb-2">
                            <b-form-input v-model="goldenAddress.golden_address_address"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Golden City" class="mb-2">
                            <b-form-input v-model="goldenAddress.golden_address_city"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Golden State" class="mb-2">
                            <b-form-input v-model="goldenAddress.golden_address_state"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Golden Zip" class="mb-2">
                            <b-form-input v-model="goldenAddress.golden_address_zip"></b-form-input>
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
                        @click="$emit('save', goldenAddress)"
                >
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'AddGoldenAddressModal',
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
                goldenAddress: {
                    golden_address_address: '',
                    golden_address_city: '',
                    golden_address_state: '',
                    golden_address_zip: ''
                },
            }
        },
        watch: {
            showModal() {
                this.goldenAddress = { ...this.propsData }
            }
        }

    }
</script>
