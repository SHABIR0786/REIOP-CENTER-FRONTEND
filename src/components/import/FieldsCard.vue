<template>
    <b-card header-tag="header" :header="title" header-bg-variant="light" header-text-variant="primary" class="card">
        <div v-if="!importedFields">
            <b-form-radio-group  value-field="field" :options="tableFields" v-model="selected"  stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
        </div>
        <div v-if="importedFields" id="target-fields">
            <b-form-radio-group  value-field="field" v-model="selected" stacked @dblclick.native="$emit('dblclick',selected)" @change="$emit('selectItem', selected)">
              <template v-for="option in importedFields.subject">
              <b-form-radio @change="$emit('mapFields')" :value="option.field" :class="{ required: isRequired(option.field)  }" :key="option.field" >
               <span>
                 {{ option.label }}
               </span>
              </b-form-radio>
            </template>
            </b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.list" text-field="label" value-field="field" v-model="selected" stacked @dblclick.native="$emit('dblclick',selected)" @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.seller" text-field="label" value-field="field" v-model="selected" stacked @dblclick.native="$emit('dblclick',selected)" @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.email" v-model="selected" text-field="label" value-field="field" stacked @dblclick.native="$emit('dblclick',selected)" @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.golden_address" text-field="label" value-field="field" v-model="selected" stacked @dblclick.native="$emit('dblclick',selected)" @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.phone" text-field="label" value-field="field" v-model="selected" stacked @dblclick.native="$emit('dblclick',selected)" @change="$emit('selectItem', selected)"></b-form-radio-group>
        </div>
    </b-card>
</template>
<script>
export default {
    name: 'FieldsCard',
    props: {
        tableFields: {
            type: Array
        },
        title: {
            type: String
        },
        importedFields: {
            type: Object,
        },
        fromField:{
            type:String,
            default: ""
        },
        toField:{
          type:String,
          default: ""
        }
    },
    data () {
        return {
          selected: '',
        }
    },
  methods: {
    isRequired(item){
      if (item === 'subject_address' ||
          item === 'subject_city' ||
          item === 'subject_zip' ||
          item === 'subject_state'
      )
      return true;
    },
    removeOtherSvg(){
      document.querySelectorAll('#target-fields svg').forEach(function(Element){
        Element.closest('label').classList.add("custom-control-label");
        Element.closest('label').classList.remove("label");
        Element.remove();
      });
    }
  },
  mounted() {
    
  },
  watch:{
    fromField(){
      if (!this.fromField) {
        this.selected = ""
      }
    },
    importedFields(){
    const instance = this;
    setTimeout(function() {
    document.querySelectorAll("#target-fields input").forEach(element => {
      element.addEventListener('click',function(event){
        event.stopPropagation();
        event.stopImmediatePropagation();
      if(event.target.nextElementSibling.classList.contains("custom-control-label")) {
      instance.removeOtherSvg();
          event.target.nextElementSibling.classList.add("label");
          event.target.nextElementSibling.classList.remove("custom-control-label");
          if(!event.target.nextElementSibling.querySelector('svg')) {
          event.target.nextElementSibling.insertAdjacentHTML('afterbegin','<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="patch check fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-patch-check-fill b-icon bi"><g><path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path></g></svg>');
          }
        } else if(event.target.nextElementSibling.classList.contains("label")) {
          event.target.nextElementSibling.classList.add("custom-control-label");
          event.target.nextElementSibling.classList.remove("label");
          instance.$parent.mapFields();
        }
      });
    });
      },3000);
    },
    toField(){
      if (!this.toField) {
        this.selected = ""
      }
    }

  },
}
</script>
<style>
    .card {
        word-break: break-word;
    }
    .target-label {
        display: inline-block;
        margin-top: 12.5px;
        font-weight: bold;
    }
    .custom-control-label svg  {
      display:none !important;
    }
    #target-fields .label {
    display: inline;
    left: 0px;
    position: absolute;
    }
    #target-fields .label span{
    margin-left: 3.5px
    }
</style>
