<template>
    <b-modal body-class="edit-modal" @close="close()" v-model="showModalCopy" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Import
            </div>
            <div>
                <b-icon @click="close()" class="close-icon" icon="x"></b-icon>
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
                            @click="editImport()">Edit</b-button>
                    <b-button
                            v-if="isReadOnly === false"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="edit()">
                            Save
                    </b-button>
                  <b-button
                      v-if="showStatus(editData) == 'Completed' && isReadOnly === true"
                      variant="primary"
                      size="md"
                      class="ml-3"
                      @click="rollback(editData)">
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
                        <b-input-group prepend="Seller Errors" class="mb-2">
                          <b-form-input readonly v-model="editData.error_sellers"></b-form-input>
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
                        <b-input-group prepend="Golden Addresses Errors" class="mb-2">
                          <b-form-input readonly v-model="editData.error_goldens"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Subjects" class="mb-2">
                          <b-form-input readonly v-model="editData.total_subjects"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Sellers" class="mb-2">
                          <b-form-input readonly v-model="editData.total_sellers"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Phones" class="mb-2">
                          <b-form-input readonly v-model="editData.total_phones"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Emails" class="mb-2">
                          <b-form-input readonly v-model="editData.total_emails"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Imported Golden Addresses" class="mb-2">
                          <b-form-input readonly v-model="editData.total_golden_addresses"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Unique Subjects" class="mb-2">
                          <b-form-input readonly v-model="editData.subjects_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Unique Sellers" class="mb-2">
                          <b-form-input readonly v-model="editData.sellers_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Unique Phones" class="mb-2">
                          <b-form-input readonly v-model="editData.phones_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Unique Emails" class="mb-2">
                          <b-form-input readonly v-model="editData.emails_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Unique Golden Addresses" class="mb-2">
                          <b-form-input readonly v-model="editData.goldens_count"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  class="mb-2 toolip-rs">
                        <b-input-group-text class="w-100">Status | 
                       {{showStatus(editData)}}
                      
                      </b-input-group-text>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  <b-row>
                      <b-col cols="12">
                        <b-input-group  class="mb-2 toolip-rs">
                        <b-input-group-text v-b-tooltip.hover.html :title="'Still Processing '+editData.pending_jobs+' Segments <br> Processed '+editData.is_processed+ ' Segments'" class="w-100">Percentage |  {{progresspercentage+'%'}}</b-input-group-text>
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
                    <!-- <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Overridden Run Month" class="mb-2">
                          <b-form-input readonly v-model="editData.overridden_run_month"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Overridden Run Year" class="mb-2">
                          <b-form-input readonly v-model="editData.overridden_run_year"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row> -->
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Market" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_market" :disabled="isReadOnly" :options="list_market_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_market"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Group" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_group" :disabled="isReadOnly" :options="list_group_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_group"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Type" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_type" :disabled="isReadOnly" :options="list_type_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_type"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Source" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_source" :disabled="isReadOnly" :options="list_source_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_source"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="editData.list_custom_field_1">
                      <b-col cols="12">
                        <b-input-group  :prepend="getCustomField('list_custom_field_1')" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_custom_field_1" :disabled="isReadOnly" :options="list_custom_field_1_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_custom_field_1"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="editData.list_custom_field_2">
                      <b-col cols="12">
                        <b-input-group  :prepend="getCustomField('list_custom_field_2')" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_custom_field_2" :disabled="isReadOnly" :options="list_custom_field_2_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_custom_field_2"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="editData.list_custom_field_3">
                      <b-col cols="12">
                        <b-input-group  :prepend="getCustomField('list_custom_field_3')" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_custom_field_3" :disabled="isReadOnly" :options="list_custom_field_3_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_custom_field_3"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="editData.list_custom_field_4">
                      <b-col cols="12">
                        <b-input-group  :prepend="getCustomField('list_custom_field_4')" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_custom_field_4" :disabled="isReadOnly" :options="list_custom_field_4_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_custom_field_4"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="editData.list_custom_field_5">
                      <b-col cols="12">
                        <b-input-group  :prepend="getCustomField('list_custom_field_5')" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_custom_field_5" :disabled="isReadOnly" :options="list_custom_field_5_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_custom_field_5"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group  prepend="Skip Source" class="mb-2">
                          <b-form-select v-if="!isReadOnly" v-model="editData.list_skip_source" :disabled="isReadOnly" :options="list_skip_source_array" required></b-form-select>
                          <b-form-input v-if="isReadOnly" :disabled="isReadOnly"  v-model="editData.list_skip_source"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Run Month" class="mb-2">
                          <b-form-input readonly v-model="editData.list_run_month"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b-input-group prepend="Run Year" class="mb-2">
                          <b-form-input readonly v-model="editData.list_run_year"></b-form-input>
                        </b-input-group>
                      </b-col>
                    </b-row>
                    </b-col>
                </b-row>
                <b-row class="pb-2">
                      <b-col cols="12">
                        <b-form-textarea
                          :readonly="isReadOnly"
                          id="textarea"
                          v-model="editData.notes"
                          placeholder="Enter notes here..."
                          rows="3"
                          max-rows="6"
                        ></b-form-textarea>
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
                <b-button variant="primary" size="sm" class="float-right" @click="close()">
                    Cancel
                </b-button>
              <delete-modal :showModal="showDeleteModal" @modalResponse="rollbackImport"></delete-modal>
            </div>
        </template>
    </b-modal>

