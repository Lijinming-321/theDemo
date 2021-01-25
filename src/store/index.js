import Vue from 'vue';
import Vuex from 'vuex';
import HomeModule from '@/store/HomeModule/state.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        HomeModule
    }
})
export default store;