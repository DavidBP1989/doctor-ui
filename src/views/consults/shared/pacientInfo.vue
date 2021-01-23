<template>
    <b-container fluid class="mt-3">
        <b-row>
            <b-col>
                <b-list-group>
                    <b-list-group-item>
                        <strong>Nombre:</strong> {{ $store.state.patient.name }}
                    </b-list-group-item>
                    <b-list-group-item>
                        <strong>EMECI:</strong> {{ $store.state.patient.emeci }}
                    </b-list-group-item>
                    <b-list-group-item>
                        <strong>Fecha de nacimiento:</strong> {{ birthDate }}
                        <br />{{ age }}
                    </b-list-group-item>
                    <b-list-group-item>
                        <strong>Grupo y RH: </strong> {{ $store.state.patient.groupRH }}
                    </b-list-group-item>
                    <b-list-group-item>
                        <strong>Vencimiento: </strong>25/diciembre/2019
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <hr>
                <h6>Observaciones generales</h6>
                <b-form-group class="mb-1" label="Alergias">
                    <b-form-textarea v-model="allergies" />
                </b-form-group>
                <b-form-group class="mb-1" label="Reservado">
                    <b-form-textarea v-model="reserved" />
                </b-form-group>
                <b-form-group class="mb-0" label="Patologías relevantes">
                    <b-form-textarea v-model="relevantPathologies" />
                </b-form-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    computed: {
        age() {
            let txt = ''
            const years = Math.trunc(this.$store.state.patient.ageInMonths / 12)
            if (years > 0)
                txt = `${years} ${years > 1 ? 'Años' : 'Año'}`
            const months = this.$store.state.patient.ageInMonths % 12
            if (months > 0)
                txt += `, ${months} ${months > 1 ? 'Meses' : 'Mes'}`
            return txt
        },
        birthDate() {
            return this.$moment(this.$store.state.patient.birthDate).format('D/MMM/YYYY')
        },
        allergies: {
            get() { return this.$store.state.patient.allergies },
            set(value) { this.$store.commit('SET_PATIENT_ALLERGIES', value) }
        },
        reserved: {
            get() { return this.$store.state.patient.reserved },
            set(value) { this.$store.commit('SET_PATIENT_RESERVED', value) }
        },
        relevantPathologies: {
            get() { return this.$store.state.patient.relevantPathologies },
            set(value) { this.$store.commit('SET_PATIENT_RELEVENTPATHOLOGIES', value) }
        }
    }
}
</script>