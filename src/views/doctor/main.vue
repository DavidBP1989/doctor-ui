<template>
    <div class="main">
        <main-header />
        <b-container class="mt-4" :fluid="!$store.getters.isAuthenticated">
            <router-view />
        </b-container>
    </div>
</template>

<script>
import header from '@/shared/header/header.vue'

export default {
    beforeCreate() {
        const loggedIn = localStorage.getItem('emecitoken') != null
        document.body.className = loggedIn ? 'main_body' : 'register_body'
    },
    components: {
        'main-header': header
    }
}
</script>