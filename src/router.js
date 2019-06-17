import Vue from 'vue'
import Router from 'vue-router'
import Page1 from './view/page1'
import Page2 from './view/page2'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        redirect: '/page1'
    }, {
        path: '/page1',
        component: Page1
    }, {
        path: '/page2',
        component: Page2
    }]
})