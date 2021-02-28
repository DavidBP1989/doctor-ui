import api from '@/api/gynecology-consult-service'

export default {
    mounted() {
        this.$watch('consultationDates', newDate => {
            this.dates = newDate
            this.init()
        })
    },
    props: {
        consultationDates: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            dates: this.consultationDates,
            selectedDate: null,
            consult: null
        }
    },
    computed: {
        options() {
            if (this.consult !== null) {
                let options = []
                Object.keys(this.consult.Checkbox).forEach(key => {
                    options.push({
                        text: key === 'Others' ? 'Otros' : key,
                        value: this.consult.Checkbox[key]
                    })
                })

                return options
            }
        }
    },
    methods: {
        init() {
            this.selectedDate = this.dates[0].value
            this.getConsult()
        },
        getConsult() {
            api.getConsultById(this.selectedDate).then(response => {
                this.consult = response.body
            })
        },
        getDateFormat(date) {
            if (date !== null)
                return this.$moment(date).format('D MMMM YYYY')
            else return '---'
        },
        maritalStatus(value) {
            let name = ''
            if (value === null) value = '0'
            switch(value) {
                case '0':
                    name = 'Casado'
                    break
                case '1':
                    name = 'Separado'
                    break
                case '2':
                    name = 'Soltero'
                    break
                case '3':
                    name = 'Union libre'
                    break
                case '4':
                    name = 'Viudo'
                    break
                case '5':
                    name = 'Divorciado'
                    break
            }
            return name
        },
        sex(_sex) {
            return _sex === 'M' ? 'Masculino' : 'Femenino'
        }
    }
}