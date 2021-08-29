<template>
    <div v-if="consult !== null">
        <b-row class="mt-3 align-items-center">
            <b-col cols="6" md="4" lg="2">
                <b-form-group label="Peso">
                    <span>{{ consult.BasicConsult.Weight }} kg</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="2">
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
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Presión arterial">
                    <span>{{ consult.BasicConsult.BloodPressure_A }}/{{ consult.BasicConsult.BloodPressure_B }} mm Hg</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" md="3">
                <b-form-group label="Activa sexualmente">
                    <span>{{ consult.SexuallyActive ? 'Si' : 'No'}}</span>
                </b-form-group>
            </b-col>
            <b-col cols="12" md="4">
                <b-form-group label="Número de embarazos">
                    <span>{{ consult.PregnancyNumber }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="2">
                <b-form-group label="Abortos">
                    <span>{{ consult.Abortions }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Toxemias previas">
                    <span>{{ consult.PreviousToxemias ? 'Si' : 'No' }}</span>
                </b-form-group>
            </b-col>
            <b-col v-if="consult.PreviousToxemias">
                <b-form-group label="Especifique toxemias">
                    <span>{{ consult.SpecifyToxemias }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col :cols="consult.Parturition === 0 ? 6 : 12" sm="6" md="4">
                <b-form-group label="Fecha último parto">
                    <span>{{ getDateFormat(consult.LastParturitionDate) }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" :order="consult.Parturition === 0 ? 1 : 0" order-lg="0" md="5">
                <b-form-group label="Primer día de ult. menstruación">
                    <span>{{ getDateFormat(consult.FirstDayOfLastMenstruation) }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Partos">
                    <span>{{ getParturitionType(consult.Parturition) }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-card sub-title="Partos" v-if="consult.Parturition === 1">
            <b-row>
                <b-col>
                    <b-form-group label="Tipo de distocia">
                        <span>{{ getDistociaType(consult.DystociaType) }}</span>
                    </b-form-group>
                    <b-row v-if="consult.DystociaType === 2">
                        <b-col>
                            <b-form-group label="Especifique">
                                <span>{{ consult.SpecifyDystociaType }}</span>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-group label="Motivo de la distocia">
                        <span>{{ getDistociaReason(consult.DystociaReason) }}</span>
                    </b-form-group>
                    <b-row v-if="consult.DystociaReason === 3">
                        <b-col>
                            <b-form-group label="Especifique">
                                <span>{{ consult.SpecifyDystociaReason }}</span>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
        <b-row class="mt-2">
            <b-col cols="6" md="3">
                <b-form-group label="Cesáreas previas">
                    <span>{{ consult.PreviousCesarean }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Uso de forceps">
                    <span>{{ consult.Forceps }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Mortinatos">
                    <span>{{ consult.Stillbirths }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="R.N. vivos">
                    <span>{{ consult.NewbornAlive }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <pregnancies :consult="consult" />
        <pregnancy-control :consult="consult" />
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
    </div>
</template>

<script>
import pregnancies from './components/pregnancies.vue'
import pregnancyControl from './components/pregnancyControl.vue'
import map from './helper/map'

export default {
    props: {
        consult: {
            type: Object,
            required: false,
            default: null
        }
    },
    components: {
        pregnancies,
        pregnancyControl
    },
    computed: {
        mass() {
            return this.consult.BasicConsult.Mass > 0 ?
            this.consult.BasicConsult.Mass.toFixed(2) : this.consult.BasicConsult.Mass
        }
    },
    methods: {
        getDateFormat(date) {
            if (date !== null)
                return this.$moment(date).format('D MMMM YYYY')
            else return '---'
        },
        getParturitionType(type) {
            return map.getParturitionType(type)
        },
        getDistociaType(type) {
            return map.getDistociaType(type)
        },
        getDistociaReason(type) {
            return map.getDistociaReason(type)
        }
    }
}
</script>