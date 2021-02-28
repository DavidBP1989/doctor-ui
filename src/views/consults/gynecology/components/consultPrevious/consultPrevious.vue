<template>
    <div v-if="consult != null">
        <b-row>
            <b-col offset-sm="4" offset-lg="8" class="text-right">
                <b-form-group class="nlegend" label="Buscar consulta">
                    <b-form-select v-model="selectedDate" :options="dates" @change="getConsult" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mt-3">
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
                <b-form-group label="Índice de masa corporal">
                    <span>{{ consult.BasicConsult.Mass }} kg/m2</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="2">
                <b-form-group label="Temperatura">
                    <span>{{ consult.BasicConsult.Temperature }} c</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="3">
                <b-form-group label="Presión arterial">
                    <span>{{ consult.BasicConsult.BloodPressure_A }}/{{ consult.BasicConsult.BloodPressure_B }} mm Hg</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Edad de su menarca">
                    <span>{{ consult.MenarcaAge }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="2" order-md="1" order-lg="0" lg="2">
                <b-form-group label="Menacmia">
                    <span>{{ consult.Menacma }}</span>
                </b-form-group>
            </b-col>
            <b-col md="4" lg="3">
                <b-form-group label="Fecha última menstruación">
                    <span>{{ getDateFormat(consult.LastMenstruationDate) }}</span>
                </b-form-group>
            </b-col>
            <b-col md="5" lg="4">
                <b-form-group label="Edad de inicio de vida sexual activa">
                    <span>{{ consult.AgeOfOnsetOfActiveSexualLife }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <b-col cols="4" lg="2">
                <b-form-group>
                    <span class="fw">Gestas</span>
                    <b-badge variant="default">{{ consult.Gestas }}</b-badge>
                </b-form-group>
            </b-col>
            <b-col cols="4" lg="2">
                <b-form-group>
                    <span class="fw">Paragestas</span>
                    <b-badge variant="default">{{ consult.Paragestas }}</b-badge>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <span class="fw">Cesáreas</span>
                    <b-badge variant="default">{{ consult.Cesareans }}</b-badge>
                </b-form-group>
            </b-col>
            <b-col cols="4" lg="2">
                <b-form-group>
                    <span class="fw">Abortos</span>
                    <b-badge variant="default">{{ consult.Abortions }}</b-badge>
                </b-form-group>
            </b-col>
            <b-col cols="4" lg="2">
                <b-form-group>
                    <span class="fw">Recién nacidos</span>
                    <b-badge variant="default">{{ consult.NewlyBorn }}</b-badge>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <span class="fw">Mortinatos</span>
                    <b-badge variant="default">{{ consult.Stillbirth }}</b-badge>
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
                <b-form-checkbox
                disabled
                :checked="o.value">
                    {{ o.text }}
                </b-form-checkbox>
            </b-col>
            <b-col cols="12" class="mt-2" v-if="consult.Checkbox.Others">
                <b-form-group label="Explique otros">
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
                    <b-col cols="3" sm="4" md="3" lg="2">
                        <b-form-group label="Sexo">
                            <span>{{ sex(consult.Partner.Sex) }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" md="3" lg="2">
                        <b-form-group label="Estado civil">
                            <span>{{ maritalStatus(consult.Partner.MaritalStatus) }}</span>
                        </b-form-group>
                    </b-col>
                    <b-col cols="5" sm="4" lg="2">
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
        <b-row v-if="consult.Checkbox.Others" class="mt-2">
            <b-col>
                <b-form-group label="Motivo de la consulta">
                    <span>{{ consult.BasicConsult.ReasonForConsultation }}</span>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>

<script src='./consultPrevious.js'></script>