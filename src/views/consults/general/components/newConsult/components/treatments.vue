<template>
    <b-button @click="showModal" class="mb-2" variant="outline-secondary">Tratamientos</b-button>
</template>

<script>
import { showModalWithViewReference } from '@/helper/alerts'
import modal from '../shared/diagnostic-treatments/main.vue'

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
            showModalWithViewReference(modal, 'Tratamientos', {
                isDiagnostic_andNot_treatment: false,
                savedValues: this.savedValues,
                newValues: this.newValues
            })
        }
    }
}
</script>