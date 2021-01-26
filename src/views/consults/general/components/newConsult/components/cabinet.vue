<template>
    <b-button @click="showModal" class="mb-2" variant="outline-secondary">Estudios de gabinete</b-button>
</template>

<script>
import { showModalToDiagnosticsAndTreatments } from '@/helper/alerts'
import modal from '../shared/laboratory-cabinet.vue'

export default {
    props: {
        newValues: {
            type: Array,
            required: true
        }
    },
    methods: {
        showModal() {
            showModalToDiagnosticsAndTreatments(modal, 'Estudios de gabinete', {
                isLaboratory_andNot_cabinet: false,
                newValues: this.newValues
            })
        }
    }
}
</script>