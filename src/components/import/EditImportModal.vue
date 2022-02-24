<template>
    <b-modal @close="$emit('cancel')" v-model="showModalCopy" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Import
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Import Details</div>
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
                  <b-button
                      v-if="isReadOnly === true"
                      variant="primary"
                      size="md"
                      class="ml-3"
                      @click="rollback(editData)"
                  >
                    Delete
                  </b-button>
                </b-row>
                <b-row>
                  <b-col>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="User Id" class="mb-2">
                          <b-form-input readonly v-model="editData.user_id"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Subject Errors" class="mb-2">
                          <b-form-input readonly v-model="editData.error_subjects"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Phone Errors" class="mb-2">
                          <b-form-input readonly v-model="editData.error_phones"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Email Errors" class="mb-2">
                          <b-form-input readonly v-model="editData.error_emails"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Subjects" class="mb-2">
                          <b-form-input readonly v-model="editData.subjects_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Sellers" class="mb-2">
                          <b-form-input readonly v-model="editData.sellers_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Phones" class="mb-2">
                          <b-form-input readonly v-model="editData.phones_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Emails" class="mb-2">
                          <b-form-input readonly v-model="editData.emails_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Is Processing" class="mb-2">
                          <b-form-input readonly v-model="editData.pending_jobs"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Is Processed" class="mb-2">
                          <b-form-input readonly v-model="editData.is_processed"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-input-group prepend="File Name" class="mb-2">
                                <b-form-input :readonly="isReadOnly" v-model="editData.file_name"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-input-group prepend="Error Lines" class="mb-2">
                                <b-form-input :readonly="isReadOnly" v-model="editData.error_number"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                          <b-col cols="12">
                              <b-input-group prepend="Total Lines" class="mb-2">
                                  <b-form-input :readonly="isReadOnly" v-model="editData.total_row_number"></b-form-input>
                              </b-input-group>
                          </b-col>
                      </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Created At" class="mb-2">
                          <b-form-input readonly v-model="editData.created_at"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Market" class="mb-2">
                          <b-form-input :readonly="isReadOnly" v-model="editData.list_market"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Group" class="mb-2">
                          <b-form-input :readonly="isReadOnly" v-model="editData.list_group"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Type" class="mb-2">
                          <b-form-input :readonly="isReadOnly" v-model="editData.list_type"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    </b-col>
                </b-row>
              <b-row >
                <b-col cols="12">
                  <router-link class="link-label" to="/errors"><b-icon icon="exclamation-circle-fill" variant="warning"></b-icon> Click here to see Errors </router-link>
                </b-col>
              </b-row>
            </b-row>

        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
              <delete-modal :showModal="showDeleteModal" @modalResponse="rollbackImport"></delete-modal>
            </div>
        </template>
    </b-modal>

</template>
<script>
// import {mapGetters} from "vuex";
import DeleteModal from "@/components/deleteModal/DeleteModal";

export default {
    name: 'EditImportModal',
    props: {
        showModal: {
            type: Boolean,
          default: false,
        },
      data: {
          type: Object,
          default: () => {
            return {}
          }
      }
    },
  components: {

    DeleteModal,
  },

    methods: {
        edit() {
            this.isReadOnly = true;
            this.$emit('save', this.editData);
        },
        rollback(item) {
          this.showDeleteModal = true;
          this.itemToRollback = {...item}
        },
        rollbackImport (response) {
          this.showDeleteModal = false;
          if(response) {
            this.$store.dispatch('importV2Module/deleteProcess', this.itemToRollback.id);
            this.$emit('cancel');
          }
        }
    },
    data() {
        return {
          editData: {
                file_name: '',
                is_processed: '',
                is_processing: '',
                error_number: '',
                total_row_number: '',
                created_at: '',
                user_id: '',
                error_subjects: '',
                error_emails: '',
                error_phones: '',
            },
          isReadOnly: true,
          showDeleteModal: false,
          showModalCopy: false,
        }
    },

    watch: {
        showModal() {
            this.showModalCopy = this.showModal
        },
        data: {
          deep: true,
          handler() {
            this.editData = {...this.data}
          }
        }
    },
  created() {
      //this.editData = {...this.data}
      this.showModalCopy = this.showModal
  }
}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
</style>
