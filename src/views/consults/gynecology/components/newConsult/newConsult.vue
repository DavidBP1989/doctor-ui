<template>
    <div class="gine">
        <b-row>
            <b-col cols="6" md="3">
                <b-form-group label="Peso">
                    <b-input-group append="kg">
                        <b-form-input v-model="form.weight" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Talla">
                    <b-input-group append="m">
                        <b-form-input v-model="form.size" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="7" md="4" lg="3">
                <b-form-group label="Índice de masa corporal">
                    <b-input-group append="kg/m2">
                        <b-form-input disabled :value="mass" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="5" md="2" lg="3">
                <b-form-group label="Temperatura">
                    <b-input-group append="c">
                        <b-form-input v-model="form.temperature" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" order="1" order-md="0" md="4" lg="3">
                <b-form-group label="Edad de la menarca">
                    <b-form-input v-model="form.menarcaAge" @keypress="onlyDecimals" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Presión arterial sistólica">
                    <b-form-input v-model="form.bloodPressure_A" @keypress="numberFormat" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Presión arterial diastólica">
                    <b-form-input v-model="form.bloodPressure_B" @keypress="numberFormat" />
                </b-form-group>
            </b-col>
            <b-col order="2" order-md="0" sm="6" lg="3">
                <b-form-group
                description="Puede cambiar el mes y año en la parte superior del calendario"
                label="Fecha última menstruación">
                    <b-input-group>
                        <v-date-picker
                        class="form-control p-0"
                        v-model="form.lastMenstruationDate"
                        :input-props="{ readonly: true }"
                        color="pink"
                        :popover="{ placement: 'bottom', visibility: 'click' }">
                        </v-date-picker>
                        <template v-slot:prepend>
                            <b-input-group-text>
                                <fa-icon :icon="['fas', 'calendar-alt']" size="lg" />
                            </b-input-group-text>
                        </template>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Gestas">
                    <b-form-input type="number" min="0" v-model="form.gestas" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Paragestas">
                    <b-form-input type="number" min="0" v-model="form.paragestas" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Cesáreas">
                    <b-form-input type="number" min="0" v-model="form.cesareans" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Abortos">
                    <b-form-input type="number" min="0" v-model="form.abortions" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Recién nacidos">
                    <b-form-input type="number" min="0" v-model="form.newlyBorn" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Mortinatos">
                    <b-form-input type="number" min="0" v-model="form.stillbirth" />
                </b-form-group>
            </b-col>
            <b-col cols="12" sm="8" md="6">
                <b-form-group label="Edad de inicio de vida sexual activa">
                    <b-form-input v-model="form.ageOfOnsetOfActiveSexualLife" @keypress="onlyDecimals"/>
                </b-form-group>
            </b-col>
            <b-col order-sm="1" order-md="0" md="3">
                <b-form-group label="Activa sexualmente">
                    <div class="d-flex mt-2">
                        <span>No</span>
                        <b-form-checkbox class="ml-2" v-model="form.sexuallyActive" switch>Si</b-form-checkbox>
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="6" sm="4" md="3">
                <b-form-group label="Menacmia">
                    <b-form-input v-model="form.menacma" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col cols="6" md="4" lg="3" v-for="(o, index) in form.options" :key="index">
                <b-form-group>
                    <b-form-checkbox v-model="o.value">{{ o.text }}</b-form-checkbox>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row v-if="form.options[9].value">
            <b-col>
                <b-form-group label="Explique">
                    <b-form-textarea rows="3" v-model="form.specifyOthers" />
                </b-form-group>
            </b-col>
        </b-row>
        <partner class="mt-2" :partnerForm="form.partner" />
        <b-row class="mt-3">
            <b-col md="6">
                <b-form-group label="Motivo de la consulta">
                    <b-form-textarea v-model="form.reasonForConsultation"></b-form-textarea>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Exploración física">
                    <b-form-textarea v-model="form.physicalExploration"></b-form-textarea>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6">
                <b-form-group label="Medidas preventivas">
                    <b-form-textarea v-model="form.preventiveMeasures"></b-form-textarea>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Observaciones">
                    <b-form-textarea v-model="form.observations"></b-form-textarea>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col class="text-right">
                <diagnostics :savedValues="diagnostics" :newValues="form.diagnostics" />
                <treatments :savedValues="treatments" :newValues="form.treatments" />
                <laboratory :savedValues="laboratory" :newValues="form.laboratory" />
                <cabinet :savedValues="cabinet" :newValues="form.cabinet" />
                <b-button class="mb-2" variant="success" @click="saveConsult">Guardar consulta</b-button>
            </b-col>
        </b-row>

        <added-items
        v-if="form.diagnostics.length > 0"
        title="Diagnosticos"
        type="diagnostic"
        :dataList="form.diagnostics" />

        <added-items
        v-if="form.treatments.length > 0"
        title="Tratamientos"
        type="treatments"
        :dataList="form.treatments" />

        <added-items
        v-if="form.laboratory.length > 0"
        title="Estudios de laboratorio"
        type="laboratory"
        :dataList="form.laboratory" />

        <added-items
        v-if="form.cabinet.length > 0"
        title="Estudios de gabinete"
        type="cabinet"
        :dataList="form.cabinet" />
    </div>
</template>

<script src='./newConsult.js'></script>