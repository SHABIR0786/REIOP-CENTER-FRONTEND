<template>
    <b-modal v-model="showModal" @close="$emit('modalResponse', false)">
        <template #modal-header>
            <div class="w-100" style="font-size: 20px;color:white " v-if="isHaveMappedItems ">
              Confirm
            </div>
            <div class="w-100"  style="font-size: 20px;color:white " v-else>
              Error!
            </div>
        </template>
        <b-container fluid v-if="isHaveMappedItems && !isSkipTrace && !isSkipValidate">
            <h4 class="text-center">Are you ready to upload this spreadsheet?</h4>
        </b-container>

        <b-container fluid v-if="!isHaveMappedItems && !isSkipTrace && !isSkipValidate && !isCombinedImport">
          <h5 class="text-sm-center"> There are required fields you must map:<br>
            subject_address, subject_city,<br>
            subject_state, subject_zip </h5>
        </b-container>

      <b-container fluid v-if="isHaveMappedItems && isSkipTrace">
        <h4 class="text-center">Are you ready skip trace data?</h4>
      </b-container>

      <b-container fluid v-if="!isHaveMappedItems && isSkipTrace">
        <h4 class="text-center">You must map a full mailing address, full subject address, or both before being able to import skip traced data.</h4>
      </b-container>

      <b-container fluid v-if="!isHaveMappedItems && isSkipValidate">
        <h4 class="text-center">Please map either "email and email validity" pair or "phone and phone validity" pair or all options together</h4>
      </b-container>
      <b-container fluid v-if="!isHaveMappedItems && isCombinedImport">
        <h4 class="text-center">You must map a <br> list_type, list_group, list_market, list_source, list_pull_date, run_month, run_year <br> before being able to import combined data.</h4>
      </b-container>
      <b-container fluid v-if="isHaveMappedItems && isSkipValidate">
        <h4 class="text-center">Are you ready to validate data?</h4>
      </b-container>
        <template #modal-footer>
            <div class="w-100" v-if="isHaveMappedItems ">
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="$emit('modalResponse', false)"
                >
                    No
                </b-button>
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right mr-2"
                        @click="$emit('modalResponse', true)"
                >
                    Yes
                </b-button>
            </div>
            <div v-else>
              <b-button @click="$emit('modalResponse', false)">Cancel</b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
 // import { mapGetters } from 'vuex';
    export default {
        name: 'ConfirmModal',
        props: {
            showModal: {
                type: Boolean
            },
          isHaveMappedItems: {
              type: Boolean,
            default: false,
          },
          isSkipValidate: {
              type: Boolean,
            default: false,
          },
          isSkipTrace: {
              type: Boolean,
            default: false,
          },
          isCombinedImport: {
            type: Boolean,
            default: false,
          },
        },
    }
</script>
<style scoped>
  >>>.modal-content{
  background: #45818E!important;
}
</style>
