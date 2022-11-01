<template>
<b-modal v-model="showModal" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
                Merge {{ modalTitle }} with other Source<br>
            <!-- <small>To merge this {{ modalTitle }} into another {{ modalTitle }} select the new {{ modalTitle }} and it will show on all items this {{ modalTitle }} currently relates to. </small> -->
            <small v-if="itemTo_Merge.table_name!=''">The source that you have to merge is using in multiple modules like <span class="text-danger">{{itemTo_Merge.table_name}}</span> .</small>
            <small v-else>The source that you have to merge is not using in any module.</small>

        </div>
    </template>
        <b-container fluid>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Select" id="id" name="id"  class="mb-2">
                          <b-form-select v-model="list.id" :options="list_items" :state="validateState('id')" required></b-form-select>
                            <b-form-invalid-feedback id="id" class="text-center">{{ modalTitle }} Field is Required.</b-form-invalid-feedback>
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
                    Merge
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required
} from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
    name: 'MergeWithOtherSourceModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Array
        },
        modalTitle: {
              type: String
            },
        itemToMerge: {
            type: Object
        }
    },
    data() {
        return {
            perPage: 20,
            list: {
                id: '',
                previous_id: '',

                
            },
            list_items: [],
            allListItems: [],
            itemTo_Merge:{},

        }
    },
    validations: {
        list: {
            id: {
                required
            },
            
        }
    },

    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.list[name];
            return $dirty ? !$error : null;
        },

        onSubmit() {
            this.$v.list.$touch();
            if (this.$v.list.$anyError) {
                return;
            }
                this.list.previous_id = this.itemTo_Merge.id;
                this.list.merge_list_type = this.itemTo_Merge.merge_list_type;            
           this.$emit('merge_source_other', this.list);
        },
    },
    watch: {
        showModal() {
            if(this.showModal){
                this.list_items = [];
                this.allListItems = [];
                this.itemTo_Merge = {};
                this.allListItems = this.propsData;
            
                this.itemTo_Merge = this.itemToMerge;                
                if(this.itemTo_Merge.merge_list_type == "list_source"){
                    this.allListItems.map((list) => {
                        if(list.list_source){
                            this.list_items.push({
                            value: list.id,
                            text: list.list_source
                            });
                        }
                        
                    });
                }else if(this.itemTo_Merge.merge_list_type == "list_skip_source"){
                    this.allListItems.map((list) => {
                        if(this.itemTo_Merge.id !=  list.id){
                            this.list_items.push({
                            value: list.id,
                            text: list.list_skip_source
                            });
                        }
                        
                    });
                }
                
                this.list.id = '';
            }

        },
    },
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
.list-group-row .list-group{
    overflow-y: scroll;
    max-height:200px;
}
.trash-icon{
    float:right;
    cursor:pointer;
}
</style>
