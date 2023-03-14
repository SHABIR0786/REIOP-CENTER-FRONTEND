<template>
    <b-container fluid :class="`home main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-row v-if="!adminMode">
            <b-col v-for="(item, index) in cards" :key="index" md="3">
                <home-card :item="item" v-if="item.isVisible"></home-card>
            </b-col>
        </b-row>
            <b-col md="2">
                <b-button @click="showCheckImportModal()">Check Imports</b-button>
            </b-col>
        <CheckImportsModal :showModal="showModal"  @cancel="showModal=false"></CheckImportsModal>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import HomeCard from "@/components/home/HomeCard"
import CheckImportsModal from "@/components/home/CheckImportsModal.vue";

export default {
    name: "Home",
    components: {
        "home-card": HomeCard,
        CheckImportsModal,
    },
    computed: {
        ...mapGetters({
            cards: 'homeModule/cards',
            isCollapsed: 'uxModule/isCollapsed',
            adminMode: 'loginModule/getAdminMode',
        })
    },
    data() {
        return {
            showModal: false,
        }
    },
    methods:{
        showCheckImportModal() {
            this.showModal = true;
        }
    },
    async created () {
        try {
            if (this.$route.query.id) {
                sessionStorage.setItem('teamAccessId', this.$route.query.id)
                this.$store.dispatch('teamModule/teamViewAccess');
                this.$store.dispatch('loginModule/switchToTeamView');
                this.$router.push({name: 'Home'}).catch(() => {})
            }
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('homeModule/getTotalRows').then(() => {
            })
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            console.log('error',error);
            this.$store.dispatch('uxModule/hideLoader')
        }

    }
}
</script>