</template>
<script>
import DeleteModal from "@/components/deleteModal/DeleteModal";
import {mapGetters} from "vuex";


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
    },lists: {
        type: Array,
        default: () => {
          return []
        }
    },
    },
    components: {
      DeleteModal,
    },

    computed: {
        ...mapGetters({
            customFieldsArray: 'labelModule/customFieldsArray',
        })
      },
  methods: {
        close(){
          this.isReadOnly = true;
          this.$emit('cancel');
        },
      showStatus(item) {
        if(item.pending_jobs == 0 && item.failed_jobs == 0) {
          return "Completed";
        } else if(item.pending_jobs != 0 && item.failed_jobs == 0){
          return "In Progress";
        }else if(item.failed_jobs != 0) {
          return "Failed";
        }
      },
        editImport() {
            this.isReadOnly = false;
            if(this.editData.list_skip_source == 'Unknown'){
              this.editData.list_skip_source = '';
            }
            if(this.editData.list_source == 'Unknown'){
              this.editData.list_source = '';
            }
        },
        edit() {
            this.isReadOnly = true;
            if(!this.editData.list_skip_source == 'Unknown'){
              this.editData.list_skip_source = '';
            }
            if(!this.editData.list_source == 'Unknown'){
              this.editData.list_source = '';
            }
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
      getCustomField(field) {
          let index = this.customFieldsArray.findIndex(x=>x.field == field);
          if(index != -1) {
            if(this.customFieldsArray[index].label) {
              return this.customFieldsArray[index].label;
            } else {
            return field;
            }
          } else {
            return field;
          }
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
                error_sellers: '',
                error_emails: '',
                error_goldens: '',
                error_phones: '',
                notes:'',
                status:'',
                list_run_month: '',
                list_run_year: '',

            },
            progresspercentage: '',
          fields: [
            {key:"mapped_from",  label: "From", sortable: true},
            {key:"mapped_to",   label: "To", sortable: true},
          ],
          isReadOnly: true,
          showDeleteModal: false,
          showModalCopy: false,
          mappedFields: [],
          list_market_array:[],
          list_source_array:[],
          list_skip_source_array:[],
          list_group_array:[],
          list_type_array:[],
          allListItems:[],
          //custom fields   
          list_custom_field_1_array:[],
          list_custom_field_2_array:[],
          list_custom_field_3_array:[],
          list_custom_field_4_array:[],
          list_custom_field_5_array:[],


        }
    },
    
    watch: {
        async showModal() {
          if(this.showModal){
            await this.$store.dispatch('labelModule/visibleCustomFields')
          }
            this.showModalCopy = this.showModal;
                this.list_market_array = [];
                this.list_source_array = [];
                this.list_skip_source_array = [];
                this.list_group_array = [];
                this.list_type_array = [];
                this.allListItems = [];
                this.allListItems = this.lists;
                this.allListItems.map((list) => {
                this.list_market_array.push(list.list_market);
                this.list_source_array.push(list.list_source);
                this.list_skip_source_array.push(list.list_skip_source);
                this.list_group_array.push(list.list_group);
                this.list_type_array.push(list.list_type);
                //custom fields   
                this.list_custom_field_1_array.push(list.list_custom_field_1);
                this.list_custom_field_2_array.push(list.list_custom_field_2);
                this.list_custom_field_3_array.push(list.list_custom_field_3);
                this.list_custom_field_4_array.push(list.list_custom_field_4);
                this.list_custom_field_5_array.push(list.list_custom_field_5);


                });
                this.list_market_array = [...new Set(this.list_market_array)];
                this.list_source_array = [...new Set(this.list_source_array)];
                this.list_group_array = [...new Set(this.list_group_array)];
                this.list_type_array = [...new Set(this.list_type_array)];
                this.list_skip_source_array = [...new Set(this.list_skip_source_array)];
                //custom fields
                this.list_custom_field_1_array = [...new Set(this.list_custom_field_1_array)];
                this.list_custom_field_2_array = [...new Set(this.list_custom_field_2_array)];
                this.list_custom_field_3_array = [...new Set(this.list_custom_field_3_array)];
                this.list_custom_field_4_array = [...new Set(this.list_custom_field_4_array)];
                this.list_custom_field_5_array = [...new Set(this.list_custom_field_5_array)];


                this.list_market_array = this.list_market_array.filter((a) => a);
                this.list_skip_source_array = this.list_skip_source_array.filter((a) => a);
                this.list_source_array = this.list_source_array.filter((a) => a);
                this.list_group_array = this.list_group_array.filter((a) => a);
                this.list_type_array = this.list_type_array.filter((a) => a);
                //custom fields
                this.list_custom_field_1_array = this.list_custom_field_1_array.filter((a) => a);
                this.list_custom_field_2_array = this.list_custom_field_2_array.filter((a) => a);
                this.list_custom_field_3_array = this.list_custom_field_3_array.filter((a) => a);
                this.list_custom_field_4_array = this.list_custom_field_4_array.filter((a) => a);
                this.list_custom_field_5_array = this.list_custom_field_5_array.filter((a) => a);


        },
      data: {
        deep: true,
        handler() {
          this.editData = {...this.data}
          console.log(this.editData);
          if(!this.editData.list_skip_source) {
            this.editData.list_skip_source = 'Unknown';
          }
          if(!this.editData.list_source) {
            this.editData.list_source = 'Unknown';
          }
          if(this.editData.notes == "undefined"){
            this.editData.notes = '';
          }
          let obj = JSON.parse(this.editData.mapped_fields);
          this.mappedFields = [];
          Object.keys(obj).forEach((key) => {
            if (obj[key] === '') {
              delete obj[key];
            }
            else{
              this.mappedFields.push({ mapped_from: key, mapped_to: obj[key] })
            }
          });
            let is_processed =  this.editData.total_jobs - this.editData.pending_jobs;
            let is_processing = this.editData.pending_jobs;
            let percentage = Math.round((is_processed / (is_processed + is_processing)) * 100);
            if(percentage > 100) {
            this.progresspercentage = 100;
            } else {
            this.progresspercentage = percentage;

            }

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
