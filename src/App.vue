<template>
<div id="app">
    <div v-if="isLogged">
        <b-row class="nav-bar">
            <nav-bar></nav-bar>
        </b-row>
        <side-bar></side-bar>
        <router-view :key="$route.path"></router-view>
        <loader></loader>
    </div>
    <router-view v-else></router-view>
</div>
</template>

<script>
import AWS from 'aws-sdk';
import SideBar from "@/components/shared/SideBar";
import NavBar from "@/components/shared/NavBar";
import Loader from "@/components/shared/Loader";
import {
    mapGetters
} from "vuex";

export default {
    name: 'App',
    components: {
        "side-bar": SideBar,
        "nav-bar": NavBar,
        "loader": Loader
    },
    computed: {
        ...mapGetters({
            isLogged: 'loginModule/isLogged',
            authUser: 'loginModule/getAuthUser',
        })
    },
    data() {
        return {
            moduleName: '',
        }
    },
    created() {
            AWS.config.apiVersions = {
            sns: '2010-03-31',
            // other service API versions
            };
            AWS.config.region = 'us-east-1';
            AWS.config.credentials = {
                accessKeyId: 'AKIA2FOP2IWZEOJGAH5B',
                secretAccessKey: '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',
            }
            var sns = new AWS.SNS();
            var params = {
            Protocol: 'http', /* required */
            TopicArn: 'arn:aws:sns:us-east-1:698904888754:importprogress', /* required */
            Endpoint: 'http://35.168.201.49/',
            ReturnSubscriptionArn: false
            };
            sns.subscribe(params, function(err, data) {
                console.log(data);
            // if (err) console.log(err, err.stack); // an error occurred
            // else     console.log(data);           // successful response
            });
            //             var paramss = {
            //                   SubscriptionArn: 'arn:aws:sns:us-east-1:698904888754:importprogress' /* required */};
            // sns.getSubscriptionAttributes(paramss, function(err, data) {
            //   if (err) console.log(err, err.stack); // an error occurred
            //   else     console.log(data);           // successful response
            // });




        if (localStorage.getItem('accessToken') && localStorage.getItem('authUser')) {
            this.$store.commit('loginModule/SIGN_IN', {
                vm: this,
                user: JSON.parse(localStorage.getItem('authUser')),
                token: localStorage.getItem('accessToken')
            })
        }
    },
    watch: {
        '$route'(to, from) {
            switch (from.name) {
                case "Import":
                    this.moduleName = 'importModule'
                    break;
                case "Subject":
                    this.moduleName = 'subjectModule'
                    break;
                case "Seller":
                    this.moduleName = 'sellerModule'
                    break;
                case "PhoneNumber":
                    this.moduleName = 'phoneNumberModule'
                    break;
                case "Properties":
                    this.moduleName = 'propertyModule'
                    break;
                case "List":
                    this.moduleName = 'listModule'
                    break;
                case "Email":
                    this.moduleName = 'emailModule'
                    break;
                case "GoldenAddress":
                    this.moduleName = 'goldenAddressModule'
                    break;
            }
            if (this.moduleName) {
                this.$store.dispatch(`${this.moduleName}/deleteVuexStore`)
            }
        }
    }
}
</script>

<style>
.nav-bar {
    height: 56px;
}

.modal .modal-huge {
    max-width: 90%;
    width: 90%;
}

.modal .modal-large {
    max-width: 80%;
    width: 80%;
}
</style>
