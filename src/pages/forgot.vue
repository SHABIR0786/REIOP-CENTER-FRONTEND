<template>
    <div>
        <b-card class="mx-auto mt-5" style="max-width: 500px">
            <b-form @submit="onSubmit">
                <div class="mx-auto text-center">
                    <img style="max-width: 300px" src="@/assets/images/REI_OP-Center.png">
                </div>
                <p class="mx-auto text-center h6">Forgot Password</p>
                <b-form-group label="Email" >
                    
                    <b-form-input
                        v-model="form.email"
                        placeholder="Enter email"
                        required
                        type="email"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary" :disabled="please_wait">Send Link</b-button>
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
    name: "Forgot",
    computed: {
        ...mapGetters({
            isLogged: 'loginModule/isLogged',

        })
    },
    data () {
        return {
            form: {
                email: '',
            },
            please_wait:false,
        }
    },
    mounted () {
        if (this.isLogged) {
            this.$router.push({name: 'Home'}).catch(() => {})
        }
    },
    methods: {
        async onSubmit (event) {
            event.preventDefault();
            this.please_wait=true;
            await this.$store.dispatch('loginModule/forgot', {vm : this, ...this.form})
            this.please_wait=false;
        }
    }
}
</script>
<style scoped>
    .text-underline{
        text-decoration: underline;
    }
</style>
