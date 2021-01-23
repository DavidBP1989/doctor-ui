function mapForDiagnosticsAndTreatments(response) {
    let result = []
    response.forEach(x => {
        result.push({
            id: x.Id,
            name: x.GroupName,
            disabled: false,
            list: x.List
        })
    })

    return result
}

function mapForLabAndCabinet(response) {
    let result = []
    response.forEach(x => {
        let studies = []
        x.StudiesList.forEach(n => {
            studies.push({
                id: n.Id,
                name: n.Name,
                check: false,
                edit: false
            })
        })

        result.push({
            id: x.Id,
            name: x.Name,
            style: false,
            studies: studies
        })
    })

    return result
}

export default{
    mapForDiagnosticsAndTreatments,
    mapForLabAndCabinet
}