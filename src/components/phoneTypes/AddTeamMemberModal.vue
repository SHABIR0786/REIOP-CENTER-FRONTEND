<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Team Member
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="User Email" class="mb-2">
                            <b-form-input :state="user.email.length > 0" type="email" v-model="user.email"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="User Password" class="mb-2">
                            <b-input v-model="user.password"></b-input>
                        </b-input-group>
                        <b-form-text class="input-helper">At Least 6 Characters</b-form-text>
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
                        :disabled="user.password.length < 6"
                        class="float-right mr-2"
                        @click="$emit('add', user)"
                >
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'AddTeamMemberModal',
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
                user: {
                    email: '',
                    password: '',
                },
            }
        },
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
