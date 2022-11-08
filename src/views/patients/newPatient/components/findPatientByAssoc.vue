<template>
    <div>
        <b-form-group description="Búsqueda por nombre" label="Buscar paciente">
            <b-input-group>
                <b-form-input debounce="500" v-model="filter" />
                <template v-slot:prepend>
                    <b-input-group-text>
                        <fa-icon :icon="['fas', 'search']" size="lg" />
                    </b-input-group-text>
                </template>
            </b-input-group>
        </b-form-group>

        <b-table
        borderless
        head-variant="light"
        :fields="fields"
        :items="provider"
        :filter="filter"
        :busy.sync="isBusy">
            <template v-slot:cell(fullname)="data">
                <span>{{ data.item.Nombre }} {{ data.item.Apellido }}</span>
            </template>
            <template v-slot:cell(add)="data">
                <b-button variant="info" :to="to(data.item.EdadEnMeses, data.item.Sexo, data.item.Id)">Agregar</b-button>
            </template>
            <template v-slot:table-busy>
                <div class="text-center p-3">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
import api from '@/api/patient-service'

export default {
    data() {
        return {
            doctorId: this.$store.state.doctor.id,
            filter: '',
            fields: [
                {
                    key: 'fullname',
                    label: 'Nombre',
                    class: 'align-middle'
                },
                {
                    key: 'add',
                    label: '',
                    class: 'text-right'
                }
            ],
            isBusy: false
        }
    },
    methods: {
        provider(ctx, callback) {
            this.isBusy = true

            api.getPatientListByAssociation(
                this.doctorId,
                ctx.filter
            )
            .then(response => {
                this.isBusy = false
                callback(response.body)
            })
            .catch(() => {
                callback([])
            })
        },
        to(ageInMonths, sex, patientId) {
            if (Math.trunc(ageInMonths / 12) >= 12 && sex === 'F')
                return `/consults/${patientId}/gynecology`
            return `/consults/${patientId}`
        },
    }
}
</script>