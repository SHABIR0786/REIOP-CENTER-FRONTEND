<template>
<b-modal v-model="showModal" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Add Type
        </div>
    </template>
    <b-container fluid>
        <b-row class="text-center">
                <b-col cols="12">
                    <b-input-group prepend="New Type" class="mb-2" id="company_type" label="New Type" label-for="company_type">
                            <b-form-input :state="validateState('company_type')" aria-describedby="company_type" type="text" v-model="$v.companyTypes.company_type.$model" required></b-form-input>
                            <b-form-invalid-feedback id="company_type">Company Type Field is Required.</b-form-invalid-feedback>
                    </b-input-group>
                </b-col>
            </b-row>
    </b-container>
    <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Add
                </b-button>
            </div>
    </template>
</b-modal>
</template>

<script>
import {
    validationMixin
} from "vuelidate";
import {
    required
} from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
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
            companyTypes: {
                company_type: '',
            },
        }
    },
    validations: {
        companyTypes: {
            company_type: {
                required
            }
        }
    },
    methods: {
        validateState(name) {
            const {
                $dirty,
                $error
            } = this.$v.companyTypes[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.companyTypes.$touch();
            if (this.$v.companyTypes.$anyError) {
                return;
            }
            this.$emit('add', this.companyTypes);
            this.companyTypes.company_type = '';
            this.$v.companyTypes.$reset();
        }
    }
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
</style>
