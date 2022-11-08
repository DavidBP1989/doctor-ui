import api from '@/api/patient-service'

export default {
    data() {
        return {
            filter: '',
            isBusy: false,
            doctorId: this.$store.state.doctor.id,
            fields: [
                {
                    key: 'fullname',
                    label: 'Nombre',
                    sortable: true,
                    sortDirection: 'desc'
                },
                {
                    key: 'EMECI',
                    label: 'EMECI'
                },
                {
                    key: 'LastConsultation',
                    label: 'Última consulta',
                    sortable: true,
                    formatter: value => {
                        if (value === null)
                            return 'Sin consultar'
                        return this.$moment(value).format('D MMMM YYYY')
                    }
                }
            ],
            totalRow: 0,
            currentPage: 1,
            itemsPerPage: 15
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalRow / this.itemsPerPage)
        }
    },
    methods: {
        provider(ctx, callback) {
            this.isBusy = true

            api.getPatientList(
                this.doctorId,
                ctx.currentPage,
                this.itemsPerPage,
                this.filterBy(ctx.filter),
                ctx.filter,
                this.orderBy(ctx.sortBy, ctx.sortDesc),
            )
            .then(response => {
                this.totalRow = parseInt(response.headers.map['x-total-count'][0] || 0)
                this.isBusy = false
                callback(response.body)
            })
            .catch(() => {
                callback([])
            })
        },
        orderBy(sortBy, sortDesc) {
            const defaultSort = 'name'
            if (!sortBy)
                return `${defaultSort} asc`
            const _sortBy = sortBy === 'fullname' ? defaultSort : sortBy
            return `${_sortBy} ${sortDesc ? 'desc' : 'asc'}`
        },
        filterBy(filter) {
            let property = null
            if (/(.*[a-z]){3}/i.test(filter)) property = 'Nombre'
            if (/(.*[0-9])/i.test(filter)) property = 'Emeci'

            return property
        },
        to(ageInMonths, sex, patientId) {
            if (Math.trunc(ageInMonths / 12) >= 12 && sex === 'F')
                return `/consults/${patientId}/gynecology`
            return `/consults/${patientId}`
        },
        goToNewPatient() {
            //this.$router.push(this.$store.state.doctor.isAssociation ?  '/newPatientAssoc' : '/newPatient')
            this.$router.push('/newPatient')
        }
    }
}