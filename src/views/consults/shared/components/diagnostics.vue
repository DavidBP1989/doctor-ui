<template>
    <b-button @click="showModal" class="mb-2" variant="outline-secondary">Diagnosticos</b-button>
</template>

<script>
import { showModalWithViewReference } from '@/helper/alerts'
import modal from '../diagnostic-treatments/main.vue'

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
            showModalWithViewReference(modal, 'Diagnósticos', {
                isDiagnostic_andNot_treatment: true,
                savedValues: this.savedValues,
                newValues: this.newValues
            })
        }
    }
}
</script>