<template>
    <div>
        <loading v-if="!$store.getters.isAuthenticated" />
        <div v-else class="main">
            <main-header />
            <b-container>
                <router-view />
            </b-container>
        </div>
    </div>
</template>

<script>
import header from '@/shared/header/header.vue'
import loading from '@/shared/loading.vue'

export default {
    beforeCreate() {
        document.body.className = 'main_body'
    },
    components: {
        loading,
        'main-header': header
    }
}
</script>