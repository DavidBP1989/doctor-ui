<template>
    <b-button class="mb-2" variant="success" @click="showModal">Guardar consulta</b-button>
</template>

<script>
import { showModalWithViewReference } from '@/helper/alerts'
import modal from '../prognostics.vue'
import eventBus from '@/helper/event-bus'

export default {
    props: {
        newValues: {
            type: Array,
            required: true
        }
    },
    methods: {
        showModal() {
            showModalWithViewReference(
                modal,
                'Pronóstico',
                { newValues: this.newValues },
                true
            ).then(result => {
                if (result.value) eventBus.$emit('save')
            })
        }
    }
}
</script>