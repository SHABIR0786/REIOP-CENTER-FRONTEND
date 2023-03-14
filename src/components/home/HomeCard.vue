<template>
    <b-card class="mb-5">
        <b-card-text>
            <router-link :to="item.path" class="d-flex">
                <b-badge class="circle" :variant="item.variant">
                    <b-icon :icon="item.icon"></b-icon>
                </b-badge>  
                <div>
                    <h4>{{item.counter}}</h4>
                    <p class="detail">{{item.text}}</p>
                </div>
            </router-link>
        </b-card-text>
    </b-card>
</template>

<script>
import { BIcon } from "bootstrap-vue"

export default {
    name: "HomeCard",
    components:{
    "b-icon": BIcon,
    },
    props: {
        item: {
            type: Object
        }
    },
    data() {
        return {
        }
    }
}
</script>
