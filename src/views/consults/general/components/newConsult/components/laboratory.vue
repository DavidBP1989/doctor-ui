<template>
    <b-button @click="showModal" class="mb-2" variant="outline-secondary">Estudios de laboratorio</b-button>
</template>

<script>
import { showModalWithViewReference } from '@/helper/alerts'
import modal from '../shared/laboratory-cabinet.vue'

export default {
    props: {
        savedValues: {
            type: Array,
            required: true
        },
        newValues: {
            type: Array,
            required: true
        }
    },
    methods: {
        showModal() {
            showModalWithViewReference(modal, 'Estudios de laboratorio', {
                savedValues: this.savedValues,
                newValues: this.newValues,
                type: 'laboratory'
            })
        }
    }
}
</script>