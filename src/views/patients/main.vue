<template>
    <div>
        <div class="main">
            <main-header />
            <b-container class="mb-5">
                <router-view />
            </b-container>
        </div>
    </div>
</template>

<script>
import header from '@/shared/header/header.vue'

export default {
    beforeCreate() {
        document.body.className = 'main_body'
    },
    components: {
        'main-header': header
    }
}
</script>