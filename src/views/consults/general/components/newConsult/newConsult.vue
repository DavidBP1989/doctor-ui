<template>
    <div class="newconsult">
        <b-row>
            <b-col sm="6" md="3">
                <b-form-group label="Peso">
                    <b-input-group append="kg">
                        <b-form-input v-model="form.weight" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="3">
                <b-form-group label="Talla">
                    <b-input-group append="m">
                        <b-form-input v-model="form.size" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="4" lg="3">
                <b-form-group label="Índice de masa corporal">
                    <b-input-group append="kg/m2">
                        <b-form-input disabled :value="mass" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="2" lg="3">
                <b-form-group label="Temperatura">
                    <b-input-group append="c">
                        <b-form-input v-model="form.temperature" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="3">
                <b-form-group label="Tensión arterial">
                    <div class="d-flex">
                        <b-form-input v-model="form.bloodPressure_a" @keypress="onlyDecimals" class="mr-2"/>
                        <b-form-input v-model="form.bloodPressure_b" @keypress="onlyDecimals" />
                    </div>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="3">
                <b-form-group label="Perímetro cefálico">
                    <b-input-group append="cm">
                        <b-form-input v-model="form.headCircuference" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="6" lg="3">
                <b-form-group label="Frecuencia cardiaca">
                    <b-input-group append="lpm">
                        <b-form-input v-model="form.heartRate" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="6" md="6" lg="3">
                <b-form-group label="Frecuencia respiratoria">
                    <b-input-group append="lpm">
                        <b-form-input v-model="form.breathingFrecuency" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
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
            <b-col class="text-md-right">
                <diagnostics :newValues="form.diagnostics" />
                <!--<treatments :dataList="form.treatments" :savedDataList="treatments_array" />
                <laboratory :dataList="laboratory_array" />
                <cabinet :dataList="cabinet_array" />
                <prognostic :dataList="form.prognostic" />--> <!--btn de confirmar nueva consulta -->
            </b-col>
        </b-row>
        <!--<added-items v-if="form.diagnostics.length > 0" title="Diagnosticos" type="diagnostic" :dataList="form.diagnostics" />
        <added-items v-if="form.treatments.length > 0" title="Tratamientos" type="treatments" :dataList="form.treatments" />
        <added-items v-if="form.laboratory.length > 0" title="Estudios de laboratorio" type="laboratory" :dataList="form.laboratory" />
        <added-items v-if="form.cabinet.length > 0" title="Estudios de gabinete" type="cabinet" :dataList="form.cabinet" />-->
    </div>
</template>

<script src="./newConsult.js"></script>