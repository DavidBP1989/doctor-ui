import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import api from '@/api/doctor-service'
import eventBus from '@/helper/event-bus'
import $ from 'jquery'
import { onlyNumber } from '@/helper/utilities'

export default {
    created() {
        if (!this.isAuthenticated) this.getStates()
        eventBus.$on('setStateAndCity', v => this.setStateAndCity(v.state, v.city))
    },
    mounted() {
        this.$nextTick(() => {
            $('.ec :input')
            .addClass('f-text')
            .after('<div class="invalid-feedback">Este campo es requerido</div>')
        })
    },
    props: {
        form: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            states: [],
            stateSelected: '',
            autocompleteStates: [],
            cities: [],
            citySelected: '',
            autocompleteCities: []
        }
    },
    components: {
        VueBootstrapTypeahead
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        getStates(state = null, city = null) {
            api.getStates().then(response => {
                if (response.body) {
                    this.states = response.body
                    let array = []
                    response.body.forEach(element => {
                        array.push(element.Name)
                    })
                    this.autocompleteStates = array

                    if (this.isAuthenticated && state != null && city!= null) {
                        this.stateSelected = this.states.find(x => x.Id === state).Name
                        this.$refs.stateTypeahead.inputValue = this.stateSelected

                        const stateId = this.states.find(x => x.Name === this.stateSelected).Id
                        this.getCities(stateId, city)
                    }
                }
            })
        },
        hitState() {
            const value = this.states.find(x => x.Name === this.stateSelected)
            if (value) {
                this.form.state = value.Id
                this.getCities(value.Id)
            }
        },
        getCities(stateId, city) {
            api.getCities(stateId).then(response => {
                if (response.body) {
                    this.cities = response.body
                    let array = []
                    response.body.forEach(element => {
                        array.push(element.Name)
                    })
                    this.autocompleteCities = array

                    if (this.isAuthenticated) {
                        this.citySelected = this.cities.find(x => x.Id == city).Name
                        this.$refs.cityTypeahead.inputValue = this.citySelected
                    }
                }
            })
        },
        hitCity() {
            const value = this.cities.find(x => x.Name === this.citySelected)
            if (value) {
                this.form.city = value.Id
            }
        },
        setStateAndCity(state, city) {
            this.getStates(state, city)
        },
        numberFormat(evt) {
            onlyNumber(evt)
        }
    }
}