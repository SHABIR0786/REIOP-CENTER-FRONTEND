<template>
    <b-modal body-class="edit-modal" @close="$emit('cancel')" v-model="showModalCopy" size="xl" centered no-close-on-backdrop>
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
                        <b-input-group prepend="Imported Golden Addresses" class="mb-2">
                          <b-form-input readonly v-model="editData.goldens_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Is Processing" class="mb-2">
                          <b-form-input readonly v-model="editData.pending_jobs"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
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

                  <div class="mr-2 cursor-pointer" @click="showErrors(editData)">
                    <b-icon icon="exclamation-circle-fill" variant="warning"></b-icon> Click here to see Errors </div>
                </b-col>
              </b-row>
            </b-row>
        </b-container>
        <div id="mapped-fields" class="w-100 mb-3 p-3 mt-3">
          Mapped Fields
        </div>
        <b-table
            id="list-table"
            small
            sort-icon-left
            striped
            hover
            :fields="fields"
            :items="mappedFields"
            responsive
            :sticky-header="true"
        >
          <template #table-busy>
            <div class="text-center" my-2>
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
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
        },
      showErrors(item) {
        const route = '/errors?id=' + item.id;
        this.editedItem = { ...item }
        let routeData = this.$router.resolve({path: route});
        window.open(routeData.href, '_blank');
      },
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
          fields: [
            {key:"mapped_from",  label: "From", sortable: true},
            {key:"mapped_to",   label: "To", sortable: true},
          ],
          isReadOnly: true,
          showDeleteModal: false,
          showModalCopy: false,
          mappedFields: [],
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
          let obj = JSON.parse(this.editData.mapped_fields);
          Object.keys(obj).forEach((key) => {
            if (obj[key] === '') {
              delete obj[key];
            }
            else{
              this.mappedFields.push({ mapped_from: key, mapped_to: obj[key] })
            }
          });
        }
      }
    },
    created() {
        //this.editData = {...this.data}
        this.showModalCopy = this.showModal
    }
}
</script>
<style scoped>
    >>>.close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    >>> #mapped-fields{
      background-color: #e4f2f2e0!important;
    }
    >>> .edit-modal {
      max-height: 62vh;
      overflow-y: auto;
    }
</style>
