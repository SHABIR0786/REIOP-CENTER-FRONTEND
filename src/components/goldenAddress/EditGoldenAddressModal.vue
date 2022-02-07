<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Golden Address
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Golden Details</div>
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
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Golden Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="goldenAddress.golden_address_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Golden City" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="goldenAddress.golden_address_city"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Golden State" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="goldenAddress.golden_address_state"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Golden Zip" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="goldenAddress.golden_address_zip"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>

                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Golden Full Address" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="goldenAddress.golden_address_full_address"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Golden Address Line 2" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="goldenAddress.golden_address_address_line2"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Name" class="mb-2">
                                    <b-form-input readonly v-model="goldenAddress.user_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Id" class="mb-2">
                                    <b-form-input readonly v-model="goldenAddress.seller_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
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
            </div>
        </template>
    </b-modal>
</template>
<script>
export default {
    name: 'EditGoldenAddressModal',
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
            this.$emit('save', this.goldenAddress);
        }
    },
    data() {
        return {
            goldenAddress: {
                golden_address_address: '',
                golden_address_city: '',
                golden_address_state: '',
                golden_address_zip: '',
                golden_address_full_address: '',
                golden_address_address_line2: '',
                user_id: '',
                seller_id: '',
            },
            isReadOnly: true
        }
    },
    watch: {
        showModal() {
            this.goldenAddress = { ...this.propsData }
        }
    }

}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
</style>
