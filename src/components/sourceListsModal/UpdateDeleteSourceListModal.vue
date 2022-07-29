<template>
<b-modal v-model="showModal" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Update {{ modalTitle }} List Before Delete <br>
            <small v-if="itemTo_Delete.table_name!=''">Because, this list {{ modalTitle }} is used in multiple modules like <span class="text-danger">{{itemTo_Delete.table_name}}</span> .</small>
            <small v-else>The source that you have to delete is not using in any module.</small>
        </div>
    </template>
        <b-container fluid>

                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Select" id="id" name="id"  class="mb-2">
                          <b-form-select v-model="list.id" :options="teamitems" :state="validateState('id')" required></b-form-select>
                            <b-form-invalid-feedback id="id" class="text-center">List {{ modalTitle }} Field is Required.</b-form-invalid-feedback>

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
                    Update
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
    name: 'UpdateDeleteSourceListModal',
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
        itemToDelete: {
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
            table_name:'',
            teamitems: [],
            allteamitems: [],
            itemTo_Delete:{},

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
                this.list.previous_id = this.itemTo_Delete.id;
                this.list.delete_list_type = this.itemTo_Delete.delete_list_type;       
           this. $emit('update_source_delete', this.list);
        },
    },
    watch: {
        showModal() {
            if(this.showModal){
                this.table_name='';
                this.teamitems= [];
                this.allteamitems= [];
                this.itemTo_Delete={};
                this.allteamitems = this.propsData;
            
                this.itemTo_Delete = this.itemToDelete;

                if(this.itemTo_Delete.delete_list_type == "list_source"){
                    this.allteamitems.map((list) => {
                        if(this.itemTo_Delete.id !=  list.id){
                            this.teamitems.push({
                            value: list.id,
                            text: list.list_source
                            });
                        }
                        
                    });
                }else if(this.itemTo_Delete.delete_list_type == "list_skip_source"){
                    this.allteamitems.map((list) => {
                        if(this.itemTo_Delete.id !=  list.id){
                            this.teamitems.push({
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
