<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Phone Number
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Phone Details</div>
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
                                <b-input-group prepend="Phone Number" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.phone_number"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Phone Type" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.phone_type"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Phone Validity" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.phone_validity"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Skip Source" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="phoneNumber.skip_source"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Id" class="mb-2">
                                    <b-form-input readonly v-model="phoneNumber.user_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Seller Id" class="mb-2">
                                    <b-form-input readonly v-model="phoneNumber.seller_id"></b-form-input>
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
    name: 'PhoneNumberModal',
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
            this.$emit('save', this.phoneNumber);
        }
    },
    data() {
        return {
            phoneNumber: {
                phone_number: '',
                phone_type: '',
                phone_validity: '',
                skip_source: '',
                user_id: '',
                seller_id: '',
            },
            isReadOnly: true
        }
    },
    watch: {
        showModal() {
            this.phoneNumber = {...this.propsData}
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
