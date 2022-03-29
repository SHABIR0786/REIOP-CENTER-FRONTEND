<template>
    <b-modal v-model="showModal" @close="$emit('modalResponse', false)">
        <template #modal-header>
            <div class="w-100" style="font-size: 20px;color:white " >
              Info
            </div>

        </template>
        <b-container fluid >
          <slot name="userExist"></slot>
          <slot name="noError"></slot>
        </b-container>

        <template #modal-footer>
            <div>
              <b-button @click="$emit('modalResponse', false)">Cancel</b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'SlotModal',
        props: {
            showModal: {
                type: Boolean
            },
        }
    }
</script>
<style scoped>
  >>>.modal-content{
  background: #45818E!important;
}
</style>
