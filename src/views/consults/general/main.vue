<template>
    <div role="tablist" class="mb-3">
        <b-card no-body v-if="consultationDates.length > 0" class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
                <b-button block v-b-toggle._previous class="text-left p-2">
                    <fa-icon class="mr-2" :icon="['fas', (visiblePrevious ? 'caret-down' : 'caret-right')]" size="lg" />
                    Consulta anterior
                </b-button>
            </b-card-header>
            <b-collapse
            id="_previous"
            v-model="visiblePrevious"
            accordion="consult-accordion"
            role="tabpanel">
                <b-card-body>
                    <consult-previous :consultationDates="consultationDates" />
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
                <b-button block v-b-toggle._consult class="text-left p-2">
                    <fa-icon class="mr-2" :icon="['fas', (visibleNewConsult ? 'caret-down' : 'caret-right')]" size="lg" />
                    Nueva consulta
                </b-button>
            </b-card-header>
            <b-collapse
            id="_consult"
            v-model="visibleNewConsult"
            accordion="consult-accordion"
            role="tabpanel">
                <b-card-body>
                    <new-consult />
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
import consultPrevious from './components/consultPrevious/consultPrevious.vue'
import newConsult from './components/newConsult/newConsult.vue'
import eventBus from '@/helper/event-bus'
import api from '@/api/general-consult-service'

export default {
    mounted() {
        this.$root.$on('bv::collapse::state', () => {
            //siempre mantener uno abierto
            if (!this.visibleNewConsult && !this.visiblePrevious) {
                this.visibleNewConsult = true
                this.$root.$emit('bv::toggle::collapse', '_consult')
            }
        })
    },
    created() {
        this.getConsultationDates()
        eventBus.$on('putInPreviewConsult', () => this.refreshPreviewConsult())
    },
    components: {
        consultPrevious,
        newConsult
    },
    data() {
        return {
            visiblePrevious: false,
            visibleNewConsult: true,
            consultationDates: [],
            patientId: this.$route.params.id,
            componentKey: 0
        }
    },
    methods: {
        getConsultationDates() {
            api.getDatesPreviousConsult(this.patientId).then(response => {
                if (response.body) {
                    let array = []
                    response.body.forEach(element => {
                        array.push({
                            value: element.Id,
                            text: this.$moment(element.ConsultationDate).format('dddd DD [de] MMMM [de] YYYY')
                        })
                    })
                    this.consultationDates = array
                    this.componentKey += 1     
                }
            })
        },
        refreshPreviewConsult() {
            this.getConsultationDates()   
        }
    }
}
</script>