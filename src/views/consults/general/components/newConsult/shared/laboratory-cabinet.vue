<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="text-left">
                <p>
                    Seleccione uno de los grupos para ver los estudios disponibles, 
                    haga click sobre el nombre del estudio para seleccionarlo.
                </p>
            </b-col>
            <b-col v-if="listOfNewValues.length > 0" class="text-right mb-2">
                <b-button @click="print" variant="outline-secondary">Imprimir estudios seleccionados</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div class="tablist" role="tablist">
                    <b-card no-body v-for="(d, index) in listOfSavedValues" :key="index">
                        <b-card-header header-tag="header" class="p-0" :class="d.style ? 'selected' : ''" role="tab">
                            <b-button
                            block
                            v-b-toggle="`collapse-${d.id}`"
                            class="text-left">
                                {{ d.name }}
                            </b-button>
                        </b-card-header>
                        <b-collapse :id="`collapse-${d.id}`" accordion="accordion" role="tabpanel">
                            <b-card-body class="p-0">
                                <b-list-group>
                                    <b-list-group-item v-for="(s, indexStudies) in d.studies" :key="indexStudies">
                                        <b-row class="align-items-center">
                                            <b-col cols="2">
                                                <fa-icon
                                                @click="checkValue(index, indexStudies, s.check)"
                                                :class="s.check ? 'check' : 'uncheck'"
                                                :icon="['fas', 'check']"
                                                size="lg"/>
                                            </b-col>
                                            <b-col md="8" class="text-left" :cols="s.edit ? 10 : 7">
                                                <b-form-group v-if="s.edit" description="Se editará al instante">
                                                    <b-form-textarea  v-model="s.name" />
                                                </b-form-group>
                                                <span v-else>{{ s.name }}</span>
                                            </b-col>
                                            <b-col>
                                                <span :class="s.edit ? 'float-right' : ''" class="pointer" @click="s.edit = !s.edit">
                                                    {{ s.edit ? 'Cerrar' : 'Editar' }}
                                                </span>
                                            </b-col>
                                        </b-row>
                                    </b-list-group-item>
                                </b-list-group>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue'
import eventBus from '@/helper/event-bus'

export default {
    props: ['savedValues', 'newValues', 'type'],
    data() {
        return {
            listOfSavedValues: this.savedValues,
            listOfNewValues: this.newValues
        }
    },
    methods: {
        checkValue(index, indexStudies, check) {
            this.listOfSavedValues[index].studies[indexStudies].check = !check

            const any = this.listOfSavedValues[index].studies.some((x) => {
                return x.check
            })

            this.listOfSavedValues[index].style = any
            this.addValues()
        },
        addValues() {
            let group = this.listOfSavedValues.filter(x => {
                return x.style
            })
            this.listOfNewValues.splice(0)
            group.forEach(x => {
                this.listOfNewValues.push({
                    id: x.id,
                    name: x.name,
                    studies: x.studies.filter(s => {
                        return s.check
                    })
                })
            })
        },
        print() {
            Vue.swal.close()
            eventBus.$emit('__print', this.type)
        }
    }
}
</script>

<style scoped src="../styles/lab-cab.scss"></style>