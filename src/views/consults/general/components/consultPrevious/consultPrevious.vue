<template>
    <div v-if="consult != null">
        <b-row class="align-items-center">
            <b-col md="6" lg="8">
                <div class="mb-1">
                    <fa-icon class="mr-2" :icon="['fas', 'print']" size="lg" />
                    <b-link>Imprimir consulta</b-link>
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
        <b-row class="mt-3 align-items-center">
            <b-col cols="3" md="4" lg="2">
                <b-form-group label="Peso">
                    <span>{{ consult.BasicConsult.Weight }} kg</span>
                </b-form-group>
            </b-col>
            <b-col cols="3" md="4" lg="2">
                <b-form-group label="Talla">
                    <span>{{ consult.BasicConsult.Size }} m</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Indice de masa corporal">
                    <span>{{ mass }} kg/m2</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="2">
                <b-form-group label="Temperatura">
                    <span>{{ consult.BasicConsult.Temperature }} c</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Presión arterial">
                    <span>{{ consult.BasicConsult.BloodPressure_A }}/{{ consult.BasicConsult.BloodPressure_B }} mm Hg</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" sm="6" lg="4">
                <b-form-group label="Perímetro cefálico">
                    <span>{{ consult.HeadCircuference }} cm</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="4">
                <b-form-group label="Frecuencia cardiaca">
                    <span>{{ consult.HeartRate }} lpm</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" sm="12" lg="4">
                <b-form-group label="Frecuencia respiratoria">
                    <span>{{ consult.BreathingFrecuency }} lpm</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6">
                <b-form-group label="Motivo de la consulta">
                    <span>{{ consult.ReasonForConsultation }}</span>
                </b-form-group>
            </b-col>
            <b-col sm="6">
                <b-form-group label="Exploración física">
                    <span>{{ consult.PhysicalExploration }}</span>
                </b-form-group>
            </b-col>
            <b-col sm="6">
                <b-form-group label="Medidas preventivas">
                    <span>{{ consult.PreventiveMeasures }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Observaciones">
                    <span>{{ consult.Observations }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <b-col md="6">
                <b-form-group label="Diagnosticos">
                    <b-list-group>
                        <b-list-group-item class="pl-0" v-for="c in consult.Diagnostics" :key="c">
                            {{ c }}
                        </b-list-group-item>
                    </b-list-group>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Tratamientos">
                    <b-list-group>
                        <b-list-group-item class="pl-0" v-for="c in consult.Treatments" :key="c">
                            {{ c }}
                        </b-list-group-item>
                    </b-list-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6">
                <b-form-group label="Estudios de laboratorio">
                    <b-list-group class="pl-0" v-for="c in consult.LaboratoryStudies" :key="c">
                        {{ c }}
                    </b-list-group>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Estudios de gabinete">
                    <b-list-group class="pl-0" v-for="c in consult.CabinetStudies" :key="c">
                        {{ c }}
                    </b-list-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row v-if="consult.Prognostic.length > 0">
            <b-col>
                <b-form-group label="Pronóstico">
                    <b-list-group class="pl-0" v-for="c in consult.Prognostic" :key="c">
                        {{ c }}
                    </b-list-group>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>

<script src="./consultPrevious.js"></script>