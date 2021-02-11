<template>
    <div role="tablist" class="mb-3">
        <b-card v-if="consultationDates.length > 0" no-body class="mb-1">
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

export default {
    mounted() {
        this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
            //siempre mantener uno abierto
            if (!this.visibleNewConsult && !this.visiblePrevious) {
                this.visibleNewConsult = true
                this.$root.$emit('bv::toggle::collapse', '_consult')
            }
        })
    },
    created() {
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
            consultationDates: []
        }
    },
    methods: {
        refreshPreviewConsult() {
            
        }
    }
}
</script>