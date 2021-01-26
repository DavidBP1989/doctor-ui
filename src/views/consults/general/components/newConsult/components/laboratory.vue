<template>
    <b-button @click="showModal" class="mb-2" variant="outline-secondary">Estudios de laboratorio</b-button>
</template>

<script>
import { showModalToDiagnosticsAndTreatments } from '@/helper/alerts'
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
            showModalToDiagnosticsAndTreatments(modal, 'Estudios de laboratorio', {
                isLaboratory_andNot_cabinet: true,
                savedValues: this.savedValues,
                newValues: this.newValues
            })
        }
    }
}
</script>