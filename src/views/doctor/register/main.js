let currentLoader = null
import { loader } from '@/helper/loader'
import emailImage from '@/assets/images/email-image.png'
import doctorInformation from './components/doctorInformation.vue'
import homeAddress from './components/homeAddress/homeAddress.vue'
import contact from './components/contact.vue'
import formValidation from '@/helper/formValidation'
import api from '@/api/doctor-service'
import eventBus from '@/helper/event-bus'
import model from './helper/model'
import { saved } from '@/helper/alerts'

export default {
    created() {
        if (this.isAuthenticated) this.getDoctorInformation()
    },
    components: {
        doctorInformation,
        homeAddress,
        contact
    },
    data() {
        return {
            emailImage: emailImage,
            form: {
                doctorInformation: {
                    name: '',
                    lastName: '',
                    rfc: '',
                    curp: '',
                    sepCertificate: '',
                    ssa: '',
                    cmcp: '',
                    hospital: '',
                    university: '',
                    certificate: '',
                    school: '',
                    grouping: ''
                },
                homeAddress: {
                    address: '',
                    colony: '',
                    cp: '',
                    state: '',
                    city: '',
                    officePhone: '',
                    officeAddress: ''
                },
                contact: {
                    phone: '',
                    cellphone: '',
                    email: ''
                }
            },
            checkPolitics: false
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        textButton() {
            return this.isAuthenticated ? 'Actualizar información' : 'Finalizar registro'
        }
    },
    methods: {
        getDoctorInformation() {
            currentLoader = loader
            api.getRegister(this.$store.state.doctor.id).then(response => {
                if (response.body) {
                    this.form.doctorInformation.name = response.body.Name
                    this.form.doctorInformation.lastName = response.body.LastName
                    this.form.doctorInformation.rfc = response.body.RFC
                    this.form.doctorInformation.curp = response.body.CURP
                    this.form.doctorInformation.sepCertificate = response.body.NoSEP_ProfessionalCertificate
                    this.form.doctorInformation.ssa = response.body.NoSSA
                    this.form.doctorInformation.cmcp = response.body.NoCertification_CMCP
                    this.form.doctorInformation.hospital = response.body.ProfessionalResidenceHospital
                    this.form.doctorInformation.university = response.body.UniversitySpecialty
                    this.form.doctorInformation.certificate = response.body.SpecialtyCertificate
                    this.form.doctorInformation.school = response.body.NameStateSchool
                    this.form.doctorInformation.grouping = response.body.NameStateGrouping
                    this.form.homeAddress.address = response.body.Address
                    this.form.homeAddress.colony = response.body.Colony
                    this.form.homeAddress.cp = response.body.PostalCode
                    this.form.homeAddress.officePhone = response.body.OfficePhone
                    this.form.homeAddress.officeAddress = response.body.OfficeAddress
                    this.form.contact.phone = response.body.Phone
                    this.form.contact.cellphone = response.body.CellPhone
                    this.form.contact.email = response.body.Email

                    eventBus.$emit('setStateAndCity', { state: response.body.State, city: response.body.City })
                    currentLoader.hide()
                }
            })
        },
        onSubmit(evt) {
            evt.preventDefault()

            if (!formValidation.check('form_doctorregister'))
                return
            this.isAuthenticated ? this.update() : this.register()
        },
        register() {
            const textError = 'Hubó un error al guardar el registro médico'

            currentLoader = loader()
            const modelReq = new model(this.form) 
            api.register(modelReq.__$).then(response => {
                currentLoader.hide()
                if (response.status == 200) {
                    saved('Registro médico guardado', true)
                    window.location.href = 'https://emeci.com/'
                } else this.failure(textError)
            })
            .catch(_error => {
                this.failure(textError)
            })
        },
        update() {
            const textError = 'Hubó un error al atualizar los datos del médico'

            currentLoader = loader()
            const modelReq = new model(this.form) 
            api.updateRegisterInfo(this.$store.state.doctor.id, modelReq.__$).then(response => {
                currentLoader.hide()
                if (response.status === 200) {
                    saved('La información ha sido actualizada', true)
                } else this.failure(textError)
            })
            .catch(_error => {
                this.failure(textError)
            })
        },
        failure(message) {
            currentLoader.hide()
            saved(message, false)
        }
    }
}