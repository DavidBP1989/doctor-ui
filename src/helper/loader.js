import Vue from 'vue'

function loader(isAuthentication = false) {
    return Vue.$loading.show({
        loader: isAuthentication ? 'dots' : 'spinner',
        height: 155,
        width: 135,
        color: '#D22874',
        backgroundColor: '#E8E8E8'
    })
}

export {
    loader
}