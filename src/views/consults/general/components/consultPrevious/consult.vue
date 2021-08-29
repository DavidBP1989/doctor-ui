<!--
    Esta vista sirve tanto para mostrar los datos en la vista principal de consultas
    previas y en la vista de imprimir
-->
<template>
    <div class="cprev" v-if="consult !== null">
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
            <b-col cols="12" md="4" lg="3">
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
                    <span>{{ consult.BasicConsult.ReasonForConsultation }}</span>
                </b-form-group>
            </b-col>
            <b-col sm="6">
                <b-form-group label="Exploración física">
                    <span>{{ consult.BasicConsult.PhysicalExploration }}</span>
                </b-form-group>
            </b-col>
            <b-col sm="6">
                <b-form-group label="Medidas preventivas">
                    <span>{{ consult.BasicConsult.PreventiveMeasures }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Observaciones">
                    <span>{{ consult.BasicConsult.Observations }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <b-col md="6">
                <b-form-group label="Diagnosticos">
                    <b-list-group>
                        <b-list-group-item class="pl-0" v-for="c in consult.Diagnostics[0].Studies" :key="c">
                            - {{ c }}
                        </b-list-group-item>
                    </b-list-group>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Tratamientos">
                    <b-list-group>
                        <b-list-group-item class="pl-0" v-for="c in consult.Treatments[0].Studies" :key="c">
                            - {{ c }}
                        </b-list-group-item>
                    </b-list-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6">
                <b-form-group label="Estudios de laboratorio">
                    <b-list-group class="pl-0" v-for="c in consult.LaboratoryStudies" :key="c.Name">
                        <span v-if="c.Name != ''">{{ c.Name }} <br  /></span> 
                        <span v-for="s in c.Studies" :key="s">- {{ s }} <br /></span> 
                    </b-list-group>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Estudios de gabinete">
                    <b-list-group class="pl-0" v-for="c in consult.CabinetStudies" :key="c.Name">
                        <span v-if="c.Name != ''">{{ c.Name }} <br  /></span> 
                        <span v-for="s in c.Studies" :key="s">- {{ s }} <br /></span> 
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

<script>
export default {
    props: {
        consult: {
            type: Object,
            required: false,
            default: null
        }
    },
    computed: {
        mass() {
            return this.consult.BasicConsult.Mass > 0 ? 
            this.consult.BasicConsult.Mass.toFixed(2) :
            this.consult.BasicConsult.Mass
        }
    },
}
</script>