import Vue from 'vue'
import { router } from '../router/router'
import printView from '../shared/print/print.vue'

function alert(view, title, params = null, showConfirmButton = null) {
    const componentToLoad = Vue.extend(view)
    let instance = null
    if (params !== null)
        instance = new componentToLoad({
            propsData: params
        })
    else instance = new componentToLoad()

    instance.$mount()

    let props = {
        title,
        html: '<div></div>',
        showCloseButton: true,        
        showConfirmButton: showConfirmButton != null,
        reverseButtons: true,
        onBeforeOpen: () => {
            Vue.swal.getContent()
            .querySelector('div')
            .append(instance.$el)
        }
    }

    if (showConfirmButton != null) {
        props.confirmButtonText = 'Confirmar consulta'
        props.confirmButtonColor = '#28a745'
    }

    return Vue.swal(props)
}

function windowPrint(params = null) {
    const componentToLoad = Vue.extend(printView)
    const instance = new componentToLoad({
        propsData: params
    })
    instance.$mount()

    let props = {
        html: '<div></div>',
        backdrop: false,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
            Vue.swal.showLoading()
        },
        onBeforeOpen: () => {
            Vue.swal.getContent()
            .querySelector('div')
            .append(instance.$el)
        }
    }

    return Vue.swal(props)
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

function showModalWithViewReference(view, title, params, showConfirmButton) {
    return alert(view, title, params, showConfirmButton)
}

export {
    changePassword,
    windowPrint,
    saved,
    showModalWithViewReference
}