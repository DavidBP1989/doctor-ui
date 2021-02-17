<template>
    <div role="tablist" class="mb-3">
        <b-card no-body class="mb-1">
            <b-card-header class="p-0" role="tab">
                <b-button block v-b-toggle.__preview class="text-left p-2">
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
                    <consult-previous />
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header class="p-0" role="tab">
                <b-button block v-b-toggle.new class="text-left p-2">
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
        eventBus.$on('putInPreviewObstetricConsult', () => this.refreshPreviewConsult())
    },
    components: {
        consultPrevious,
        newConsult
    },
    data() {
        return {
            visiblePrevious: false,
            visibleNewConsult: true
        }
    },
    methods: {
        refreshPreviewConsult() {
            //this.getConsultationDates()
        }
    }
}
</script>