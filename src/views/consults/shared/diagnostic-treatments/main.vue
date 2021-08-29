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
                <b-row class="align-items-center">
                    <b-col :class="showSavedValues ? 'col-md-4' : ''">
                        <div class="mt-2">
                            <fa-icon :icon="['fas', showSavedValues ? 'times' : 'caret-right']" size="lg" />
                            <b-button @click="showSavedValues = !showSavedValues" variant="link" class="pl-0">
                                {{ showSavedValues ? 'Cerrar' : `Buscar en ${getTextType}s guardados`}}
                            </b-button>
                        </div>
                    </b-col>
                    <b-col v-if="showSavedValues">
                        <b-form-group label="Buscar">
                            <b-input-group>
                                <b-form-input placeholder="..." v-model="searchText" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'search']" size="sm" />
                                    </b-input-group-text>
                                </template>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <new-items
        v-if="!showSavedValues"
        :isDiagnostic_andNot_treatment="isDiagnostic_andNot_treatment"
        :newValues="listOfNewValues"
        :savedValues="listOfSavedValues" />

        <saved-values
        v-else
        :newValues="listOfNewValues"
        :savedValues="filter"
        :key="keyComponent"
        :isDiagnostic_andNot_treatment="isDiagnostic_andNot_treatment" />
    </b-container>
</template>

<script>
let count = 1
import newItems from './components/newItems.vue'
import savedValues from './components/savedValues.vue'
import eventBus from '@/helper/event-bus'

export default {
    created() {
        eventBus.$on('changeViewToNewValues', () => this.showSavedValues = !this.showSavedValues)
    },
    props: ['isDiagnostic_andNot_treatment', 'savedValues', 'newValues'],
    components: {
        newItems,
        savedValues
    },
    data() {
        return {
            input: '',
            keyComponent: 0,
            searchText: '',
            showSavedValues: false,
            listOfSavedValues: this.savedValues,
            listOfNewValues: this.newValues
        }
    },
    computed: {
        getTextType() {
            return this.isDiagnostic_andNot_treatment ? 'diagnóstico' : 'tratamiento'
        },
        filter() {
            if (this.searchText) {
                return this.listOfSavedValues.filter((item) => {
                    return this.searchText.toLowerCase().split(' ')
                    .every(v => item.name.toLowerCase().includes(v))
                })
            } else return this.listOfSavedValues
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
            if (this.listOfNewValues.length > 0) {
                count = this.listOfNewValues[this.listOfNewValues.length - 1].id + 1
            }
            return count
        }
    },
    watch: {
        searchText() {
            this.keyComponent +=1
        }
    }
}
</script>

<style scoped src="../../styles/modal.scss"></style>