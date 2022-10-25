<template>
    <b-modal v-model="showModal" no-close-on-backdrop scrollable>
        <template #modal-header>
            <div class="w-100">
                Add Team
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Team Name" class="mb-2">
                            <b-form-input v-model="team.name"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Owner Email" class="mb-2">
                            <b-form-input :state="isNameStateValid" type="email" v-model="team.owner"></b-form-input>
                        </b-input-group>
                      <b-form-text class="input-helper" id="invalid_email" v-if="emailInvalid">email is not valid</b-form-text>
                    </b-col>
                </b-row>
              <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Owner Password" class="mb-2">
                            <b-input v-model="team.owner_password"></b-input>
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
                        :disabled="team.owner_password.length < 6 || team.owner.length < 1"
                        class="float-right mr-2"
                        @click="validate(team)"
                >
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'AddTeamModal',
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
                team: {
                    name: '',
                    owner: '',
                    owner_password: '',
                },
              emailInvalid: false,
              try:false,
            }
        },
      methods: {
        validate(team){
          if (this.isNameStateValid){
            this.try = false
            this.$emit('add', team);
          }else {
            this.emailInvalid = true
            this.try = true
          }
        },
        isValid() {
          return this.team.owner.length > 3 && /.+@.+\..+/.test(this.team.owner) ;
        }
      },
      computed: {
        isNameStateValid() {
          if (this.team.owner) {
            return this.isValid(this.name);
          }
          return null;
        },

        ...mapGetters({
          existTeamData: 'teamModule/existTeam'
          })

      },
        watch: {
          existTeamData(){
            this.team.name = this.existTeamData.name
            this.team.owner = this.existTeamData.owner
          },
          showModal() {
            if (!this.showModal) {
              this.team = {
                name: '',
                owner: '',
                owner_password: '',
              }
              this.try = false;
              this.emailInvalid = false;
            }
          },
          isNameStateValid : {
            handler:function(){
              if (this.try && this.team.owner) {
                this.emailInvalid = !this.isValid(this.team.owner.name);
              }
              return null;
            },
            deep:true
          }
        }
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
    #invalid_email{
      color: #dc3545!important;
    }
</style>
