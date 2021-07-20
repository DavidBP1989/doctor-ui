import store from '@/store/store'

export default class model {
    constructor() {
        this.__$ = {
            TextColor: store.state.printConfig.textColor,
            BgPrimaryColor: store.state.printConfig.bgPrimaryColor,
            BgSecondaryColor: store.state.printConfig.bgSecondaryColor,
            ImageLogo: {
                Title: store.state.printConfig.logo.title,
                Base64Image: store.state.printConfig.logo.base64
            }
        }
    }
}