<template>
    <div>
        <b-card class="mx-auto mt-5" style="max-width: 500px">
            <b-form @submit="onSubmit">
                <div class="mx-auto text-center">
                    <img style="max-width: 300px" src="@/assets/images/REI_OP-Center.png">
                </div>
                <p class="mx-auto text-center h6">Reset Password</p>
                <b-form-group label="Password">
                    <b-form-input
                        v-model="form.password"
                        type="password"
                        placeholder="Enter Password"
                        required
                        minLength="6"
                        name="password"
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Repeat Password">
                    <b-form-input
                        v-model="form.password_repeat"
                        type="password"
                        name="password_repeat"
                        placeholder="Enter Password Again"
                        required
                        minLength="6"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" :disabled="please_wait">Submit</b-button>
                <router-link class="primary ml-3 small text-underline" to="/login">Login</router-link>
                <br>
                <small class="text-primary" v-if="please_wait">Plesae Wait...</small>

            </b-form>
        </b-card>
    </div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
    name: "resetPassword",
    computed: {
        ...mapGetters({
            isLogged: 'loginModule/isLogged',
            isReset: 'loginModule/isReset'

        })
    },
    data () {
        return {
            form: {
                password: '',
                password_repeat: '',
                id:'',
                email:'',
                time:''
            },
            please_wait:false,

        }
    },

    mounted () {
        if (this.isLogged) {
            this.$router.push({name: 'Home'}).catch(() => {})
        }
        try {
            if(this.$route.query.id) { this.form.id = this.$route.query.id }
            if(this.$route.query.email) { this.form.email = this.$route.query.email }
            if(this.$route.query.time) { this.form.time = this.$route.query.time }            

        } catch (error) {
            console.log('error',error); 
        }
    },
    methods: {
        async onSubmit (event) {
            event.preventDefault();
            this.please_wait=true;
            
            if(this.form.id==''||this.form.email==''||this.form.time==''){
                this.$bvToast.toast("Data is missing from URL." , {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                this.please_wait=false;
                return ;
            }

            if(this.form.password!=this.form.password_repeat){
                this.$bvToast.toast("Both Password are not Matched." , {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                this.please_wait=false;
                return ;
            }

            await this.$store.dispatch('loginModule/resetPassword', {vm : this, form:this.form})
            this.please_wait=false;
            setTimeout(() => {
                if (this.isReset) { this.$router.push({name: 'Login'}).catch(() => {}) }
            }, 2000);

        }
    }
}
</script>
<style scoped>
    .text-underline{
        text-decoration: underline;
    }
</style>
