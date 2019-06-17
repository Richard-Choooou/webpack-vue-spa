import Vue from 'vue'
import App from './view/app'
import router from './router'

class MyApp {
    constructor() {
        // alert(1)
    }
}

new Vue({
    el: '#app',
    router,
    render: h => h(App),

    created() {
        new MyApp()
    }
})