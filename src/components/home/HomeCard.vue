<template>
    <b-card class="mb-5">
        <b-card-text>
            <router-link
                :to="item.path"
                class="d-flex"
            >
                <b-badge
                    class="circle"
                    :variant="item.variant"
                >
                    <b-icon
                        :icon="item.icon">
                    </b-icon>
                </b-badge>
                <span>
                    <h4>{{item.counter}}</h4>
                    <p class="detail">{{item.text}}</p>
                </span>     
            </router-link>                                           
        </b-card-text>
    </b-card>
</template>

<script>
import { BIcon } from "bootstrap-vue"

export default {
    name: "HomeCard",
    props: {
        item: {
            type: Object
        }
    },
    components: {
        "b-icon": BIcon,
    },
}
</script>