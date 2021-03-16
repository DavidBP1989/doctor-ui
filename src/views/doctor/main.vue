<template>
    <div class="main">
        <main-header />
        <b-container class="mt-4 mb-5" :fluid="!$store.getters.isAuthenticated">
            <router-view />
        </b-container>
    </div>
</template>

<script>
import header from '@/shared/header/header.vue'

export default {
    beforeCreate() {
        const isAuthenticated = this.$store.getters.isAuthenticated
        document.body.className = isAuthenticated ? 'main_body' : 'register_body'
    },
    components: {
        'main-header': header
    }
}
</script>