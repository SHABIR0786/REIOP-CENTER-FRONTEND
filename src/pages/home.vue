<template>
    <b-container fluid 
        :class="`home main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-row>
            <b-col v-for="(item, index) in cards"
                :key="index"
                md="3"
            >
                <home-card
                    :item="item"
                ></home-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import HomeCard from "@/components/home/HomeCard"

export default {
    name: "Home",
    components: {
        "home-card": HomeCard
    },
    computed: {
        ...mapGetters({
            cards: 'homeModule/cards',
            isCollapsed: 'uxModule/isCollapsed'
        })
    },
    // created () {
    //     this.$bvToast.toast('Toast body content', {
    //         title: 'title',
    //         variant: 'primary',
    //         solid: true,
    //         noAutoHide: true
    //     })
    // }
}
</script>
