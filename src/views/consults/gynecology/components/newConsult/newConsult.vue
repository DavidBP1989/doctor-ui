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
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Índice de masa corporal">
                    <b-input-group append="kg/m2">
                        <b-form-input disabled :value="mass" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="2" lg="3">
                <b-form-group label="Temperatura">
                    <b-input-group append="c">
                        <b-form-input v-model="form.temperature" @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" order="1" order-md="0" md="4" lg="3">
                <b-form-group label="Edad de su menarca">
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
            <b-col cols="4" md="2">
                <b-form-group label="Gestas">
                    <b-form-input type="number" min="0" v-model="form.gestas" />
                </b-form-group>
            </b-col>
            <b-col cols="4" md="2">
                <b-form-group label="Paragestas">
                    <b-form-input type="number" min="0" v-model="form.paragestas" />
                </b-form-group>
            </b-col>
            <b-col cols="4" md="2">
                <b-form-group label="Cesáreas">
                    <b-form-input type="number" min="0" v-model="form.cesareans" />
                </b-form-group>
            </b-col>
            <b-col cols="4" md="2">
                <b-form-group label="Abortos">
                    <b-form-input type="number" min="0" v-model="form.abortions" />
                </b-form-group>
            </b-col>
            <b-col cols="4" lg="2">
                <b-form-group label="Recién nacidos">
                    <b-form-input type="number" min="0" v-model="form.newlyBorn" />
                </b-form-group>
            </b-col>
            <b-col cols="4" md="2">
                <b-form-group label="Mortinatos">
                    <b-form-input type="number" min="0" v-model="form.stillbirth" />
                </b-form-group>
            </b-col>
            <b-col cols="9" sm="8" md="6">
                <b-form-group label="Edad de inicio de vida sexual activa">
                    <b-form-input v-model="form.ageOfOnsetOfActiveSexualLife" @keypress="onlyDecimals"/>
                </b-form-group>
            </b-col>
            <b-col cols="3" sm="4">
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
            <b-col>
                <b-form-group label="Motivo de la consulta">
                    <b-form-textarea rows="3" v-model="form.reasonForConsultation" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col class="text-md-right">
                <b-button variant="success" @click="saveConsult">Guardar consulta</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script src='./newConsult.js'></script>