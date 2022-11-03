<template>
    <b-modal v-model="showModal">
        <template #modal-header>
            <div class="w-100">
                {{header}}
            </div>
        </template>
        <b-container fluid>
            <h4>{{title}}</h4>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="$emit('modalResponse', false)"
                >
                    Cancel
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
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'DeleteModal',
        props: {
            showModal: {
                type: Boolean
            },
            title:{
                type: String,
                default: "Are you sure You want to delete this item?",
            },
            header:{
                type: String,
                default: "Delete",
            }
        }
    }
</script>
