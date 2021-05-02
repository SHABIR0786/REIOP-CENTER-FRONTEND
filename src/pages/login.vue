<template>
    <div>
        <b-card class="mx-auto mt-5" style="max-width: 500px">
            <b-form @submit="onSubmit">
                <div class="mx-auto text-center">
                    <img style="max-width: 250px" src="@/assets/images/logo.png">
                </div>
                <b-form-group label="Username" >
                    <b-form-input
                        v-model="form.username"
                        placeholder="Enter username"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Password">
                    <b-form-input                        
                        v-model="form.password"
                        type="password"
                        placeholder="Enter Password"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-card>
    </div>    
</template>
<script>
import { mapGetters } from "vuex"

export default {
    name: "Login",
    computed: {
        ...mapGetters({
            isLogin: 'loginModule/isLogin'
        })
    },
    data () {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    mounted () {
        if(this.isLogin)
            this.$router.push({name: 'HomePage'})
    },
    methods: {
        async onSubmit (event) {
            event.preventDefault()
            await this.$store.dispatch('loginModule/login', {...this.form})
            if(this.isLogin) this.$router.push({name: 'HomePage'})
        }
    }
}
</script>