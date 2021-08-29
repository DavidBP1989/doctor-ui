<!--
    Esta vista sirve tanto para mostrar los datos en la vista principal de consultas
    previas y en la vista de imprimir
-->
<template>
    <div v-if="consult !== null">
        <b-row class="mt-4">
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
                <b-form-group label="Índice de masa corporal">
                    <span>{{ consult.BasicConsult.Mass }} kg/m2</span>
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
            <b-col cols="7" sm="6" md="4">
                <b-form-group label="Edad de la menarca">
                    <span>{{ consult.MenarcaAge }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="5" sm="6" md="4" order-lg="0">
                <b-form-group label="Menacmia">
                    <span>{{ consult.Menacma }}</span>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="4">
                <b-form-group label="Fecha última menstruación">
                    <span>{{ getDateFormat(consult.LastMenstruationDate) }}</span>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="4">
                <b-form-group label="Activa sexualmente">
                    <span>{{ consult.SexuallyActive ? 'Si' : 'No' }}</span>
                </b-form-group>
            </b-col>
            <b-col lg="4">
                <b-form-group label="Edad de inicio de vida sexual activa">
                    <span>{{ consult.AgeOfOnsetOfActiveSexualLife }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <b-col cols="6" lg="2">
                <b-form-group>
                    <span class="fw">Gestas -</span>
                    <b>{{ consult.Gestas }}</b>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="2">
                <b-form-group>
                    <span class="fw">Paragestas -</span>
                    <b>{{ consult.Paragestas }}</b>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <span class="fw">Cesáreas -</span>
                    <b>{{ consult.Cesareans }}</b>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="2">
                <b-form-group>
                    <span class="fw">Abortos -</span>
                    <b>{{ consult.Abortions }}</b>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="2">
                <b-form-group>
                    <span class="fw">Recién nacidos -</span>
                    <b>{{ consult.NewlyBorn }}</b>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <span class="fw">Mortinatos -</span>
                    <b>{{ consult.Stillbirth }}</b>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col
            cols="6"
            md="4"
            lg="3"
            v-for="(o, index) in options"
            :key="index">
                <span>
                    {{ o.text }} - <span :style="{color: o.value ? 'green' : 'indianred'}">{{ o.value ? 'Si' : 'No' }}</span>
                </span>
            </b-col>
            <b-col cols="12" class="mt-2" v-if="consult.Checkbox.Others">
                <b-form-group label="Explique">
                    <span>{{ consult.SpecifyOthers }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-3" v-if="!consult.Partner.HasAPartner">
            <b-col>
                <b-form-group style="color:indianred" label="No tiene pareja" />
            </b-col>
        </b-row>
        <b-card no-body v-else class="mt-3">
            <b-card-body>
                <p>Datos de la pareja</p>
                <b-row>
                    <b-col md="6" lg="6">
                        <b-form-group label="Nombre y apellido">
                            <span>{{ consult.Partner.Name }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <b-form-group label="Sexo">
                            <span>{{ sex(consult.Partner.Sex) }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <b-form-group label="Estado civil">
                            <span>{{ maritalStatus(consult.Partner.MaritalStatus) }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" sm="4" lg="2">
                        <b-form-group label="Grupo y RH">
                            <span>{{ consult.Partner.GroupRH }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="8" md="4" lg="3">
                        <b-form-group label="Fecha de nacimiento">
                            <span>{{ getDateFormat(consult.Partner.BirthDate) }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" sm="2" lg="3">
                        <b-form-group label="Edad">
                            <span>{{ consult.Partner.Age }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6" md="6" lg="3">
                        <b-form-group label="Ocupación">
                            <span>{{ consult.Partner.Occupation }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" lg="3">
                        <b-form-group label="Teléfono(s)">
                            <span>{{ consult.Partner.Phone }}</span>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
        <b-row class="mt-2">
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
export default {
    props: {
        consult: {
            type: Object,
            required: false,
            default: null
        }
    },
    computed: {
        options() {
            if (this.consult !== null) {
                let options = []
                Object.keys(this.consult.Checkbox).forEach(key => {
                    options.push({
                        text: key === 'Others' ? 'Otros' : key,
                        value: this.consult.Checkbox[key]
                    })
                })

                return options
            }
        }
    },
    methods: {
         getDateFormat(date) {
            if (date !== null)
                return this.$moment(date).format('D MMMM YYYY')
            else return '---'
        },
        maritalStatus(value) {
            let name = ''
            if (value === null) value = '0'
            switch(value) {
                case '0':
                    name = 'Casado'
                    break
                case '1':
                    name = 'Separado'
                    break
                case '2':
                    name = 'Soltero'
                    break
                case '3':
                    name = 'Union libre'
                    break
                case '4':
                    name = 'Viudo'
                    break
                case '5':
                    name = 'Divorciado'
                    break
            }
            return name
        },
        sex(_sex) {
            return _sex === 'M' ? 'Masculino' : 'Femenino'
        }
    }
}
</script>