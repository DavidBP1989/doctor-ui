let currentLoader = null
import { loader } from '@/helper/loader'
import api from '@/api/patient-service'
import existingPatient from './components/existingPatient.vue'
import { onlyLetter } from '@/helper/utilities'
import formValidation from '@/helper/formValidation'

export default {
    created() {
        this.getLastPatient()
    },
    components: {
        existingPatient
    },
    data() {
        return {
            doctorId: this.$store.state.doctor.id,
            visibleCollapse: false,
            options: [
                { value: 'F', text: 'Mujer' },
                { value: 'M', text: 'Hombre' }
            ],
            emeci: null,
            form: {
                name: '',
                lastName: '',
                mothersName: '',
                fathersName: '',
                phone: '',
                sex: 'F',
                email: '',
                birthDate: null,
                allergy: '',
                password: '',
                confirmPassword: '',
            }
        }
    },
    computed: {
        txtLink() {
            return this.visibleCollapse ? 'Cerrar' : 'Agregar paciente existente'
        }
    },
    methods: {
        getLastPatient() {
            api.getLastEmeci(this.doctorId).then(response => {
                this.emeci = response.body
            })
        },
        activateCard() {
            if (!formValidation.check('formPatients'))
                return
            
            const req = model(this.form)
            currentLoader = loader()
            api.saveNewPatient(this.doctorId, req.__$).then(response => {
                currentLoader.hide()
                const patientId = response.body.PatientId
                if (patientId != null) {
                    saved('Paciente agregado', true, `/consults/${patientId}`)
                } this.failure()
            })
            .catch(() => {
                this.failure()
            })
        },
        failure() {
            currentLoader.hide()
            saved('Hubó un error al guardar el paciente', false)
        },
        format(evt) {
            onlyLetter(evt)
        }
    }
}