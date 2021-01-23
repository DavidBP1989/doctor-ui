<template>
    <b-card v-if="consultationDates.length > 0" no-body class="mb-1">
        <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button block v-b-toggle._previous class="text-left p-2">
                <fa-icon class="mr-2" :icon="['fas', (visible_previous ? 'caret-down' : 'caret-right')]" size="lg" />
                Consulta anterior
            </b-button>
        </b-card-header>
        <b-collapse
        id="_previous"
        v-model="visible_previous"
        accordion="consult-accordion"
        role="tabpanel">
            <b-card-body>
                
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
import api from '@/api/consult-service'

export default {
    created() {
        this.getConsultationDates()
    },
    props: ['visiblePrev'],
    data() {
        return {
            visible_previous: this.visiblePrev,
            patientId: this.$route.params.id,
            consultationDates: []
        }
    },
    methods: {
        getConsultationDates() {
            api.getConsultationDates(this.patientId).then(response => {
                if (response.body) {
                    let array = []
                    response.body.forEach(element => {
                        array.push({
                            value: element.Id,
                            text: this.$moment(element.ConsultationDate).format('dddd DD [de] MMMM [de] YYYY')
                        })
                    })
                    this.consultationDates = array           
                }
            })
        }
    }
}
</script>