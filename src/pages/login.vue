<template>
    <div>
        <b-card class="mx-auto mt-5" style="max-width: 500px">
            <b-form @submit="onSubmit">
                <div class="mx-auto text-center">
                    <img style="max-width: 250px" src="@/assets/images/logo.png">
                </div>
                <b-form-group label="Email" >
                    <b-form-input
                        v-model="form.email"
                        placeholder="Enter email"
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
            isLogged: 'loginModule/isLogged'
        })
    },
    data () {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    mounted () {
        if (this.isLogged) {
            this.$router.push({name: 'Home'}).catch(() => {})
        }
    },
    methods: {
        async onSubmit (event) {
            event.preventDefault()
            await this.$store.dispatch('loginModule/login', {vm : this, ...this.form})
            if (this.isLogged) { this.$router.push({name: 'Home'}).catch(() => {}) }
        }
    }
}
</script>
