import Vue from 'vue'
import { router } from '../router/router'

function alert(view, title, params = null) {
    const componentToLoad = Vue.extend(view)
    let instance = null
    if (params !== null)
        instance = new componentToLoad({
            propsData: params
        })
    else instance = new componentToLoad()

    instance.$mount()

    Vue.swal({
        title,
        html: '<div></div>',
        showCloseButton: true,        
        showConfirmButton: false,
        reverseButtons: true,
        onBeforeOpen: () => {
            Vue.swal.getContent()
            .querySelector('div')
            .append(instance.$el)
        }
    })
}

function saved(title, isConfirmed, route = null) {
    Vue.swal({
        position: 'top-end',
        icon: isConfirmed ? 'success' : 'error',
        title: title,
        showConfirmButton: false,
        timer: 1500,
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then(() => {
        if (route != null && isConfirmed) router.push(route)
    })
}

function changePassword(view, title) {
    alert(view, title)
}

function showModalToDiagnosticsAndTreatments(view, title, params) {
    alert(view, title, params)
}

export {
    changePassword,
    saved,
    showModalToDiagnosticsAndTreatments
}