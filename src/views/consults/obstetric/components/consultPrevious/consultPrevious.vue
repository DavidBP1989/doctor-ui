<template>
    <div v-if="consult !== null">
        <b-row>
            <b-col offset-sm="4" offset-lg="8" class="text-right">
                <b-form-group class="nlegend" label="Buscar consulta">
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
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Presión arterial">
                    <span>{{ consult.BasicConsult.BloodPressure_A }}/{{ consult.BasicConsult.BloodPressure_B }} mm Hg</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" md="3">
                <b-form-group label="Activa sexualmente">
                    <div class="d-flex">
                        <span>No</span>
                        <b-form-checkbox class="ml-2" disabled :checked="consult.SexuallyActive" switch>Si</b-form-checkbox>
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4">
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
                    <div class="d-flex">
                        <span>No</span>
                        <b-form-checkbox class="ml-2" disabled :checked="consult.PreviousToxemias" switch>Si</b-form-checkbox>
                    </div>
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
                    <span>{{ consult.PreviousCesarean }}</span>
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
        <b-row>
            <b-col>
                <b-form-group label="Observaciones">
                    <span>{{ consult.Observations }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <pregnancy-control :consult="consult" />
        <b-row>
            <b-col cols="12" sm="6">
                <b-form-group label="Motivo de la consulta">
                    <span>{{ consult.BasicConsult.ReasonForConsultation }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Exploración física">
                    <span>{{ consult.PregnancyControl.PhysicalExploration }}</span>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
    <div class="p-4 text-center" v-else>
        <h5>No hay consultas previas por mostrar</h5>
    </div>
</template>

<script src='./consultPrevious.js'></script>