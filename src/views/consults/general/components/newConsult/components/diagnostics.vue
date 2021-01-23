<template>
    <b-button @click="showModal" class="mb-2" variant="outline-secondary">Diagnosticos</b-button>
</template>

<script>
import { showModalToDiagnosticsAndTreatments } from '@/helper/alerts'
import modal from '../shared/diagnostic-treatments/main.vue'

export default {
    props: {
        newValues: {
            type: Array,
            required: true
        }
    },
    methods: {
        showModal() {
            showModalToDiagnosticsAndTreatments(modal, 'Diagnósticos', {
                isDiagnostic_andNot_treatment: true,
                newValues: this.newValues
            })
        }
    }
}
</script>