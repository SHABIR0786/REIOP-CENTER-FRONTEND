<template>
    <b-row>
        <b-col cols="5">
            <b-form-select class="select" v-model="fieldToFilter" :options="field_options"></b-form-select>
        </b-col>
        <b-col cols="3">
            <b-form-select v-if="fieldToFilter" v-model="containOption" :options="contains_options" class="select"></b-form-select>
        </b-col>
        <b-col cols="3">
            <b-form-input v-if="fieldToFilter" v-model="fieldToFilterValue" onchange="" class="select"></b-form-input>
        </b-col>
        <b-col cols="1" class="d-flex align-items-center">
            <b-icon v-if="is_single" @click="deleteFilter()" icon="trash"></b-icon>
        </b-col>
    </b-row>
</template>

<script>
    export default {
      name: 'ConditionalFilter',
      props: ['index', 'is_single'],
      data() {
          return {
              selected: '',
              containOption: '',
              fieldToFilter: '',
              fieldToFilterValue: '',
              field_options: [
                  { value: 'list_type', text: 'List Type' },
                  { value: 'list_group', text: 'List Group' },
                  { value: 'list_market', text: 'List Market' },
                  { value: 'list_source', text: 'List Source' },
                  // { value: 'subject_address', text: 'Subject Address' },
                  // { value: 'subject_address_line2', text: 'Subject Address Line 2' },
                  // { value: 'subject_city', text: 'Subject City' },
                  // { value: 'subject_state', text: 'Subject State' },
                  // { value: 'subject_zip', text: 'Subject Zip' },
                  // { value: 'subject_county', text: 'Subject Country' },
                  // { value: 'subject_market', text: 'Subject Market' },
                  // { value: 'subject_age', text: 'Subject Age' },
                  // { value: 'subject_type', text: 'Subject Type' },
                  { value: 'seller_first_name', text: 'Seller First Name' },
                  { value: 'seller_last_name', text: 'Seller Last Name' },
                  { value: 'seller_middle_name', text: 'Seller Middle Name' },
                  { value: 'seller_mailing_address', text: 'Seller Mailing Address' },
                  { value: 'seller_mailing_state', text: 'Seller Mailing State' },
                  { value: 'seller_mailing_city', text: 'Seller Mailing City' },
                  { value: 'seller_mailing_zip', text: 'Seller Mailing Zip' }
              ],
              test: 'Hello world',
              contains_options: [
                  { value: 'contains', text: 'Contains' },
                  // { value: 'not_contains', text: 'Not Contains' },
                  // { value: 'is_empty', text: 'Is Empty' },
                  // { value: 'is_not_empty', text: 'Is Not Empty' },

              ],
          }
      },
      methods: {
        deleteFilter() {
            this.$emit('deleteConditionalFilter', this.index)
        },
        handleChange() {
          this.$emit('deleteConditionalFilter', {key: this.fieldToFilter, condition: 'contains', value: ''})
        }
      },
      watch: {
        fieldToFilterValue(value) {
          this.$emit('triggerConditionalFilter', {key: this.fieldToFilter, condition: 'contains', value: value})
        }
      }
    }
</script>

<style scoped>
    .select {
        width: 70% !important;
    }
</style>
