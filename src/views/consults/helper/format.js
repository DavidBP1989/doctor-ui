function getArrayFormatToCabinetAndLaboratory(array) {
    return array.map(x => {
        return {
            Name: x.name,
            Studies: x.studies.map(s => {
                return s.name
            })
        }
    })
}

function getArrayFormatToDiagnosticsAndTreatments(array) {
    var studies = array.map(x => {
        return x.text
    })
    return studies.length > 0 ? [
        {
            Name: '',
            Studies: studies
        }
        
    ] : []
}

export default {
    getArrayFormatToCabinetAndLaboratory,
    getArrayFormatToDiagnosticsAndTreatments
}