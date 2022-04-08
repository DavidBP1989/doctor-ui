<template>
    <div class="main">
        <main-header />
    </div>
</template>

<script>
export default {
    components: {
        'main-header': () => import('../header/header.vue')
    }
}
</script>