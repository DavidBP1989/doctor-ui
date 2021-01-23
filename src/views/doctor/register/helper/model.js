export default class model {
    constructor(form) {
        this.__$ = {
            Name: form.doctorInformation.name,
            LastName: form.doctorInformation.lastName,
            RFC: form.doctorInformation.rfc,
            CURP: form.doctorInformation.curp,
            NoSEP_ProfessionalCertificate: form.doctorInformation.sepCertificate,
            NoSSA: form.doctorInformation.ssa,
            NoCertification_CMCP: form.doctorInformation.cmcp,
            ProfessionalResidenceHospital: form.doctorInformation.hospital,
            UniversitySpecialty: form.doctorInformation.university,
            SpecialtyCertificate: form.doctorInformation.certificate,
            NameStateSchool: form.doctorInformation.school,
            NameStateGrouping: form.doctorInformation.grouping,
            Address: form.homeAddress.address,
            Colony: form.homeAddress.colony,
            PostalCode: form.homeAddress.cp,
            State: form.homeAddress.state,
            City: form.homeAddress.city,
            OfficePhone: form.homeAddress.officePhone,
            OfficeAddress: form.homeAddress.officeAddress,
            Phone: form.contact.phone,
            CellPhone: form.contact.cellphone,
            Email: form.contact.email
        }
    }
}