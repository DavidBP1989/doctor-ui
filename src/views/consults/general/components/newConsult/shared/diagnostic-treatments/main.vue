<template>
    <b-container>
        <b-row>
            <b-col class="text-right">
                <b-link v-if="isDiagnostic_andNot_treatment" href="https://icd.who.int/browse11/l-m/es" target="_blank">CIE-11</b-link>
                <b-link v-else href="https://www.medicamentosplm.com/Home/Medicamento" target="_blank">Medicamentos</b-link>
            </b-col>
        </b-row>
        <hr class="mt-1">
        <b-row class="align-items-end mb-3">
            <b-col class="text-left" sm="12" v-if="!showSavedValues">
                <b-form autocomplete="off" @submit="add">
                    <b-form-group class="mb-0" :label="`Nuevo ${getTextType}`">
                        <b-input-group>
                            <b-form-input v-model="input" :placeholder="`Escribir ${getTextType}`"/>
                            <b-input-group-append>
                                <b-button type="submit" variant="info">Agregar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </b-col>
            <b-col class="text-left mt-2">
                <fa-icon :icon="['fas', showSavedValues ? 'times' : 'caret-right']" size="lg" />
                <b-button @click="showSavedValues = !showSavedValues" variant="link" class="pl-0">
                    {{ showSavedValues ? 'Cerrar' : `Ver ${getTextType}s guardados`}}
                </b-button>
            </b-col>
        </b-row>
        <new-items v-if="!showSavedValues"
        :isDiagnostic_andNot_treatment="isDiagnostic_andNot_treatment"
        :dataResponse="dataResponse" :savedData="savedData" />
        
        <saved-values :isDiagnostic_andNot_treatment="isDiagnostic_andNot_treatment" :newValues="listOfNewValues" />
    </b-container>
</template>

<script>
import newItems from './components/newItems.vue'
import savedValues from './components/savedValues.vue'
import eventBus from '@/helper/event-bus'
import store from '@/store/store'

export default {
    created() {
        eventBus.$on('changeViewToNewValues', () => this.showSavedValues = !this.showSavedValues)
    },
    props: ['isDiagnostic_andNot_treatment', 'newValues'],
    components: {
        newItems,
        savedValues
    },
    data() {
        return {
            input: '',
            showSavedValues: false,
            listOfNewValues: this.newValues
        }
    },
    computed: {
        getTextType() {
            return this.type ? 'diagnóstico' : 'tratamiento'
        }
    },
    methods: {
        add(evt) {
            evt.preventDefault()

            if (this.input !== '') {
                this.listOfNewValues.push({
                    id: this.getLastId(),
                    idSavedData: null,
                    text: this.input.trim(),
                    edit: false,
                    exclusive: false
                })
                this.input = ''
                this.showSavedValues = false
            }
        },
        getLastId() {
            return this.isDiagnostic_andNot_treatment ? store.getters.getLastIdDiagnostics : store.getters.getLastIdTreatments
        }
    }
}
</script>

<style scoped src="../../styles/modal.scss"></style>