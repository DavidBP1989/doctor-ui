<template>
    <div class="obste">
        <b-row class="align-items-lg-center">
            <b-col cols="6" md="3" lg="2">
                <b-form-group label="Peso">
                    <b-input-group append="kg">
                        <b-form-input
                        v-model="form.weight"
                        @blur="calculeMothersWeight"
                        @keypress="onlyDecimals" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="2">
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
            <b-col class="showExtraCol" lg="2">
                <b-form-group label="Activa sexualmente">
                    <div class="d-flex">
                        <span>No</span>
                        <b-form-checkbox class="ml-2" v-model="form.sexuallyActive" switch>Si</b-form-checkbox>
                    </div>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="align-items-center">
            <b-col cols="6" sm="5" md="4" lg="3">
                <b-form-group label="Número de embarazos">
                    <b-form-input v-model="form.pregnancyNumber" type="number" />
                </b-form-group>
            </b-col>
            <b-col class="hideExtracol" order="3" order-sm="0" sm="4">
                <b-form-group label="Activa sexualmente">
                    <div class="d-flex">
                        <span>No</span>
                        <b-form-checkbox class="ml-2" v-model="form.sexuallyActive" switch>Si</b-form-checkbox>
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="3" order="1" order-sm="1">
                <b-form-group label="Pres. arterial sistólica">
                    <b-form-input @keypress="numberFormat" v-model="form.bloodPressure_A" />
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="3" order="2" order-sm="2">
                <b-form-group label="Pres. arterial diastólica">
                    <b-form-input @keypress="numberFormat" v-model="form.bloodPressure_B" />
                </b-form-group>
            </b-col>
            <b-col cols="6" sm="3" md="4" lg="3">
                <b-form-group label="Abortos">
                    <b-form-input type="number" v-model="form.abortions" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" md="4" lg="3">
                <b-form-group
                label="Fecha último parto"
                description="Puede cambiar el mes y año en la parte superior del calendario">
                    <b-input-group>
                        <v-date-picker
                        class="form-control p-0"
                        v-model="form.lastParturitionDate"
                        :input-props="{ readonly: true }"
                        color="pink"
                        :max-date="new Date()"
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
            <b-col order="1" order-sm="0" sm="6" md="5" lg="3">
                <b-form-group
                label="Primer día de ult. menstruación"
                description="Puede cambiar el mes y año en la parte superior del calendario">
                    <b-input-group>
                        <v-date-picker
                        class="form-control p-0"
                        v-model="form.firstDayMenstruation"
                        :input="firstDayMenstruationSelected()"
                        :input-props="{ readonly: true }"
                        :max-date="new Date()"
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
            <b-col cols="6"
            order="2"
            order-sm="0"
            sm="6"
            md="3"
            :lg="form.toxemias ? 2 : 3">
                <b-form-group label="Toxemias previas">
                    <div class="d-flex mt-2">
                        <span>No</span>
                        <b-form-checkbox class="ml-2" v-model="form.toxemias" switch>Si</b-form-checkbox>
                    </div>
                </b-form-group>
            </b-col>
            <b-col v-if="form.toxemias" lg="4" order-sm="0" order="3">
                <b-form-group label="Especifique toxemias">
                    <b-form-textarea rows="3" v-model="form.specifyToxemias" />
                </b-form-group>
            </b-col>
            <b-col cols="6" :lg="form.toxemias ? 4 : 3">
                <b-form-group label="Partos">
                    <b-form-select v-model="form.parturition" :options="parturitionOptions" />
                </b-form-group>
            </b-col>
            <distocias :show="form.parturition == 1" :distocia="form.dystocia" class="mb-2" />
        </b-row>
        <b-row>
            <b-col cols="6" md="3">
                <b-form-group label="Cesáreas previas">
                    <b-form-input type="number" v-model="form.cesarean" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Uso de forceps">
                    <b-form-input type="number" v-model="form.forceps" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="3">
                <b-form-group label="Mortinatos">
                    <b-form-input type="number" v-model="form.stillbirths" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3" lg="3">
                <b-form-group label="R.N. vivos">
                    <b-form-input type="number" v-model="form.newBornAlive" />
                </b-form-group>
            </b-col>
        </b-row>
        <pregnancies :pregnancies="form._pregnancies" />
        <b-row>
            <b-col>
                <b-form-group label="Observaciones">
                    <b-form-textarea rows="3" v-model="form.observations" />
                </b-form-group>
            </b-col>
        </b-row>
        <pregnancy-control :form="form" />
        <b-row>
            <b-col cols="12" lg="6">
                <b-form-group label="Motivo de la consulta">
                    <b-form-textarea rows="3" v-model="form.reasonForConsultation" />
                </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
                <b-form-group label="Exploración física">
                    <b-form-textarea rows="3" v-model="form.exploration" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col class="text-md-right">
                <b-button class="mb-2"
                @click="saveConsult"
                variant="success">Guardar consulta</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script src='./newConsult.js'></script>