<template>
    <div v-if="consult != null">
        <b-row class="align-items-center">
            <b-col md="6" lg="8">
                <div class="mb-1">
                    <fa-icon class="mr-2" :icon="['fas', 'print']" size="lg" />
                    <b-link @click="print">Imprimir consulta</b-link>
                </div>
                <div>
                    <fa-icon class="mr-2" :icon="['fas', 'edit']" size="lg" />
                    <b-link @click="goToStudyReport">Editar reporte de estudios de gabinete y otros.</b-link>
                </div>
            </b-col>
            <b-col class="mt-2 mt-md-0" md="6" lg="4">
                <b-form-group class="mt-2 mt-md-0 nlegend" label="Buscar consulta">
                    <b-form-select v-model="selectedDate" :options="dates" @change="getConsult" />
                </b-form-group>
            </b-col>
        </b-row>
        <consult-view :consult="consult" />
    </div>
    <div class="p-4 text-center" v-else>
        <h5>No hay consultas previas por mostrar</h5>
    </div>
</template>

<script src="./consultPrevious.js"></script>