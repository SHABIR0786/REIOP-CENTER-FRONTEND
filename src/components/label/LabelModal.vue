<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">Custom Field</div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Field" class="mb-2">
                            <b-form-input v-model="label.field" disabled></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2">
                            <b-form-input v-model="label.label"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Type" class="mb-2">
                             <b-form-select v-model="label.type" aria-describedby="role-id" :options="labelTypes" required>
                            </b-form-select>
                        </b-input-group>

                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Description" class="mb-2">
                            <b-form-input v-model="label.description"></b-form-input>
                        </b-input-group>
                    </b-col>
            </b-row>

            <div>
                <b-form-checkbox :readyonly="readyonly" :disabled="readyonly" v-model="label.visible">Show this field in Import section</b-form-checkbox>
            </div>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">Cancel</b-button>
                <b-button variant="primary" size="sm" class="float-right mr-2" @click="$emit('save', label)">Save</b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'EmailModal',
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
                label: {
                    label: '',
                    description: '',
                    visible: false,
                },
                labelTypes: ["String","Number","Date","Boolean","Options"],
                readyonly: false,
                readonlyfields: [
                    "list_type",
                    "list_group",
                    "list_market",
                    "list_source",
                    "list_run_mont",
                    "list_run_year",
                    "list_stack",
                    "seller_first_name",
                    "seller_last_name",
                    "seller_full_name",
                    "seller_middle_name",
                    "seller_mailing_address",
                    "seller_mailing_city",
                    "seller_mailing_state",
                    "seller_mailing_zip",
                    "Seller_mailing_address_line2",
                    "seller_company_owned",
                    "subject_address",
                    "subject_address_line2",
                    "subject_city",
                    "subject_state",
                    "subject_zip",
                    "subject_county",
                    "subject_market",
                    "subject_age",
                    "subject_type",
                    "phone_number",
                    "phone_type",
                    "phone_validity",
                    "phone_skip_source",
                    "email_address",
                    "email_validity",
                    "email_skip_source",
                    "golden_address_address",
                    "golden_address_city",
                    "golden_address_State",
                    "golden_address_address_line2",
                    "golden_address_zip"
                ],
            }
        },
        watch: {
            showModal() {
                this.label = {...this.propsData}
                if(this.readonlyfields.includes(this.label.field)) {
                    this.readyonly  = true;
                } else {
                    this.readyonly = false;
                }
                if (this.propsData.visible ===  1) {
                    this.label.visible = true;
                }
            }
        }
    }
</script>
