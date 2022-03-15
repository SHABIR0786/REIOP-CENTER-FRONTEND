<template>
    <b-modal v-model="showModal" @close="$emit('modalResponse', false)">
        <template #modal-header>
            <div class="w-100">
                Confirm
            </div>
        </template>
        <b-container fluid v-if="isHaveMappedItems">
            <h4>Are you ready to upload this spreadsheet?</h4>
        </b-container>
        <b-container fluid v-else>
          <h4> You not have any mapped fields </h4>
        </b-container>
        <template #modal-footer>
            <div class="w-100" v-if="isHaveMappedItems">
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
    export default {
        name: 'ConfirmModal',
        props: {
            showModal: {
                type: Boolean
            },
          isHaveMappedItems: {
              type: Boolean,
            default: false,
          }
        }
    }
</script>
