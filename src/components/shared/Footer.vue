<template>
    <div
        :class="`footer main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <p>
            © 2020 Copyright: Younggeeks.net
        </p>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "Footer",
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
        })
    }
}
</script>